package com.smartsoft.repository;

import com.smartsoft.domain.Code;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Code entity.
 */
@SuppressWarnings("unused")
public interface CodeRepository extends JpaRepository<Code,Long> {

    Code findByCodeAndCodeGroupCode(String code, String codeGroupCode);

    @Query(value = "select c from Code c join c.codeGroup cg " +
        "where cg.code = :groupCode and cg.tenantId = :tenantId and c.tenantId = :tenantId ")
    List<Code> findByGroupCodeAndTenantId(@Param("groupCode")String groupCode, @Param("tenantId")Long tenantId);

    List<Code> findByCodeGroupCode(String groupCode);

    @Query(value = "select c from Code c join c.codeGroup cg " +
        "where cg.code = :groupCode " +
        "order by c.seqNum asc")
    List<Code> findByCodeGroupCodeAsc(@Param("groupCode")String groupCode);
}
