package com.reservation.system.controller;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.system.dto.SeatBlockDto;
import com.reservation.system.service.SeatInfoService;

@CrossOrigin
@RestController
@RequestMapping("/tpfSoftware")
public class SeatInfoController {

	Logger log = LoggerFactory.getLogger(SeatInfoController.class);

	@Autowired
	SeatInfoService seatInfoService;

	@PostMapping("/updateCount")
	public String getCount(@RequestBody SeatBlockDto seatBlockInfo) {

		log.info("get Count method started");
		String seatUpdateInfo = seatInfoService.seatUpdateInfo(seatBlockInfo);
		log.info("get Count method ended");
		return seatUpdateInfo;
	}

	@GetMapping("/getDates")
	public List<String> getAvailableDate() {
		log.info("getAvailableDate method started");
		List<String> availableDates = seatInfoService.fetchAvailableDates();
		log.info("get getAvailableDate method ended");
		return availableDates;
	}
	@GetMapping("/getTotalCount")
	public Integer getTotalCount() {
		log.info("getTotalCount method started");
		Integer count = seatInfoService.fetchTotalCount();
		log.info("getTotalCount method ended");
		return count;
	}
 
	@PostMapping("/updateDates")
	public String updateDates(@RequestBody SeatBlockDto seatBlockInfo) {
		log.info("updateDates method started");
		seatInfoService.seatUpdateInfo(seatBlockInfo);
		return seatInfoService.datesUpdate(seatBlockInfo);
	}

	@GetMapping("/getGridData/{id}")
	public List<SeatBlockDto> getGridData(@PathVariable Integer id) {
		log.info("getGridData method started");
		return seatInfoService.getGridData(id);
	}

	@GetMapping("/getBookedDates/{id}")
	public List<LocalDate> getBookedDate(@PathVariable Integer id) {
		log.info("fetching user booked date method started");
		return seatInfoService.fetchBookedDates(id);
	}
//	@GetMapping("/enableMonths")
//	public List<LocalDate> enableMonthsforBooking() {
//		log.info("enable Months method started");
//		return seatInfoService.enableDates();
//	}
	
	@PostMapping("/selectAll")
	public String selectAll(@RequestBody SeatBlockDto seatBlockInfo) {
		seatInfoService.selectAll(seatBlockInfo.getEmployeeNumber());
		return  "Updated";
	}
	
	@PostMapping("/updateFoods")
	public String updateFoods(@RequestBody List<SeatBlockDto> seatBlockInfo) {
		
			return seatInfoService.saveFood(seatBlockInfo);
	}


}