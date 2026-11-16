package br.com.permaneo.api.repository;

import br.com.permaneo.api.entity.Frequencia;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FrequenciaRepository extends JpaRepository<Frequencia, Long> {
    @EntityGraph(attributePaths = {"turma", "estudante"})
    List<Frequencia> findAllByOrderByDataAulaDescIdAsc();

    @EntityGraph(attributePaths = {"turma", "estudante"})
    List<Frequencia> findByTurmaProfessorIdOrderByDataAulaDescIdAsc(Long professorId);

    @EntityGraph(attributePaths = {"turma", "estudante"})
    List<Frequencia> findByEstudanteIdOrderByDataAulaDescIdAsc(Long estudanteId);
}
