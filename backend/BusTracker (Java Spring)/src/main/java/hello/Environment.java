package hello;

import java.sql.DriverManager;
import java.sql.Connection;

public class Environment {
    private static String USER = System.getenv("MYSQL_USER");
    private static String PASSWORD = System.getenv("MYSQL_PASSWORD");
    private static String PORT = System.getenv("MYSQL_PORT");
    private static String URL = System.getenv("MYSQL_HOST");

    public static String GOOGLE_MAPS_API_KEY = System.getenv("GOOGLE_MAPS_API_KEY");

    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection("jdbc:mysql://" +  URL + ":" + PORT + "/mitysg", USER, PASSWORD);
    }
}
