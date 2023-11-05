package com.reservation.system.service;

import com.reservation.system.dto.JwtRequest;

public interface AuthenticationService 
{

	String getToken(JwtRequest jwtRequest) throws Exception;

}
