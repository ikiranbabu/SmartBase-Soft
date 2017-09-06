package com.smartsoft.repository;

import com.smartsoft.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.time.Instant;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmail(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    User findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    Page<User> findAllByLoginNot(Pageable pageable, String login);

    Optional<User> findOneByMobile(String mobile);

    Page<User> findAllByFirstNameLikeOrEmailLikeOrLoginLikeAndTenantId(Pageable pageable, String firstName, String email, String login, Long tenantId);

    User findById(Long id);

    @Query(value = "select u " +
        "from User u join u.authorities au " +
        "where au.name = :roleName and au.tenantId = :tenantId "
    )
    List<User> getAllUsersByRoleNameAndTenantId(@Param("roleName") String roleName, @Param("tenantId") Long tenantId);
}
