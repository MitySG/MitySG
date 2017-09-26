package com.amazonaws.lambda.busstops;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.*;  
import java.util.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class BusServiceHandler implements RequestHandler<ApiGatewayRequest, BusStopResult> {

    @Override
    public BusStopResult handleRequest(ApiGatewayRequest input, Context context) {

		Hashtable<String, String> headers = new Hashtable<String, String>();
		headers.put("Content-Type", "application/json");
		headers.put("Access-Control-Allow-Origin", "*");
		
		String no = input.getQueryStringParameters().get("no");
		
		if (no == null) {
			BusStopResult results = new BusStopResult(false, 200, headers, BusServiceData.data);
			return results;
		} else {
			try {
				HttpResponse<JsonNode> jsonResponse = Unirest.get("https://busrouter.sg/data/2/bus-services/"+ no +".json")
	                    .asJson();
				
				BusStopResult results = new BusStopResult(false, 200, headers, jsonResponse.getBody().toString());
				return results;
			} catch (Exception e) {
				BusStopResult results = new BusStopResult(false, 200, headers, BusServiceData.data);
				return results;
			}
		}
    }

}
