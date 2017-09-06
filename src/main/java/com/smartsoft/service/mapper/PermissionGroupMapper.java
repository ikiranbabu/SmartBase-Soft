package com.smartsoft.service.mapper;

import com.smartsoft.domain.*;
import com.smartsoft.service.dto.PermissionGroupDTO;

import com.smartsoft.domain.PermissionGroup;
import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity PermissionGroup and its DTO PermissionGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PermissionGroupMapper {

    PermissionGroupDTO permissionGroupToPermissionGroupDTO(PermissionGroup permissionGroup);

    List<PermissionGroupDTO> permissionGroupsToPermissionGroupDTOs(List<PermissionGroup> permissionGroups);

    @Mapping(target = "permissions", ignore = true)
    PermissionGroup permissionGroupDTOToPermissionGroup(PermissionGroupDTO permissionGroupDTO);

    List<PermissionGroup> permissionGroupDTOsToPermissionGroups(List<PermissionGroupDTO> permissionGroupDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default PermissionGroup permissionGroupFromId(Long id) {
        if (id == null) {
            return null;
        }
        PermissionGroup permissionGroup = new PermissionGroup();
        permissionGroup.setId(id);
        return permissionGroup;
    }


}
