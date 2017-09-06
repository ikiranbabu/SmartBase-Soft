package com.smartsoft.service.mapper;

import com.smartsoft.domain.*;
import com.smartsoft.service.dto.CodeGroupDTO;

import com.smartsoft.domain.CodeGroup;
import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity CodeGroup and its DTO CodeGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CodeGroupMapper {

    CodeGroupDTO codeGroupToCodeGroupDTO(CodeGroup codeGroup);

    List<CodeGroupDTO> codeGroupsToCodeGroupDTOs(List<CodeGroup> codeGroups);

    @Mapping(target = "codes", ignore = true)
    CodeGroup codeGroupDTOToCodeGroup(CodeGroupDTO codeGroupDTO);

    List<CodeGroup> codeGroupDTOsToCodeGroups(List<CodeGroupDTO> codeGroupDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default CodeGroup codeGroupFromId(Long id) {
        if (id == null) {
            return null;
        }
        CodeGroup codeGroup = new CodeGroup();
        codeGroup.setId(id);
        return codeGroup;
    }


}
