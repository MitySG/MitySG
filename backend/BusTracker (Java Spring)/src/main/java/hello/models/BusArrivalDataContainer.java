package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Hashtable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusArrivalDataContainer {
    String serviceNo;
    BusArrivalData nextBus;
    BusArrivalData nextBus2;
    BusArrivalData nextBus3;

    public String getServiceNo() {
        return serviceNo;
    }
    public void setServiceNo(String serviceNo) {
        this.serviceNo = serviceNo;
    }

    public BusArrivalData getNextBus() {
        return nextBus;
    }

    public void setNextBus(BusArrivalData nextBus) {
        this.nextBus = nextBus;
    }

    public BusArrivalData getNextBus2() {
        return nextBus2;
    }

    public void setNextBus2(BusArrivalData nextBus2) {
        this.nextBus2 = nextBus2;
    }

    public BusArrivalData getNextBus3() {
        return nextBus3;
    }

    public void setNextBus3(BusArrivalData nextBus3) {
        this.nextBus3 = nextBus3;
    }

    public BusArrivalDataContainer(String serviceNo, BusArrivalData nextBus, BusArrivalData nextBus2, BusArrivalData nextBus3) {
        super();
        this.serviceNo = serviceNo;
        this.nextBus = nextBus;
        this.nextBus2 = nextBus2;
        this.nextBus3 = nextBus3;
    }

    public BusArrivalDataContainer() {

    }

}
