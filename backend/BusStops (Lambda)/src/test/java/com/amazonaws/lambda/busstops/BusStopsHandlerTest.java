package com.amazonaws.lambda.busstops;

import java.io.IOException;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class BusStopsHandlerTest {

    private static ApiGatewayRequest input;

    @BeforeClass
    public static void createInput() throws IOException {
        // TODO: set up your sample input object here.
        input = null;
    }

    private Context createContext() {
        TestContext ctx = new TestContext();

        // TODO: customize your context here if needed.
        ctx.setFunctionName("Your Function Name");

        return ctx;
    }

    @Test
    public void testBusStopsHandler() {
        BusStopsHandler handler = new BusStopsHandler();
        Context ctx = createContext();

        BusStopResult output = handler.handleRequest(input, ctx);

    }
}
