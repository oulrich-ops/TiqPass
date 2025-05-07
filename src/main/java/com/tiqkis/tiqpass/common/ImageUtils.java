package com.tiqkis.tiqpass.common;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.extern.log4j.Log4j2;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

@Log4j2
public class ImageUtils {


    public static String saveBase64Image(String base64Image, String folderPath, String fileName) throws IOException {
        Files.createDirectories(Paths.get(folderPath));
        byte[] decodedBytes = Base64.getDecoder().decode(base64Image);

        String filePath = folderPath + "/" + fileName;

        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(decodedBytes);
        }
        return filePath;
    }

    public static String convertImageToBase64(String filePath) throws IOException {
        if(filePath != null && !filePath.isEmpty()) {
            File file = new File(filePath);
            byte[] fileContent = Files.readAllBytes(file.toPath());
            return Base64.getEncoder().encodeToString(fileContent);
        }return "";
    }

    public static Image decodeToImage(String imageString) {
        try {
            byte[] imageBytes = Base64.getDecoder().decode(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageBytes);
            return ImageIO.read(bis);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static Image convertImageToJavaAwtImage(String absolutePath) throws IOException {
        File imageFile = new File(absolutePath);
        BufferedImage bufferedImage = null;
        try{  bufferedImage = ImageIO.read(imageFile);}
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return bufferedImage;
    }

    public static byte[] generateQRCode(String text) throws Exception {
        int width = 300;
        int height = 300;
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        return pngOutputStream.toByteArray();
    }
}