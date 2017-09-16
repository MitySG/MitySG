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
	    		
	    		if (input.getBody().no == null || input.getBody().no.equals("ALL") || input.getBody().no.equals("")) {
	    			rs = stmt.executeQuery("select * from bus_stops"); 
	    		} else {
	    			rs = stmt.executeQuery("select * from bus_stops where list_no = "+input.getBody().no); 
	    		}
	    		
	    		Hashtable<String, String> headers = new Hashtable<String, String>();
	    		headers.put("Content-Type", "application/json");
	    		
	    		ArrayList<BusStop> stops = new ArrayList<BusStop>();
	    		
	    		while(rs.next())  
	    			stops.add(new BusStop(rs.getString("list_name"), rs.getString("list_no"), rs.getDouble("list_lat"), rs.getDouble("list_lng")));
	
	    		con.close();  

	    		Gson gson = new GsonBuilder().create();
	    		
	    		BusStopResult results = new BusStopResult(false, 200, headers, gson.toJson(stops));
	    		return results;
    		} catch(Exception e){ 
    			return null;
    		} 
    }

}
