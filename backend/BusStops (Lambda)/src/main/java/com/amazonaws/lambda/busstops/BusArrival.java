package com.amazonaws.lambda.busstops;

import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class BusArrival {
	String OriginCode;
	String DestinationCode;
	String EstimatedArrival;
	Double Latitude;
	Double Longitude;
	public String getOriginCode() {
		return OriginCode;
	}
	public void setOriginCode(String originCode) {
		OriginCode = originCode;
	}
	public String getDestinationCode() {
		return DestinationCode;
	}
	public void setDestinationCode(String destinationCode) {
		DestinationCode = destinationCode;
	}
	public int getEstimatedWait() {
		ZonedDateTime currentTime = ZonedDateTime.now();
		ZonedDateTime arrivalTime = getEstimatedArrival();
		
		return (int) java.time.Duration.between(currentTime, arrivalTime).toMinutes();
	}
	public ZonedDateTime getEstimatedArrival() {
		return ZonedDateTime.parse(EstimatedArrival, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
	}
	public void setEstimatedArrival(String estimatedArrival) {
		EstimatedArrival = estimatedArrival;
	}
	public Double getLatitude() {
		return Latitude;
	}
	public void setLatitude(String latitude) {
		if (latitude.equals("")) {
			Latitude = null;
		} else {
			Latitude = Double.parseDouble(latitude);
		}
	}
	public Double getLongitude() {
		return Longitude;
	}
	
	public void setLongitude(String longitude) {
		if (longitude.equals("")) {
			Longitude = null;
		} else {
			Longitude = Double.parseDouble(longitude);
		}
		
	}
	
	public BusArrival(String originCode, String destinationCode, String estimatedArrival, String latitude,
			String longitude) {
		super();
		OriginCode = originCode;
		DestinationCode = destinationCode;
		EstimatedArrival = estimatedArrival;
		setLatitude(latitude);
		setLongitude(longitude);
	}
	
	public BusArrival() {
		super();
		// TODO Auto-generated constructor stub
	}
}
