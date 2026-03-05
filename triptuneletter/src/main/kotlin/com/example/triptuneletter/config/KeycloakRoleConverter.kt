package com.example.triptuneletter.config

import org.springframework.core.convert.converter.Converter
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt

@Suppress("UNCHECKED_CAST")
class KeycloakRoleConverter : Converter<Jwt, Collection<GrantedAuthority>> {
    override fun convert(jwt: Jwt): Collection<GrantedAuthority> {
        // Keycloak의 'realm_access' 클레임에서 roles 추출
        val realmAccess = jwt.claims["realm_access"] as? Map<String, Any> ?: return emptyList()
        val roles = realmAccess["roles"] as? List<String> ?: return emptyList()

        // ROLE_ 접두사를 붙여 SimpleGrantedAuthority 리스트로 변환
        return roles.map { roleName -> SimpleGrantedAuthority("ROLE_$roleName") }
    }

}