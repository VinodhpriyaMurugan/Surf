package com.reservation.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.reservation.system.entity.Division;

@Repository
public interface DivisionRepository extends JpaRepository<Division, Integer>{
	
	@Query(value= "select * from division",nativeQuery = true)
	List<Division> getDivisionValues();
	
	@Query(value= "select * from division where division_name=?1",nativeQuery = true)
	Division findByDivisionName(String divisionName);

	
	
	

}
