package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusStopData {

    private final String no;
    private final String lat;
    private final String lng;
    private final String name;

    public BusStopData() {
        this.no = null;
        this.lat = null;
        this.lng = null;
        this.name = null;
    }

    public BusStopData(String no, String lat, String lng, String name) {
        this.no = no;
        this.lat = lat;
        this.lng = lng;
        this.name = name;
    }

    public String getNo() {
        return no;
    }

    public String getLat() {
        return lat;
    }

    public String getLng() {
        return lng;
    }

    public String getName() {
        return name;
    }
}
