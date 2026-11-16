import Button from '../../../components/ui/Button.jsx';
import { atencoes, categorias, dataFormatada, perfilDemo } from '../../../data/sala.js';
import styles from './LocalProfile.module.css';
export default function LocalProfile({student,records,onBack,onRecord,fromClassroom = false}){
 const observacoes = fromClassroom ? perfilDemo(student.id).observacoes : [];
 return <section className={styles.profile} data-local-content>
  <Button variant="secondary" onClick={onBack}>{fromClassroom ? 'Voltar à sala' : '← Carômetro'}</Button>
  <h1>{student.name}</h1><p>{student.className} · Dados fictícios de demonstração</p>
  <h2>Frequência</h2><p>Sem registros de presença.</p>
  <h2>Histórico de acompanhamento</h2>
  {records.length?records.map((record,index)=><article key={index}><b>{record.status}</b><p>{record.text}</p>{record.date&&<p>Próximo retorno: {record.date}</p>}</article>):<p>Nenhum registro disponível.</p>}
  {fromClassroom && <><h2>Observações dos professores</h2>
   {observacoes.length ? observacoes.map((nota) => <article key={nota.id}>
    <b>{categorias[nota.categoria]} · {atencoes[nota.atencao]}</b>
    <p>{nota.descricao}</p><p>{nota.autor} · {dataFormatada(nota.data)}</p>
   </article>) : <p>Nenhuma observação registrada.</p>}</>}
  <h2>Responsável e contato</h2><p>{student.guardian||'Responsável de demonstração'} · {student.contact||'Contato não informado'}</p>
  <Button onClick={onRecord}>Registrar acompanhamento</Button>
 </section>;
}
