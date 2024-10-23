package com.Kosten.Api_Rest.model;

import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserResponseDto;
import com.Kosten.Api_Rest.dto.user.UserRoleUpdateRequestDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "app_user", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username", unique = true, nullable = false)
    private String username;
    private String password;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    private String contact;
    @Enumerated(EnumType.STRING)
    Role role;
    @Column(name = "is_active")
    private Boolean isActive;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_package",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "package_id", referencedColumnName = "id")
    )
    private Set<Departure> departures = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));

    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() { return UserDetails.super.isCredentialsNonExpired(); }

    @Override
    public boolean isEnabled() { return UserDetails.super.isEnabled(); }

    public User update(UpdateUserRequestDto updateUserRequestDto) {
        if (updateUserRequestDto.email() != null)
            this.email = updateUserRequestDto.email();

        if (updateUserRequestDto.username() != null)
            this.username = updateUserRequestDto.username();

        if (updateUserRequestDto.contact() != null)
            this.contact = updateUserRequestDto.contact();

        return this;
    }

    public boolean isChangedRole(UserRoleUpdateRequestDto changeUserRole){
        if(changeUserRole != null)
            this.role = Role.valueOf(changeUserRole.role());
        return true;
    }
}
