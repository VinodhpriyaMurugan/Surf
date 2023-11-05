package com.reservation.system.entity;

import javax.persistence.*;

@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String empId;
    
    @Lob
    private byte[] data;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Image(String empId, byte[] data) {
		super();
		this.empId = empId;
		this.data = data;
	}

	public Image() {
		// TODO Auto-generated constructor stub
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empid) {
		this.empId = empid;
	}

    // Getters and setters
}

