package com.reservation.system.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="seat_info")
public class SeatInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="count")
	private Integer seatCount;
	private LocalDate date;
	private Integer availableCount;
	private Integer seatsOcuupied;
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public SeatInfo() {
		super();
	}
	public SeatInfo(Integer seatCount, LocalDate date, Integer availableCount, Integer seatsOcuupied) {
		super();
		this.seatCount = seatCount;
		this.date = date;
		this.availableCount = availableCount;
		this.seatsOcuupied = seatsOcuupied;
	}
	
	public SeatInfo(LocalDate date, Integer seatCount)
	{
	this.date = date;
	this.seatCount = seatCount;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getSeatCount() {
		return seatCount;
	}
	public void setSeatCount(Integer seatCount) {
		this.seatCount = seatCount;
	}
	
	public Integer getAvailableCount() {
		return availableCount;
	}
	public void setAvailableCount(Integer availableCount) {
		this.availableCount = availableCount;
	}
	public Integer getSeatsOcuupied() {
		return seatsOcuupied;
	}
	public void setSeatsOcuupied(Integer seatsOcuupied) {
		this.seatsOcuupied = seatsOcuupied;
	}
	
	
	
	
}