package com.reservation.system.dto;

public class JwtResponce 
{
	private String jwtToken;

	public JwtResponce() {
		super();
	}

	public JwtResponce(String jwtToken) {
		super();
		this.jwtToken = jwtToken;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
	
	
	

}
