package hello;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@RestController
public class TrainStationController {

    /*@RequestMapping("/trainStationsOLD")
    public Map<String, StationData> stationsOLD() {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines( Paths.get("./MRT-Stations.json"), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
            String serviceRawData = contentBuilder.toString();

            StationDataContainer response = new ObjectMapper().readValue(serviceRawData, StationDataContainer.class);


            return response.getStations();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            System.out.println(e.getMessage());

            return null;
        }
    }*/

    @RequestMapping("/trainStations")
    public Map<String, StationData> stations() {
        return getStationAPI("select * from stations").getStations();
    }

    @RequestMapping("/trainStations/{name}")
    public Map<String, StationData> stations(@PathVariable(value="name") String name) {
        return getStationAPI("select * from stations WHERE name=\""+ name.replace('+', ' ') +"\"").getStations();
    }

    public StationDataContainer getStationAPI(String sql) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            String dbPW = System.getenv("DB_PASSWORD");
            Connection con= DriverManager.getConnection(
                    "jdbc:mysql://awsdb.chorl1j1nddl.ap-southeast-1.rds.amazonaws.com:3306/mydb","admin",dbPW);
            Statement stmt=con.createStatement();

            ResultSet rs = stmt.executeQuery(sql);

            StationDataContainer dataCon = new StationDataContainer();

            while(rs.next())  {
                StationData data = new StationData(rs.getString("place_id"), rs.getDouble("latitude"), rs.getDouble("longitude"));
                dataCon.addStation(rs.getString("name"), data);
            }

            con.close();

            return dataCon;
        } catch(Exception e){

            System.out.println(e.getMessage());
            return null;
        }
    }
}
