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
    api.delete(`/repositories/${id}`)

    window.location.reload()
  }

  async function handleAddRepository() {
    api.post(`/repositories`, {
      title: 'Projeto desafio react',
      url: 'https://github.com/erick-iwamoto/desafio-reactjs',
      techs: ['Reactjs']
    })

    window.location.reload()
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          {repositories.length > 0 && repositories.map(repository => {
            return (
              <div>
                <Repository data={repository} />
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </div>
            )
          })}
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
