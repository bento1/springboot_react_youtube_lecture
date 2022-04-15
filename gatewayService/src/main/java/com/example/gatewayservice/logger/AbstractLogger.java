package com.example.gatewayservice.logger;

import com.example.gatewayservice.GatewayServiceApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AbstractLogger {
    private final Logger logger = LoggerFactory.getLogger(GatewayServiceApplication.class);
    public void contextLoads() {
        logger.info("     info");
        logger.error("     error");
    }
}