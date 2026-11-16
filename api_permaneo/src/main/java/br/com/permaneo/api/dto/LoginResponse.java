package br.com.permaneo.api.dto;

import br.com.permaneo.api.enums.Perfil;

public record LoginResponse(String token, String nome, Perfil perfil) {}
