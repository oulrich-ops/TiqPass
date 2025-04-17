package com.tiqkis.tiqpass.user.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class UserDto {
    private int id;
    private String username;
    private String password;
    private List<Role> roles;

    public UserDto UserModelToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setRoles(user.getRoles());

        return userDto;
    }

}