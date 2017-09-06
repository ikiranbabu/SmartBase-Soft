package com.smartsoft.repository;

import com.smartsoft.domain.PersistentAuditEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

/**
 * Spring Data JPA repository for the PersistentAuditEvent entity.
 */
public interface PersistenceAuditEventRepository extends JpaRepository<PersistentAuditEvent, Long> {

    List<PersistentAuditEvent> findByPrincipalAndTenantId(String principal, Long tenantId);

    List<PersistentAuditEvent> findByAuditEventDateAfterAndTenantId(Instant after, Long tenantId);

    List<PersistentAuditEvent> findByPrincipalAndAuditEventDateAfterAndTenantId(String principal, Instant after, Long tenantId);

    List<PersistentAuditEvent> findByPrincipalAndAuditEventDateAfterAndAuditEventTypeAndTenantId(String principle, Instant after, String type, Long tenantId );

    Page<PersistentAuditEvent> findAllByAuditEventDateBetweenAndTenantId(Instant fromDate, Instant toDate, Long tenantId, Pageable pageable);


}
