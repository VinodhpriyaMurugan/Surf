package com.reservation.system.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ExcelImportService {
	
	String importExcel(MultipartFile file) throws IOException;
	

}
