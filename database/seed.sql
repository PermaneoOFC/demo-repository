-- Dados exclusivamente fictícios para um banco de demonstração.
-- Execute em um banco novo depois do schema.sql.
USE permaneo;
START TRANSACTION;

INSERT INTO usuarios (id, nome, email, senha_hash, perfil) VALUES
    (1, 'Coordenação Demo', 'direcao@permaneo.example', '$2b$12$JZ7CvGQV2XwBC3GmVmYAg.GedqcWQrAgu.QMHsGdou.pQVMV0M3Uu', 'DIRECAO'),
    (2, 'Professor Demo', 'professor@permaneo.example', '$2b$12$G1dZSSdRaMgFFX9HXFG3BeCPcnAvGyWkNoRFEMAxmyUrwhpfrqVJ6', 'PROFESSOR'),
    (3, 'Estudante Demo', 'estudante@permaneo.example', '$2b$12$w96fekk7Wc4DDN1ZXiCuzuA/v3aYbdpT1ukCaHlJdOwdkYGMpxrrm', 'ESTUDANTE'),
    (4, 'Estudante de Outra Turma', 'outra-turma@permaneo.example', '$2b$12$Fhx/tJujyKrJ.reql11WROmNawUeyWB3W1nHyAMUwFtqPcLcQ/NI6', 'ESTUDANTE'),
    (5, 'Professora de Outra Turma', 'outra-professora@permaneo.example', '$2b$12$pXkhK4mjai3MFns4ayPzEOUWfoSLOEAH/zAmDpKwYz1bGQnlEYIkW', 'PROFESSOR');

INSERT INTO turmas (id, nome, professor_id) VALUES
    (1, '9º A', 2),
    (2, '8º A', 5);

INSERT INTO matriculas (turma_id, estudante_id) VALUES
    (1, 3),
    (2, 4);

INSERT INTO frequencias (id, turma_id, estudante_id, componente, data_aula, situacao) VALUES
    (1, 1, 3, 'Matemática', '2026-10-19', 'AUSENTE'),
    (2, 1, 3, 'Matemática', '2026-10-21', 'AUSENTE'),
    (3, 1, 3, 'Matemática', '2026-10-23', 'NAO_REGISTRADA'),
    (4, 1, 3, 'Língua Portuguesa', '2026-10-22', 'PRESENTE'),
    (5, 2, 4, 'Matemática', '2026-10-23', 'JUSTIFICADA');

COMMIT;
