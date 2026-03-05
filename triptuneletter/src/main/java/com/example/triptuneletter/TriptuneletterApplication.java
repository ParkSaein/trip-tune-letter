package com.example.triptuneletter;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TriptuneletterApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing() // .env 파일이 없어도 무시 (실운영 서버 환경 고려)
                .load();

        // 2. .env의 모든 항목을 System Property로 자동 등록
        // 이렇게 하면 Spring Boot의 @Value나 application.yml에서 환경 변수처럼 사용 가능합니다.
        for (DotenvEntry entry : dotenv.entries()) {
            System.setProperty(entry.getKey(), entry.getValue());
        }
        SpringApplication.run(TriptuneletterApplication.class, args);
    }

}
