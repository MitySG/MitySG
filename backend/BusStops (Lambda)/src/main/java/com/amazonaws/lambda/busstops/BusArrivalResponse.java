package com.amazonaws.lambda.busstops;

import java.util.ArrayList;
import java.util.List;

public class BusArrivalResponse {
	String BusStopCode;
	List<BusArrivalServices> Services;
	
	public String getBusStopCode() {
		return BusStopCode;
	}
	
	public void setBusStopCode(String busStopCode) {
		BusStopCode = busStopCode;
	}
	
	public BusArrivalServices getServices() {
		return Services.get(0);
	}
	
	public void setServices(ArrayList<BusArrivalServices> services) {
		Services = services;
	}
	
	public BusArrivalResponse(String busStopCode, ArrayList<BusArrivalServices> services) {
		super();
		BusStopCode = busStopCode;
		Services = services;
	}
	
	public BusArrivalResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
