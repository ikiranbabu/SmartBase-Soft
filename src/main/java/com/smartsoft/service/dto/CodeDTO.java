package com.smartsoft.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Code entity.
 */
public class CodeDTO implements Serializable {

    private Long id;

    @Size(max = 50)
    private String createBy;

    private ZonedDateTime createDate;

    @Size(max = 50)
    private String updateBy;

    private ZonedDateTime updateDate;

    private Integer version;

    @NotNull
    @Size(max = 30)
    private String code;

    @NotNull
    @Size(max = 50)
    private String name;

    @NotNull
    private Integer seqNum;

    private Long tenantId;

    @Size(max = 500)
    private String description;

    private Long codeGroupId;

    private String codeGroupCode;

    public Long getId() {
        return id;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public void setId(Long id) {
        this.id = id;
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
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Integer getSeqNum() {
        return seqNum;
    }

    public void setSeqNum(Integer seqNum) {
        this.seqNum = seqNum;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCodeGroupId() {
        return codeGroupId;
    }

    public void setCodeGroupId(Long codeGroupId) {
        this.codeGroupId = codeGroupId;
    }

    public String getCodeGroupCode() {
        return codeGroupCode;
    }

    public void setCodeGroupCode(String codeGroupCode) {
        this.codeGroupCode = codeGroupCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CodeDTO codeDTO = (CodeDTO) o;

        if ( ! Objects.equals(id, codeDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "CodeDTO{" +
            "id=" + id +
            ", createBy='" + createBy + "'" +
            ", createDate='" + createDate + "'" +
            ", updateBy='" + updateBy + "'" +
            ", updateDate='" + updateDate + "'" +
            ", version='" + version + "'" +
            ", code='" + code + "'" +
            ", name='" + name + "'" +
            ", seqNum='" + seqNum + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
