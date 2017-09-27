package hello;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import hello.models.BusService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

@RestController
public class BusServicesController {

    @RequestMapping("/busServices")
    public String busServices() {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines( Paths.get("./services.json"), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
            String serviceRawData = contentBuilder.toString();

            return serviceRawData;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            System.out.println(e.getMessage());

            return null;
        }
    }

    @RequestMapping("/busServices/{service}")
    public String busServices(@PathVariable(value="service") String service) {

        BusService serviceRoute = getBusServiceAPI(service);

        Map<String, Object> tempObj = new HashMap<String, Object>();
        tempObj.put(service, serviceRoute.getRoute1());

        try {
            return new ObjectMapper().writeValueAsString(tempObj);
        } catch (Exception e) {
            return null;
        }
    }

    public BusService getBusServiceAPI(String no) {
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("https://busrouter.sg/data/2/bus-services/"+no+".json")
                    .asJson();

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

            BusService service = objectMapper.readValue(jsonResponse.getBody().toString(), BusService.class);

            return service;
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return null;
        }
    }
}