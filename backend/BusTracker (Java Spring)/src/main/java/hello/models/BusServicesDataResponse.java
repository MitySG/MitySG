package hello.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusServicesDataResponse {
    private final List<BusServicesData> services;

    public BusServicesDataResponse() {
        services = new ArrayList<BusServicesData>();
    }

    public BusServicesDataResponse(List<BusServicesData> services) {
        this.services = services;
    }

    public List<BusServicesData> getServices() {
        return services;
    }
}
