package hello;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import hello.models.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static java.lang.Thread.sleep;

@RestController
public class BusTrackerController {
    private List<String> busRoute;
    private int currentStopIndex;
    private int endingStopIndex;
    private int incomingBusNo;
    private BusArrivalController baCon = new BusArrivalController();
    private BusServicesController bsCon = new BusServicesController();

    @RequestMapping("/busTracker")
    public Location busTracker(@RequestParam(value="startingStop") String startingStop,
                                              @RequestParam(value="endingStop") String endingStop,
                                              @RequestParam(value="service") String service,
                                              @RequestParam(value="alert", defaultValue="3") String alertString) {

        BusArrivalRequest request = new BusArrivalRequest(startingStop, service);

        String finalStop = getDestinationCode(request);

        BusService busStops = bsCon.getBusServiceAPI(service);
        int alert = Integer.parseInt(alertString);

        List<String> route2 = busStops.getRoute2();
        if (route2.isEmpty() || !route2.get(route2.size() - 1).equals(finalStop)) {
            busRoute = busStops.getRoute1();
        } else {
            busRoute = busStops.getRoute2();
        }

        currentStopIndex = busRoute.indexOf(startingStop);
        endingStopIndex = busRoute.indexOf(endingStop);
        System.out.println("Obtained Indexes S:"+currentStopIndex+" E:"+endingStopIndex);
        System.out.println(busRoute.toString());

        Location busLocation = getFirstBus(request);

        if (busLocation == null) {
            return null;
        }

        currentStopIndex += 1;
        incomingBusNo = 0;

        System.out.println("Entering Intermediate Bus Stops Phase");

        while (currentStopIndex != endingStopIndex) {
            System.out.println("Checking Bus " + currentStopIndex + " Stop Code: " + busRoute.get(currentStopIndex));
            request = new BusArrivalRequest(busRoute.get(currentStopIndex), service);
            busLocation = passNextBusStop(request, busLocation);
            currentStopIndex += 1;
        }
        System.out.println("Exiting Intermediate Bus Stops Phase");

        return toLastBusStop(request, busLocation, alert);
    }

    private Location toLastBusStop(BusArrivalRequest request, Location busLocation, int alert) {
        try {
            System.out.println("Entering Last Bus Stop Phase");
            incomingBusNo = determineBusNo(request, busLocation);

            System.out.println("Determined Bus Stop Number");
            BusArrivalData nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
            while(incomingBusNo > 1) {
                System.out.println("Looking for bus no " + incomingBusNo);
                System.out.println(nextBusData.getEstimatedWait() + " more minutes");

                while(nextBusData.getEstimatedWait() > 0) {
                    sleep(60000);
                    nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
                    System.out.println(nextBusData.getEstimatedWait() + " more minutes");
                };

                incomingBusNo -= 1;
            }

            System.out.println("Waiting on the actual bus - alert "+alert+" minutes before");
            System.out.println(nextBusData.getEstimatedWait() + " more minutes");

            while(nextBusData.getEstimatedWait() > alert) {
                sleep(60000);
                nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
                System.out.println(nextBusData.getEstimatedWait() + " more minutes");
            };

            System.out.println("Bus is reaching destination in " + nextBusData.getEstimatedWait() + " minutes");
            return new Location(nextBusData.getLatitude(), nextBusData.getLongitude());
        } catch (Exception e) {

            return null;
        }
    }

    private Location passNextBusStop(BusArrivalRequest request, Location busLocation) {
        try {
            incomingBusNo = determineBusNo(request, busLocation);

            System.out.println("Checking Timings for - " + request.getStop());
            BusArrivalData nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
            while(incomingBusNo > 0) {
                System.out.println("Checking Bus Timings for Bus " + incomingBusNo);
                System.out.println(nextBusData.getEstimatedWait() + "more minutes");
                while(nextBusData.getEstimatedWait() > 0) {
                    sleep(60000);
                    nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
                    System.out.println(nextBusData.getEstimatedWait() + "more minutes");
                };

                if (incomingBusNo > 1) {
                    while(nextBusData.getEstimatedWait() <= 0) {
                        sleep(60000);
                        nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
                        System.out.println(nextBusData.getEstimatedWait() + "more minutes");
                    };
                }

                incomingBusNo -= 1;
                System.out.println("Checking Next Bus");
            }

            System.out.println("Finished Checking Timings for - " + request.getStop());
            return new Location(nextBusData.getLatitude(), nextBusData.getLongitude());
        } catch (Exception e) {

            return null;
        }
    }

    private Integer determineBusNo(BusArrivalRequest request, Location busLocation) {
        try {
            BusArrivalDataContainer dataCon = baCon.busArrival(request.getStop(), request.getService());

            System.out.println("Checking for Bus No");
            while(incomingBusNo == 0) {
                if (dataCon.getNextBus() == null) {
                    return null;
                } else if (dataCon.getNextBus() != null && dataCon.getNextBus().getLocation().compare(busLocation)) {
                    return 1;
                } else if (dataCon.getNextBus2() != null && dataCon.getNextBus2().getLocation().compare(busLocation)) {
                    return 2;
                } else if (dataCon.getNextBus3() != null && dataCon.getNextBus3().getLocation().compare(busLocation)) {
                    return 3;
                } else {
                    return 4;
                }
            }

            return null;
        } catch (Exception e) {
            return null;
        }
    }

    private String getDestinationCode(BusArrivalRequest request) {
        BusArrivalDataContainer arrival = baCon.busArrival(request.getStop(), request.getService());

        if (arrival == null) {
            return null;
        }

        BusArrivalData nextBusData = arrival.getNextBus();

        return nextBusData.getDestinationCode();
    }

    private Location getFirstBus(BusArrivalRequest request) {
        try {
            BusArrivalData nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
            System.out.println("Before Checking First Bus");
            System.out.println(nextBusData.getEstimatedWait() + " more minutes");
            while(nextBusData.getEstimatedWait() > 0) {
                sleep(60000);
                nextBusData = baCon.busArrival(request.getStop(), request.getService()).getNextBus();
                System.out.println(nextBusData.getEstimatedWait() + " more minutes");
            };
            System.out.println("First Bus has Reached");

            return nextBusData.getLocation();
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }
    }
}