package com.reservation.system.dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class UserDto {

	private String employeeNumber;

	private String employeeName;

	private String email;

	private String division;

	private String cc;

	private String geo;

	private String password;

	private String path;

	private boolean employeeStatus;

	private List role;

	private LocalDate nextDay;

	private LocalDate currentday;

	private List<LocalDate> updatedSeats;

	private LocalDate dateofJoining;

	private LocalDate dateofBirth;

	public UserDto() {
		super();
	}

	public UserDto(String employeeNumber, String employeeName, String email, String division, String cc, String geo,
			String password, boolean employeeStatus,LocalDate dateofJoining,LocalDate dateofBirth) {
		super();
		this.employeeNumber = employeeNumber;
		this.employeeName = employeeName;
		this.email = email;
		this.division = division;
		this.cc = cc;
		this.geo = geo;
		this.password = password;
		this.employeeStatus = employeeStatus;
		this.dateofJoining = dateofJoining;
		this.dateofBirth = dateofBirth;
	}

	public String getEmployeeNumber() {
		return employeeNumber;
	}

	public void setEmployeeNumber(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public LocalDate getNextDay() {
		return nextDay;
	}

	public void setNextDay(LocalDate nextDay) {
		this.nextDay = nextDay;
	}

	public LocalDate getCurrentday() {
		return currentday;
	}

	public void setCurrentday(LocalDate currentday) {
		this.currentday = currentday;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public LocalDate getDateofJoining() {
		return dateofJoining;
	}

	public LocalDate getDateofBirth() {
		return dateofBirth;
	}

	public String getCc() {
		return cc;
	}

	public void setCc(String cc) {
		this.cc = cc;
	}

	public String getGeo() {
		return geo;
	}

	public void setGeo(String geo) {
		this.geo = geo;
	}

	public boolean isEmployeeStatus() {
		return employeeStatus;
	}

	public void setEmployeeStatus(boolean employeeStatus) {
		this.employeeStatus = employeeStatus;
	}

	public List getRole() {
		return role;
	}

	public void setRole(List role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public List<LocalDate> getUpdatedSeats() {
		return updatedSeats;
	}

//	public Date getDateofJoining() {
//		return dateofJoining;
//	}
//
//	public void setDateofJoining(Date dateofJoining) {
//		this.dateofJoining = dateofJoining;
//	}
//
//	public Date getDateofBirth() {
//		return dateofBirth;
//	}
//
//	public void setDateofBirth(Date dateofBirth) {
//		this.dateofBirth = dateofBirth;
//	}

	public void setUpdatedSeats(List<LocalDate> updatedSeats) {
		this.updatedSeats = updatedSeats;
	}

	public void setDateofJoining(LocalDate dateofJoining) {
		this.dateofJoining = dateofJoining;
	}

	public void setDateofBirth(LocalDate dateofBirth) {
		this.dateofBirth = dateofBirth;
	}

}
