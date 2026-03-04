@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/newsletters/*/publish").hasRole("ADMIN")
                .requestMatchers("/api/newsletters/**").permitAll()
                .anyRequest().authenticated()
        );

    return http.build();
}