package com.smartsoft.repository;

import com.smartsoft.domain.Permission;
import com.smartsoft.domain.Role;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Role entity.
 */
@SuppressWarnings("unused")
public interface RoleRepository extends JpaRepository<Role,Long> {

    @Query("select distinct role from Role role left join fetch role.permissions")
    List<Role> findAllWithEagerRelationships();

    @Query("select role from Role role left join fetch role.permissions where role.id =:id")
    Role findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select role from Role role where role.name = :name")
    Role findOne(@Param("name") String name);

    Page<Role> findByTenantId(Long tenantId, Pageable pageable);

    List<Role> findByPermissionsAndTenantId(Permission permission, Long tenantId);

}

