package com.smartsoft.service.mapper;

import com.smartsoft.domain.*;
import com.smartsoft.service.dto.CodeDTO;

import com.smartsoft.domain.Code;
import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Code and its DTO CodeDTO.
 */
@Mapper(componentModel = "spring", uses = {CodeGroupMapper.class, })
public interface CodeMapper {

    @Mapping(source = "codeGroup.id", target = "codeGroupId")
    @Mapping(source = "codeGroup.code", target = "codeGroupCode")
    CodeDTO codeToCodeDTO(Code code);

    List<CodeDTO> codesToCodeDTOs(List<Code> codes);

    @Mapping(source = "codeGroupId", target = "codeGroup")
    Code codeDTOToCode(CodeDTO codeDTO);

    List<Code> codeDTOsToCodes(List<CodeDTO> codeDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Code codeFromId(Long id) {
        if (id == null) {
            return null;
        }
        Code code = new Code();
        code.setId(id);
        return code;
    }


}
