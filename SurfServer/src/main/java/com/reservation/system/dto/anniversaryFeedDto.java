package com.reservation.system.dto;

public class anniversaryFeedDto {
	private String empName;
	private Integer noOfYears;
	private String eventType;
	private Integer min;
	private Integer max;
	private byte[] data;
	public anniversaryFeedDto() {
		super();
	}
	
	public anniversaryFeedDto(String empName, Integer noOfYears) {
		super();
		this.empName = empName;
		this.noOfYears = noOfYears;
	}
	public anniversaryFeedDto(String empName, Integer noOfYears,String eventType,byte[] data) {
		super();
		this.empName = empName;
		this.noOfYears = noOfYears;
		this.eventType = eventType;
		this.data = data;
	}

	public anniversaryFeedDto(String empName) {
		this.empName = empName;
	}

	

	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public Integer getNoOfYears() {
		return noOfYears;
	}
	public void setNoOfYears(Integer noOfYears) {
		this.noOfYears = noOfYears;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public Integer getMin() {
		return min;
	}

	public void setMin(Integer min) {
		this.min = min;
	}

	public Integer getMax() {
		return max;
	}

	public void setMax(Integer max) {
		this.max = max;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
	
	
}
