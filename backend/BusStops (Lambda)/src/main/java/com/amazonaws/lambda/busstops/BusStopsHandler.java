package com.amazonaws.lambda.busstops;
import java.sql.*;  
import java.util.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class BusStopsHandler implements RequestHandler<ApiGatewayRequest, BusStopResult> {

    @Override
    public BusStopResult handleRequest(ApiGatewayRequest input, Context context) {
    		try{  
	    		Class.forName("com.mysql.jdbc.Driver");  
	    		Connection con=DriverManager.getConnection(  
	    		"jdbc:mysql://awsdb.chorl1j1nddl.ap-southeast-1.rds.amazonaws.com:3306/mydb","admin","Admin123");  
	    		Statement stmt=con.createStatement();  
	    		
	    		ResultSet rs; 
	    		
	    		String id = input.getQueryStringParameters().get("id");
	    		
	    		if (id == null) {
	    			rs = stmt.executeQuery("select * from bus_stops");
	    		} else {
	    			rs = stmt.executeQuery("select * from bus_stops WHERE list_no='"+id+"'");
	    		}
	    		
	    		Hashtable<String, String> headers = new Hashtable<String, String>();
	    		headers.put("Content-Type", "application/json");
	    		headers.put("Access-Control-Allow-Origin", "*");
	    		
	    		Hashtable<String, Hashtable<String, String>> stops = new Hashtable<String, Hashtable<String, String>>();
	    		
	    		//ArrayList<BusStop> stops = new ArrayList<BusStop>();
	    		
	    		while(rs.next())  {
	    			Hashtable<String, String> stopData = new Hashtable<String, String>();
	    			stopData.put("description", rs.getString("list_name"));
	    			stopData.put("latitude", rs.getString("list_lat"));
	    			stopData.put("longitude", rs.getString("list_lng"));
	    			stops.put(rs.getString("list_no"), stopData);
	    		}
	    		
	    		con.close();  

	    		Gson gson = new GsonBuilder().create();
	    		
	    		BusStopResult results = new BusStopResult(false, 200, headers, gson.toJson(stops));
	    		return results;
    		} catch(Exception e){ 
    			return null;
    		} 
    }

}
