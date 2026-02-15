package com.example.library_management_system.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey key;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // ✅ Correct method for 0.11.5
    public String generateToken(String username, String role) {

        return Jwts.builder()
                .setSubject(username)                 // ✔ NOT subject()
                .claim("role", role)
                .setIssuedAt(new Date())              // ✔ NOT issuedAt()
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(key, SignatureAlgorithm.HS256)  // ✔ Must specify algorithm
                .compact();
    }

    // ✅ Correct parser for 0.11.5
    public String extractUsername(String token) {

        Claims claims = Jwts.parserBuilder()          // ✔ NOT parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean isValid(String token, String username) {
        return extractUsername(token).equals(username);
    }
}
