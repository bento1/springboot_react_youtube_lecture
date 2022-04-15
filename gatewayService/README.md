SPRING CLOUD GATE & LOGERBACK 을 이용한 Rest api request db저장




# SpringCloudGate 설정정보
 
[https://twofootdog.tistory.com/64](https://twofootdog.tistory.com/64)

[https://wonit.tistory.com/497](https://wonit.tistory.com/497)

```yaml
server:
  port: 8081
#---
#eureka:
#client:
#  register-with-eureka: false
#  fetch-registry: false
#  service-url:
#  defaultZone: http://localhost:8761/eureka
---
spring:
  application:
    name: gatewayService
  cloud:
    gateway:
      routes:
        - id: first-service
          uri: http://localhost:8080/
          predicates: #조건절
            - Path=/api/**
            - id: first-service
#    uri: http://localhost:8082/
#    predicates: #조건절
#      - Path=/second-service/**
  datasource:
    url:jdbc:mysql://localhost:3306/employee_management_system?useSSL=false
    username:user
    password:1234
    driver-class-name:com.mysql.cj.jdbc.Driver
  jpa:
    properties:
      hibernate:
        dialect:
          org.hibernate.dialect.MySQL8Dialect
        ddl-auto:
          update

```

```xml

```

게이트웨이 구성을 위한 서비스 함수

```xml
import lombok.Data;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class GlobalFilter extends AbstractGatewayFilterFactory<GlobalFilter.Config> {
    private static final Logger logger = LogManager.getLogger(GlobalFilter.class);
    public GlobalFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            logger.info("GlobalFilter baseMessage>>>>>>" + config.getBaseMessage());
            if (config.isPreLogger()) {
                logger.info("GlobalFilter Start>>>>>>" + exchange.getRequest());
            }
            return chain.filter(exchange).then(Mono.fromRunnable(()->{
                if (config.isPostLogger()) {
                    logger.info("GlobalFilter End>>>>>>" + exchange.getResponse());
                }
            }));
        });
    }

    @Data
    public static class Config {
        private String baseMessage;
        private boolean preLogger;
        private boolean postLogger;
    }
}
```

위 코드에 대해 간단히 설명하자면

- AbstractGatewayFilterFactory : Gateway를 구현하기 위해서는 GatewayFilterFactory를 구현해야 하며, 상속할 수 있는 추상 클래스가 바로 AbstractGatewayFilterFactory이다.
- exchange : 서비스 요청/응답값을 담고있는 변수로, 요청/응답값을 출력하거나 변환할 때 사용한다. 요청값은 **(exchange, chain) ->** 구문 이후에 얻을 수 있으며, 서비스로부터 리턴받은 응답값은 **Mono.fromRunnable(()->** 구문 이후부터 얻을 수 있다.
- config : application.yml에 선언한 각 filter의 args(인자값) 사용을 위한 클래스

---

간단하게 해결이 가능합니다.

m1 macos를 위한 netty-resolver-dns 종속성을 추가하면 되는데요..

`implementation 'io.netty:netty-resolver-dns-native-macos:4.1.68.Final:osx-aarch_64'` 이 구문을 build.gradle에 추가해줍시다.

그럼 해결!

[https://velog.io/@kshired/MacOS-M1-Chip-Spring-Cloud-Gateway-에러-해결법](https://velog.io/@kshired/MacOS-M1-Chip-Spring-Cloud-Gateway-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EB%B2%95)

# logback 설정 

[https://intrepidgeeks.com/tutorial/implementation-of-springboot-logback-logging-in-database](https://intrepidgeeks.com/tutorial/implementation-of-springboot-logback-logging-in-database)

dependency 추가

[https://hello-bryan.tistory.com/332](https://hello-bryan.tistory.com/332)

```xml
// slf4j & logback
implementation('org.slf4j:jcl-over-slf4j')
implementation('ch.qos.logback:logback-classic')
```

src/main/resources 위치에

logback-spring.xml  파일 생성

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <springProperty name="driverClass" source="spring.datasource.driver-class-name"/>
    <springProperty name="url" source="spring.datasource.url"/>
    <springProperty name="user" source="spring.datasource.username"/>
    <springProperty name="password" source="spring.datasource.password"/>

    <appender name="DB" class="com.test.package.util.logback.LogDBAppender">
        <connectionSource class="ch.qos.logback.core.db.DriverManagerConnectionSource">
            <driverClass>${driverClass}</driverClass>
            <url>${url}</url>
            <user>${user}</user>
            <password>${password}</password>
        </connectionSource>
    </appender>
</configuration>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c93b8de-0631-4043-b6f0-8240a0d47a63/Untitled.png)

*dependency error

logback에  잠시 dbappender가 사라짐. 버전 1.2.7로 고정

`ext{set('logback.version','1.2.7')}`

[https://stackoverflow.com/questions/70626868/logback-classic-1-2-8-dbappender-missing](https://stackoverflow.com/questions/70626868/logback-classic-1-2-8-dbappender-missing)

dbappender에  아래로 바꿔주고

`<dataSource class="org.apache.commons.dbcp2.BasicDataSource">`

build.gradle 에 아래 추가해줌

`implementation group: 'org.apache.commons', name: 'commons-dbcp2', version: '2.9.0'`

ㅌ
