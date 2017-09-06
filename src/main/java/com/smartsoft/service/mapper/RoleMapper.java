package com.smartsoft.service.mapper;

import com.smartsoft.domain.*;
import com.smartsoft.service.dto.RoleDTO;

import com.smartsoft.domain.Role;
import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Role and its DTO RoleDTO.
 */
@Mapper(componentModel = "spring", uses = {PermissionMapper.class, })
public interface RoleMapper {

    RoleDTO roleToRoleDTO(Role role);

    List<RoleDTO> rolesToRoleDTOs(List<Role> roles);

    Role roleDTOToRole(RoleDTO roleDTO);

    List<Role> roleDTOsToRoles(List<RoleDTO> roleDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Role roleFromId(Long id) {
        if (id == null) {
            return null;
        }
        Role role = new Role();
        role.setId(id);
        return role;
    }


}
