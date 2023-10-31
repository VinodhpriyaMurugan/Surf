package com.reservation.system.dto;

import java.time.LocalDate;
import java.util.List;

public class SeatBlockDto {
	private Integer employeeNumber;
	private LocalDate date;
	private String breakfast;
	private String lunch;
	private String snacks;
	private String employeeName;
	private String cc;
	public Integer count;
	private LocalDate fromDate;
	private LocalDate toDate;
	private List<LocalDate> datesList;
	private String food;


	public SeatBlockDto() {
		super();
	}

	public SeatBlockDto(Integer employeeNumber, LocalDate date, String breakfast, String lunch, String snacks) {
		super();
		this.employeeNumber = employeeNumber;
		this.date = date;
		this.breakfast = breakfast;
		this.lunch = lunch;
		this.snacks = snacks;
	}

	public SeatBlockDto(Integer employeeNumber, LocalDate date, String food, String breakfast, String lunch,
			String snacks) {
		super();
		this.employeeNumber = employeeNumber;
		this.date = date;
		this.food = food;
		this.breakfast = breakfast;
		this.lunch = lunch;
		this.snacks = snacks;
	}

	public Integer getEmployeeNumber() {
		return employeeNumber;
	}

	public void setEmployeeNumber(Integer employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
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

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public LocalDate getToDate() {
		return toDate;
	}

	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
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

	public List<LocalDate> getDatesList() {
		return datesList;
	}

	public void setDatesList(List<LocalDate> datesList) {
		this.datesList = datesList;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	@Override
	public String toString() {
		return "SeatBlockDto [employeeNumber=" + employeeNumber + ", date=" + date + ", breakfast=" + breakfast
				+ ", lunch=" + lunch + ", snacks=" + snacks + ", employeeName=" + employeeName + "]";
	}



	
}