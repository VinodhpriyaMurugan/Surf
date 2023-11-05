package com.reservation.system.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.multipart.MultipartFile;

import com.reservation.system.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

	@Query(value= "select * from images where emp_id = ?1",nativeQuery = true)
	Optional<Image> findById(String id);

	@Query(value= "select count(emp_id) from images where emp_id = ?1",nativeQuery = true)
	Integer findByEmpId(String empId);

	@Transactional
	@Modifying
	@Query(value= "update images set data = ?1  where emp_id = ?2",nativeQuery = true)
	void updateImage(byte[] bs, String empId);

	@Query(value= "select * from images where emp_id = ?1",nativeQuery = true)
	Image getImages(String employeeNumber);
}

