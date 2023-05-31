import Message from "../Layout/Message";
import { useLocation} from "react-router-dom";
import styles from "./Projects.module.css"
import Container from "../Layout/Container";
import LinkButton from "../Layout/LinkButton"
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";


function Projects() {
    const [projects, setProjects] = useState([])
    const [ProjectMessage, setProjectMessage] = useState('')
    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
    setTimeout(() => {
        fetch('https://costs-matheus.onrender.com/projects', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(resp => resp.json())
            .then(data => {
              console.log(data)
              setProjects(data)
            })
            .catch((err) => console.log(err))
     
    },)
    }, []) 

    function removeProject(id, name){

        fetch(`https://costs-matheus.onrender.com/projects/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(resp => resp.json())
    .then(data => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage(`Projeto removido com sucesso`)
    })
    }
    return(
    <div className={styles.project_container}>
        <div className={styles.title_container}>
            <h1>Meus projetos</h1>
            <p><LinkButton to="/novoprojeto" text="Criar Projeto"/></p>
        </div>
        {message && <Message type="success" msg={message}/>}
        {ProjectMessage && <Message type="success" msg={ProjectMessage}/>}
        <Container customClass="start">
            {projects.length > 0 &&
                projects.map((project) => (
                    <ProjectCard 
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project?.category?.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />
                ))
            }
        </Container>
    </div>
)}

export default Projects;