package com.smartsoft.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SmsVerify entity.
 */
public class SmsVerifyDTO implements Serializable {

    private Long id;

    private String mobile;

    private String verifyCode;

    private ZonedDateTime verifyTime;

    private Integer maxTryTimes;

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

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }
    public ZonedDateTime getVerifyTime() {
        return verifyTime;
    }

    public void setVerifyTime(ZonedDateTime verifyTime) {
        this.verifyTime = verifyTime;
    }
    public Integer getMaxTryTimes() {
        return maxTryTimes;
    }

    public void setMaxTryTimes(Integer maxTryTimes) {
        this.maxTryTimes = maxTryTimes;
    }
    public String getStatus() {
        return status;
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

        SmsVerifyDTO smsVerifyDTO = (SmsVerifyDTO) o;

        if ( ! Objects.equals(id, smsVerifyDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SmsVerifyDTO{" +
            "id=" + id +
            ", mobile='" + mobile + "'" +
            ", verifyCode='" + verifyCode + "'" +
            ", verifyTime='" + verifyTime + "'" +
            ", maxTryTimes='" + maxTryTimes + "'" +
            ", status='" + status + "'" +
            '}';
    }
}
