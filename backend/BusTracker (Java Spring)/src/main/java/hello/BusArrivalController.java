package hello;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import hello.models.BusArrivalDataContainer;
import hello.models.BusArrivalRequest;
import hello.models.BusArrivalResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BusArrivalController {

    @RequestMapping("/busArrival/{service}")
    public BusArrivalDataContainer busArrival(@RequestParam(value="stop") String stop,
                                                @PathVariable(value="service") String service) {
        BusArrivalRequest request = new BusArrivalRequest(stop, service);

        return getBusArrivalAPI(request);
    }

    private BusArrivalDataContainer getBusArrivalAPI(BusArrivalRequest request) {
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2")
                    .header("AccountKey", "mZo9ev5GQA6EolncUW1SUg==")
                    .queryString("BusStopCode", request.getStop())
                    .queryString("ServiceNo", request.getService())
                    .asJson();


            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

            BusArrivalResponse res = objectMapper.readValue(jsonResponse.getBody().toString(), BusArrivalResponse.class);

            return res.getServices();
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return null;
        }
    }
}