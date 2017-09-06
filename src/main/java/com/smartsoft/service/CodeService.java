package com.smartsoft.service;

import com.smartsoft.domain.Code;
import com.smartsoft.domain.CodeGroup;
import com.smartsoft.repository.CodeGroupRepository;
import com.smartsoft.repository.CodeRepository;
import com.smartsoft.service.dto.CodeDTO;
import com.smartsoft.service.mapper.CodeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Code.
 */
@Service
@Transactional
public class CodeService {

    private final Logger log = LoggerFactory.getLogger(CodeService.class);

    private final CodeRepository codeRepository;

    private final CodeMapper codeMapper;

    @Autowired
    private CodeGroupRepository codeGroupRepository;

    public CodeService(CodeRepository codeRepository, CodeMapper codeMapper) {
        this.codeRepository = codeRepository;
        this.codeMapper = codeMapper;
    }

    /**
     * Save a code.
     *
     * @param codeDTO the entity to save
     * @return the persisted entity
     */
    public CodeDTO save(CodeDTO codeDTO) {
        log.debug("Request to save Code : {}", codeDTO);
        Code code = codeMapper.codeDTOToCode(codeDTO);
        CodeGroup codeGroup = codeGroupRepository.findOne(code.getCodeGroup().getId());
        code.setCodeGroup(codeGroup);
        code = codeRepository.save(code);
        CodeDTO result = codeMapper.codeToCodeDTO(code);
        return result;
    }

    /**
     *  Get all the codes.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CodeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Codes");
        Page<Code> result = codeRepository.findAll(pageable);
        return result.map(code -> codeMapper.codeToCodeDTO(code));
    }

    /**
     *  Get one code by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public CodeDTO findOne(Long id) {
        log.debug("Request to get Code : {}", id);
        Code code = codeRepository.findOne(id);
        CodeDTO codeDTO = codeMapper.codeToCodeDTO(code);
        return codeDTO;
    }

    /**
     *  Delete the  code by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Code : {}", id);
        codeRepository.delete(id);
    }

    public CodeDTO findByCodeAndCodeGroupCode(String code, String codeGroupCode) {
        log.debug("Request to get Code : {}, codeGroupCode: {}", code, codeGroupCode);

        Code c = codeRepository.findByCodeAndCodeGroupCode(code, codeGroupCode);
        CodeDTO codeDTO = codeMapper.codeToCodeDTO(c);
        return codeDTO;
    }

    public List<CodeDTO> findByGroupCode(String groupCode) {
        List<Code> result = codeRepository.findByCodeGroupCode(groupCode);
        return codeMapper.codesToCodeDTOs(result);
    }
    public List<CodeDTO> findByGroupCodeAsc(String groupCode) {
        List<Code> result = codeRepository.findByCodeGroupCodeAsc(groupCode);
        return codeMapper.codesToCodeDTOs(result);
    }
}
