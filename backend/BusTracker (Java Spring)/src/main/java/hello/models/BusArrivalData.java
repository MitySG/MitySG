package hello.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusArrivalData {
    String originCode;
    String destinationCode;
    String estimatedArrival;
    float latitude;
    float longitude;
    public String getOriginCode() {
        return originCode;
    }
    public void setOriginCode(String originCode) {
        this.originCode = originCode;
    }
    public String getDestinationCode() {
        return destinationCode;
    }
    public void setDestinationCode(String destinationCode) {
        this.destinationCode = destinationCode;
    }
    public int getEstimatedWait() {
        ZonedDateTime currentTime = ZonedDateTime.now();
        ZonedDateTime arrivalTime = getEstimatedArrival();

        return (int) java.time.Duration.between(currentTime, arrivalTime).toMinutes();
    }
    public ZonedDateTime getEstimatedArrival() {
        return ZonedDateTime.parse(estimatedArrival, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
    public void setEstimatedArrival(String estimatedArrival) {
        this.estimatedArrival = estimatedArrival;
    }
    public float getLatitude() {
        return latitude;
    }
    public void setLatitude(String latitude) {
        if (latitude.equals("")) {
            this.latitude = 0;
        } else {
            this.latitude = Float.parseFloat(latitude);
        }
    }
    public float getLongitude() {
        return this.longitude;
    }

    public void setLongitude(String longitude) {
        if (longitude.equals("")) {
            this.longitude = 0;
        } else {
            this.longitude = Float.parseFloat(longitude);
        }

    }

    public Location getLocation() {
        return new Location(latitude, longitude);
    }

    public BusArrivalData(String originCode, String destinationCode, String estimatedArrival, String latitude,
                      String longitude) {
        super();
        this.originCode = originCode;
        this.destinationCode = destinationCode;
        this.estimatedArrival = estimatedArrival;
        setLatitude(latitude);
        setLongitude(longitude);
    }

    public BusArrivalData() {

    }
}
