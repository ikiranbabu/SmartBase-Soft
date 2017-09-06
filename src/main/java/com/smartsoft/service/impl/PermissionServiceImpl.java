package com.smartsoft.service.impl;

import com.smartsoft.security.SecurityUtils;
import com.smartsoft.service.PermissionService;
import com.smartsoft.domain.Permission;
import com.smartsoft.repository.PermissionRepository;
import com.smartsoft.service.dto.PermissionDTO;
import com.smartsoft.service.mapper.PermissionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing Permission.
 */
@Service
@Transactional
public class PermissionServiceImpl implements PermissionService{

    private final Logger log = LoggerFactory.getLogger(PermissionServiceImpl.class);

    private final PermissionRepository permissionRepository;

    private final PermissionMapper permissionMapper;

    public PermissionServiceImpl(PermissionRepository permissionRepository, PermissionMapper permissionMapper) {
        this.permissionRepository = permissionRepository;
        this.permissionMapper = permissionMapper;
    }

    /**
     * Save a permission.
     *
     * @param permissionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PermissionDTO save(PermissionDTO permissionDTO) {
        log.debug("Request to save Permission : {}", permissionDTO);
        Permission permission = permissionMapper.permissionDTOToPermission(permissionDTO);
        permission = permissionRepository.save(permission);
        PermissionDTO result = permissionMapper.permissionToPermissionDTO(permission);
        return result;
    }

    /**
     *  Get all the permissions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PermissionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Permissions");
        Page<Permission> result = permissionRepository.findByTenantId(SecurityUtils.getCurrentUserTenantId(), pageable);
        return result.map(permission -> permissionMapper.permissionToPermissionDTO(permission));
    }

    /**
     *  Get one permission by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PermissionDTO findOne(Long id) {
        log.debug("Request to get Permission : {}", id);
        Permission permission = permissionRepository.findOneWithEagerRelationships(id);
        PermissionDTO permissionDTO = permissionMapper.permissionToPermissionDTO(permission);
        return permissionDTO;
    }

    /**
     *  Delete the  permission by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Permission : {}", id);
        permissionRepository.delete(id);
    }
}
