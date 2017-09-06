package com.smartsoft.repository;

import com.smartsoft.domain.PermissionGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PermissionGroup entity.
 */
@SuppressWarnings("unused")
public interface PermissionGroupRepository extends JpaRepository<PermissionGroup,Long> {

    Page<PermissionGroup> findByTenantId(Long tenantId, Pageable pageable);

}
