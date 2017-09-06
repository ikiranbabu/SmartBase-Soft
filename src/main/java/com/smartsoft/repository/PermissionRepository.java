package com.smartsoft.repository;

import com.smartsoft.domain.Permission;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Permission entity.
 */
@SuppressWarnings("unused")
public interface PermissionRepository extends JpaRepository<Permission,Long> {

    @Query("select distinct permission from Permission permission left join fetch permission.resources")
    List<Permission> findAllWithEagerRelationships();

    @Query("select permission from Permission permission left join fetch permission.resources where permission.id =:id")
    Permission findOneWithEagerRelationships(@Param("id") Long id);

    Page<Permission> findByTenantId(Long tenantId, Pageable pageable);

    List<Permission> findByPermissionGroupIdAndTenantId(Long permissionGroupId, Long tenantId);

}
