package com.reservation.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.reservation.system.entity.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer>{
	
	@Query(value= "select * from branch where division_id = ?1",nativeQuery = true)
	List<Branch> getBranchValues(Integer divisionId);
	
	
	
	
	

}
