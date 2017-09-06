package com.smartsoft.service;

import com.smartsoft.domain.SmsVerify;
import com.smartsoft.service.dto.SmsVerifyDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SmsVerify.
 */
public interface SmsVerifyService {

    /**
     * Save a smsVerify.
     *
     * @param smsVerifyDTO the entity to save
     * @return the persisted entity
     */
    SmsVerifyDTO save(SmsVerifyDTO smsVerifyDTO);

    /**
     *  Get all the smsVerifies.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<SmsVerifyDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" smsVerify.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SmsVerifyDTO findOne(Long id);

    /**
     *  Delete the "id" smsVerify.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    Optional<SmsVerify> findOneByMobile(String mobile);

}
