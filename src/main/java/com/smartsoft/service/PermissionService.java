package com.smartsoft.service;

import com.smartsoft.service.dto.PermissionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Permission.
 */
public interface PermissionService {

    /**
     * Save a permission.
     *
     * @param permissionDTO the entity to save
     * @return the persisted entity
     */
    PermissionDTO save(PermissionDTO permissionDTO);

    /**
     *  Get all the permissions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PermissionDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" permission.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PermissionDTO findOne(Long id);

    /**
     *  Delete the "id" permission.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
