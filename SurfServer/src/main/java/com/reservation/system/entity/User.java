package com.reservation.system.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="user")
public class User 
{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "emp_num")
	private Integer employeeNumber;
	
	@Column(name = "emp_name")
	private String employeeName;
	
	private String email;
	
	private String division;
	
	private String cc;
	
	private String geo;
	
	private String password;
	
	private Date dateofJoining;
	
	

	@Column(name = "emp_status")
	private boolean employeeStatus;
	
	@JsonIgnore
	 @OneToOne(mappedBy = "user", fetch = FetchType.LAZY,cascade = CascadeType.ALL) 
	 private VaccinationDetail vaccination_detail;
	 
	 @JsonIgnore
	 @OneToMany(mappedBy = "user",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
		private List<Role> role;
	 
	

	public User() {
		super();
	}

	public User(Integer employeeNumber, String employeeName, String email, String division, String cc, String geo,
			String password, boolean employeeStatus, VaccinationDetail vaccination_detail,Date dateofJoining) {
		super();
		this.employeeNumber = employeeNumber;
		this.employeeName = employeeName;
		this.email = email;
		this.division = division;
		this.cc = cc;
		this.geo = geo;
		this.password = password;
		this.employeeStatus = employeeStatus;
		this.vaccination_detail = vaccination_detail;
		this.dateofJoining = dateofJoining;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEmployeeNumber() {
		return employeeNumber;
	}

	public void setEmployeeNumber(Integer employeeNumber) {
		this.employeeNumber = employeeNumber;
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

	public VaccinationDetail getVaccination_detail() {
		return vaccination_detail;
	}

	public void setVaccination_detail(VaccinationDetail vaccination_detail) {
		this.vaccination_detail = vaccination_detail;
	}

	public List<Role> getRole() {
		return role;
	}

	public void setRole(List<Role> role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getDateofJoining() {
		return dateofJoining;
	}

	public void setDateofJoining(Date dateofJoining) {
		this.dateofJoining = dateofJoining;
	}
	
}
