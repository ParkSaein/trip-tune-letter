package com.triptuneletter.backend.auth.repository;

import com.triptuneletter.backend.auth.entity.Member;
import com.triptuneletter.backend.auth.entity.Status;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    Optional<Member> findByEmail(String email);

    Optional<Member> findByEmailAndStatus(String email, Status status);
}
