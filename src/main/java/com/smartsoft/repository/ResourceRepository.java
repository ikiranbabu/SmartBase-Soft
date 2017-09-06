package com.smartsoft.repository;

import com.smartsoft.domain.Resource;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Resource entity.
 */
@SuppressWarnings("unused")
public interface ResourceRepository extends JpaRepository<Resource,Long> {

    Page<Resource> findByTenantId(Long tenantId, Pageable pageable);

}
