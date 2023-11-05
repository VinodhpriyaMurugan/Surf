package com.reservation.system.service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.reservation.system.dto.JwtRequest;
import com.reservation.system.entity.Role;
import com.reservation.system.entity.User;
import com.reservation.system.repository.UserRepository;
import com.reservation.system.utility.AuthenticationUtility;


@Service
public class AuthenticationServiceImpl implements UserDetailsService,AuthenticationService {

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthenticationUtility authenticationUtility;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	
	@SuppressWarnings("finally")
	@Override
	public String getToken(JwtRequest jwtRequest) throws Exception
	{
		String token = null;
			try {
				
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUserName(),jwtRequest.getPassword()));
				final UserDetails userDetails = loadUserByUsername(jwtRequest.getUserName());
				token = authenticationUtility.generateToken(userDetails);
				System.out.println(token);
			} 
			catch (BadCredentialsException e) {
				throw new Exception("INVALID_CREDENTIALS", e);
				
			}
			finally {
				
				return token;
			}
			
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
	{
		 User user = userRepository.findByEmail(username);
	        if (user == null)
	        {
	            throw new UsernameNotFoundException("Invalid username or password.");
	        }
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRole()));
		
	}

	 private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) 
	  {
	    	List<SimpleGrantedAuthority> collect = roles.stream().map(role -> new SimpleGrantedAuthority
	                (role.getName())).collect(Collectors.toList());
	    	
	        return collect;
		
	  }

	
	}
