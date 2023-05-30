import styles from '../project/ProjectForm.module.css';
import Input from '../Form/Input';
import SubmitBtn from '../Form/SubmitBtn';
import { useState } from 'react';

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({
      name: "",
      cost: "",
      description: "",
    });
  
    function submit(e) {
      e.preventDefault();
  
      const updatedProjectData = {
        ...projectData,
        services: projectData.services ? [...projectData.services, service] : [service],
      };
  
      handleSubmit(updatedProjectData);
    }
  
    function handleChange(e) {
      setService({ ...service, [e.target.name]: e.target.value });
    }
  
    return (
      <form onSubmit={submit} className={styles.form}>
        <Input
          type="text"
          text="Nome do Serviço"
          name="name"
          placeholder="Nome do Serviço"
          handleOnChange={handleChange}
        />
        <Input
          type="number"
          text="Custo do Serviço"
          name="cost"
          placeholder="Valor total"
          handleOnChange={handleChange}
        />
        <Input
          type="text"
          text="Descrição do Serviço"
          name="description"
          placeholder="Descreva o Serviço"
          handleOnChange={handleChange}
        />
        <SubmitBtn text={btnText} />
      </form>
    );
  }

export default ServiceForm;