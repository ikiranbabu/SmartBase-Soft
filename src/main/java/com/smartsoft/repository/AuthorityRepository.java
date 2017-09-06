package com.smartsoft.repository;

import com.smartsoft.domain.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Role entity.
 */
public interface AuthorityRepository extends JpaRepository<Role, String> {
    @Query("select role from Role role where role.name = :name")
    Role findOne(@Param("name") String name);
}
