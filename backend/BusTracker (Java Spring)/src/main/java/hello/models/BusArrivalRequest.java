package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusArrivalRequest {

    private final String stop;
    private final String service;

    public BusArrivalRequest(String stop, String service) {
        this.stop = stop;
        this.service = service;
    }

    public String getStop() {
        return stop;
    }

    public String getService() {
        return service;
    }
}
