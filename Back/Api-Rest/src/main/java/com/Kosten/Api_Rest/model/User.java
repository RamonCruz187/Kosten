package com.Kosten.Api_Rest.model;

import com.Kosten.Api_Rest.dto.user.UpdateUserRequestDto;
import com.Kosten.Api_Rest.dto.user.UserRoleUpdateRequestDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.*;

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
    private String resetToken;

    private Boolean payment;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinTable(
            name = "departure_user",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "departure_id", referencedColumnName = "id")
    )
    private List<Departure> departures = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));

    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getName() {
        return username;
    }

    public String getRole1() {
        return role.name();
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { return UserDetails.super.isAccountNonLocked(); }

    @Override
    public boolean isCredentialsNonExpired() { return UserDetails.super.isCredentialsNonExpired(); }

    @Override
    public boolean isEnabled() { return isActive; }

    public User update(UpdateUserRequestDto updateUserRequestDto) {
        if (updateUserRequestDto.email() != null)
            this.email = updateUserRequestDto.email();

        if (updateUserRequestDto.username() != null)
            this.username = updateUserRequestDto.username();

        if (updateUserRequestDto.contact() != null)
            this.contact = updateUserRequestDto.contact();

        if (updateUserRequestDto.payment() != null)
            this.payment = updateUserRequestDto.payment();

        return this;
    }

    public boolean isChangedRole(UserRoleUpdateRequestDto changeUserRole){
        if(changeUserRole != null)
            this.role = Role.valueOf(changeUserRole.role());
        return true;
    }

    public void delete() {
        this.isActive = false;
    }
}
