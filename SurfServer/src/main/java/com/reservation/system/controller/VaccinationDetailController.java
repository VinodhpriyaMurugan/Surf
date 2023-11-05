package com.reservation.system.controller;

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

import com.reservation.system.dto.VaccinationDetailDto;
import com.reservation.system.service.VaccinationDetailService;

@CrossOrigin
@RestController
@RequestMapping("/tpfSoftware")
public class VaccinationDetailController {
	
	Logger log = LoggerFactory.getLogger(VaccinationDetailController.class);
	
	@Autowired
	private VaccinationDetailService vaccinationDetailService;
	
	
	@PostMapping("/setVaccineStatus")
	public void setVaccineStatus(@RequestBody VaccinationDetailDto vaccinationDetailDto) {
		log.info("setVaccineStatus method started");
		vaccinationDetailService.setVaccinationDetails(vaccinationDetailDto);
		log.info("setVaccineStatus method ended");
	}
	
	@PostMapping("/updateVaccineStatus")
	public void updateVaccineStatus(@RequestBody VaccinationDetailDto vaccinationDetailDto) {
		log.info("updateVaccineStatus method started");
		vaccinationDetailService.updateVaccineStatus(vaccinationDetailDto);
		log.info("updateVaccineStatus method ended");
	}
	
	@GetMapping("/retriveVaccineStatus/{empNum}")
	public VaccinationDetailDto getUserById(@PathVariable String empNum){
		log.info("getUserById method started");
		VaccinationDetailDto setVaccinationDetails = vaccinationDetailService.setVaccinationDetails(empNum);
		log.info("getUserById method ended");
		return setVaccinationDetails;
		
	}

}
