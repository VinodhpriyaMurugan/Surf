package com.reservation.system.dto;

import java.time.LocalDate;

public class VaccinationDetailDto {
	
	private Integer id;
	private String employeeNumber;
	
	private String vaccineStatus;
	
	private LocalDate firstDose;
	
	private LocalDate secondDose;
	
	private LocalDate nextDose;
	

	public VaccinationDetailDto() {
		super();
	}

	public VaccinationDetailDto(String employeeNumber, String vaccineStatus, LocalDate firstDose, LocalDate secondDose,
			LocalDate nextDose) {
		super();
		this.employeeNumber = employeeNumber;
		this.vaccineStatus = vaccineStatus;
		this.firstDose = firstDose;
		this.secondDose = secondDose;
		this.nextDose = nextDose;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getVaccineStatus() {
		return vaccineStatus;
	}

	public void setVaccineStatus(String vaccineStatus) {
		this.vaccineStatus = vaccineStatus;
	}

	public LocalDate getFirstDose() {
		return firstDose;
	}

	public void setFirstDose(LocalDate firstDose) {
		this.firstDose = firstDose;
	}

	public LocalDate getSecondDose() {
		return secondDose;
	}

	public void setSecondDose(LocalDate secondDose) {
		this.secondDose = secondDose;
	}

	public LocalDate getNextDose() {
		return nextDose;
	}

	public void setNextDose(LocalDate nextDose) {
		this.nextDose = nextDose;
	}

	public String getEmployeeNumber() {
		return employeeNumber;
	}

	public void setEmployeeNumber(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	
}
