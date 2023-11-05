package com.reservation.system.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.reservation.system.entity.Image;
import com.reservation.system.repository.ImageRepository;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageStorageServiceImpl implements ImageStorageService {

    private final Path imageStoragePath = Paths.get("uploads").toAbsolutePath().normalize();
    
   

    @Autowired
    public ImageStorageServiceImpl() {
        try {
            Files.createDirectories(imageStoragePath);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public void storeImage(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path filePath = this.imageStoragePath.resolve(fileName).normalize();
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }

    @Override
    public Resource loadImage(String imageName) {
        try {
            Path filePath = this.imageStoragePath.resolve(imageName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("Image not found: " + imageName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Image not found: " + imageName, ex);
        }
    }

    @Override
    public List<String> getAllImages() {
        try {
            System.out.println("Image Storage Path: " + imageStoragePath);
            String serverPath = imageStoragePath.toString();
            return Files.walk(this.imageStoragePath, 1)
                    .filter(path -> !path.equals(this.imageStoragePath))
                    .map(path -> serverPath + "/" + this.imageStoragePath.relativize(path).toString())
                    .collect(Collectors.toList());
        } catch (IOException ex) {
            throw new RuntimeException("Failed to read stored images", ex);
        }
    }

    @Autowired
    private ImageRepository imageRepository;
	@Override

	    public void saveImage(MultipartFile file,String empId) throws IOException {
	        Image image = new Image();
	        image.setData(file.getBytes());
	        image.setEmpId(empId);
	       Integer count =  imageRepository.findByEmpId(empId);
	       if(count>0) {
	    	   imageRepository.updateImage(image.getData(),empId);
	       }
	       else {
	    	   
	    	   imageRepository.save(image);
	       }
	    }
	@Override
	    public byte[] getImageById(String id) {
	        return imageRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Image not found"))
	                .getData();
//		return null;
	    }

	@Override
	public Image getImageByEmpId(String employeeNumber) {
		return imageRepository.getImages(employeeNumber);
	}

	
	

}

