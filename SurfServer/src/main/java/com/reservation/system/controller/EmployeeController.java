package com.reservation.system.controller;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.system.dto.anniversaryFeedDto;
import com.reservation.system.entity.Image;
import com.reservation.system.entity.User;
import com.reservation.system.repository.UserRepository;
import com.reservation.system.service.ImageStorageService;
import com.reservation.system.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/tpfSoftware")
public class EmployeeController {

	@Autowired
	private UserRepository employeeRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private ImageStorageService imageStorageService;

	@GetMapping("/getAnniversaryList")
	public List<User> getAnniversaryList() {

		List<User> userList = userService.fetchAnniversary();

		return userList;

	}

	@PostMapping("/getAnniversaryList")
	public List<User> filterAnniversaryList(@RequestBody anniversaryFeedDto anniversaryFeedDto) {
		System.out.println(anniversaryFeedDto.getMax());
		List<User> userList = userService.fetchAnniversary();
		return userList;

	}

	@PostMapping("/getBirthdayList")
	public List<User> getBirthdayList(@RequestBody anniversaryFeedDto anniversaryFeedDto) {
		List<User> userList = userService.fetchBirthday(anniversaryFeedDto.getEventType());
		return userList;

	}

	@GetMapping("/checkJoiningDate")
	public ResponseEntity<Map<String, List<anniversaryFeedDto>>> checkAnniversaryAndBirthday() {
		LocalDate today = LocalDate.now();

		Map<String, List<anniversaryFeedDto>> eventData = new HashMap<>();
		eventData.put("anniversary", new ArrayList<>());
		eventData.put("birthday", new ArrayList<>());
		eventData.put("newjoinee", new ArrayList<>());

		// Find employees whose anniversary is today
		List<User> anniversaryEmployees = employeeRepository.findByDateofJoining(today);
		for (User employee : anniversaryEmployees) {
//			Calendar calendar = Calendar.getInstance();
//			calendar.setTime(employee.getDateofJoining());
//			int joinYear = calendar.get(Calendar.YEAR);
//			calendar.setTime(today);
//			int currentYear = calendar.get(Calendar.YEAR);
//			int yearDifference = currentYear - joinYear;
			
			   LocalDate joiningDate = employee.getDateofJoining();
		        LocalDate today1 = LocalDate.now();

		        long yearDifference = ChronoUnit.YEARS.between(joiningDate, today);

		        if (yearDifference >= 0) {
	Image image = getImages(employee.getEmployeeNumber());
	anniversaryFeedDto dto = new anniversaryFeedDto(employee.getEmployeeName(), (int)yearDifference, "anniversary",
			image.getData());
	eventData.get("anniversary").add(dto);
	System.out.println("Employee " + employee.getEmployeeName() + " joined " + yearDifference + " years ago.");
}
			
		}

		// Find employees whose birthday is today
		List<User> birthdayEmployees = employeeRepository.findByDateofBirth(today);
		Integer noOfDays = 2;
		for (User employee : birthdayEmployees) {
			Image image = getImages(employee.getEmployeeNumber());
			anniversaryFeedDto dto = new anniversaryFeedDto(employee.getEmployeeName(), null,
					"birthday", image.getData());
			eventData.get("birthday").add(dto);
			System.out.println("Happy Birthday to " + employee.getEmployeeName());
		}
		
		 DayOfWeek dayOfWeek = today.getDayOfWeek();
		 System.out.println("dayOfWeek ******************"+dayOfWeek);
		 if(dayOfWeek.toString().equals("FRIDAY")) {
			 noOfDays = 3;
		 }
		 LocalDate fromDate = today.minusDays(noOfDays);
		List<User> newJoinee = employeeRepository.fetchforNewJoine(fromDate,today);
		for (User employee : newJoinee) {
			Image image = getImages(employee.getEmployeeNumber());
			anniversaryFeedDto dto = new anniversaryFeedDto(employee.getEmployeeName(), null,
					"newjoinee", image.getData());
			eventData.get("newjoinee").add(dto);
			System.out.println("Happy Birthday to " + employee.getEmployeeName());
		}

		return ResponseEntity.ok(eventData);
	}

	public Image getImages(String empid) {
	    Image image = imageStorageService.getImageByEmpId(empid);
	    if (image != null) {
	        return image;
	    } else {
	        // Create a new Image object
	        Image newImage = new Image();
	        newImage.setEmpId(empid);
	        newImage.setData(null);
	        return newImage;
	    }
	}


}
