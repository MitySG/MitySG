package hello.models;

/**
 * Created by Jeremy on 27/9/17.
 */
public class PushRequest {
    private PushSubscription subscription;
    private String message;

    public PushRequest() {

    }

    public PushRequest(PushSubscription subscription, String message) {
        this.subscription = subscription;
        this.message = message;
    }

    public PushSubscription getSubscription() {
        return subscription;
    }

    public String getMessage() {
        return message;
    }
}
