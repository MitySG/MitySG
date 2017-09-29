package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StationDataContainer {
    Map<String, StationData> stations;

    public StationDataContainer() {
        this.stations = new HashMap<String, StationData>();
    }

    /*@JsonProperty("results")
    private void setStations(List<StationData> results) {
        this.stations = new HashMap<String, StationData>();

        for (int i = 0; i < results.size(); i++) {
            StationData data = results.get(i);
            this.stations.put(data.getName(), data);
        }
    }*/

    public void addStation(String name, StationData data) {
        this.stations.put(name, data);
    }

    public Map<String, StationData> getStations() {
        return stations;
    }
}
