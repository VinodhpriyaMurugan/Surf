package com.reservation.system.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="division")
public class Division {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String division_name;
	
	 @OneToMany(mappedBy = "division",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
		private List<Branch> branch;
	
	
	public Division() {
		super();
	}

	public Division(String division_name) {
		super();
		this.division_name = division_name;
	}
	
	public Integer getId() {
		return id;
	}

	public String getDivision_name() {
		return division_name;
	}

	public void setDivision_name(String division_name) {
		this.division_name = division_name;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	

}
