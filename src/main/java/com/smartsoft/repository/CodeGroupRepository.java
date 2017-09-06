package com.smartsoft.repository;

import com.smartsoft.domain.CodeGroup;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the CodeGroup entity.
 */
@SuppressWarnings("unused")
public interface CodeGroupRepository extends JpaRepository<CodeGroup,Long> {

    CodeGroup findByCodeAndTenantId(String code, Long tenantId);
}
