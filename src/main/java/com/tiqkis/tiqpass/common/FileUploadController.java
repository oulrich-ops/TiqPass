package com.tiqkis.tiqpass.common;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "*")
public class FileUploadController {


    private final Path uploadDir = Paths.get("uploads/images");

    public FileUploadController() throws IOException {

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {

            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());

            String newFileName = UUID.randomUUID() + "_" + originalFilename;

            Path destinationPath = uploadDir.resolve(newFileName);

            Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/uploads/images/" + newFileName;
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erreur lors de l'upload");
        }
    }
}
