package hello.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BusService {
    private List<String> route1, route2;

    @JsonCreator
    public BusService(@JsonProperty("1") Map<String, Object> route1, @JsonProperty("2") Map<String, Object> route2) {
        this.route1 = (List<String>) route1.get("stops");
        this.route2 = (List<String>) route2.get("stops");
    }

    public BusService(List<String> route1, List<String> route2) {
        this.route1 = route1;
        this.route2 = route2;
    }

    public BusService() {
        this.route1 = new ArrayList<String>();
        this.route2 = new ArrayList<String>();
    }

    public void addRoute1(String item) {
        route1.add(item);
    }

    public void addRoute2(String item) {
        route2.add(item);
    }

    public List<String> getRoute1() {
        return route1;
    }

    public List<String> getRoute2() {
        return route2;
    }
}
