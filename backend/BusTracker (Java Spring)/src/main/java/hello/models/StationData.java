package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StationData {
    //String name;
    String id;
    double latitude;
    double longitude;

    public StationData() {

    }

    /*public void setName(String name) {
        this.name = name;
    }*/

    //@JsonProperty("place_id")
    public void setId(String id) {
        this.id = id;
    }

    public StationData(String id, double latitude, double longitude) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @JsonProperty("geometry")
    private void setLocation(Map<String, Object> geometry) {
        Map<String, Double> location = (Map<String, Double>) geometry.get("location");

        this.latitude = location.get("lat");
        this.longitude = location.get("lng");
    }

    /*public String getName() {
        return name;
    }*/

    public String getID() {
        return id;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }
}
