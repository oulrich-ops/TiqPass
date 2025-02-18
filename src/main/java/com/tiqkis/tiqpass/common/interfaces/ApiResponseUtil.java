package com.tiqkis.tiqpass.common.interfaces;

import com.tiqkis.tiqpass.common.ApiResponse;

public class ApiResponseUtil {

    public static <T> ApiResponse<T> buildApiResponse(String message, T data, int status) {
        return new ApiResponse.Builder<T>()
                .message(message)
                .data(data)
                .status(status)
                .build();
    }

    public static <T> ApiResponse<T> buildApiResponse(String message, int status) {
        return buildApiResponse(message, null, status);
    }
}
