package com.reservation.system.dto;

public class BranchDto {
	
	private String branchName;
	private String divisionName;

	public BranchDto() {
		super();
	}

	public BranchDto(String branchName, String divisionName) {
		super();
		this.branchName = branchName;
		this.divisionName = divisionName;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getDivisionName() {
		return divisionName;
	}

	public void setDivisionName(String divisionName) {
		this.divisionName = divisionName;
	}

	
	
	
	

}
