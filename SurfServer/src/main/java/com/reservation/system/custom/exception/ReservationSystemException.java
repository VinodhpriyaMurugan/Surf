package com.reservation.system.custom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ReservationSystemException extends RuntimeException 
{
	private String errorCode;
	private String errorMsg;
	
	public ReservationSystemException() {
		super();
	}

	public ReservationSystemException(String errorCode, String errorMsg) {
		super();
		this.errorCode = errorCode;
		this.errorMsg = errorMsg;
	}
		  
	


}