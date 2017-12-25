package hello;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import hello.models.BusService;
import hello.models.StationData;
import hello.models.StationDataContainer;
import hello.models.TrainTimingResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;

@RestController
public class TrainTimingController {

    @RequestMapping("/trainTiming/{start}/{end}")
    public int stations(@PathVariable(value="start") String start,
                                             @PathVariable(value="end") String end) {
        return getTrainTimingAPI(start, end);
    }

    public int getTrainTimingAPI(String startID, String endID) {
        try {
            String requestURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:"+startID+"&destinations=place_id:"+endID+"&mode=transit&transit_mode=train&key="+Environment.GOOGLE_MAPS_API_KEY;
            HttpResponse<JsonNode> jsonResponse = Unirest.get(requestURL).asJson();

            TrainTimingResponse response = new ObjectMapper().readValue(jsonResponse.getBody().toString(), TrainTimingResponse.class);
            int timing = response.getTiming();
            System.out.println("Train arrival eta " + timing + " for " + startID + " : " + endID + " with " + requestURL);
            return timing;
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return -1;
        }
    }
}
