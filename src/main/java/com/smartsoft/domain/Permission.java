package com.smartsoft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.smartsoft.security.SecurityUtils;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Permission.
 */
@Entity
@Table(name = "permission")
public class Permission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

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

    @ManyToMany
    @JoinTable(name = "permission_resource",
        joinColumns = @JoinColumn(name="permissions_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="resources_id", referencedColumnName="id"))
    private Set<Resource> resources = new HashSet<>();

    @ManyToMany(mappedBy = "permissions")
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    @ManyToOne
    private PermissionGroup permissionGroup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Permission name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public Permission code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public Permission resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public Permission addResource(Resource resource) {
        this.resources.add(resource);
        resource.getPermissions().add(this);
        return this;
    }

    public Permission removeResource(Resource resource) {
        this.resources.remove(resource);
        resource.getPermissions().remove(this);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Permission roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public Permission addRole(Role role) {
        this.roles.add(role);
        role.getPermissions().add(this);
        return this;
    }

    public Permission removeRole(Role role) {
        this.roles.remove(role);
        role.getPermissions().remove(this);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public PermissionGroup getPermissionGroup() {
        return permissionGroup;
    }

    public Permission permissionGroup(PermissionGroup permissionGroup) {
        this.permissionGroup = permissionGroup;
        return this;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public void setPermissionGroup(PermissionGroup permissionGroup) {
        this.permissionGroup = permissionGroup;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Permission permission = (Permission) o;
        if (permission.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, permission.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Permission{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", code='" + code + "'" +
            '}';
    }
}
