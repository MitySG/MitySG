package com.amazonaws.lambda.busstops;

import java.util.Hashtable;

public class BusArrivalServices {
	String serviceNo;
	BusArrival NextBus;
	BusArrival NextBus2;
	BusArrival NextBus3;
	
	public String getServiceNo() {
		return serviceNo;
	}
	public void setServiceNo(String serviceNo) {
		this.serviceNo = serviceNo;
	}
	
	public BusArrival getNextBus() {
		return NextBus;
	}
	
	public void setNextBus(BusArrival nextBus) {
		NextBus = nextBus;
	}
	
	public BusArrival getNextBus2() {
		return NextBus2;
	}
	
	public void setNextBus2(BusArrival nextBus2) {
		NextBus2 = nextBus2;
	}
	
	public BusArrival getNextBus3() {
		return NextBus3;
	}
	
	public void setNextBus3(BusArrival nextBus3) {
		NextBus3 = nextBus3;
	}
	
	public BusArrivalServices(String serviceNo, BusArrival nextBus, BusArrival nextBus2, BusArrival nextBus3) {
		super();
		this.serviceNo = serviceNo;
		NextBus = nextBus;
		NextBus2 = nextBus2;
		NextBus3 = nextBus3;
	}
	
	public BusArrivalServices() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
