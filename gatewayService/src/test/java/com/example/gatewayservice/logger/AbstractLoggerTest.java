package com.example.gatewayservice.logger;

import com.example.gatewayservice.GatewayServiceApplication;
import org.junit.jupiter.api.Test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;



@SpringBootTest
public class AbstractLoggerTest {
    private final Logger logger = LoggerFactory.getLogger(GatewayServiceApplication.class);
    @Test
    public void contextLoads() {
        logger.info("     info");
        logger.error("     error");
    }
}
