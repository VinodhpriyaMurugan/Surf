package com.reservation.system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.system.dto.VaccinationDetailDto;
import com.reservation.system.entity.User;
import com.reservation.system.entity.VaccinationDetail;
import com.reservation.system.repository.UserRepository;
import com.reservation.system.repository.VaccinationDetailRepository;

@Service
public class VaccinationDetailServiceImpl implements VaccinationDetailService
{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private VaccinationDetailRepository vaccinationDetailRepository;
	
	@Override
	public void setVaccinationDetails(VaccinationDetailDto vaccinationDetailDto) 
	{
		User userDetails = userRepository.findEmployeeByNum(vaccinationDetailDto.getEmployeeNumber());
		VaccinationDetail vaccinationDetail = new VaccinationDetail(vaccinationDetailDto.getVaccineStatus(),vaccinationDetailDto.getFirstDose(),vaccinationDetailDto.getSecondDose(),vaccinationDetailDto.getNextDose(),userDetails);
		vaccinationDetailRepository.save(vaccinationDetail);
		
	}

	@Override
	public VaccinationDetailDto setVaccinationDetails(String empNum) {
		
		User userDetails = userRepository.findEmployeeByNum(empNum);
		VaccinationDetail vaccineInfo = vaccinationDetailRepository.getDetailsFromId(userDetails.getId());
		if(vaccineInfo == null)
		{
			return null;
		}
		else
		{
			VaccinationDetailDto vaccineInfoDto = new VaccinationDetailDto(empNum,vaccineInfo.getVaccineStatus(),vaccineInfo.getFirstDose(),vaccineInfo.getSecondDose(),vaccineInfo.getNextDose());
			return vaccineInfoDto;
			
		}
	}

	@Override
	public void updateVaccineStatus(VaccinationDetailDto vaccinationDetailDto) {
		User userDetails = userRepository.findEmployeeByNum(vaccinationDetailDto.getEmployeeNumber());
		VaccinationDetail vaccinationDetail  = vaccinationDetailRepository.findByUserId(userDetails.getId());			
		if(vaccinationDetail!=null) {		
		vaccinationDetailRepository.updateVaccinationStatus(vaccinationDetailDto.getFirstDose(),vaccinationDetailDto.getSecondDose(),vaccinationDetailDto.getVaccineStatus(),userDetails.getId());
	}
		else {
			VaccinationDetail vaccineDetail = new VaccinationDetail(vaccinationDetailDto.getVaccineStatus(),vaccinationDetailDto.getFirstDose(),vaccinationDetailDto.getSecondDose(),null,userDetails);
			vaccinationDetailRepository.save(vaccineDetail);
		}
		}
	

}
