package com.reservation.system.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservation.system.dto.SeatBlockDto;
import com.reservation.system.entity.SeatBlockInfo;
import com.reservation.system.entity.SeatInfo;
import com.reservation.system.repository.SeatBlockRepository;
import com.reservation.system.repository.SeatInfoRepository;

@Service
public class SeatInfoServiceImpl implements SeatInfoService {

	@Autowired
	private SeatInfoRepository seatInfoRepository;

	@Autowired
	private SeatBlockService seatBlockService;

	@Autowired
	private SeatBlockRepository seatBlockRepo;

	@Override
	public String seatUpdateInfo(SeatBlockDto seatBlockDto) {
		List<LocalDate> fromdate = seatBlockDto.getDatesList();
		for (LocalDate dateValue : fromdate) {
			
			int count = getSeatCount(dateValue);
			int occupied = getOccupiedCount(dateValue) + 1;
			int availableCount = count - occupied;
			updateSeats(availableCount, occupied, dateValue);

		}

		return "count updated";
	}

	public int getSeatCount(LocalDate date) {
		int totalCount = seatInfoRepository.findBySeatCount(date);
		return totalCount;
	}

	public int getAvailableCount(LocalDate date) {
		int availableCount = seatInfoRepository.findByAvailableCount(date);
		return availableCount;
	}

	public int getOccupiedCount(LocalDate date) {
		int occupied = seatInfoRepository.findBySeatsOcuupied(date);
		return occupied;
	}

	public void updateSeats(Integer availableCount, Integer occupied, LocalDate date) {

		seatInfoRepository.updateSeatsCount(availableCount, occupied, date);
	}

	@Override
	public List<String> fetchAvailableDates() {

		List<String> dates = seatInfoRepository.findByAvailableCount();

		return dates;
	}

	@Override
	public String datesUpdate(SeatBlockDto seatBlockDto) {
		List<Date> employeeBlockedDates = seatBlockRepo.findEmployeeBlockedDates(seatBlockDto.getEmployeeNumber(),LocalDate.now());
		List<LocalDate> listDate = seatBlockDto.getDatesList();
		List<LocalDate> saveDate = new ArrayList<LocalDate>();
		for (LocalDate addedDate : listDate) {
			
			if(!employeeBlockedDates.toString().contains(addedDate.toString())) {
				
				saveDate.add(addedDate);
				
			}
		}
		for (LocalDate date : saveDate) {
			SeatBlockInfo seatBlockInfo = new SeatBlockInfo(seatBlockDto.getEmployeeNumber(), date, null, null, null);
			seatBlockRepo.save(seatBlockInfo);
		}
		return "count updated";
	}

	@Override
	public List<SeatBlockDto> getGridData(Integer id) {
		List<SeatBlockDto> seatBlockDto = new ArrayList<>();
		List<SeatBlockInfo> seatInfo = seatBlockRepo.findByEmployeeNumber(id);
		LocalDate currentDate = LocalDate.now();
		for (SeatBlockInfo seatBlockInfo : seatInfo) {
			if (seatBlockInfo.getDate().compareTo(currentDate) >= 0) {
				 
				SeatBlockDto seatBlock = new SeatBlockDto(seatBlockInfo.getEmployeeNumber(), seatBlockInfo.getDate(),
						seatBlockInfo.getBreakfast(), seatBlockInfo.getLunch(), seatBlockInfo.getSnacks());
				seatBlockDto.add(seatBlock);
			}
		}
		
		List<SeatBlockDto> sortedList =
                seatBlockDto.stream().sorted(Comparator.comparing(SeatBlockDto::getDate)).collect(Collectors.toList());
		return sortedList;
	}

//	@Override
//	public String saveFood(SeatBlockDto seatBlockDto) {
//
//		seatBlockRepo.updateFood(seatBlockDto.getBreakfast(), seatBlockDto.getLunch(), seatBlockDto.getSnacks(),
//				seatBlockDto.getEmployeeNumber(), seatBlockDto.getDate());
//
//		return "food Updated sucessfully";
//	}

	@Override
	public SeatBlockDto getFoodValues(LocalDate date, Integer employeeNumber) {
		SeatBlockInfo seatBlockInfo = seatBlockRepo.getFoodValues(date, employeeNumber);
		SeatBlockDto sb = new SeatBlockDto(seatBlockInfo.getEmployeeNumber(), seatBlockInfo.getDate(),
				seatBlockInfo.getBreakfast(), seatBlockInfo.getLunch(), seatBlockInfo.getSnacks());
		return sb;
	}

	@Override
	public List<LocalDate> fetchBookedDates(Integer id) {
	List<SeatBlockInfo> seatInfo = seatBlockRepo.findByEmployeeNumber(id);
	List<LocalDate> bDates = new ArrayList<>();
	for(SeatBlockInfo bookedDates: seatInfo) {
	if(bookedDates.getDate().compareTo(LocalDate.now())>0) {
	bDates.add(bookedDates.getDate());
	}
	}
	return bDates;
	}

	@Override
	public Integer fetchTotalCount() {
		
		LocalDate currentDate = LocalDate.now();
		return getSeatCount(currentDate);
	}

	@Override
	public List<SeatInfo> getUpdatedDates() {
		List<SeatInfo> updatedDates = seatInfoRepository.findAll();
		return updatedDates;
	}

	@Override
	public void selectAll(String employeeNumber) {
		SeatBlockInfo userValues = new SeatBlockInfo();
		userValues.setBreakfast("breakfast");
		userValues.setLunch("lunch");
		userValues.setSnacks("snacks");
		userValues.setEmployeeNumber(employeeNumber);
		seatBlockRepo.selectAllUpdate(userValues.getBreakfast(), userValues.getLunch(), userValues.getSnacks(), userValues.getEmployeeNumber());
	}

	@Override
	public String saveFood(List<SeatBlockDto> seatBlockDto) {
		for(SeatBlockDto foodValues:seatBlockDto) {
			seatBlockRepo.updateFood(foodValues.getBreakfast(), foodValues.getLunch(), foodValues.getSnacks(),
					foodValues.getEmployeeNumber(), foodValues.getDate());

		}
		return "food Updated sucessfully";
	}



}
