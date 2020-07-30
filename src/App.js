import React, { useState, useEffect } from "react";
import api from './services/api';

import Repository from './components/Repository'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect (() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }, [])

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    const repositoriesAux = repositories
    
    console.log(response)
    
    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      
      repositoriesAux.splice(repositoryIndex, 1)

      setRepositories([ ...repositoriesAux ])
    }
  }

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
      title: 'Projeto desafio react',
      url: 'https://github.com/erick-iwamoto/desafio-reactjs',
      techs: ['Reactjs']
    })

    const repository = response.data

    setRepositories([...repositories, repository])    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
