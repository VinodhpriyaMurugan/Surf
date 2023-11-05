package com.reservation.system.repository;

import java.time.LocalDate;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.reservation.system.entity.VaccinationDetail;

@Repository
public interface VaccinationDetailRepository extends JpaRepository<VaccinationDetail, Integer> {

	@Query(value= "select * from vaccination_detail where user_id = ?1",nativeQuery = true)
	VaccinationDetail getDetailsFromId(Integer id);

	@Transactional
	@Modifying
	@Query(value= "update vaccination_detail set first_dose = ?1, second_dose = ?2, vaccine_status = ?3 where user_id = ?4",nativeQuery = true)
	void updateVaccinationStatus(LocalDate firstDose, LocalDate secondDose, String vaccineStatus, Integer id);
	@Query(value="select * from vaccination_detail where user_id=?1",nativeQuery = true)
	VaccinationDetail findByUserId(Integer integer);

}
