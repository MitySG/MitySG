package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusArrivalResponse {
    String BusStopCode;
    List<BusArrivalDataContainer> Services;

    public String getBusStopCode() {
        return BusStopCode;
    }

    public void setBusStopCode(String busStopCode) {
        this.BusStopCode = busStopCode;
    }

    public BusArrivalDataContainer getServices() {
        return Services.get(0);
    }

    public void setServices(ArrayList<BusArrivalDataContainer> services) {
        this.Services = services;
    }

    public BusArrivalResponse(String busStopCode, ArrayList<BusArrivalDataContainer> services) {
        super();
        this.BusStopCode = busStopCode;
        this.Services = services;
    }

    public BusArrivalResponse() {

    }

}
