package com.amazonaws.lambda.busstops;

import java.util.*;

public class BusStopResult {
	boolean isBase64Encoded;
	int statusCode;
	Hashtable<String, String> headers;
	String body;
	
    public boolean getIsBase64Encoded() {
        return isBase64Encoded;
    }

    public void setIsBase64Encoded(boolean isBase64Encoded) {
        this.isBase64Encoded = isBase64Encoded;
    }
	
    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
	
    public Hashtable<String, String> getHeaders() {
        return headers;
    }

    public void setHeaders(Hashtable<String, String> headers) {
        this.headers = headers;
    }
	
    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public BusStopResult(boolean isBase64Encoded, int statusCode, Hashtable<String, String> headers, String body) {
    		this.isBase64Encoded = isBase64Encoded;
    		this.statusCode = statusCode;
    		this.headers = headers;
    		this.body = body;
    }
}
