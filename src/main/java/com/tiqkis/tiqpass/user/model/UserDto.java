package com.tiqkis.tiqpass.user.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDto {
    private int id;
    private String username;
    private String password;

    public UserDto UserModelToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        return userDto;
    }

}