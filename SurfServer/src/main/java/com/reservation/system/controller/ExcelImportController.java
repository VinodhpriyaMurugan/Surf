package com.reservation.system.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.reservation.system.service.ExcelImportService;


@CrossOrigin
@Controller
@RequestMapping("/tpfSoftware")
public class ExcelImportController 
{
	Logger log = LoggerFactory.getLogger(ExcelImportController.class);
	
	@Autowired
	private ExcelImportService excelImportService;
	
	
	@PostMapping("/upload")
	public String uploadData(@RequestParam("file") MultipartFile file) throws Exception {
		log.info("uploadData method started for bulk registration");
		if (file == null) {
			throw new RuntimeException("select the a file for uploading");
		}

		log.info("uploadData method ended for bulk registration");
		return excelImportService.importExcel(file);

	}

}
