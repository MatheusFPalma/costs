import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../Layout/LinkButton'

function Home() {
    return(
    <section className={styles.home_container}>
        <h1>Bem vindo ao <span>Costs</span></h1>
        <p>Comece a gerenciar seus projetos agora!</p>
        <LinkButton to="/novoprojeto" text="Criar Projeto"/>
        <img src={savings} alt="Costs"/>
    </section>
)}

export default Home