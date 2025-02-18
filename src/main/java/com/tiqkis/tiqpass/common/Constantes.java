package com.tiqkis.tiqpass.common;

public class Constantes {

    public static String APP_DATA_ROAMING_PATH = System.getenv("APPDATA");
    public static final String APP_IMAGE_PARAM_FOLDER = APP_DATA_ROAMING_PATH + "/scholar-id/param/image";
    public static final String APP_IMAGE_ETUDIANTS_FOLDER = APP_DATA_ROAMING_PATH + "/scholar-id/param/image/etudiants";

    public static final String JASPER_TEMPLATE_UNIQUE_CARD = "templates/jasper/uniqueCard.jrxml";
    public static final String JASPER_TEMPLATE_CARD = "templates/jasper/card.jrxml";

    public static final String JASPER_TEMPLATE_MULTI_CARD = "templates/jasper/card_multi.jrxml";
    public static final String PARAMG_CYCLE_ETUDE = "PG005";
    public static final Integer INITIAL_CREDIT = 30;
}