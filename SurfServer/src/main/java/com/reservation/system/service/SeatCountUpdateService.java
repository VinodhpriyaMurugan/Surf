package com.reservation.system.service;

import java.time.LocalDate;
import java.util.List;

import com.reservation.system.dto.ReportDto;

public interface SeatCountUpdateService {

	void setCount(LocalDate date, Integer seatCount);
	
	List<ReportDto> fetchEmployeeReport(LocalDate fromDate,LocalDate toDate);

	ReportDto retriveFoodCount(LocalDate fromDate, LocalDate toDate);

	void deleteBookedDates(String employeeNumber, LocalDate date);

	void updateDeletedSeatCount(LocalDate date);

}
