package com.smartsoft.service.mapper;

import com.smartsoft.domain.*;
import com.smartsoft.service.dto.ResourceDTO;

import com.smartsoft.domain.Resource;
import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Resource and its DTO ResourceDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ResourceMapper {

    ResourceDTO resourceToResourceDTO(Resource resource);

    List<ResourceDTO> resourcesToResourceDTOs(List<Resource> resources);

    @Mapping(target = "permissions", ignore = true)
    Resource resourceDTOToResource(ResourceDTO resourceDTO);

    List<Resource> resourceDTOsToResources(List<ResourceDTO> resourceDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Resource resourceFromId(Long id) {
        if (id == null) {
            return null;
        }
        Resource resource = new Resource();
        resource.setId(id);
        return resource;
    }


}
