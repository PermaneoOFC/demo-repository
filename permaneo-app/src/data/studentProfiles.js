import { demoStudents } from './students.js';

const attendanceByStudent = { Lucas: 78, Camila: 94, Isabela: 88, Eduardo: 96, Yasmin: 82, Livia: 98, AnaBeatriz: 86, Heitor: 90 };
export function getStudentProfile(key) {
  const student = demoStudents.find(item => item.key === key) || demoStudents[0];
  const attendance = attendanceByStudent[key] ?? 90;
  const familyName = student.name.split(' ').slice(-1)[0];
  const august = Math.round(attendance * .2);
  const september = Math.round(attendance * .3);
  return {
    ...student, attendance, totalLessons: 100, absences: 100 - attendance,
    registration: `2026-${String(demoStudents.indexOf(student) + 1).padStart(4, '0')}`,
    months: [
      { month: 'Agosto', total: 20, present: august },
      { month: 'Setembro', total: 30, present: september },
      { month: 'Outubro', total: 50, present: attendance - august - september },
    ],
    grades: [
      { subject: 'Língua portuguesa', teacher: 'Renata Oliveira', scores: [7, 7.5, 8] },
      { subject: 'Matemática', teacher: 'Paulo Ferreira', scores: [7.5, 7, 7.5] },
      { subject: 'Ciências', teacher: 'Juliana Costa', scores: [8, 8, 8.5] },
      { subject: 'História', teacher: 'Marina Alves', scores: [7.5, 8, 8] },
      { subject: 'Geografia', teacher: 'André Lima', scores: [8, 7.5, 8.5] },
    ],
    recentAttendance: ['08', '09', '13', '14', '15', '16', '19', '20', '21', '22'].map((day, index) => ({
      date: `${day}/10/2026`, absent: attendance < 85 && [1, 5, 7].includes(index),
      justified: index === 1, detail: index === 1 ? 'Justificativa familiar registrada' : 'Aguardando justificativa',
    })),
    observations: [
      { id: 'mock-1', date: '21/10/2026', author: 'Renata Oliveira', subject: 'Língua portuguesa', text: 'Participou da leitura em grupo e apresentou boas ideias. Combinamos a entrega da atividade de interpretação para a próxima aula.' },
      { id: 'mock-2', date: '19/10/2026', author: 'Paulo Ferreira', subject: 'Matemática', text: 'Demonstrou avanço na resolução de frações. Recomendo continuar os exercícios de revisão e procurar a monitoria quando precisar.' },
      { id: 'mock-3', date: '15/10/2026', author: 'Juliana Costa', subject: 'Ciências', text: 'Contribuiu com a atividade em equipe e concluiu o relatório da experiência dentro do prazo.' },
    ],
    alerts: [
      ...(attendance < 85 ? [{ id: 'frequency', title: 'Frequência precisa de atenção', text: `Presença de ${attendance}% nas 100 aulas registradas. Conferir justificativas e combinar apoio com o estudante e a família.`, status: 'Em acompanhamento', target: 'attendance' }] : []),
      { id: 'followup', title: 'Retorno de acompanhamento agendado', text: 'Conversa combinada para 23/10/2026, às 10h, com a professora Renata Oliveira. Revisar as ações acordadas.', status: 'Agendado', target: 'history' },
    ],
    history: [
      { date: '23/10/2026', author: 'Renata Oliveira · Professora', title: 'Conversa de retorno', text: 'Revisar o plano de apoio e ouvir o estudante sobre a rotina.', status: 'Agendado' },
      { date: '15/10/2026', author: 'Marina Alves · Coordenação', title: 'Plano de apoio combinado', text: 'Organizar as atividades pendentes e oferecer monitoria de matemática.', status: 'Concluído' },
      { date: '08/10/2026', author: 'Renata Oliveira · Professora', title: 'Escuta inicial com o estudante', text: 'Conversa sobre participação nas aulas e organização dos estudos.', status: 'Concluído' },
    ],
    guardians: [
      { name: `Adriana ${familyName}`, relation: 'Mãe · Responsável principal', phone: '(11) 9XXXX-0101', email: 'responsavel.1@example.com', availability: 'Dias úteis, das 18h às 20h' },
      { name: `Roberto ${familyName}`, relation: 'Pai · Responsável autorizado', phone: '(11) 9XXXX-0102', email: 'responsavel.2@example.com', availability: 'Dias úteis, das 12h às 14h' },
    ],
  };
}
