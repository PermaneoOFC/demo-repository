package br.com.permaneo.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "turmas")
public class Turma {
    @Id
    private Long id;
    private String nome;
    private Long professorId;

    protected Turma() {
    }

    public String getNome() { return nome; }
    public Long getProfessorId() { return professorId; }
}
