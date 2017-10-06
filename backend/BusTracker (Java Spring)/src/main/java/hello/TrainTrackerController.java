package hello;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import hello.models.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.lang.Thread.sleep;

@RestController
public class TrainTrackerController {
    private TrainTimingController ttCon = new TrainTimingController();

    @RequestMapping(value = "/trainTracker/{start}/{end}", method = RequestMethod.POST)
    public int trainTracker(@PathVariable(value="start") String startID,
                               @PathVariable(value="end") String endID,
                               @RequestParam(value="alert", defaultValue="3") String alertString,
                               @RequestBody String subscription) {
        System.out.println("Received push req: " + startID + " to " + endID);
        int travelTime = ttCon.getTrainTimingAPI(startID, endID);
        int alertTime = Integer.parseInt(alertString);
        int waitingTime = travelTime - alertTime;

        if (waitingTime < 0) {
            waitingTime = 0;
        }

        System.out.println("Travel Time: "+travelTime+", Alert Time: "+alertString+", Waiting Time: "+ waitingTime);

        try {
            sleep(waitingTime * 60 * 1000);
            System.out.println("Alerting now");
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
            
            PushSubscription sub = objectMapper.readValue(subscription, PushSubscription.class);

            PushRequest pushReq = new PushRequest(sub, "You are reaching your destination");

            System.out.println("Posting push");
            HttpResponse<String> resp = Unirest.post("https://huy3vicolc.execute-api.us-east-1.amazonaws.com/dev/push")
                    .body(objectMapper.writeValueAsString(pushReq))
                    .asString();

            System.out.println("Push result: " + resp.getBody());
        } catch (Exception e) {
            e.printStackTrace();

            return -1;
        }

        int reachingTime = travelTime < alertTime ? travelTime : alertTime;

        System.out.println("Train reaching in "+reachingTime+" mins");

        return reachingTime;
    }
}