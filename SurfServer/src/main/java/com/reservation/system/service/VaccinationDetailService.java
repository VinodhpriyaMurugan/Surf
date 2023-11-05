package com.reservation.system.service;

import com.reservation.system.dto.VaccinationDetailDto;

public interface VaccinationDetailService {

	void setVaccinationDetails(VaccinationDetailDto vaccinationDetailDto);

	
	void updateVaccineStatus(VaccinationDetailDto vaccinationDetailDto);

	VaccinationDetailDto setVaccinationDetails(String empNum);

}
