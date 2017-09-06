package com.smartsoft.repository;

import com.smartsoft.domain.SmsVerify;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;

/**
 * Spring Data JPA repository for the SmsVerify entity.
 */
@SuppressWarnings("unused")
public interface SmsVerifyRepository extends JpaRepository<SmsVerify,Long> {
    Optional<SmsVerify> findOneByMobile(String mobile);


}
