package br.com.permaneo.api.entity;

import br.com.permaneo.api.enums.SituacaoFrequencia;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "frequencias")
public class Frequencia {
    @Id
    private Long id;
    private LocalDate dataAula;
    private String componente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "turma_id")
    private Turma turma;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estudante_id")
    private Usuario estudante;

    @Enumerated(EnumType.STRING)
    private SituacaoFrequencia situacao;

    protected Frequencia() {
    }

    public Long getId() { return id; }
    public LocalDate getDataAula() { return dataAula; }
    public String getComponente() { return componente; }
    public Turma getTurma() { return turma; }
    public Usuario getEstudante() { return estudante; }
    public SituacaoFrequencia getSituacao() { return situacao; }

    public void registrar(SituacaoFrequencia situacao) {
        this.situacao = situacao;
    }
}
