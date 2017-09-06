package com.smartsoft.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@Audited
@EntityListeners(AuditingEntityListener.class)
public class BaseDomain implements Serializable{

    private static final long serialVersionUID = 1L;

    @CreatedBy
    @Column(name = "create_by")
    protected String createBy;

    @LastModifiedBy
    @Column(name = "update_by")
    protected String updateBy;

    @CreatedDate
    @Column(name = "create_date")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ssZ")
    protected ZonedDateTime createDate;

    @LastModifiedDate
    @Column(name = "update_date")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ssZ")
    protected ZonedDateTime updateDate;

    @Version
    @Column(name = "version", nullable = false)
    protected Integer version;

    @Column(name = "tenant_id")
    protected Long tenantId;

    @PrePersist
    public void onPrePersist() {
        System.out.println(">>>> pre persist invoked <<<<");
        this.setTenantId(1L);
        audit("INSERT");
    }

    @PreUpdate
    public void onPreUpdate() {
        audit("UPDATE");
    }

    @PreRemove
    public void onPreRemove() {
        audit("DELETE");
    }

    private void audit(String operation) {
//        setOperation(operation);
//        setTimestamp((new Date()).getTime());
    }


    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public ZonedDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(ZonedDateTime createDate) {
        this.createDate = createDate;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public ZonedDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }
}
