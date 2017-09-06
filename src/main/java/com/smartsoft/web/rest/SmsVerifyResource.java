package com.smartsoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.smartsoft.service.SmsVerifyService;
import com.smartsoft.web.rest.util.HeaderUtil;
import com.smartsoft.web.rest.util.PaginationUtil;
import com.smartsoft.service.dto.SmsVerifyDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SmsVerify.
 */
@RestController
@RequestMapping("/api")
public class SmsVerifyResource {

    private final Logger log = LoggerFactory.getLogger(SmsVerifyResource.class);

    private static final String ENTITY_NAME = "smsVerify";

    private final SmsVerifyService smsVerifyService;

    public SmsVerifyResource(SmsVerifyService smsVerifyService) {
        this.smsVerifyService = smsVerifyService;
    }

    /**
     * POST  /sms-verifies : Create a new smsVerify.
     *
     * @param smsVerifyDTO the smsVerifyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new smsVerifyDTO, or with status 400 (Bad Request) if the smsVerify has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sms-verifies")
    @Timed
    public ResponseEntity<SmsVerifyDTO> createSmsVerify(@RequestBody SmsVerifyDTO smsVerifyDTO) throws URISyntaxException {
        log.debug("REST request to save SmsVerify : {}", smsVerifyDTO);
        if (smsVerifyDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new smsVerify cannot already have an ID")).body(null);
        }
        SmsVerifyDTO result = smsVerifyService.save(smsVerifyDTO);
        return ResponseEntity.created(new URI("/api/sms-verifies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sms-verifies : Updates an existing smsVerify.
     *
     * @param smsVerifyDTO the smsVerifyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated smsVerifyDTO,
     * or with status 400 (Bad Request) if the smsVerifyDTO is not valid,
     * or with status 500 (Internal Server Error) if the smsVerifyDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sms-verifies")
    @Timed
    public ResponseEntity<SmsVerifyDTO> updateSmsVerify(@RequestBody SmsVerifyDTO smsVerifyDTO) throws URISyntaxException {
        log.debug("REST request to update SmsVerify : {}", smsVerifyDTO);
        if (smsVerifyDTO.getId() == null) {
            return createSmsVerify(smsVerifyDTO);
        }
        SmsVerifyDTO result = smsVerifyService.save(smsVerifyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, smsVerifyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sms-verifies : get all the smsVerifies.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of smsVerifies in body
     */
    @GetMapping("/sms-verifies")
    @Timed
    public ResponseEntity<List<SmsVerifyDTO>> getAllSmsVerifies(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of SmsVerifies");
        Page<SmsVerifyDTO> page = smsVerifyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sms-verifies");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sms-verifies/:id : get the "id" smsVerify.
     *
     * @param id the id of the smsVerifyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the smsVerifyDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sms-verifies/{id}")
    @Timed
    public ResponseEntity<SmsVerifyDTO> getSmsVerify(@PathVariable Long id) {
        log.debug("REST request to get SmsVerify : {}", id);
        SmsVerifyDTO smsVerifyDTO = smsVerifyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(smsVerifyDTO));
    }

    /**
     * DELETE  /sms-verifies/:id : delete the "id" smsVerify.
     *
     * @param id the id of the smsVerifyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sms-verifies/{id}")
    @Timed
    public ResponseEntity<Void> deleteSmsVerify(@PathVariable Long id) {
        log.debug("REST request to delete SmsVerify : {}", id);
        smsVerifyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
