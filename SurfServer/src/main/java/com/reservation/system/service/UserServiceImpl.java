package com.reservation.system.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.reservation.system.dto.UserDto;
import com.reservation.system.entity.User;

@Service
public class UserServiceImpl implements UserService{
    private RestTemplate restTemplate;
	@Override
	public List<User> saveUser() {
		 ResponseEntity<UserDto> responseEntity = restTemplate
	                .getForEntity("http://localhost:8080/tpfsoftware/userList/",UserDto.class
	               );
		System.out.println(responseEntity);
		return null;
	}

}
