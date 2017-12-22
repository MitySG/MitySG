package hello;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import hello.models.BusArrivalResponse;
import hello.models.BusService;
import hello.models.BusServicesData;
import hello.models.BusServicesDataResponse;
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
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;
import java.util.stream.Stream;

@RestController
public class BusServicesController {

    @RequestMapping("/")
    public String rootRoute() {
        return "";
    }

    @RequestMapping("/busServices")
    public Map<String, List<List<String>>> busServices() {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con= DBConnection.getConnection();
            Statement stmt=con.createStatement();

            String sql = "select bs.serviceNo, brs.busStopNo, br.routeNo, bs.routes FROM BusRouteStops brs, BusRoutes br, BusServices bs WHERE bs.serviceNo = br.serviceNo AND br.routeID = brs.routeID ORDER BY brs.position";

            ResultSet rs = stmt.executeQuery(sql);

            Map<String, List<List<String>>> result = new HashMap<String, List<List<String>>>();

            while(rs.next()) {
                String serviceNo = rs.getString("bs.serviceNo");

                List<List<String>> service = result.getOrDefault(serviceNo, new ArrayList<List<String>>());

                if (service.isEmpty()) {
                    for (int i = 0; i < rs.getInt("bs.routes"); i++) {
                        service.add(new ArrayList<String>());
                    }
                }

                service.get(rs.getInt("br.routeNo") - 1).add(rs.getString("brs.busStopNo"));
                result.put(serviceNo, service);
            }

            con.close();

            return result;
        } catch(Exception e){
            e.printStackTrace();

            return null;
        }

        /*StringBuilder contentBuilder = new StringBuilder();
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
        }*/
    }

    @RequestMapping("/busServices/{service}")
    public List<List<String>> busServices(@PathVariable(value="service") String service) {
        BusService busService = getBusServiceAPI(service);
        List<List<String>> result = new ArrayList<List<String>>();

        result.add(busService.getRoute1());

        if (!busService.getRoute2().isEmpty()) {
            result.add(busService.getRoute2());
        }

        return result;
    }

    /*@RequestMapping("/busParsing")
    public void busParsing() {
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("https://busrouter.sg/data/2/bus-services.json")
                    .asJson();


            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

            BusServicesDataResponse res = objectMapper.readValue(jsonResponse.getBody().toString(), BusServicesDataResponse.class);

            for (int i = 0; i < res.getServices().size(); i++) {
                BusServicesData service = res.getServices().get(i);

                Class.forName("com.mysql.cj.jdbc.Driver");
                Connection con= DBConnection.getConnection();
                Statement stmt=con.createStatement();
                String sql = "INSERT INTO BusServices VALUES (\""+service.getNo()+"\", \"" + service.getName() + "\",\"" + service.getOperator() + "\"," + service.getRoutes() + ")";

                stmt.execute(sql);
                con.close();
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/busParsing3")
    public void busParsing3() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Statement stmt=con.createStatement();
            Statement stmt2=con.createStatement();
            Statement stmt3=con.createStatement();

            String sql = "Select serviceNo FROM BusServices";

            ResultSet rs = stmt.executeQuery(sql);

            while(rs.next())  {
                String serviceNo = rs.getString("serviceNo");
                BusService service = getBusServiceAPI(serviceNo);

                List<String> route1 = service.getRoute1();
                List<String> route2 = service.getRoute2();

                sql = "Select routeID FROM BusRoutes WHERE serviceNo=\""+serviceNo+"\" AND routeNo=1";
                ResultSet rs2 = stmt2.executeQuery(sql);
                rs2.next();

                for (int i = 0; i < route1.size(); i++) {
                    String routeID = rs2.getString("routeID");
                    sql = "INSERT INTO BusRouteStops (routeID, position, busStopNo) VALUES (\""+routeID+"\", "+i+", \""+route1.get(i)+"\")";

                    stmt3.execute(sql);
                }

                if (!route2.isEmpty()) {
                    sql = "Select routeID FROM BusRoutes WHERE serviceNo=\""+serviceNo+"\" AND routeNo=2";
                    rs2 = stmt2.executeQuery(sql);
                    rs2.next();

                    for (int i = 0; i < route2.size(); i++) {
                        String routeID = rs2.getString("routeID");
                        sql = "INSERT INTO BusRouteStops (routeID, position, busStopNo) VALUES (\""+routeID+"\", "+i+", \""+route2.get(i)+"\")";

                        stmt3.execute(sql);
                    }
                }
            }

            con.close();


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
*/
    public BusService getBusServiceAPI(String no) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con= DBConnection.getConnection();
            Statement stmt=con.createStatement();

            String sql = "select brs.busStopNo, br.routeNo FROM BusRouteStops brs, BusRoutes br, BusServices bs WHERE bs.serviceNo=\""+no+"\" AND bs.serviceNo = br.serviceNo AND br.routeID = brs.routeID ORDER BY brs.position";

            ResultSet rs = stmt.executeQuery(sql);

            BusService service = new BusService();

            while(rs.next()) {
                if (rs.getInt("br.routeNo") == 1) {
                    service.addRoute1(rs.getString("brs.busStopNo"));
                } else {
                    service.addRoute2(rs.getString("brs.busStopNo"));
                }
            }

            con.close();

            return service;
        } catch(Exception e){

            System.out.println(e.getMessage());
            return null;
        }


        /*try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("https://busrouter.sg/data/2/bus-services/"+no+".json")
                    .asJson();

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

            BusService service = objectMapper.readValue(jsonResponse.getBody().toString(), BusService.class);

            return service;
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return null;
        }*/
    }
}
