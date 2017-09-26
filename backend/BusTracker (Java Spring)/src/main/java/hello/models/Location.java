package hello.models;

public class Location {
    public float lat, lon;

    public Location(float lat, float lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public boolean compare(Location loc) {
        System.out.println("A: "+lat+", "+lon+" - B: "+loc.lat+", "+loc.lon);
        return lat == loc.lat && lon == loc.lon;
    }
}
