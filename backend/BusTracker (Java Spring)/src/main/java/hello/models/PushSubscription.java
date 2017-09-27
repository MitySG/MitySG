package hello.models;

import java.util.Map;

/**
 * Created by Jeremy on 27/9/17.
 */
public class PushSubscription {
    private String endpoint;
    private String expirationTime;
    private Map<String, String> keys;

    public PushSubscription() {
    }

    public PushSubscription(String endpoint, String expirationTime, Map<String, String> keys) {
        this.endpoint = endpoint;
        this.expirationTime = expirationTime;
        this.keys = keys;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public String getExpirationTime() {
        return expirationTime;
    }

    public Map<String, String> getKeys() {
        return keys;
    }
}
