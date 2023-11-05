package com.reservation.system.dto;

import java.time.LocalDate;

public class ReportDto {

	private String employeeNumber;
	private LocalDate date;
	private String employeeName;
	private String cc;
	private String breakfast;
	private String lunch;
	private String snacks;
	private Integer breakfastCount;
	private Integer lunchCount;
	private Integer snacksCount;
	
	public ReportDto() {
		super();
	}

	public ReportDto(String employeeNumber, LocalDate date, String breakfast,
			String lunch, String snacks) {
		super();
		this.employeeNumber = employeeNumber;
		this.date = date;
		this.breakfast = breakfast;
		this.lunch = lunch;
		this.snacks = snacks;
	}


	public String getEmployeeNumber() {
		return employeeNumber;
	}

	public void setEmployeeNumber(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getCc() {
		return cc;
	}

	public void setCc(String cc) {
		this.cc = cc;
	}

	public String getBreakfast() {
		return breakfast;
	}

	public void setBreakfast(String breakfast) {
		this.breakfast = breakfast;
	}

	public String getLunch() {
		return lunch;
	}

	public void setLunch(String lunch) {
		this.lunch = lunch;
	}

	public String getSnacks() {
		return snacks;
	}

	public void setSnacks(String snacks) {
		this.snacks = snacks;
	}

	public Integer getBreakfastCount() {
		return breakfastCount;
	}

	public void setBreakfastCount(Integer breakfastCount) {
		this.breakfastCount = breakfastCount;
	}

	public Integer getLunchCount() {
		return lunchCount;
	}

	public void setLunchCount(Integer lunchCount) {
		this.lunchCount = lunchCount;
	}

	public Integer getSnacksCount() {
		return snacksCount;
	}

	public void setSnacksCount(Integer snacksCount) {
		this.snacksCount = snacksCount;
	}
	
	
	
}
