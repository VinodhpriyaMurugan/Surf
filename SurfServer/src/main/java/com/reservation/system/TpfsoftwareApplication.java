package com.reservation.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
//@CrossOrigin(origins = {"*","https://reservation.tpfsoftware.com:80"})
public class TpfsoftwareApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(TpfsoftwareApplication.class, args);
	}
	  @Bean
	    public RestTemplate restTemplate(){
	        return new RestTemplate();
	    }
}
