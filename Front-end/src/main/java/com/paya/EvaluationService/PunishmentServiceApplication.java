package com.Reihan.EvaluationService;


import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
@EnableFeignClients
@EnableScheduling
public class EvaluationServiceApplication {

    public static void main(String[] args) {
        final Map env = Dotenv.load().entries().stream().collect(Collectors.toMap(DotenvEntry::getKey, DotenvEntry::getValue));
        (new SpringApplicationBuilder(EvaluationServiceApplication.class)).environment(new StandardEnvironment() {
            protected void customizePropertySources(MutablePropertySources propertySources) {
                super.customizePropertySources(propertySources);
                propertySources.addFirst(new MapPropertySource("dotenvProperties", env));
            }
        }).run(args);
    }
}
