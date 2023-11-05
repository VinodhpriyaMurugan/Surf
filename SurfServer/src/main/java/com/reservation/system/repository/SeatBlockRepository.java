package com.reservation.system.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.reservation.system.entity.SeatBlockInfo;

public interface SeatBlockRepository extends JpaRepository<SeatBlockInfo, Integer> {

	@Query(value = "select * from seat_block_info where dates between ?1 and ?2 ", nativeQuery = true)
	List<SeatBlockInfo> getDateValue(String fromDate, String toDate);

	@Query(value = "select count(*) from seat_block_info where dates between ?1 and ?2 AND breakfast = 'breakfast'", nativeQuery = true)
	Integer getBrkfstCount(String fromDate, String toDate);

	@Query(value = "select count(*) from seat_block_info where dates between ?1 and ?2 AND lunch = 'lunch'", nativeQuery = true)
	Integer getLunchCount(String fromDate, String toDate);

	@Query(value = "select count(*) from seat_block_info where dates between ?1 and ?2 AND snacks = 'snacks'", nativeQuery = true)
	Integer getSnacksCount(String fromDate, String toDate);


	@Query(value ="select * from seat_block_info where employee_number =?1",nativeQuery = true)
	List<SeatBlockInfo> findByEmployeeNumber(Integer id);

	
	@Transactional
	@Modifying
	@Query(value= "update seat_block_info set breakfast = ?1, lunch = ?2,snacks = ?3 where employee_number = ?4 AND dates=?5",nativeQuery = true)
	void updateFood(String breakfast, String lunch, String snacks, String employeeNumber,LocalDate date);
	
	@Transactional
	@Modifying
	@Query(value= "update seat_block_info set breakfast = ?1, lunch = ?2,snacks = ?3 where employee_number = ?4 ",nativeQuery = true)
	void selectAllUpdate(String breakfast, String lunch, String snacks, String employeeNumber);

	@Query(value ="select * from seat_block_info where dates =?1 AND employee_number=?2",nativeQuery = true)
	SeatBlockInfo getFoodValues(LocalDate date,Integer employeeNumber);

	@Query(value ="select dates from seat_block_info where employee_number = ?1 AND dates>=?2",nativeQuery = true)
	List<Date> findEmployeeBlockedDates(String employeeNumber, LocalDate localDate);

	@Transactional
	@Modifying
	@Query(value= "delete from seat_block_info where employee_number = ?1 AND dates=?2",nativeQuery = true)
	void deleteBookedDate(String empId,LocalDate date);

	



}
