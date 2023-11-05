package com.reservation.system.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.reservation.system.entity.SeatInfo;

public interface SeatInfoRepository extends JpaRepository<SeatInfo, Integer> {

	@Query(value="select count from seat_info where date=?1",nativeQuery = true)
	int findBySeatCount(LocalDate date);

	@Query(value="select available_count from seat_info where date=?1",nativeQuery = true)
	int findByAvailableCount(LocalDate date);

	@Query(value="select seats_ocuupied from seat_info where date=?1",nativeQuery = true)
	int findBySeatsOcuupied(LocalDate date);

	@Modifying
	@Transactional
	@Query(value = "update seat_info set available_count =?1,seats_ocuupied=?2 where date =?3",nativeQuery = true)
	void updateSeatsCount(Integer availableCount,Integer occupied, LocalDate date);
	
	@Transactional
	@Query(value= "select date from seat_info where available_count = 0 Group By date",nativeQuery = true)
	List<String> findByAvailableCount();

	@Modifying
	@Transactional
	@Query(value= "update seat_info set available_count =?1,count=?1 where date =?2",nativeQuery = true)
	void updateSeatCount(Integer seatCount, LocalDate plusDays);

}
