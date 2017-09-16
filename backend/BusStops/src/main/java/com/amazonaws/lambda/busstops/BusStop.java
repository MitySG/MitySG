package com.amazonaws.lambda.busstops;

public class BusStop {
	String name;
	String no;
	double lat;
	double lng;
	
	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNo() {
        return no;
    }
    
    public void setNo(String no) {
        this.no = no;
    }
	
	public double getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = Double.parseDouble(lat);
    }
	
	public double getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = Double.parseDouble(lng);
    }

    public BusStop(String name, String no, double lat, double lng) {
        this.name = name;
        this.no = no;
        this.lat = lat;
        this.lng = lng;
    }
    
    public BusStop(String name, String no, String lat, String lng) {
        setName(name);
        setNo(no);
        setLat(lat);
        setLng(lng);
    }

    public BusStop() {
    }
}
