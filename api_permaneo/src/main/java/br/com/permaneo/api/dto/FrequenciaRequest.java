package br.com.permaneo.api.dto;

import br.com.permaneo.api.enums.SituacaoFrequencia;
import jakarta.validation.constraints.NotNull;

public record FrequenciaRequest(@NotNull SituacaoFrequencia situacao) {}
