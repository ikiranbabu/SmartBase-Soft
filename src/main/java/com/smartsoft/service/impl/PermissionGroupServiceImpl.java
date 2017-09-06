package com.smartsoft.service.impl;

import com.smartsoft.security.SecurityUtils;
import com.smartsoft.service.PermissionGroupService;
import com.smartsoft.domain.PermissionGroup;
import com.smartsoft.repository.PermissionGroupRepository;
import com.smartsoft.service.dto.PermissionGroupDTO;
import com.smartsoft.service.mapper.PermissionGroupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing PermissionGroup.
 */
@Service
@Transactional
public class PermissionGroupServiceImpl implements PermissionGroupService{

    private final Logger log = LoggerFactory.getLogger(PermissionGroupServiceImpl.class);

    private final PermissionGroupRepository permissionGroupRepository;

    private final PermissionGroupMapper permissionGroupMapper;

    public PermissionGroupServiceImpl(PermissionGroupRepository permissionGroupRepository, PermissionGroupMapper permissionGroupMapper) {
        this.permissionGroupRepository = permissionGroupRepository;
        this.permissionGroupMapper = permissionGroupMapper;
    }

    /**
     * Save a permissionGroup.
     *
     * @param permissionGroupDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PermissionGroupDTO save(PermissionGroupDTO permissionGroupDTO) {
        log.debug("Request to save PermissionGroup : {}", permissionGroupDTO);
        PermissionGroup permissionGroup = permissionGroupMapper.permissionGroupDTOToPermissionGroup(permissionGroupDTO);
        permissionGroup = permissionGroupRepository.save(permissionGroup);
        PermissionGroupDTO result = permissionGroupMapper.permissionGroupToPermissionGroupDTO(permissionGroup);
        return result;
    }

    /**
     *  Get all the permissionGroups.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PermissionGroupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PermissionGroups");
        Page<PermissionGroup> result = permissionGroupRepository.findByTenantId(SecurityUtils.getCurrentUserTenantId(), pageable);
        return result.map(permissionGroup -> permissionGroupMapper.permissionGroupToPermissionGroupDTO(permissionGroup));
    }

    /**
     *  Get one permissionGroup by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PermissionGroupDTO findOne(Long id) {
        log.debug("Request to get PermissionGroup : {}", id);
        PermissionGroup permissionGroup = permissionGroupRepository.findOne(id);
        PermissionGroupDTO permissionGroupDTO = permissionGroupMapper.permissionGroupToPermissionGroupDTO(permissionGroup);
        return permissionGroupDTO;
    }

    /**
     *  Delete the  permissionGroup by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PermissionGroup : {}", id);
        permissionGroupRepository.delete(id);
    }
}
