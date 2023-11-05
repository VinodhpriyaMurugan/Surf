package com.reservation.system.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reservation.system.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Transactional
	@Modifying
	@Query(value= "update user set emp_status = false where emp_num = ?1",nativeQuery = true)
	void deleteEmployee(int employeeNumber);

	@Query(value= "select * from user where emp_status = true",nativeQuery = true)
	List<User> findEmployee();
	
	@Transactional
	@Modifying
	@Query(value= "update user set emp_status = 'false' where emp_num = ?1",nativeQuery = true)
	void updateEmployee(Integer employeeNumber,String employeeName, String email, String division, String cc,
			String geo);

	List<User> findByEmployeeNameContaining(String name);

	@Query(value= "select * from user where emp_num = ?1 AND emp_status =1",nativeQuery = true)
	User findEmployeeByNum(String empNum);
	
	@Transactional
	@Modifying
	@Query(value= "update user set vaccine_status = ?1 where emp_num = ?2",nativeQuery = true)
	void setVaccineStatus(String vaccineStatus,Integer empNum);

	@Transactional
	@Modifying
	@Query(value= "update user set emp_name = ?1, email = ?2,division = ?3,cc = ?4,geo = ?5,password = ?6,dateof_birth =?7 ,dateof_joining =?8 where emp_num = ?7",nativeQuery = true)
	void updateEmployeeById(String employeeName, String email, String division, String cc,String geo,String password,LocalDate localDate,LocalDate localDate2, String id);

	User findByEmail(String username);

	@Query(value= "select distinct cc from user",nativeQuery = true)
	List<String> fetchBranchValues();

	@Query(value= "select * from user where emp_status = false",nativeQuery = true)
	List<User> findResignedEmployee();

	@Query(value= "select * from user",nativeQuery = true)
	List<User> findAllEmployee();

	@Query(value= "select distinct division from user",nativeQuery = true)
	List<String> fetchDivisonValuesfromUser();

	@Query(value= "select distinct(cc) from user where division = ?1",nativeQuery = true)
	List<String> fetchBranch(String val);
	
	@Query(value= "select password from user where emp_num = ?1",nativeQuery = true)
	String getPasswordFromEmpNumber(String empNumber);

	@Transactional
	@Modifying
	@Query(value= "update user set password = ?1 where emp_num = ?2",nativeQuery = true)
	void savePasswordInfo(String password, String id);
	
	@Transactional
	@Modifying
	@Query(value= "update user set emp_status = 1 where emp_num = ?1",nativeQuery = true)
	void updateEmployeestatus(Integer empNum);
	
	 @Query(value = "SELECT * FROM user WHERE MONTH(dateof_Joining) = MONTH(:date) AND DAY(dateof_Joining) = DAY(:date)", nativeQuery = true)
	List<User> findByDateofJoining(@Param("date")LocalDate today);
	 @Query(value = "SELECT * FROM user WHERE MONTH(dateof_Birth) = MONTH(:date) AND DAY(dateof_Birth) = DAY(:date)", nativeQuery = true)
	List<User> findByDateofBirth(@Param("date")LocalDate today);

	 @Query(value = "SELECT * FROM user where monthname(dateof_joining)=?1", nativeQuery = true)
	List<User> fetchAnniversary(String input);
	
	 @Query(value = "SELECT * FROM user where monthname(dateof_birth)=?1", nativeQuery = true)
		List<User> fetchBirthday(String input);
	  @Query(value = "SELECT * FROM user u WHERE u.dateof_joining BETWEEN :startDate AND :endDate", nativeQuery = true)
	List<User> fetchforNewJoine(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
	}
