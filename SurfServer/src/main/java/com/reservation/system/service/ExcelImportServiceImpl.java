package com.reservation.system.service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.reservation.system.entity.Branch;
import com.reservation.system.entity.Division;
import com.reservation.system.entity.Role;
import com.reservation.system.entity.User;
import com.reservation.system.repository.BranchRepository;
import com.reservation.system.repository.DivisionRepository;
import com.reservation.system.repository.RoleRepository;
import com.reservation.system.repository.UserRepository;

@Service
public class ExcelImportServiceImpl implements ExcelImportService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private DivisionRepository divisionRepository;
	
	@Autowired
	private BranchRepository branchRepository;
	
	

	@Override
	public String importExcel(MultipartFile file) throws IOException {
		List<User> userList = new ArrayList<>();
		String employeeNumber = null;
		String employeeName = "";
		String email="";
		String division="";
		String cc="";
		String geo="";
		LocalDate dateCellValue = null;
		LocalDate dobValue =null;
		
			Workbook workbook=new XSSFWorkbook(file.getInputStream());
			Sheet firstSheet=workbook.getSheetAt(0);
			Iterator<Row> rowIterator=firstSheet.iterator();
			rowIterator.next();
			while(rowIterator.hasNext()) {
				Row nextRow = rowIterator.next();
				Iterator<Cell> cellIterator=nextRow.cellIterator();
				while(cellIterator.hasNext()) {
					Cell nextCell=cellIterator.next();
					int columnIndex=nextCell.getColumnIndex();
					switch (columnIndex) {
					case 0:					
						if (nextCell.getCellType() == CellType.NUMERIC) {
						    employeeNumber = Integer.toString((int) nextCell.getNumericCellValue());
						    System.out.println(employeeNumber);
						    break;
						}	
						else if(nextCell.getCellType() == CellType.STRING ){
							  employeeNumber = nextCell.getStringCellValue().toString();
							    System.out.println(employeeNumber);
							    break;
							
						}
						else {employeeNumber = null;}
					case 1:
						employeeName=nextCell.getStringCellValue().trim();
						System.out.println(employeeName);
						break;
					case 2:
						email=nextCell.getStringCellValue().trim();
						System.out.println(email);
						break;
					case 3:
						division=nextCell.getStringCellValue().trim();
						System.out.println(division);
						break;
					case 4:
						cc=nextCell.getStringCellValue().trim();
						System.out.println(cc);
						break;
					case 5:
						geo=nextCell.getStringCellValue().trim();
						System.out.println(geo);
						break;
					case 6:
					    if(DateUtil.isCellDateFormatted(nextCell)) {
					      Date dateCellValue1 = nextCell.getDateCellValue();
					      if(dateCellValue1 != null) {
					    	  Instant instant = dateCellValue1.toInstant();
						        ZoneId zoneId = ZoneId.systemDefault(); // Or specify a specific time zone
						        ZonedDateTime zonedDateTime = instant.atZone(zoneId);
						        dateCellValue = zonedDateTime.toLocalDate();
						      System.out.println(dateCellValue);
					      }
					      
					    
					    else {
					    	dateCellValue =LocalDate.of(2090, 2, 28);
					    }
					    }
					case 7:
					    if(DateUtil.isCellDateFormatted(nextCell)) {
					    Date dobValue1 = nextCell.getDateCellValue();
					    if(dobValue1 != null) {

					    	 Instant instant = dobValue1.toInstant();
						        ZoneId zoneId = ZoneId.systemDefault(); // Or specify a specific time zone
						        ZonedDateTime zonedDateTime = instant.atZone(zoneId);
						        dobValue = zonedDateTime.toLocalDate();
					      System.out.println(dobValue);
					    }
					    else {
					    	dobValue =LocalDate.of(2090, 2, 28);
					    }
					    }
					
					}
					columnIndex++;
					
					
				}
				userList.add(new User(employeeNumber,employeeName,email,division,cc,geo,null,true,dateCellValue,dobValue));				
				userRepository.saveAll(userList);
				workbook.close();
			}
			for(int i = 0;i <userList.size() ; i++)
			{
				Role role = new Role("ROLE_USER",userList.get(i));
				roleRepository.save(role);
			}
			List<Division> divisionList = new ArrayList<Division>();
			List<String> div = userRepository.fetchDivisonValuesfromUser();
			for(String val : div) {
				
				Division divValue = new Division(val);
				divisionList.add(divValue);
				divisionRepository.save(divValue);
				List<String> branchList =	userRepository.fetchBranch(val);
				for(String index : branchList)
				{
					Branch branch = new Branch(index,divValue);
					branchRepository.save(branch);
				}
				
			}
			
			return "Registered succesfuly";
	}

	
	
}
