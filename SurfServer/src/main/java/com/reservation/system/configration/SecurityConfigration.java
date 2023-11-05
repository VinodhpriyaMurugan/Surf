package com.reservation.system.configration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.reservation.system.filter.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigration extends WebSecurityConfigurerAdapter
{
	
	@Autowired
	private UserDetailsService userService;

	@Autowired
	private JwtFilter jwtFilter;
	
	
	//Password encoder
	@Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
       return new BCryptPasswordEncoder();
    }
	
	//for spring data JPA and hibernate

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService);
        auth.setPasswordEncoder(bCryptPasswordEncoder());
        return auth;
    }
	
	
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception 
    {
        auth.authenticationProvider(authenticationProvider());
    }
    
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception 
    {
        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/tpfSoftware/userList","/tpfSoftware/imageUpload","/tpfSoftware/images/{empid}","/tpfSoftware/deleteEmployee/{empNum}","/tpfSoftware/restoreEmployee/{empNum}","/tpfSoftware/userList",
                		"/tpfSoftware/fetchUserDetails/{id}","/tpfSoftware/setVaccineStatus",
                		"/tpfSoftware/updateVaccineStatus","/tpfSoftware/retriveVaccineStatus/{empNum}",
                		"/tpfSoftware/updateCount","/tpfSoftware/getDates","/tpfSoftware/updateDates",
                		"/tpfSoftware/getGridData/{id}","/tpfSoftware/updateFood",
                		"/tpfSoftware/findEmployeeID/{id}","/tpfSoftware/getBookedDates/{id}",
                		"/tpfSoftware/getBookedDates/{id}","/tpfSoftware/login","/tpfSoftware/deleteDate","/tpfSoftware/selectAll","/tpfSoftware/updateFoods","/tpfSoftware/upload",
                		"/tpfSoftware/checkJoiningDate","/tpfSoftware/getAnniversaryList","/tpfSoftware/getBirthdayList")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    }
	
	
}

