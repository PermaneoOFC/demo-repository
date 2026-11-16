package br.com.permaneo.api.entity;

import br.com.permaneo.api.enums.Perfil;
import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    private Long id;
    private String nome;
    private String email;
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    private Perfil perfil;

    protected Usuario() {
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getSenhaHash() { return senhaHash; }
    public Perfil getPerfil() { return perfil; }
}
