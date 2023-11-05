package com.reservation.system.service;

import java.time.LocalDate;
import java.util.List;

import com.reservation.system.dto.SeatBlockDto;
import com.reservation.system.entity.SeatInfo;

public interface SeatInfoService {
	
	List<String> fetchAvailableDates();

	String seatUpdateInfo(SeatBlockDto seatBlockInfo);
	
	String datesUpdate(SeatBlockDto seatBlockInfo);

	List<SeatBlockDto> getGridData(Integer id);

//	String saveFood(SeatBlockDto seatBlockInfo);

	SeatBlockDto getFoodValues(LocalDate date, Integer employeeNumber);

	List<LocalDate> fetchBookedDates(Integer id);

	Integer fetchTotalCount();

	List<SeatInfo> getUpdatedDates();

	void selectAll(String empID);

	String saveFood(List<SeatBlockDto> seatBlockInfo);

//	List<LocalDate> enableDates();

	

}
