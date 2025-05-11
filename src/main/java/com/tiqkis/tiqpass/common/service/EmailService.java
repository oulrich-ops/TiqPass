package com.tiqkis.tiqpass.common.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")  // Récupère l'adresse e-mail depuis les propriétés
    private String fromEmail;

    /**
     * Envoie un email avec les billets en pièce jointe et un contenu HTML professionnel
     *
     * @param to Email du destinataire
     * @param customerName Nom du client
     * @param eventName Nom de l'événement
     * @param eventDate Date de l'événement
     * @param orderNumber Numéro de commande
     * @param ticketCount Nombre de billets achetés
     * @param pdfAttachment Le fichier PDF des billets
     * @param primaryColor Couleur principale pour le design de l'email (format hex: #RRGGBB)
     * @throws MessagingException En cas d'erreur d'envoi
     */
    public void sendTicketsEmail(String to, String customerName, String eventName,
                                 String eventDate, String orderNumber, int ticketCount,
                                 byte[] pdfAttachment, String primaryColor) throws MessagingException, UnsupportedEncodingException {

        System.out.printf("on envoie un email à %s pour l'événement %s\n", to, eventName);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject("🎟️ Vos billets pour " + eventName);
        helper.setFrom(new InternetAddress(fromEmail, "Billetterie " + eventName));

        // Construction du corps de l'email en HTML
        String htmlContent = createHtmlEmailContent(customerName, eventName, eventDate,
                orderNumber, ticketCount, primaryColor);
        helper.setText(htmlContent, true); // true indique que c'est du HTML

        // Génération d'un nom de fichier personnalisé pour la pièce jointe
        String filename = sanitizeFilename(eventName) + "-billets-" + orderNumber + ".pdf";
        helper.addAttachment(filename, new ByteArrayResource(pdfAttachment));

        // Ajout d'un calendrier iCalendar pour permettre l'ajout de l'événement dans l'agenda
        try {
            byte[] icsData = generateICalendarFile(eventName, eventDate);
            helper.addAttachment("event.ics", new ByteArrayResource(icsData));
        } catch (Exception e) {
            System.out.println("Impossible de générer le fichier iCalendar: " + e.getMessage());
        }

        // Ajout d'un logo dans l'email
        // ClassPathResource imageResource = new ClassPathResource("static/images/logo.png");
        // if (imageResource.exists()) {
        //     helper.addInline("logoImage", imageResource);
        // }

        mailSender.send(message);

        // Enregistrement de l'envoi dans les logs
        System.out.println("Email avec billets envoyé à "+ to+" pour l'événement "+ eventName);
    }

    /**
     * Génère le contenu HTML de l'email
     */
    private String createHtmlEmailContent(String customerName, String eventName, String eventDate,
                                          String orderNumber, int ticketCount, String primaryColor) {
        // Utilisation de la couleur primaire passée en paramètre
        String btnColor = primaryColor;
        String headerColor = primaryColor;
        String borderColor = adjustColorBrightness(primaryColor, 0.8); // Version plus claire

        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "  <meta charset=\"UTF-8\">"
                + "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
                + "  <style>"
                + "    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }"
                + "    .container { max-width: 600px; margin: 0 auto; padding: 20px; }"
                + "    .header { background-color: " + headerColor + "; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }"
                + "    .content { background-color: #ffffff; padding: 20px; border-left: 1px solid " + borderColor + "; border-right: 1px solid " + borderColor + "; }"
                + "    .footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 5px 5px; border: 1px solid " + borderColor + "; }"
                + "    .btn { display: inline-block; padding: 10px 20px; background-color: " + btnColor + "; color: white; text-decoration: none; border-radius: 4px; margin: 15px 0; }"
                + "    .ticket-info { background-color: #f9f9f9; border: 1px solid #eee; padding: 15px; margin: 15px 0; border-radius: 4px; }"
                + "    .important { color: #d32f2f; font-weight: bold; }"
                + "    .social-links a { margin: 0 5px; text-decoration: none; color: #555; }"
                + "    @media only screen and (max-width: 600px) { .container { width: 100%; } }"
                + "  </style>"
                + "</head>"
                + "<body>"
                + "  <div class=\"container\">"
                + "    <div class=\"header\">"
                + "      <h1>Vos billets sont prêts !</h1>"
                + "    </div>"
                + "    <div class=\"content\">"
                + "      <p>Bonjour " + escapeHtml(customerName) + ",</p>"
                + "      <p>Nous vous remercions pour votre commande. Vos billets pour <strong>" + escapeHtml(eventName) + "</strong> sont en pièce jointe de cet email au format PDF.</p>"
                + "      <div class=\"ticket-info\">"
                + "        <p><strong>Événement :</strong> " + escapeHtml(eventName) + "</p>"
                + "        <p><strong>Date :</strong> " + escapeHtml(eventDate) + "</p>"
                + "        <p><strong>Numéro de commande :</strong> " + escapeHtml(orderNumber) + "</p>"
                + "        <p><strong>Nombre de billets :</strong> " + ticketCount + "</p>"
                + "      </div>"
                + "      <p>Comment utiliser vos billets :</p>"
                + "      <ol>"
                + "        <li>Imprimez vos billets ou gardez-les sur votre téléphone</li>"
                + "        <li>Présentez-les à l'entrée de l'événement</li>"
                + "        <li>Une pièce d'identité pourra vous être demandée</li>"
                + "      </ol>"
                + "      <p class=\"important\">Important : Chaque billet comporte un QR code unique qui ne peut être utilisé qu'une seule fois. Ne partagez pas vos billets!</p>"

                + "      <center><a href=\"http://127.0.0.1:5173/order/" + escapeHtml(orderNumber) + "\" class=\"btn\">Voir ma commande</a></center>"
                + "    </div>"
                + "    <div class=\"footer\">"
                + "      <p>Si vous avez des questions concernant votre commande, n'hésitez pas à contacter notre service client à l'adresse <a href=\"mailto:support@example.com\">support@example.com</a> ou par téléphone au 01 23 45 67 89.</p>"
                + "      <div class=\"social-links\">"
                + "        <a href=\"https://facebook.com/tiqpass\">Facebook</a> | "
                + "        <a href=\"https://twitter.com/tiqpass\">Twitter</a> | "
                + "        <a href=\"https://instagram.com/tiqpass\">Instagram</a>"
                + "      </div>"
                + "      <p>&copy; " + java.time.Year.now().getValue() + " " + escapeHtml(eventName) + ". Tous droits réservés.</p>"
                + "    </div>"
                + "  </div>"
                + "</body>"
                + "</html>";
    }

    /**
     * Génère un fichier iCalendar (.ics) pour permettre l'ajout à l'agenda
     */
    private byte[] generateICalendarFile(String eventName, String eventDate) throws Exception {
        // Parse la date de l'événement (supposons un format "dd/MM/yyyy HH:mm")
        SimpleDateFormat parser = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date startDate = parser.parse(eventDate);

        // Créer une date de fin 3 heures plus tard
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.HOUR_OF_DAY, 3);
        Date endDate = calendar.getTime();

        // Format pour iCalendar
        SimpleDateFormat iCalFormat = new SimpleDateFormat("yyyyMMdd'T'HHmmss'Z'");
        iCalFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        // Construire le contenu iCalendar
        StringBuilder icsBuilder = new StringBuilder();
        icsBuilder.append("BEGIN:VCALENDAR\r\n");
        icsBuilder.append("VERSION:2.0\r\n");
        icsBuilder.append("PRODID:-//Example Inc//Event Calendar//FR\r\n");
        icsBuilder.append("CALSCALE:GREGORIAN\r\n");
        icsBuilder.append("METHOD:PUBLISH\r\n");
        icsBuilder.append("BEGIN:VEVENT\r\n");
        icsBuilder.append("SUMMARY:").append(eventName).append("\r\n");
        icsBuilder.append("DTSTART:").append(iCalFormat.format(startDate)).append("\r\n");
        icsBuilder.append("DTEND:").append(iCalFormat.format(endDate)).append("\r\n");
        icsBuilder.append("DTSTAMP:").append(iCalFormat.format(new Date())).append("\r\n");
        icsBuilder.append("UID:").append(UUID.randomUUID().toString()).append("\r\n");
        icsBuilder.append("DESCRIPTION:N'oubliez pas vos billets et une pièce d'identité.\r\n");
        icsBuilder.append("STATUS:CONFIRMED\r\n");
        icsBuilder.append("SEQUENCE:0\r\n");
        icsBuilder.append("END:VEVENT\r\n");
        icsBuilder.append("END:VCALENDAR\r\n");

        return icsBuilder.toString().getBytes(StandardCharsets.UTF_8);
    }

    /**
     * Nettoie le nom du fichier pour éviter les caractères problématiques
     */
    private String sanitizeFilename(String input) {
        return input.replaceAll("[^a-zA-Z0-9-_]", "_").toLowerCase();
    }

    /**
     * Échappe les caractères spéciaux pour l'HTML
     */
    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#039;");
    }

    /**
     * Ajuste la luminosité d'une couleur hexadécimale
     * @param color Couleur au format #RRGGBB
     * @param factor Facteur d'ajustement (>1 plus clair, <1 plus foncé)
     * @return Couleur ajustée au format #RRGGBB
     */
    private String adjustColorBrightness(String color, double factor) {
        if (color == null || !color.startsWith("#") || color.length() != 7) {
            return "#dddddd"; // Couleur par défaut si format invalide
        }

        try {
            int r = Integer.parseInt(color.substring(1, 3), 16);
            int g = Integer.parseInt(color.substring(3, 5), 16);
            int b = Integer.parseInt(color.substring(5, 7), 16);

            r = (int) Math.min(255, r * factor);
            g = (int) Math.min(255, g * factor);
            b = (int) Math.min(255, b * factor);

            return String.format("#%02x%02x%02x", r, g, b);
        } catch (Exception e) {
            return "#dddddd"; // Couleur par défaut en cas d'erreur
        }
    }


}
