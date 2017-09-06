package com.smartsoft.service;

import com.smartsoft.service.dto.RoleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Role.
 */
public interface RoleService {

    /**
     * Save a role.
     *
     * @param roleDTO the entity to save
     * @return the persisted entity
     */
    RoleDTO save(RoleDTO roleDTO);

    /**
     *  Get all the roles.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<RoleDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" role.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    RoleDTO findOne(Long id);

    /**
     *  Delete the "id" role.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
