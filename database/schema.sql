CREATE DATABASE IF NOT EXISTS permaneo CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE permaneo;

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    senha_hash VARCHAR(60) NOT NULL,
    perfil ENUM('DIRECAO', 'PROFESSOR', 'ESTUDANTE') NOT NULL
);

CREATE TABLE IF NOT EXISTS turmas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    professor_id BIGINT NOT NULL,
    CONSTRAINT fk_turma_professor FOREIGN KEY (professor_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS matriculas (
    turma_id BIGINT NOT NULL,
    estudante_id BIGINT NOT NULL,
    PRIMARY KEY (turma_id, estudante_id),
    CONSTRAINT fk_matricula_turma FOREIGN KEY (turma_id) REFERENCES turmas(id),
    CONSTRAINT fk_matricula_estudante FOREIGN KEY (estudante_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS frequencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    turma_id BIGINT NOT NULL,
    estudante_id BIGINT NOT NULL,
    componente VARCHAR(100) NOT NULL,
    data_aula DATE NOT NULL,
    situacao ENUM('PRESENTE', 'AUSENTE', 'JUSTIFICADA', 'NAO_REGISTRADA') NOT NULL DEFAULT 'NAO_REGISTRADA',
    UNIQUE KEY uk_frequencia_aula (turma_id, estudante_id, data_aula, componente),
    INDEX idx_frequencia_estudante (estudante_id, data_aula),
    CONSTRAINT fk_frequencia_matricula FOREIGN KEY (turma_id, estudante_id)
        REFERENCES matriculas(turma_id, estudante_id)
);
