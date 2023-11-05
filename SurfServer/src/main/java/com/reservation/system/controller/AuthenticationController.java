package com.reservation.system.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.system.dto.JwtRequest;
import com.reservation.system.service.AuthenticationService;

@CrossOrigin
@RestController
@RequestMapping("/tpfSoftware")
public class AuthenticationController 
{
	Logger log = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@PostMapping("/login")
	public String authenticate(@RequestBody JwtRequest jwtRequest) throws Exception
	{
		log.info("Authenticate Method Started");
		log.debug("Request {}",jwtRequest);
		String token = authenticationService.getToken(jwtRequest);
		log.debug("Response {}",token);
		log.info("Authenticate Method Ended");
        return token;
        
    }
	
}

