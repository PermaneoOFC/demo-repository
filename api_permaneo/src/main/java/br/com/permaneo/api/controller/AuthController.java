package br.com.permaneo.api.controller;

import br.com.permaneo.api.dto.LoginRequest;
import br.com.permaneo.api.dto.LoginResponse;
import br.com.permaneo.api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> entrar(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(auth.entrar(request));
    }
}
