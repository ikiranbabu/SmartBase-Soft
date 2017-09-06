package com.smartsoft.service.impl;

import com.smartsoft.service.SmsVerifyService;
import com.smartsoft.domain.SmsVerify;
import com.smartsoft.repository.SmsVerifyRepository;
import com.smartsoft.service.dto.SmsVerifyDTO;
import com.smartsoft.service.mapper.SmsVerifyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing SmsVerify.
 */
@Service
@Transactional
public class SmsVerifyServiceImpl implements SmsVerifyService {

    private final Logger log = LoggerFactory.getLogger(SmsVerifyServiceImpl.class);

    private final SmsVerifyRepository smsVerifyRepository;

    private final SmsVerifyMapper smsVerifyMapper;

    public SmsVerifyServiceImpl(SmsVerifyRepository smsVerifyRepository, SmsVerifyMapper smsVerifyMapper) {
        this.smsVerifyRepository = smsVerifyRepository;
        this.smsVerifyMapper = smsVerifyMapper;
    }

    /**
     * Save a smsVerify.
     *
     * @param smsVerifyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SmsVerifyDTO save(SmsVerifyDTO smsVerifyDTO) {
        log.debug("Request to save SmsVerify : {}", smsVerifyDTO);
        SmsVerify smsVerify = smsVerifyMapper.smsVerifyDTOToSmsVerify(smsVerifyDTO);
        smsVerify = smsVerifyRepository.save(smsVerify);
        SmsVerifyDTO result = smsVerifyMapper.smsVerifyToSmsVerifyDTO(smsVerify);
        return result;
    }

    /**
     *  Get all the smsVerifies.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SmsVerifyDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SmsVerifies");
        Page<SmsVerify> result = smsVerifyRepository.findAll(pageable);
        return result.map(smsVerify -> smsVerifyMapper.smsVerifyToSmsVerifyDTO(smsVerify));
    }

    /**
     *  Get one smsVerify by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SmsVerifyDTO findOne(Long id) {
        log.debug("Request to get SmsVerify : {}", id);
        SmsVerify smsVerify = smsVerifyRepository.findOne(id);
        SmsVerifyDTO smsVerifyDTO = smsVerifyMapper.smsVerifyToSmsVerifyDTO(smsVerify);
        return smsVerifyDTO;
    }

    /**
     *  Delete the  smsVerify by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SmsVerify : {}", id);
        smsVerifyRepository.delete(id);
    }

    public Optional<SmsVerify> findOneByMobile(String mobile){
        return smsVerifyRepository.findOneByMobile(mobile);
    }

}
