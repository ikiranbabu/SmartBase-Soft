package com.smartsoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.smartsoft.service.CodeGroupService;
import com.smartsoft.web.rest.util.HeaderUtil;
import com.smartsoft.web.rest.util.PaginationUtil;
import com.smartsoft.service.dto.CodeGroupDTO;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CodeGroup.
 */
@RestController
@RequestMapping("/api")
public class CodeGroupResource {

    private final Logger log = LoggerFactory.getLogger(CodeGroupResource.class);

    private static final String ENTITY_NAME = "codeGroup";

    private final CodeGroupService codeGroupService;

    public CodeGroupResource(CodeGroupService codeGroupService) {
        this.codeGroupService = codeGroupService;
    }

    /**
     * POST  /code-groups : Create a new codeGroup.
     *
     * @param codeGroupDTO the codeGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new codeGroupDTO, or with status 400 (Bad Request) if the codeGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/code-groups")
    @Timed
    public ResponseEntity<CodeGroupDTO> createCodeGroup(@Valid @RequestBody CodeGroupDTO codeGroupDTO) throws URISyntaxException {
        log.debug("REST request to save CodeGroup : {}", codeGroupDTO);
        if (codeGroupDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new codeGroup cannot already have an ID")).body(null);
        }
        CodeGroupDTO result = codeGroupService.save(codeGroupDTO);
        return ResponseEntity.created(new URI("/api/code-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /code-groups : Updates an existing codeGroup.
     *
     * @param codeGroupDTO the codeGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated codeGroupDTO,
     * or with status 400 (Bad Request) if the codeGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the codeGroupDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/code-groups")
    @Timed
    public ResponseEntity<CodeGroupDTO> updateCodeGroup(@Valid @RequestBody CodeGroupDTO codeGroupDTO) throws URISyntaxException {
        log.debug("REST request to update CodeGroup : {}", codeGroupDTO);
        if (codeGroupDTO.getId() == null) {
            return createCodeGroup(codeGroupDTO);
        }
        CodeGroupDTO result = codeGroupService.save(codeGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, codeGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /code-groups : get all the codeGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of codeGroups in body
     */
    @GetMapping("/code-groups")
    @Timed
    public ResponseEntity<List<CodeGroupDTO>> getAllCodeGroups(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CodeGroups");
        Page<CodeGroupDTO> page = codeGroupService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/code-groups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /code-groups/:id : get the "id" codeGroup.
     *
     * @param id the id of the codeGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the codeGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/code-groups/{id}")
    @Timed
    public ResponseEntity<CodeGroupDTO> getCodeGroup(@PathVariable Long id) {
        log.debug("REST request to get CodeGroup : {}", id);
        CodeGroupDTO codeGroupDTO = codeGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(codeGroupDTO));
    }

    /**
     * GET  /code-groups/validate/:code : get the "code" codeGroup.
     *
     * @param code the code of the codeGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the codeGroupDTO
     */
    @GetMapping("/code-groups/validate/{code}")
    @Timed
    public ResponseEntity<CodeGroupDTO> getCodeGroup(@PathVariable String code) {
        log.debug("REST request to get CodeGroup : {}", code);
        CodeGroupDTO codeGroupDTO = codeGroupService.findByCode(code);
//        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(codeGroupDTO));
        return ResponseEntity.ok().body(codeGroupDTO);
    }


    /**
     * DELETE  /code-groups/:id : delete the "id" codeGroup.
     *
     * @param id the id of the codeGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/code-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteCodeGroup(@PathVariable Long id) {
        log.debug("REST request to delete CodeGroup : {}", id);
        codeGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
