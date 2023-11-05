package com.reservation.system.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.system.dto.ReportDto;
import com.reservation.system.entity.SeatBlockInfo;
import com.reservation.system.entity.SeatInfo;
import com.reservation.system.entity.User;
import com.reservation.system.repository.SeatBlockRepository;
import com.reservation.system.repository.SeatInfoRepository;
import com.reservation.system.repository.UserRepository;

@Service
public class SeatCountUpdateServiceImpl implements SeatCountUpdateService {
	@Autowired
	private SeatInfoRepository seatInfoRepository;

	@Autowired
	private SeatBlockRepository seatBlockRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	SeatInfoService seatInfoService;

	@Override
	public void setCount(LocalDate date, Integer seatCount) {
		List<SeatInfo> seatInfoList = seatInfoRepository.findAll();
		List<LocalDate> seatList = new ArrayList<LocalDate>();
		for (SeatInfo seatInfo : seatInfoList) {
			if(seatInfo.getDate().compareTo(date)>= 0 && seatInfo != null) {
				seatList.add(seatInfo.getDate());
			}
			
		}

		LocalDate finalDate = date.plusDays(90);
		long noOfDaysBetween = ChronoUnit.DAYS.between(date, finalDate);
		for (int i = 0; i < noOfDaysBetween; i++) {
			LocalDate plusDays = date.plusDays(i);
			if (!plusDays.getDayOfWeek().toString().equals("SATURDAY")) {
				if (!plusDays.getDayOfWeek().toString().equals("SUNDAY")) {
					
						if(seatList.contains(plusDays)){
							seatInfoRepository.updateSeatCount(seatCount,plusDays);
							
						}else {
							
							SeatInfo seatInfo = new SeatInfo(seatCount, plusDays, seatCount, 0);
							seatInfoRepository.save(seatInfo);
						}
					}

				}
			
		}

	}

	@Override
	public List<ReportDto> fetchEmployeeReport(LocalDate fromDate, LocalDate toDate) {
		List<ReportDto> employeeDetails = new ArrayList<>();
		List<SeatBlockInfo> seatBlockDetails = seatBlockRepository.getDateValue(fromDate.toString(), toDate.toString());

		for (SeatBlockInfo seatBlock : seatBlockDetails) {
			ReportDto reportDto = new ReportDto(seatBlock.getEmployeeNumber(), seatBlock.getDate(),
					seatBlock.getBreakfast(), seatBlock.getLunch(), seatBlock.getSnacks());
			User userDetails = userRepository.findEmployeeByNum(reportDto.getEmployeeNumber());
			reportDto.setEmployeeName(userDetails.getEmployeeName());
			reportDto.setCc(userDetails.getCc());

			employeeDetails.add(reportDto);
		}		
		return employeeDetails;
	}

	@Override
	public ReportDto retriveFoodCount(LocalDate fromDate, LocalDate toDate) {
		Integer brkfstCount = seatBlockRepository.getBrkfstCount(fromDate.toString(), toDate.toString());
		Integer lunchCount = seatBlockRepository.getLunchCount(fromDate.toString(), toDate.toString());
		Integer snacksCount = seatBlockRepository.getSnacksCount(fromDate.toString(), toDate.toString());
		ReportDto reportDto = new ReportDto();
		reportDto.setBreakfastCount(brkfstCount);
		reportDto.setLunchCount(lunchCount);
		reportDto.setSnacksCount(snacksCount);
		return reportDto;
	}
	
	@Override
	public void deleteBookedDates(String empId,LocalDate date) {
	seatBlockRepository.deleteBookedDate(empId,date);
	

	}

	@Override
	public void updateDeletedSeatCount(LocalDate date) {
		Integer occupiedSeat = getOccupiedCount(date) - 1;
		Integer availableSeat = getAvailableCount(date) + 1;
		seatInfoRepository.updateSeatsCount(availableSeat, occupiedSeat, date);
	}
	
	public Integer getAvailableCount(LocalDate date) {
		int availableCount = seatInfoRepository.findByAvailableCount(date);
		return availableCount;
	}

	public Integer getOccupiedCount(LocalDate date) {
		int occupied = seatInfoRepository.findBySeatsOcuupied(date);
		return occupied;
	}
}
