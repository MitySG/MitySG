package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusStopDataResponse {
    private final List<BusStopData> stops;

    public BusStopDataResponse() {
        stops = new ArrayList<BusStopData>();
    }

    public BusStopDataResponse(List<BusStopData> stops) {
        this.stops = stops;
    }

    public List<BusStopData> getStops() {
        return stops;
    }
}
