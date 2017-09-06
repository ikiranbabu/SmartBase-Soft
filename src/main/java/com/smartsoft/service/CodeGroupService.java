package com.smartsoft.service;

import com.smartsoft.domain.CodeGroup;
import com.smartsoft.repository.CodeGroupRepository;
import com.smartsoft.security.SecurityUtils;
import com.smartsoft.service.dto.CodeGroupDTO;
import com.smartsoft.service.mapper.CodeGroupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing CodeGroup.
 */
@Service
@Transactional
public class CodeGroupService {

    private final Logger log = LoggerFactory.getLogger(CodeGroupService.class);

    private final CodeGroupRepository codeGroupRepository;

    private final CodeGroupMapper codeGroupMapper;

    public CodeGroupService(CodeGroupRepository codeGroupRepository, CodeGroupMapper codeGroupMapper) {
        this.codeGroupRepository = codeGroupRepository;
        this.codeGroupMapper = codeGroupMapper;
    }

    /**
     * Save a codeGroup.
     *
     * @param codeGroupDTO the entity to save
     * @return the persisted entity
     */
    public CodeGroupDTO save(CodeGroupDTO codeGroupDTO) {
        log.debug("Request to save CodeGroup : {}", codeGroupDTO);
        CodeGroup codeGroup = codeGroupMapper.codeGroupDTOToCodeGroup(codeGroupDTO);
        codeGroup = codeGroupRepository.save(codeGroup);
        CodeGroupDTO result = codeGroupMapper.codeGroupToCodeGroupDTO(codeGroup);
        return result;
    }

    /**
     *  Get all the codeGroups.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CodeGroupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CodeGroups");
        Page<CodeGroup> result = codeGroupRepository.findAll(pageable);
        return result.map(codeGroup -> codeGroupMapper.codeGroupToCodeGroupDTO(codeGroup));
    }

    /**
     *  Get one codeGroup by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public CodeGroupDTO findOne(Long id) {
        log.debug("Request to get CodeGroup : {}", id);
        CodeGroup codeGroup = codeGroupRepository.findOne(id);
        CodeGroupDTO codeGroupDTO = codeGroupMapper.codeGroupToCodeGroupDTO(codeGroup);
        return codeGroupDTO;
    }

    /**
     *  Delete the  codeGroup by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CodeGroup : {}", id);
        codeGroupRepository.delete(id);
    }

    public CodeGroupDTO findByCode(String code) {
        CodeGroup codeGroup = codeGroupRepository.findByCodeAndTenantId(code,SecurityUtils.getCurrentUserTenantId());
        return codeGroupMapper.codeGroupToCodeGroupDTO(codeGroup);
    }
}
