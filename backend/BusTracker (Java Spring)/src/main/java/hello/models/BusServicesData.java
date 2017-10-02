package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusServicesData {
    private final String no;
    private final String name;
    private final String routes;
    private final String operator;

    public BusServicesData() {
        this.no = null;
        this.name = null;
        this.routes = null;
        this.operator = null;
    }

    public BusServicesData(String no, String name, String routes, String operator) {
        this.no = no;
        this.name = name;
        this.routes = routes;
        this.operator = operator;
    }

    public String getNo() {
        return no;
    }

    public String getName() {
        return name;
    }

    public String getRoutes() {
        return routes;
    }

    public String getOperator() {
        return operator;
    }
}
