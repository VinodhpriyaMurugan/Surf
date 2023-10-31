package com.reservation.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.system.entity.User;
import com.reservation.system.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/tpfSoftware")
public class UserController {
	@Autowired
	private UserService userService;
	@GetMapping("/users")
	public List<User> getUserList(){
		System.out.println("getUserList method ended");
		List<User> userList =userService.saveUser();
		return userList;
		
	}
}
