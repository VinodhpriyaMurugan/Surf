package com.reservation.system.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="vaccination_detail")
public class VaccinationDetail {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "vaccine_status")
	private String vaccineStatus;
	
	@Column(name = "first_dose")
	private LocalDate firstDose;
	
	@Column(name = "second_dose")
	private LocalDate secondDose;
	
	@Column(name = "next_dose")
	private LocalDate NextDose;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User user;

	public VaccinationDetail() {
		super();
	}

	public VaccinationDetail(String vaccineStatus, LocalDate firstDose, LocalDate secondDose, LocalDate nextDose,
			User user) {
		super();
		this.vaccineStatus = vaccineStatus;
		this.firstDose = firstDose;
		this.secondDose = secondDose;
		this.NextDose = nextDose;
		this.user = user;
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
		return NextDose;
	}

	public void setNextDose(LocalDate nextDose) {
		NextDose = nextDose;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
