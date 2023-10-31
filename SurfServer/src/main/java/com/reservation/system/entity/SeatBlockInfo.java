package com.reservation.system.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class SeatBlockInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer employeeNumber;
	@Column(name="dates")
	private LocalDate date;
	private String breakfast;
	private String lunch;
	private String snacks;	
	
	public Integer getEmployeeNumber() {
		return employeeNumber;
	}


	public void setEmployeeNumber(Integer employeeNumber) {
		this.employeeNumber = employeeNumber;
	}


	public SeatBlockInfo() {
		super();
	}
	
	
	public SeatBlockInfo(Integer employeeNumber, LocalDate date, String breakfast, String lunch, String snacks) {
		super();
		this.employeeNumber = employeeNumber;
		this.date = date;
		this.breakfast = breakfast;
		this.lunch = lunch;
		this.snacks = snacks;
	}


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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


	@Override
	public String toString() {
		return "SeatBlockInfo [employeeNumber=" + employeeNumber + ", date=" + date + ", breakfast=" + breakfast + ", lunch=" + lunch
				+ ", snacks=" + snacks + "]";
	}

	
	
	

}
