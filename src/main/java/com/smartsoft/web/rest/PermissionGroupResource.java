package com.smartsoft.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.smartsoft.domain.Permission;
import com.smartsoft.repository.PermissionRepository;
import com.smartsoft.security.SecurityUtils;
import com.smartsoft.service.PermissionGroupService;
import com.smartsoft.web.rest.util.HeaderUtil;
import com.smartsoft.web.rest.util.PaginationUtil;
import com.smartsoft.service.dto.PermissionGroupDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * REST controller for managing PermissionGroup.
 */
@RestController
@RequestMapping("/api")
public class PermissionGroupResource {

    private final Logger log = LoggerFactory.getLogger(PermissionGroupResource.class);

    private static final String ENTITY_NAME = "permissionGroup";

    private final PermissionGroupService permissionGroupService;

    @Autowired
    private PermissionRepository permissionRepository;

    public PermissionGroupResource(PermissionGroupService permissionGroupService) {
        this.permissionGroupService = permissionGroupService;
    }

    /**
     * POST  /permission-groups : Create a new permissionGroup.
     *
     * @param permissionGroupDTO the permissionGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new permissionGroupDTO, or with status 400 (Bad Request) if the permissionGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/permission-groups")
    @Timed
    public ResponseEntity<PermissionGroupDTO> createPermissionGroup(@RequestBody PermissionGroupDTO permissionGroupDTO) throws URISyntaxException {
        log.debug("REST request to save PermissionGroup : {}", permissionGroupDTO);
        if (permissionGroupDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new permissionGroup cannot already have an ID")).body(null);
        }
        PermissionGroupDTO result = permissionGroupService.save(permissionGroupDTO);
        return ResponseEntity.created(new URI("/api/permission-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /permission-groups : Updates an existing permissionGroup.
     *
     * @param permissionGroupDTO the permissionGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated permissionGroupDTO,
     * or with status 400 (Bad Request) if the permissionGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the permissionGroupDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/permission-groups")
    @Timed
    public ResponseEntity<PermissionGroupDTO> updatePermissionGroup(@RequestBody PermissionGroupDTO permissionGroupDTO) throws URISyntaxException {
        log.debug("REST request to update PermissionGroup : {}", permissionGroupDTO);
        if (permissionGroupDTO.getId() == null) {
            return createPermissionGroup(permissionGroupDTO);
        }
        PermissionGroupDTO result = permissionGroupService.save(permissionGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, permissionGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /permission-groups : get all the permissionGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of permissionGroups in body
     */
    @GetMapping("/permission-groups")
    @Timed
    public ResponseEntity<List<PermissionGroupDTO>> getAllPermissionGroups(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of PermissionGroups");
        Page<PermissionGroupDTO> page = permissionGroupService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/permission-groups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /permission-groups/:id : get the "id" permissionGroup.
     *
     * @param id the id of the permissionGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the permissionGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/permission-groups/{id}")
    @Timed
    public ResponseEntity<PermissionGroupDTO> getPermissionGroup(@PathVariable Long id) {
        log.debug("REST request to get PermissionGroup : {}", id);
        PermissionGroupDTO permissionGroupDTO = permissionGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(permissionGroupDTO));
    }

    /**
     * DELETE  /permission-groups/:id : delete the "id" permissionGroup.
     *
     * @param id the id of the permissionGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/permission-groups/{id}")
    @Timed
    public ResponseEntity<Void> deletePermissionGroup(@PathVariable Long id) {
        log.debug("REST request to delete PermissionGroup : {}", id);
        List<Permission> list = permissionRepository.findByPermissionGroupIdAndTenantId(id, SecurityUtils.getCurrentUserTenantId());
        if (list.size() > 0) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "permissionGroupIdExits", "you have used it in permission")).body(null);
        } else {
            permissionGroupService.delete(id);
            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        }

    }
}
