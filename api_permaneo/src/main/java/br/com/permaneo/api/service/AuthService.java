package br.com.permaneo.api.service;

import br.com.permaneo.api.dto.LoginRequest;
import br.com.permaneo.api.dto.LoginResponse;
import br.com.permaneo.api.repository.UsuarioRepository;
import br.com.permaneo.api.security.SecurityConfig;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

@Service
public class AuthService {
    private final UsuarioRepository usuarios;
    private final PasswordEncoder senhas;
    private final JwtEncoder tokens;
    private final String hashSemConta;

    public AuthService(UsuarioRepository usuarios, PasswordEncoder senhas, JwtEncoder tokens) {
        this.usuarios = usuarios;
        this.senhas = senhas;
        this.tokens = tokens;
        this.hashSemConta = senhas.encode("conta-inexistente");
    }

    public LoginResponse entrar(LoginRequest request) {
        String email = request.email().strip().toLowerCase(Locale.ROOT);
        var usuario = usuarios.findByEmail(email).orElse(null);
        String hash = usuario == null ? hashSemConta : usuario.getSenhaHash();
        if (request.senha().getBytes(StandardCharsets.UTF_8).length > 72
                || !senhas.matches(request.senha(), hash) || usuario == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas.");
        }

        Instant agora = Instant.now();
        var claims = JwtClaimsSet.builder()
                .issuer(SecurityConfig.ISSUER)
                .subject(usuario.getId().toString())
                .issuedAt(agora)
                .expiresAt(agora.plus(1, ChronoUnit.HOURS))
                .claim("perfil", usuario.getPerfil().name())
                .build();
        var header = JwsHeader.with(MacAlgorithm.HS256).build();
        String token = tokens.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
        return new LoginResponse(token, usuario.getNome(), usuario.getPerfil());
    }
}
