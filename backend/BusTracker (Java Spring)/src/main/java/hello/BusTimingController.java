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
public class BusTimingController {

    @RequestMapping("/busTiming/{start}/{end}")
    public int busTiming(@PathVariable(value="start") String start,
                        @PathVariable(value="end") String end) {
        return getBusTimingAPI(start, end);
    }

    public int getBusTimingAPI(String startCoord, String endCoord) {
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+startCoord+"&destinations="+endCoord+"&mode=transit&transit_mode=bus&key=AIzaSyBprDkFuJKkGzS5MZOy14OvSmtVm1j-DxM")
                    .asJson();

            System.out.println(endCoord);
            TrainTimingResponse response = new ObjectMapper().readValue(jsonResponse.getBody().toString(), TrainTimingResponse.class);

            return response.getTiming();
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return -1;
        }
    }
}
