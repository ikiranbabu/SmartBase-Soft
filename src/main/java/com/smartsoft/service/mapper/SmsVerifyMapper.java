package com.smartsoft.service.mapper;

import com.smartsoft.domain.*;
import com.smartsoft.domain.SmsVerify;
import com.smartsoft.service.dto.SmsVerifyDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity SmsVerify and its DTO SmsVerifyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SmsVerifyMapper {

    SmsVerifyDTO smsVerifyToSmsVerifyDTO(SmsVerify smsVerify);

    List<SmsVerifyDTO> smsVerifiesToSmsVerifyDTOs(List<SmsVerify> smsVerifies);

    SmsVerify smsVerifyDTOToSmsVerify(SmsVerifyDTO smsVerifyDTO);

    List<SmsVerify> smsVerifyDTOsToSmsVerifies(List<SmsVerifyDTO> smsVerifyDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default SmsVerify smsVerifyFromId(Long id) {
        if (id == null) {
            return null;
        }
        SmsVerify smsVerify = new SmsVerify();
        smsVerify.setId(id);
        return smsVerify;
    }


}
