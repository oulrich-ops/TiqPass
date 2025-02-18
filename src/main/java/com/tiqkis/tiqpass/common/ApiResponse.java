package com.tiqkis.tiqpass.common;

import lombok.Getter;

@Getter
public class ApiResponse <T>{
    private int status;
    private String message;
    private T data;

    public ApiResponse(Builder<T> builder) {
        this.status = builder.status;
        this.message = builder.message;
        this.data = builder.data;
    }

    public static class Builder<T>{
        private int status;
        private String message;
        private T data;
        public Builder() {

        }
        public Builder<T> status(int code) {
            this.status = code;
            return this;
        }
        public Builder<T> message(String message) {
            this.message = message;
            return this;
        }
        public Builder<T> data(T data) {
            this.data = data;
            return this;
        }
        public ApiResponse build() {
            return new ApiResponse(this);
        }

    }
}