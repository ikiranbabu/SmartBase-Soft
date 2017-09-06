package com.smartsoft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.smartsoft.security.SecurityUtils;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PermissionGroup.
 */
@Entity
@Table(name = "permission_group")
public class PermissionGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "permissionGroup")
    @JsonIgnore
    private Set<Permission> permissions = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    //    @NotNull
    @Column(name = "tenant_id", nullable = false)
    protected Long tenantId;

    @PrePersist
    public void onPrePersist() {
        this.setTenantId(SecurityUtils.getCurrentUserTenantId());
        audit("INSERT");
    }

    private void audit(String operation) {
//        setOperation(operation);
//        setTimestamp((new Date()).getTime());
    }

    public PermissionGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public PermissionGroup description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public PermissionGroup permissions(Set<Permission> permissions) {
        this.permissions = permissions;
        return this;
    }

    public PermissionGroup addPermission(Permission permission) {
        this.permissions.add(permission);
        permission.setPermissionGroup(this);
        return this;
    }

    public PermissionGroup removePermission(Permission permission) {
        this.permissions.remove(permission);
        permission.setPermissionGroup(null);
        return this;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PermissionGroup permissionGroup = (PermissionGroup) o;
        if (permissionGroup.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, permissionGroup.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "PermissionGroup{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
