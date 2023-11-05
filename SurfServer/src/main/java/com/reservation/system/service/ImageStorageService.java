package com.reservation.system.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.reservation.system.entity.Image;

import java.io.IOException;
import java.util.List;

public interface ImageStorageService {
    void storeImage(MultipartFile file) throws IOException;
    Resource loadImage(String imageName);
    List<String> getAllImages();
//	void saveImage(MultipartFile file, Integer empId) throws IOException;
	byte[] getImageById(String id);
	Image getImageByEmpId(String empid);
	void saveImage(MultipartFile file, String empId) throws IOException;
	
}
