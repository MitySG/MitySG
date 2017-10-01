package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainTimingResponse {
    private int timing;

    @JsonProperty("rows")
    private void setTiming(List<Map<String, Object>> routes) {
        if (routes.isEmpty()) {
            timing = -1;

            return;
        }

        Map<String, Object> route = routes.get(0);

        List<Map<String, Object>> elements = (List<Map<String, Object>>) route.get("elements");

        if (elements.isEmpty()) {
            timing = -1;

            return;
        }

        Map<String, Object> leg = (Map<String, Object>) elements.get(0);
        Map<String, Object> duration = (Map<String, Object>) leg.get("duration");

        float durationMins = (float) ((Integer) duration.get("value"));


        timing = (int) Math.round(durationMins/60.0f);
    }

    public int getTiming() {
        return timing;
    }

}
