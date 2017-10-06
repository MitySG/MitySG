package hello;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import hello.models.BusServicesData;
import hello.models.BusServicesDataResponse;
import hello.models.BusStopData;
import hello.models.BusStopDataResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
public class BusStopsController {

    @RequestMapping("/busStops")
    public Hashtable<String, Hashtable<String, String>> busServices() {
        return getBusStopAPI("select * from BusStops");
    }

    @RequestMapping("/busStops/{no}")
    public Hashtable<String, Hashtable<String, String>> busServices(@PathVariable(value="no") String no) {
        return getBusStopAPI("select * from BusStops WHERE busStopNo='"+no+"'");
    }
/*
    @RequestMapping("/busStopParsing")
    public void busParsing() {
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("https://busrouter.sg/data/2/bus-stops.json")
                    .asJson();

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);

            System.out.println(jsonResponse.getBody().toString());
            List<LinkedHashMap<String, String>> res = objectMapper.readValue(jsonResponse.getBody().toString(), List.class);

            for (int i = 0; i < res.size(); i++) {
                LinkedHashMap<String, String> stop = res.get(i);
                Class.forName("com.mysql.cj.jdbc.Driver");
                String dbPW = System.getenv("DB_PASSWORD");
                //Connection con= DriverManager.getConnection("jdbc:mysql://awsdb.chorl1j1nddl.ap-southeast-1.rds.amazonaws.com:3306/mydb","admin",dbPW);
               //Statement stmt=con.createStatement();
                String sql = "UPDATE BusStops SET Longitude=" + stop.get("lng") + " WHERE busStopNo=\""+stop.get("no")+"\";";

                //stmt.execute(sql);
                //con.close();
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }*/

    public Hashtable<String, Hashtable<String, String>> getBusStopAPI(String sql) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            String dbPW = System.getenv("DB_PASSWORD");
            Connection con= DriverManager.getConnection(
                    "jdbc:mysql://awsdb.chorl1j1nddl.ap-southeast-1.rds.amazonaws.com:3306/mydb","admin",dbPW);
            Statement stmt=con.createStatement();

            ResultSet rs = stmt.executeQuery(sql);

            Hashtable<String, Hashtable<String, String>> stops = new Hashtable<String, Hashtable<String, String>>();

            while(rs.next())  {
                Hashtable<String, String> stopData = new Hashtable<String, String>();
                stopData.put("description", rs.getString("name"));
                stopData.put("latitude", rs.getString("latitude"));
                stopData.put("longitude", rs.getString("longitude"));
                stops.put(rs.getString("busStopNo"), stopData);
            }

            con.close();

            return stops;
        } catch(Exception e){
            e.printStackTrace();


            System.out.println(e.getMessage());
            return null;
        }
    }
}