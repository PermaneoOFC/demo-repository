package br.com.permaneo.api.service;

import br.com.permaneo.api.dto.FrequenciaResponse;
import br.com.permaneo.api.enums.Perfil;
import br.com.permaneo.api.enums.SituacaoFrequencia;
import br.com.permaneo.api.repository.FrequenciaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FrequenciaService {
    private final FrequenciaRepository frequencias;

    public FrequenciaService(FrequenciaRepository frequencias) {
        this.frequencias = frequencias;
    }

    @Transactional(readOnly = true)
    public List<FrequenciaResponse> listar(Long usuarioId, Perfil perfil) {
        var registros = switch (perfil) {
            case DIRECAO -> frequencias.findAllByOrderByDataAulaDescIdAsc();
            case PROFESSOR -> frequencias.findByTurmaProfessorIdOrderByDataAulaDescIdAsc(usuarioId);
            case ESTUDANTE -> frequencias.findByEstudanteIdOrderByDataAulaDescIdAsc(usuarioId);
        };
        return registros.stream().map(FrequenciaResponse::de).toList();
    }

    @Transactional
    public FrequenciaResponse registrar(Long id, Long usuarioId, Perfil perfil, SituacaoFrequencia situacao) {
        var registro = frequencias.findById(id)
                .filter(item -> perfil == Perfil.DIRECAO
                        || (perfil == Perfil.PROFESSOR && usuarioId.equals(item.getTurma().getProfessorId())))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro não encontrado."));
        registro.registrar(situacao);
        return FrequenciaResponse.de(registro);
    }
}
