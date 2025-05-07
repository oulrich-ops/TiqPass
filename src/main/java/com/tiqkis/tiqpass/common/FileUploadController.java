package com.tiqkis.tiqpass.common;


import com.tiqkis.tiqpass.common.interfaces.ApiResponseUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<ApiResponse<String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());

            String newFileName = UUID.randomUUID() + "_" + originalFilename;

            Path uploadDir = Paths.get("src/main/resources/uploads/images");
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            Path destinationPath = uploadDir.resolve(newFileName);

            Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/uploads/images/" + newFileName;

            System.out.println("File uploaded to: " + fileUrl);
            ApiResponse<String> response = ApiResponseUtil.buildApiResponse("file upload with success", fileUrl, HttpStatus.OK.value());

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseUtil.buildApiResponse("file upload failed", null, HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

}
