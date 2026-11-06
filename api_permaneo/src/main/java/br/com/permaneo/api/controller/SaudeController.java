package br.com.permaneo.api.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SaudeController {
    private final JdbcTemplate banco;

    public SaudeController(JdbcTemplate banco) {
        this.banco = banco;
    }

    @GetMapping("/api/saude")
    public Map<String, String> consultar() {
        banco.queryForObject("SELECT 1", Integer.class);
        return Map.of("status", "ok");
    }
}
