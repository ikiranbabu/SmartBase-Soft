package com.smartsoft.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A SmsVerify.
 */
@Entity
@Table(name = "sms_verify")
public class SmsVerify implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "verify_code")
    private String verifyCode;

    @Column(name = "verify_time")
    private ZonedDateTime verifyTime;

    @Column(name = "max_try_times")
    private Integer maxTryTimes;

    @Column(name = "status")
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public SmsVerify mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public SmsVerify verifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
        return this;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public ZonedDateTime getVerifyTime() {
        return verifyTime;
    }

    public SmsVerify verifyTime(ZonedDateTime verifyTime) {
        this.verifyTime = verifyTime;
        return this;
    }

    public void setVerifyTime(ZonedDateTime verifyTime) {
        this.verifyTime = verifyTime;
    }

    public Integer getMaxTryTimes() {
        return maxTryTimes;
    }

    public SmsVerify maxTryTimes(Integer maxTryTimes) {
        this.maxTryTimes = maxTryTimes;
        return this;
    }

    public void setMaxTryTimes(Integer maxTryTimes) {
        this.maxTryTimes = maxTryTimes;
    }

    public String getStatus() {
        return status;
    }

    public SmsVerify status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SmsVerify smsVerify = (SmsVerify) o;
        if (smsVerify.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, smsVerify.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SmsVerify{" +
            "id=" + id +
            ", mobile='" + mobile + "'" +
            ", verifyCode='" + verifyCode + "'" +
            ", verifyTime='" + verifyTime + "'" +
            ", maxTryTimes='" + maxTryTimes + "'" +
            ", status='" + status + "'" +
            '}';
    }
}
