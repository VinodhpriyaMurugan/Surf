package com.reservation.system.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.system.dto.SeatBlockDto;
import com.reservation.system.entity.SeatBlockInfo;
import com.reservation.system.entity.User;
import com.reservation.system.repository.SeatBlockRepository;
import com.reservation.system.repository.UserRepository;



@Service
public class SeatBlockServiceImpl implements SeatBlockService{
	
	@Autowired
	private SeatBlockRepository seatBlockRepo;
	
	@Autowired
	private UserRepository userRepository;
	

	@Override
	public void saveRequestDetails(SeatBlockDto seatBlockDto) {
		SeatBlockInfo seatBlockInfo = new SeatBlockInfo(seatBlockDto.getEmployeeNumber(),seatBlockDto.getDate(),seatBlockDto.getBreakfast(),seatBlockDto.getLunch(),seatBlockDto.getSnacks());
		seatBlockRepo.save(seatBlockInfo);		
	}


	@Override
	
	public List<SeatBlockDto> fetchEmployeeReport(LocalDate fromDate,LocalDate toDate) {
		List<SeatBlockDto> employeeDetails =  new ArrayList<>();		
		List<SeatBlockInfo> seatBlockDetails = seatBlockRepo.getDateValue(fromDate.toString(),toDate.toString());		
		for(SeatBlockInfo seatBlock:seatBlockDetails) {
		SeatBlockDto seatBlockDto = new SeatBlockDto(seatBlock.getEmployeeNumber(),seatBlock.getDate(),seatBlock.getBreakfast(),seatBlock.getLunch(),seatBlock.getSnacks());
		User userDetails = userRepository.findEmployeeByNum(seatBlockDto.getEmployeeNumber());
		seatBlockDto.setEmployeeName(userDetails.getEmployeeName());
		
		employeeDetails.add(seatBlockDto);
	}	
	return employeeDetails;
	}

}
