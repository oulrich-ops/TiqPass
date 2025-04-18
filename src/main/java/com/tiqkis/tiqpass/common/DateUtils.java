package com.tiqkis.tiqpass.common;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateUtils {
    public static String formatDate(final Date date) {
        final SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        return formatter.format(date);
    }

    public static String formatDate(final String date) {
        final SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        return formatter.format(LocalDate.parse(date));
    }

    public static Date convertToDate(LocalDate localDate) {
        if (localDate == null) {
            throw new IllegalArgumentException("LocalDate cannot be null");
        }
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public static LocalDate convertToLocalDate(Date date) {
        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }
        return date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

}