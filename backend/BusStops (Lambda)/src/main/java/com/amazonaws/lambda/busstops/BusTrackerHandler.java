package com.amazonaws.lambda.busstops;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Hashtable;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;

public class BusTrackerHandler implements RequestHandler<ApiGatewayRequest, BusStopResult> {

    @Override
    public BusStopResult handleRequest(ApiGatewayRequest input, Context context) {
    		String startingStop = "17091";
    		String busService = "183";
    		String destinationStop = "17171";
    		
    		Gson gson = new Gson();
    		String result = "bad";

    		Hashtable<String, String> headers = new Hashtable<String, String>();
    		headers.put("Content-Type", "application/json");
    		
    		BusStopResult results = new BusStopResult(false, 200, headers, input.getQueryStringParameters().get("test"));
    		return results;
    }

}

