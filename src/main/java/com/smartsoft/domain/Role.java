package com.smartsoft.domain;


import com.smartsoft.security.SecurityUtils;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    //    @NotNull
    @Column(name = "tenant_id")
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

    @ManyToMany
    @JoinTable(name = "role_permission",
        joinColumns = @JoinColumn(name="roles_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="permissions_id", referencedColumnName="id"))
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

    public Role name(String name) {
        this.name = name;
        return this;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Role permissions(Set<Permission> permissions) {
        this.permissions = permissions;
        return this;
    }

    public Role addPermission(Permission permission) {
        this.permissions.add(permission);
        permission.getRoles().add(this);
        return this;
    }

    public Role removePermission(Permission permission) {
        this.permissions.remove(permission);
        permission.getRoles().remove(this);
        return this;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Role role = (Role) o;
        if (role.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, role.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
