package com.smartsoft.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Code.
 */
@Entity
@Table(name = "code")
public class Code extends BaseDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "code", length = 30, nullable = false)
    private String code;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @NotNull
    @Column(name = "seq_num", nullable = false)
    private Integer seqNum;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "code_group_code", referencedColumnName = "code")
    @NotNull
    private CodeGroup codeGroup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Code createBy(String createBy) {
        this.createBy = createBy;
        return this;
    }

    public Code createDate(ZonedDateTime createDate) {
        this.createDate = createDate;
        return this;
    }

    public Code updateBy(String updateBy) {
        this.updateBy = updateBy;
        return this;
    }

    public Code updateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public Code version(Integer version) {
        this.version = version;
        return this;
    }

    public String getCode() {
        return code;
    }

    public Code code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public Code name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSeqNum() {
        return seqNum;
    }

    public Code seqNum(Integer seqNum) {
        this.seqNum = seqNum;
        return this;
    }

    public void setSeqNum(Integer seqNum) {
        this.seqNum = seqNum;
    }

    public String getDescription() {
        return description;
    }

    public Code description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public Code tenantId(Long tenantId) {
        this.tenantId = tenantId;
        return this;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public CodeGroup getCodeGroup() {
        return codeGroup;
    }

    public Code codeGroup(CodeGroup codeGroup) {
        this.codeGroup = codeGroup;
        return this;
    }

    public void setCodeGroup(CodeGroup codeGroup) {
        this.codeGroup = codeGroup;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Code code = (Code) o;
        if (code.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, code.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Code{" +
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
