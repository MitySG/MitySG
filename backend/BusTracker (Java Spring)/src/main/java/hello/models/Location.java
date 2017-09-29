package hello.models;

public class Location {
    public double lat, lon;

    public Location(double lat, double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public boolean compare(Location loc) {
        System.out.println("A: "+lat+", "+lon+" - B: "+loc.lat+", "+loc.lon);
        return lat == loc.lat && lon == loc.lon;
    }
}
