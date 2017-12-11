package hello;

import java.sql.DriverManager;
import java.sql.Connection;

public class DBConnection {
    private static String USER = System.getenv("DB_USER");
    private static String PASSWORD = System.getenv("DB_PASSWORD");
    private static String PORT = System.getenv("MYSQL_PORT");
    private static String URL = System.getenv("MYSQL_URL");

    public static Connection getConnection() throws Exception {
        return DriverManager.getConnection("jdbc:mysql://" +  URL + ":" + PORT + "/mitysg", USER, PASSWORD);
    }
}