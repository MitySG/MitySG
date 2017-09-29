package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainTimingResponse {
    private int timing;

    @JsonProperty("routes")
    private void setTiming(List<Map<String, Object>> routes) {
        if (routes.isEmpty()) {
            timing = -1;

            return;
        }

        Map<String, Object> route = routes.get(0);

        List<Map<String, Object>> legs = (List<Map<String, Object>>) route.get("legs");

        if (legs.isEmpty()) {
            timing = -1;

            return;
        }

        Map<String, Object> leg = (Map<String, Object>) legs.get(0);
        List<Map<String, Object>> steps = (List<Map<String, Object>>) leg.get("steps");

        int durationMins = 0;

        for (int i = 0; i < steps.size(); i++) {
            Map<String, Object> step = steps.get(i);

            String travelMode = (String) step.get("travel_mode");

            if (travelMode.equals(("TRANSIT"))) {
                Map<String, Object> duration = (Map<String, Object>) step.get("duration");
                durationMins = ((Integer) duration.get("value"));
            }
        }

        timing = durationMins/60;
    }

    public int getTiming() {
        return timing;
    }

}
