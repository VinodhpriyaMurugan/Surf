package com.reservation.system.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.system.dto.BranchDto;
import com.reservation.system.dto.UserDto;
import com.reservation.system.entity.Branch;
import com.reservation.system.entity.Division;
import com.reservation.system.entity.SeatInfo;
import com.reservation.system.entity.User;
import com.reservation.system.service.SeatInfoService;
import com.reservation.system.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/tpfSoftware")
public class UserController {
	
	Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private SeatInfoService seatInfoService;
	
	@GetMapping("/userList")
	public List<User> getUserList(){
		log.info("getUserList method started");
		List<User> userList =userService.fetchUsers();
		log.info("getUserList method ended");
		return userList;
		
	}
	@GetMapping("/resignedUserList/{empType}")
	public List<User> getResignedUserList(@PathVariable String empType){
		log.info("getResignedUserList method started");
		List<User> userList =userService.fetchResignedUsers(empType);	
		log.info("getResignedUserList method ended");
		return userList;
		
	}
	
	@PostMapping("/addUser")
	public void createEmployee(@RequestBody UserDto userDto) {
		log.info("createEmployee method started");
		userService.saveEmployee(userDto);
		log.info("createEmployee method ended");
	}
	
	@PostMapping("/saveBranch")
	public void saveBranch(@RequestBody BranchDto branchDto) {
		log.info("saveBranch method started");
		userService.saveBranch(branchDto);
		log.info("saveBranch method ended");
	}
	
	@PostMapping("/editEmployee")
	public void updateEmployee(@RequestBody UserDto userDto) {
		log.info("updateEmployee method started");
		userService.updateEmployee(userDto);
		log.info("updateEmployee method ended");
	}
	
	@PostMapping("/deleteEmployee/{empNum}")
	public void deleteEmployee(@PathVariable Integer empNum) {
		log.info("deleteEmployee method started");
		userService.delete(empNum);
		log.info("deleteEmployee method ended");
	}
	
	@PostMapping("/restoreEmployee/{empNum}")
	public void restoreEmployee(@PathVariable Integer empNum) {
		log.info("restoreEmployee method started");
		userService.retriveEmployee(empNum);
		log.info("restoreEmployee method ended");
	}
	
	@GetMapping("/retriveEmployeeById/{id}")
	public UserDto getUserById(@PathVariable String id){
		log.info("getUserById method started");
		UserDto user = userService.getUser(id);
		log.info("getUserById method ended");
		return user; 
		
	}
	
	@GetMapping("/fetchUserDetails/{id}")
	public UserDto fetchUserDetails(@PathVariable String id){
		log.info("fetchUserDetails method started");
		List<LocalDate> listOfDates = new ArrayList<>();
		UserDto user = userService.getUser(id);
		LocalDate date = LocalDate.now();	
		user.setCurrentday(date);
		user.setNextDay(date.plusDays(1));
		List<SeatInfo> updatedDates =  seatInfoService.getUpdatedDates();
		for(SeatInfo dates:updatedDates) {
			listOfDates.add(dates.getDate());
			
		}
		user.setUpdatedSeats(listOfDates);
		log.info("fetchUserDetails method ended");
		return user;
		
	}
	@GetMapping("/findEmployeeID/{id}")
	public String findEmployeeID(@PathVariable String id){
		
		return userService.getEmployeeId(id);
		
	}
	@GetMapping("/getBranchFromDivision/{division}")
	public List<Branch> fetchBranchFromDivision(@PathVariable String division){
		log.debug("Request {}",division);
		List<Branch> branchList = userService.retriveBranchFromDivision(division);
		log.debug("Reponse {}",branchList);
		return branchList;
		
	}
	
	
	@GetMapping("/saveDivision/{divisionName}")
	public void saveDivision(@PathVariable String divisionName) {
		log.info("saveDivision method started");
		userService.saveDivision(divisionName);
		log.info("saveDivision method ended");
	}
	
	@GetMapping("/retriveDivisionValues")
	public List<String> retriveDivisionValues(){
		log.debug("retriveDivisionValues methid started");
		return userService.getDivision();
		
	}
	@GetMapping("/getAdminList")
	public List<User> getAdminList(){
		log.info("getAdminList method started");
		return userService.retriveAdminList();
		
	}
	

	@GetMapping("/retriveDivision")
	public List<Division> retriveDivision(){
		
		return userService.getDivisionData();
		
	}
	
	@GetMapping("/retriveBranchValues")
	public List<String> retriveBranchValues(){
		
		return userService.getBranch();
		
	}
	
	@GetMapping("/searchbyName/{searchName}")
	public List<User> getfilteredvalue(@PathVariable String searchName) 
	{
		log.info("getfilteredvalue method started");
		List<User> filteredUsers = userService.fetchFilteredUser(searchName);
		log.info("getfilteredvalue method ended");
		return filteredUsers;

	}
	
	@GetMapping("/getPassword/{empNumber}")
	public String getPassword(@PathVariable String empNumber) 
	{
		log.debug("Request {}",empNumber);
		String password = userService.fetchUserPassword(empNumber);
		log.debug("Responset {}",password);
		return password;

	}
	
	@PostMapping("/savePassword")
	public void savePassword(@RequestBody UserDto userDto) {
		log.info("savePassword method started");
		userService.savePassword(userDto);
		log.info("savePassword method ended");
	}
	
	

}
