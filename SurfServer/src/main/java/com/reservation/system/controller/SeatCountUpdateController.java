package com.reservation.system.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.system.dto.ReportDto;
import com.reservation.system.dto.SeatBlockDto;
import com.reservation.system.entity.SeatInfo;
import com.reservation.system.service.SeatCountUpdateService;
import com.reservation.system.service.SeatInfoService;

@CrossOrigin
@RestController
@RequestMapping("/tpfSoftware")
public class SeatCountUpdateController {
	
	Logger log = LoggerFactory.getLogger(SeatCountUpdateController.class);

	@Autowired
	private SeatCountUpdateService seatCountUpdateService;
	
	@Autowired
	private SeatInfoService seatInfoService;

	@PostMapping("/seatCountUpdate")
	public void setSeatCount(@RequestBody SeatInfo seatInfo) {
		log.info("Seat Count update method started");
		seatCountUpdateService.setCount(seatInfo.getDate(), seatInfo.getSeatCount());
		log.info("Seat Count update method ended");

	}

	@PostMapping("/getReport")
	public List<ReportDto> getEmployeeReport(@RequestBody SeatBlockDto seatBlockDto) {
		log.debug("Request {}",seatBlockDto.getFromDate(),seatBlockDto.getToDate());
		List<ReportDto> userList = seatCountUpdateService.fetchEmployeeReport(seatBlockDto.getFromDate(),
				seatBlockDto.getToDate());
		log.debug("Response {}",userList);
		return userList;
	}

	@PostMapping("/getFoodCount")
	public ReportDto getFoodCount(@RequestBody SeatBlockDto seatBlockDto) {
		log.debug("Request {}",seatBlockDto.getFromDate(),seatBlockDto.getToDate());
		ReportDto count = seatCountUpdateService.retriveFoodCount(seatBlockDto.getFromDate(), seatBlockDto.getToDate());
		log.debug("Request {}",count);
		return count;
	}
	
	@PostMapping("/deleteDate")
	public String deleteCheckedDates(@RequestBody SeatBlockDto seatBlockInfo) {
	log.info("updateDates method started");
	seatCountUpdateService.deleteBookedDates(seatBlockInfo.getEmployeeNumber(),seatBlockInfo.getDate());
	seatCountUpdateService.updateDeletedSeatCount(seatBlockInfo.getDate());
	return "Date deleted Successfully";
	

	}

}
