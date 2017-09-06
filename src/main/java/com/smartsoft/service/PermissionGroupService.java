package com.smartsoft.service;

import com.smartsoft.service.dto.PermissionGroupDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PermissionGroup.
 */
public interface PermissionGroupService {

    /**
     * Save a permissionGroup.
     *
     * @param permissionGroupDTO the entity to save
     * @return the persisted entity
     */
    PermissionGroupDTO save(PermissionGroupDTO permissionGroupDTO);

    /**
     *  Get all the permissionGroups.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PermissionGroupDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" permissionGroup.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PermissionGroupDTO findOne(Long id);

    /**
     *  Delete the "id" permissionGroup.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
