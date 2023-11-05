package com.reservation.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.reservation.system.service.ImageStorageService;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tpfSoftware")
public class ImageUploadController {

    @Autowired
    private ImageStorageService imageStorageService;

    @PostMapping("/imageUpload1")
    public void uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        imageStorageService.storeImage(file);
    }
    
    @PostMapping("/imageUpload")
    public ResponseEntity<String> saveImg(@RequestParam("file") MultipartFile file,String empId) throws IOException {
    	imageStorageService.saveImage(file,empId);
        return ResponseEntity.ok("Image uploaded successfully.");
    }
//    @GetMapping("/images/{imageName}")
//    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
//        Resource image = imageStorageService.loadImage(imageName);
//        return ResponseEntity.ok()
//                .header("Content-Disposition", "attachment; filename=\"" + image.getFilename() + "\"")
//                .body(image);
//    }
    @GetMapping("/images/{empid}")
    public ResponseEntity<byte[]> getImage(@PathVariable String empid) {    	
    	System.out.println(empid);
        return ResponseEntity.ok(imageStorageService.getImageById(empid));
    }
    @GetMapping("/images1")
    public List<String> getAllImages() {
    	
        return imageStorageService.getAllImages();
    }
}

