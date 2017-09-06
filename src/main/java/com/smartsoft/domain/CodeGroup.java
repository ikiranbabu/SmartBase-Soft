package com.smartsoft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CodeGroup.
 */
@Entity
@Table(name = "code_group")
public class CodeGroup extends BaseDomain implements Serializable {

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

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    @OneToMany(mappedBy = "codeGroup")
    @JsonIgnore
    private Set<Code> codes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CodeGroup createBy(String createBy) {
        this.createBy = createBy;
        return this;
    }

    public CodeGroup createDate(ZonedDateTime createDate) {
        this.createDate = createDate;
        return this;
    }

    public CodeGroup updateBy(String updateBy) {
        this.updateBy = updateBy;
        return this;
    }

    public CodeGroup updateDate(ZonedDateTime updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public CodeGroup version(Integer version) {
        this.version = version;
        return this;
    }

    public String getCode() {
        return code;
    }

    public CodeGroup code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public CodeGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public CodeGroup tenantId(Long tenantId) {
        this.tenantId = tenantId;
        return this;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public String getDescription() {
        return description;
    }

    public CodeGroup description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Code> getCodes() {
        return codes;
    }

    public CodeGroup codes(Set<Code> codes) {
        this.codes = codes;
        return this;
    }

    public CodeGroup addCode(Code code) {
        this.codes.add(code);
        code.setCodeGroup(this);
        return this;
    }

    public CodeGroup removeCode(Code code) {
        this.codes.remove(code);
        code.setCodeGroup(null);
        return this;
    }

    public void setCodes(Set<Code> codes) {
        this.codes = codes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CodeGroup codeGroup = (CodeGroup) o;
        if (codeGroup.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, codeGroup.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "CodeGroup{" +
            "id=" + id +
            ", createBy='" + createBy + "'" +
            ", createDate='" + createDate + "'" +
            ", updateBy='" + updateBy + "'" +
            ", updateDate='" + updateDate + "'" +
            ", version='" + version + "'" +
            ", code='" + code + "'" +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
