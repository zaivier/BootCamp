import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
import backgroungImage from './assets/background.jpg';

import Header from "./components/Headers";

function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() =>{
        api.get('/projects').then(response =>{
            setProjects(response.data);
        });
    },[]);
    function handleAddProject() {
        // projects.push(`Novo Projeto ${Date.now()}`);

        //Imutabilidade: nunca alterar cria novo.
        setProjects([...projects, `Novo Projeto ${Date.now()}`]);

        console.log(projects);
    }
    return (
        <>
            <Header title="Projects" />

            {/* <img width="300" src={backgroungImage} /> */}

            <ul> {
                projects.map(project => < li key={project.id} > {project.title} </li>)
            } </ul>

            <button type="button"
                onClick={handleAddProject} > Adicionar projeto </button>
        </>
    );
}

export default App;