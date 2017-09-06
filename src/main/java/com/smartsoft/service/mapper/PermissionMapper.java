package com.smartsoft.service.mapper;

import com.smartsoft.domain.*;
import com.smartsoft.domain.Permission;
import com.smartsoft.service.dto.PermissionDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Permission and its DTO PermissionDTO.
 */
@Mapper(componentModel = "spring", uses = {ResourceMapper.class, PermissionGroupMapper.class, })
public interface PermissionMapper {

    @Mapping(source = "permissionGroup.id", target = "permissionGroupId")
    @Mapping(source = "permissionGroup.name", target = "permissionGroupName")
    PermissionDTO permissionToPermissionDTO(Permission permission);

    List<PermissionDTO> permissionsToPermissionDTOs(List<Permission> permissions);

    @Mapping(target = "roles", ignore = true)
    @Mapping(source = "permissionGroupId", target = "permissionGroup")
    Permission permissionDTOToPermission(PermissionDTO permissionDTO);

    List<Permission> permissionDTOsToPermissions(List<PermissionDTO> permissionDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Permission permissionFromId(Long id) {
        if (id == null) {
            return null;
        }
        Permission permission = new Permission();
        permission.setId(id);
        return permission;
    }


}
