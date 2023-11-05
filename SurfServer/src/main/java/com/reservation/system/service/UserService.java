package com.reservation.system.service;

import java.util.List;

import com.reservation.system.dto.BranchDto;
import com.reservation.system.dto.UserDto;
import com.reservation.system.entity.Branch;
import com.reservation.system.entity.Division;
import com.reservation.system.entity.User;

public interface UserService {
	
	List<User> fetchUsers();
	
	void saveEmployee(UserDto userDto);

	void delete(Integer employeeNumber);
	List<User> fetchFilteredUser(String name);
	
	UserDto getUser(String id);

	void updateEmployee(UserDto userDto);

	String generatePassword(int i);

	String getEmployeeId(String id);

	List<String> getDivision();

	List<String> getBranch();

	List<User> fetchResignedUsers(String empType);

	List<Division> getDivisionData();

	void saveDivision(String divisionName);

	List<Branch> retriveBranchFromDivision(String division);

	void saveBranch(BranchDto branchDto);

	List<User> retriveAdminList();

	String fetchUserPassword(String empNumber);

	void savePassword(UserDto userDto);

	void retriveEmployee(Integer empNum);

	List<User> fetchAnniversary();
	List<User> fetchBirthday(String string);


}
