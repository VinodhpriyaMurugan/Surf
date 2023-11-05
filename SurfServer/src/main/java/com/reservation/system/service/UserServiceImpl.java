package com.reservation.system.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.reservation.system.dto.BranchDto;
import com.reservation.system.dto.UserDto;
import com.reservation.system.entity.Branch;
import com.reservation.system.entity.Division;
import com.reservation.system.entity.Role;
import com.reservation.system.entity.SeatBlockInfo;
import com.reservation.system.entity.User;
import com.reservation.system.repository.BranchRepository;
import com.reservation.system.repository.DivisionRepository;
import com.reservation.system.repository.RoleRepository;
import com.reservation.system.repository.SeatBlockRepository;
import com.reservation.system.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private DivisionRepository divisionRepository;
	
	@Autowired
	private BranchRepository branchRepository;
	
	@Autowired
	private SeatBlockRepository seatBlockRepository;
	
	
	
	
	
	@Override
	public List<User> fetchUsers(){
		
		return userRepository.findEmployee();
	}

	@Override
	public void saveEmployee(UserDto userDto) {
		User user =null;
		int size = userDto.getRole().size();
		if(size > 1) {
			String password = generatePassword(10);
			System.out.println(password);
			userDto.setPassword(password);
			user = new User(userDto.getEmployeeNumber(),userDto.getEmployeeName(),userDto.getEmail(),userDto.getDivision(),userDto.getCc(),userDto.getGeo(),passwordEncoder.encode(userDto.getPassword()),true,userDto.getDateofJoining(),userDto.getDateofBirth());
		}else
		{
			user = new User(userDto.getEmployeeNumber(),userDto.getEmployeeName(),userDto.getEmail(),userDto.getDivision(),userDto.getCc(),userDto.getGeo(),null,true,userDto.getDateofJoining(),userDto.getDateofBirth());
		}
		
		user = userRepository.save(user);
		for(int i = 0;i <size ; i++)
		{
			if(userDto.getRole().get(i) != null)
			{
				Role role = new Role((String)userDto.getRole().get(i),user);
				roleRepository.save(role);
			}
		}
		
		
	}
	
	@Override
	public void updateEmployee(UserDto userDto) {
		User user = userRepository.findByEmail(userDto.getEmail());
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");     
//LocalDate dateOfBirth = userDto.getDateofBirth() != null ? LocalDate.parse(userDto.getDateofBirth().toString(), formatter) : null;
//LocalDate dateOfJoining = userDto.getDateofJoining() != null ? LocalDate.parse(userDto.getDateofJoining().toString(), formatter) : null;

		
		if(userDto.getRole().get(0).equals("ROLE_ADMIN"))
		{
			String password = generatePassword(10);
			userRepository.updateEmployeeById(userDto.getEmployeeName(),userDto.getEmail(),userDto.getDivision(),userDto.getCc(),userDto.getGeo(),passwordEncoder.encode(password),userDto.getDateofBirth(), userDto.getDateofJoining(),userDto.getEmployeeNumber());
			Role role = new Role("ROLE_ADMIN",user);
			roleRepository.save(role);
		}
		
		
		else  {
			List<Role> userRole = roleRepository.findByUserId(user.getId());
			if(userRole.size()>1) {
				userRepository.updateEmployeeById(userDto.getEmployeeName(),userDto.getEmail(),userDto.getDivision(),userDto.getCc(),userDto.getGeo(),null,userDto.getDateofBirth(),userDto.getDateofJoining(),userDto.getEmployeeNumber());
				roleRepository.deleteAdminAcess(user.getId());
			}
			else {
				userRepository.updateEmployeeById(userDto.getEmployeeName(),userDto.getEmail(),userDto.getDivision(),userDto.getCc(),userDto.getGeo(),null,userDto.getDateofBirth(),userDto.getDateofJoining(),userDto.getEmployeeNumber());

			}
			
			
		}
	}
	

	@Override
	public void delete(Integer employeeNumber) 
	{
		userRepository.deleteEmployee(employeeNumber);
		List<SeatBlockInfo> empList = seatBlockRepository.findByEmployeeNumber(employeeNumber);
//		for (SeatBlockInfo seatBlockInfo : empList) {
//			seatBlockRepository.deleteSeat(seatBlockInfo.getId());
//		}
//		
	}
	
	@Override
	public List<User> fetchFilteredUser(String name) {

		return userRepository.findByEmployeeNameContaining(name);
	}


	@Override
	public UserDto getUser(String id) {
		UserDto userDto = null;
		String path = System.getProperty("user.dir");
		User employeDetails = userRepository.findEmployeeByNum(id);
		if(employeDetails != null) {
			
			userDto = new UserDto(employeDetails.getEmployeeNumber(), employeDetails.getEmployeeName(), employeDetails.getEmail(), employeDetails.getDivision(), employeDetails.getCc(), employeDetails.getGeo(),
					employeDetails.getPassword(), employeDetails.isEmployeeStatus(),employeDetails.getDateofJoining(),employeDetails.getDateofBirth());
			List<String> list = new ArrayList<>();
			for(int i=0;i<employeDetails.getRole().size();i++)
			{
				list.add(employeDetails.getRole().get(i).getName());
			}
			
			userDto.setRole(list);
			userDto.setPath(path);
		}
		return userDto;
		
	}
	
	
	
	@Override
	public String generatePassword(int max) 
	{
		String password = "";
		Random random = new Random();
		String upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String lowerCase = "abcdefghijklmnopqrstuvwxyz";
		String number = "0123456789";
		String specialCharacter = "!@#$%^&*(){}?";
		String all = upperCase+lowerCase+number+specialCharacter;
		List<Character> charList = new ArrayList<Character>();
		
		for (char c : all.toCharArray())
		{
			charList.add(c);
		}
		Collections.shuffle(charList);
		for(int i = 0;i<max;i++)
		{
			password += charList.get(random.nextInt(charList.size()));
		}
		System.out.println(password);
		return password;
		
	}

	@Override
	public String getEmployeeId(String id) {
		User employeDetails = userRepository.findEmployeeByNum(id);
		if(employeDetails != null)
			return "true";
		else
			return "false";
		
	}

	@Override
	public List<String> getDivision() {
		return userRepository.fetchDivisonValuesfromUser();
	}

	@Override
	public List<String> getBranch() {
		return userRepository.fetchBranchValues();
	}

	@Override
	public List<User> fetchResignedUsers(String empType) {
		if(empType.equalsIgnoreCase("Live employee"))
			return userRepository.findEmployee();
		else if(empType.equalsIgnoreCase("Resigned employee"))
			return userRepository.findResignedEmployee();
		else
			return userRepository.findAllEmployee();
	}

	@Override
	public List<Division> getDivisionData() {
		
		return divisionRepository.getDivisionValues();
	}

	@Override
	public void saveDivision(String divisionName) {
		Division division = new Division(divisionName);
		divisionRepository.save(division);
		
	}

	@Override
	public List<Branch> retriveBranchFromDivision(String divisionName) {
		
		Division division = divisionRepository.findByDivisionName(divisionName);
		return branchRepository.getBranchValues(division.getId());
	}

	@Override
	public void saveBranch(BranchDto branchDto) {
		Division division = divisionRepository.findByDivisionName(branchDto.getDivisionName());
		Branch branch = new Branch(branchDto.getBranchName(),division);
		branchRepository.save(branch);		
	}
	@Override
	public List<User> retriveAdminList() {
		
		List<Role> userRole = roleRepository.findUserByRole();
		List<User> userDetails = new ArrayList<>();
		
		for (Role role : userRole) {
			User user = new User(role.getUser().getEmployeeNumber(),role.getUser().getEmployeeName(), role.getUser().getEmail(), role.getUser().getDivision(), role.getUser().getCc(), role.getUser().getGeo(),
					role.getUser().getPassword(), role.getUser().isEmployeeStatus(),role.getUser().getDateofJoining(),role.getUser().getDateofBirth());
			//userDetails.add(role.getUser());
			userDetails.add(user);
		}
		
		return userDetails;
	}

	@Override
	public String fetchUserPassword(String empNumber) {
		String password = userRepository.getPasswordFromEmpNumber(empNumber);
		return password;
	}

	@Override
	public void savePassword(UserDto userDto) {
		String password = passwordEncoder.encode(userDto.getPassword());
		userRepository.savePasswordInfo(password,userDto.getEmployeeNumber());
		
	}

	@Override
	public void retriveEmployee(Integer empNum) {
		
		userRepository.updateEmployeestatus(empNum);
	}

	@Override
	public List<User> fetchAnniversary() {
//		Loca
		LocalDate localDate = LocalDate.now();
		String input = localDate.getMonth().toString().toLowerCase();		
		input = input.substring(0, 1).toUpperCase() + input.substring(1);
		List<User> userList = userRepository.fetchAnniversary(input);
		System.out.println(input);
		return userList;
	}

	@Override
	public List<User> fetchBirthday(String str) {
		LocalDate localDate = LocalDate.now();
		String input = localDate.getMonth().toString().toLowerCase();		
		input = input.substring(0, 1).toUpperCase() + input.substring(1);
		List<User> userList = userRepository.fetchBirthday(str);
		System.out.println(input);
		return userList;
	}
	

}
