import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Container from '../Layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../Layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import { parse, v4 as uuidv4 } from 'uuid'

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchProjectData()
  }, [id])

  const fetchProjectData = () => {
    fetch(`http://localhost:4000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setServices(data.services) 
      })
      .catch((err) => console.log(err))
  }

  const fetchUpdatedProjectData = (project) => { 
    fetch(`http://localhost:4000/projects/${project.id}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
      })
      .catch((err) => console.log(err))
  }

  const editPost = (project) => {
    setMessage('')
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto')
      setType('error')
      return false
    }
    fetch(`http://localhost:4000/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then(() => {
        fetchUpdatedProjectData(project) 
        setMessage('Projeto atualizado')
        setType('success')
      })
      .catch((err) => console.log(err))
  }

  function createService(project) {
    setMessage('')


    if (!project.services) {
      setMessage('Selecione um serviço')
      setType('error')
      return false
    }
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(project.budget)) {
      setMessage('Seu serviço ultrapassa o orçamento do projeto')
      setType('error')
      project.services.pop()
      return false
    }

    project.cost = newCost

    fetch(`http://localhost:4000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowProjectForm(false);
        window.location.reload();
        setMessage('Serviço adicionado com sucesso')
        setType('success')
      })
      .catch((err) => console.log(err))
  }

  function removeService(id, cost) {
    setMessage('')
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    )

    const projectUpdated = { ...project } 

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:4000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    }).then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso')
        setType('success')
      })
      .catch(err => console.log(err))
  }

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm)
  }

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm)
  }


  return (
    <div className={styles.project_details}>
      <Container customClass="column">
        {message && <Message type={type} msg={message} />}
        <div className={styles.details_container}>
          <h1>Projeto: {project.name}</h1>
          <button className={styles.btn} onClick={toggleProjectForm}>
            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
          </button>
          {!showProjectForm ? (
            <div className={styles.project_info}>
              <p>
                <span>Categoria:</span> {project?.category?.name}
              </p>
              <p>
                <span>Orçamento Total:</span> R${project.budget}
              </p>
              <p>
                <span>Orçamento Utilizado:</span> R${project.cost}
              </p>
            </div>
          ) : (
              <div className={styles.project_info}>
                <ProjectForm
                  handleSubmit={editPost}
                  btnText="Concluir edição"
                  projectData={project}
                  scrollToTop
                />
              </div>
            )}
        </div>
        <div className={styles.service_form_container}>
          <h2>Adicione um serviço:</h2>
          <button className={styles.btn} onClick={toggleServiceForm}>
            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
          </button>
          <div className={styles.project_info}>
            {showServiceForm && (
              <ServiceForm
                handleSubmit={createService}
                btnText="Adicionar Serviço"
                projectData={project}
              />
            )}
          </div>
        </div>
        <h2>Serviços</h2>
        <Container customClass="start">
        {services && services.length > 0 ? (
          services.map((service) => (
           <ServiceCard
            id={service.id}
            name={service.name}
            cost={service.cost}
            description={service.description}
            key={service.id}
            handleRemove={removeService}
          />
          ))
        ) : (
          <p>Não há serviços cadastrados.</p>
        )}
        </Container>
      </Container>
    </div>
  )
}

export default Project
