package br.com.permaneo.api.dto;

import br.com.permaneo.api.entity.Frequencia;
import br.com.permaneo.api.enums.SituacaoFrequencia;

import java.time.LocalDate;

public record FrequenciaResponse(
        Long id, LocalDate dataAula, String componente,
        String turma, String estudante, SituacaoFrequencia situacao
) {
    public static FrequenciaResponse de(Frequencia frequencia) {
        return new FrequenciaResponse(
                frequencia.getId(), frequencia.getDataAula(), frequencia.getComponente(),
                frequencia.getTurma().getNome(), frequencia.getEstudante().getNome(), frequencia.getSituacao()
        );
    }
}
