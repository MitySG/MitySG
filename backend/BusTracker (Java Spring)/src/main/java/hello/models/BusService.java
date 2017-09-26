package hello.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class BusService {
    private final List<String> route1, route2;

    @JsonCreator
    public BusService(@JsonProperty("1") Map<String, Object> route1, @JsonProperty("2") Map<String, Object> route2) {
        this.route1 = (List<String>) route1.get("stops");
        this.route2 = (List<String>) route2.get("stops");
    }

    public List<String> getRoute1() {
        return route1;
    }

    public List<String> getRoute2() {
        return route2;
    }
}
