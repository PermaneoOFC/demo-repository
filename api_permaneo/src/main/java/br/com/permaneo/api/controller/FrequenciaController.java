package br.com.permaneo.api.controller;

import br.com.permaneo.api.dto.FrequenciaRequest;
import br.com.permaneo.api.dto.FrequenciaResponse;
import br.com.permaneo.api.enums.Perfil;
import br.com.permaneo.api.service.FrequenciaService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/frequencia")
@SecurityRequirement(name = "bearerAuth")
public class FrequenciaController {
    private final FrequenciaService frequencia;

    public FrequenciaController(FrequenciaService frequencia) {
        this.frequencia = frequencia;
    }

    @GetMapping
    public List<FrequenciaResponse> listar(@AuthenticationPrincipal Jwt token) {
        return frequencia.listar(Long.valueOf(token.getSubject()), Perfil.valueOf(token.getClaimAsString("perfil")));
    }

    @PutMapping("/{id}")
    public FrequenciaResponse registrar(@PathVariable Long id, @AuthenticationPrincipal Jwt token,
                                       @Valid @RequestBody FrequenciaRequest request) {
        return frequencia.registrar(id, Long.valueOf(token.getSubject()),
                Perfil.valueOf(token.getClaimAsString("perfil")), request.situacao());
    }
}
