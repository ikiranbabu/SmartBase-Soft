package com.smartsoft.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.smartsoft.security.SecurityUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Resource.
 */
@Entity
@Table(name = "resource")
public class Resource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "name")
    private String name;

    @Column(name = "request_method")
    private String requestMethod;

    @NotNull
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

    @ManyToMany(mappedBy = "resources")
    @JsonIgnore
    private Set<Permission> permissions = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Resource url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public Resource name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRequestMethod() {
        return requestMethod;
    }

    public Resource requestMethod(String requestMethod) {
        this.requestMethod = requestMethod;
        return this;
    }

    public void setRequestMethod(String requestMethod) {
        this.requestMethod = requestMethod;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Resource permissions(Set<Permission> permissions) {
        this.permissions = permissions;
        return this;
    }

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public Resource addPermission(Permission permission) {
        this.permissions.add(permission);
        permission.getResources().add(this);
        return this;
    }

    public Resource removePermission(Permission permission) {
        this.permissions.remove(permission);
        permission.getResources().remove(this);
        return this;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Resource resource = (Resource) o;
        if (resource.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, resource.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Resource{" +
            "id=" + id +
            ", url='" + url + "'" +
            ", name='" + name + "'" +
            ", requestMethod='" + requestMethod + "'" +
            '}';
    }
}
