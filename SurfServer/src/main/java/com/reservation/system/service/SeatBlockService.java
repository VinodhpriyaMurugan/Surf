package com.reservation.system.service;

import java.time.LocalDate;
import java.util.List;

import com.reservation.system.dto.SeatBlockDto;


public interface SeatBlockService {

	void saveRequestDetails(SeatBlockDto seatBlockDto);

	List<SeatBlockDto> fetchEmployeeReport(LocalDate fromDate,LocalDate toDate);

}
