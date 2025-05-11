package com.tiqkis.tiqpass.purchasing.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.colors.WebColors;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Style;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.Document; // C'est le bon !

import com.itextpdf.layout.properties.AreaBreakType;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.tiqkis.tiqpass.domain.purchasing.Ticket;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.net.URL;
import java.util.List;

@Service
public class TicketPdfService {

    public byte[] generateTicketPdf(String eventName, String customerName, String categoryName, String validationCode,
                                    String primaryColor, String imageLink,String eventDate) throws Exception {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            // Initialisation du document PDF
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc, PageSize.A6.rotate());

            // Conversion de la couleur primaire d'hexadécimal à RGB
            Color mainColor = WebColors.getRGBColor(primaryColor);
            Color lightColor = new DeviceRgb(
                    Math.min(255, mainColor.getColorValue()[0] * 255 + 40),
                    Math.min(255, mainColor.getColorValue()[1] * 255 + 40),
                    Math.min(255, mainColor.getColorValue()[2] * 255 + 40)
            );

            // Création du fond avec un léger dégradé
            Rectangle pageSize = pdfDoc.getDefaultPageSize();
            PdfCanvas canvas = new PdfCanvas(pdfDoc.addNewPage());

            // Fond dégradé
            canvas.saveState()
                    .setFillColor(lightColor)
                    .rectangle(0, 0, pageSize.getWidth(), pageSize.getHeight())
                    .fill()
                    .restoreState();

            // Bande de couleur en haut
            canvas.saveState()
                    .setFillColor(mainColor)
                    .rectangle(0, pageSize.getHeight() - 30, pageSize.getWidth(), 30)
                    .fill()
                    .restoreState();

            // Bande de couleur en bas
            canvas.saveState()
                    .setFillColor(mainColor)
                    .rectangle(0, 0, pageSize.getWidth(), 20)
                    .fill()
                    .restoreState();

            // Ajout de l'image d'événement
            try {
                    URL imageUrl = getClass().getResource(imageLink);

                assert imageUrl != null;
                Image eventImage = new Image(ImageDataFactory.create(imageUrl))
                            .scaleToFit(120, 80)
                            .setFixedPosition(20, pageSize.getHeight() - 100);

                    document.add(eventImage);

            } catch (Exception e) {
                    System.err.println("Erreur de chargement de l'image: " + e.getMessage());
            }

            // Zone principale du ticket
            Table mainTable = new Table(UnitValue.createPercentArray(new float[]{1}))
                    .setWidth(UnitValue.createPercentValue(100))
                    .setMarginTop(40);

            Cell headerCell = new Cell()
                    .setBorder(Border.NO_BORDER)
                    .setPadding(10)
                    .setTextAlignment(TextAlignment.CENTER);

            Paragraph titlePara = new Paragraph(eventName)
                    .setFontSize(18)
                    .setBold()
                    .setFontColor(mainColor);

            headerCell.add(titlePara);
            mainTable.addCell(headerCell);

            // Date de l'événement
            Cell dateCell = new Cell()
                    .setBorder(Border.NO_BORDER)
                    .setPadding(5)
                    .setTextAlignment(TextAlignment.CENTER);

            Paragraph datePara = new Paragraph("Date: " + eventDate)
                    .setFontSize(12)
                    .setFontColor(ColorConstants.DARK_GRAY);

            dateCell.add(datePara);
            mainTable.addCell(dateCell);

            // Informations du client
            Cell infoCell = new Cell()
                    .setBorder(Border.NO_BORDER)
                    .setPadding(10);

            // Tableau des infos
            Table infoTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .setWidth(UnitValue.createPercentValue(100));

            infoTable.addCell(new Cell().setBorder(Border.NO_BORDER).add(
                    new Paragraph("Nom").setBold().setFontColor(mainColor)
            ));
            infoTable.addCell(new Cell().setBorder(Border.NO_BORDER).add(
                    new Paragraph(customerName)
            ));

            infoTable.addCell(new Cell().setBorder(Border.NO_BORDER).add(
                    new Paragraph("Catégorie").setBold().setFontColor(mainColor)
            ));
            infoTable.addCell(new Cell().setBorder(Border.NO_BORDER).add(
                    new Paragraph(categoryName)
            ));

            infoCell.add(infoTable);
            mainTable.addCell(infoCell);

            // Code QR et code de validation
            Cell qrCell = new Cell()
                    .setBorder(Border.NO_BORDER)
                    .setPadding(10)
                    .setTextAlignment(TextAlignment.CENTER);

            byte[] qrBytes = generateQRCode(validationCode);
            Image qrImage = new Image(ImageDataFactory.create(qrBytes))
                    .scaleToFit(80, 80);

            Paragraph codePara = new Paragraph("Code: " + validationCode)
                    .setFontSize(10)
                    .setFontColor(ColorConstants.DARK_GRAY);

            qrCell.add(qrImage);
            qrCell.add(codePara);
            mainTable.addCell(qrCell);

            // Conditions générales (en petit)
            Cell footerCell = new Cell()
                    .setBorder(Border.NO_BORDER)
                    .setPadding(5)
                    .setTextAlignment(TextAlignment.CENTER);

            Paragraph footerPara = new Paragraph("Ce ticket est personnel et doit être présenté à l'entrée de l'événement. " +
                    "Non remboursable. Pièce d'identité obligatoire.")
                    .setFontSize(6)
                    .setFontColor(ColorConstants.GRAY);

            footerCell.add(footerPara);
            mainTable.addCell(footerCell);

            document.add(mainTable);
            document.close();

            return outputStream.toByteArray();

    }

    private byte[] generateQRCode(String text) throws Exception {
        QRCodeWriter qrWriter = new QRCodeWriter();
        BitMatrix matrix = qrWriter.encode(text, BarcodeFormat.QR_CODE, 200, 200);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(matrix, "PNG", baos);
        return baos.toByteArray();
    }

        /**
         * Génère un document PDF contenant plusieurs tickets
         *
         * @param eventName      Nom de l'événement
         * @param customerName   Nom de l'acheeteur
         * @param eventDate      Date de l'événement
         * @param tickets        Liste des  des tickets
         * @param primaryColor   Couleur principale pour le design au format hex (#RRGGBB)
         * @param imageLink      Lien vers l'image de bannière
         * @return Un tableau de bytes contenant le PDF combiné
         * @throws Exception Si une erreur survient pendant la génération
         */
        public byte[] generateMultipleTicketsPdf(String eventName,
                                                  String customerName,
                                                 String eventDate,
                                                 List<Ticket> tickets,
                                                 String primaryColor,
                                                 String imageLink) throws Exception {


                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();


                PdfWriter writer = new PdfWriter(outputStream);
                PdfDocument pdfDoc = new PdfDocument(writer);
                Document document = new Document(pdfDoc);


                pdfDoc.getDocumentInfo().setTitle("Tickets - " + eventName);
                pdfDoc.getDocumentInfo().setAuthor("Système de billetterie");
                pdfDoc.getDocumentInfo().setSubject("Tickets pour " + eventName);
                pdfDoc.getDocumentInfo().setKeywords("ticket, événement, " + eventName);
                pdfDoc.getDocumentInfo().setCreator("Ticket Generator v1.0");

                try {

                        // Pour chaque ticket
                        for (int i = 0; i < tickets.size(); i++) {
                                 Ticket ticket = tickets.get(i);

                                // Générer le ticket individuel
                                byte[] ticketPdfBytes = generateTicketPdf(
                                        eventName,
                                        customerName,
                                        ticket.getOrderItem().getCategory().getName(),
                                        ticket.getValidationCode(),
                                        primaryColor,
                                        imageLink,
                                        eventDate
                                );

                                // Ajouter le ticket au document principal
                                PdfDocument ticketPdfDoc = new PdfDocument(new PdfReader(new ByteArrayInputStream(ticketPdfBytes)));
                                ticketPdfDoc.copyPagesTo(1, ticketPdfDoc.getNumberOfPages(), pdfDoc);
                                ticketPdfDoc.close();

                                // Ajouter un saut de page sauf pour le dernier ticket
                                if (i < tickets.size() - 1) {
                                        document.add(new AreaBreak(AreaBreakType.NEXT_PAGE));
                                }
                        }

                        // Ajouter une page d'information à la fin
                        createInfoPage(pdfDoc, document, eventName, eventDate, primaryColor,tickets.get(0).getOrderItem().getOrder().getTicketing().getCustomization().getContactInfo().getPhone());

                } catch (Exception e) {
                        throw new Exception("Erreur lors de la génération des tickets multiples: " + e.getMessage(), e);
                } finally {
                        // Fermer le document
                        document.close();
                }

                return outputStream.toByteArray();
        }

        /**
         * Crée une page d'informations à la fin du document
         */
        private void createInfoPage(PdfDocument pdfDoc, Document document,
                                    String eventName, String eventDate, String primaryColor, String contact) {

                // Ajouter une nouvelle page pour les informations
                document.add(new AreaBreak(AreaBreakType.NEXT_PAGE));

                // Conversion de la couleur primaire
                Color mainColor = WebColors.getRGBColor(primaryColor);

                try {
                        // Titre
                        document.add(new Paragraph("Informations complémentaires")
                                .setFontSize(20)
                                .setBold()
                                .setFontColor(mainColor)
                                .setTextAlignment(TextAlignment.CENTER)
                                .setMarginTop(30));

                        // Tableau d'informations
                        Table infoTable = new Table(UnitValue.createPercentArray(new float[]{1, 2}))
                                .setWidth(UnitValue.createPercentValue(80))
                                .setHorizontalAlignment(HorizontalAlignment.CENTER)
                                .setMarginTop(30);

                        // Styliser les cellules d'en-tête
                        Style headerCellStyle = new Style()
                                .setBold()
                                .setBackgroundColor(mainColor)
                                .setFontColor(ColorConstants.WHITE)
                                .setPadding(5);

                        // Styliser les cellules de données
                        Style dataCellStyle = new Style()
                                .setPadding(5);

                        // Ajouter les lignes d'informations
                        addInfoRow(infoTable, headerCellStyle, dataCellStyle, "Événement", eventName);
                        addInfoRow(infoTable, headerCellStyle, dataCellStyle, "Date et heure", eventDate);
                        //addInfoRow(infoTable, headerCellStyle, dataCellStyle, "Accès", "Les portes ouvrent 1 heure avant le début de l'événement");
                        addInfoRow(infoTable, headerCellStyle, dataCellStyle, "Contact", contact);

                        document.add(infoTable);

                        // Ajouter un QR code pour le site web de l'événement
                        try {
                                byte[] qrWebsite = generateQRCode("https://example.com/event");
                                Image qrImage = new Image(ImageDataFactory.create(qrWebsite))
                                        .scaleToFit(100, 100)
                                        .setHorizontalAlignment(HorizontalAlignment.CENTER);

                                document.add(new Paragraph("Scannez pour plus d'informations")
                                        .setTextAlignment(TextAlignment.CENTER)
                                        .setMarginTop(30));
                                document.add(qrImage);
                        } catch (Exception e) {
                                // Ignorer l'erreur de QR code
                        }

                        // Note de bas de page
                        document.add(new Paragraph("© " + java.time.Year.now().getValue() + " " + eventName + ". Tous droits réservés.")
                                .setFontSize(8)
                                .setTextAlignment(TextAlignment.CENTER)
                                .setMarginTop(50)
                                .setFontColor(ColorConstants.GRAY));

                } catch (Exception e) {
                        document.add(new Paragraph("Erreur lors de la création de la page d'information: " + e.getMessage())
                                .setFontColor(ColorConstants.RED));
                }
        }

        /**
         * Ajoute une ligne au tableau d'informations
         */
        private void addInfoRow(Table table, Style headerStyle, Style dataStyle, String label, String value) {
                table.addCell(new Cell().addStyle(headerStyle).add(new Paragraph(label)));
                table.addCell(new Cell().addStyle(dataStyle).add(new Paragraph(value)));
        }
}
