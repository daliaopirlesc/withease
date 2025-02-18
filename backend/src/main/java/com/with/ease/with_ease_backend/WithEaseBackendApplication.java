package com.with.ease.with_ease_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.with.ease.with_ease_backend.repositories")
public class WithEaseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WithEaseBackendApplication.class, args);
	}

}
