package hello.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BusServiceResponse {
    private final List<List<String>> routes;

    @JsonCreator
    public BusServiceResponse(List<String> route1, List<String> route2) {
        routes = new ArrayList<List<String>>();

        routes.add(route1);
        routes.add(route2);
    }

    public List<List<String>> getRoutes() {
        return routes;
    }
}
