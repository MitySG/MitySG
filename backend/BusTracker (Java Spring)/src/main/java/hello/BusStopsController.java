package hello;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Hashtable;

@RestController
public class BusStopsController {

    @RequestMapping("/busStops")
    public Hashtable<String, Hashtable<String, String>> busServices() {
        return getBusStopAPI("select * from bus_stops");
    }

    @RequestMapping("/busStops/{no}")
    public Hashtable<String, Hashtable<String, String>> busServices(@PathVariable(value="no") String no) {
        return getBusStopAPI("select * from bus_stops WHERE list_no='"+no+"'");
    }

    public Hashtable<String, Hashtable<String, String>> getBusStopAPI(String sql) {
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            String dbPW = System.getenv("DB_PASSWORD");
            Connection con= DriverManager.getConnection(
                    "jdbc:mysql://awsdb.chorl1j1nddl.ap-southeast-1.rds.amazonaws.com:3306/mydb","admin",dbPW);
            Statement stmt=con.createStatement();

            ResultSet rs = stmt.executeQuery(sql);

            Hashtable<String, String> headers = new Hashtable<String, String>();
            headers.put("Content-Type", "application/json");
            headers.put("Access-Control-Allow-Origin", "*");

            Hashtable<String, Hashtable<String, String>> stops = new Hashtable<String, Hashtable<String, String>>();

            while(rs.next())  {
                Hashtable<String, String> stopData = new Hashtable<String, String>();
                stopData.put("description", rs.getString("list_name"));
                stopData.put("latitude", rs.getString("list_lat"));
                stopData.put("longitude", rs.getString("list_lng"));
                stops.put(rs.getString("list_no"), stopData);
            }

            con.close();

            return stops;
        } catch(Exception e){

            System.out.println(e.getMessage());
            return null;
        }
    }
}