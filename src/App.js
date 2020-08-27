import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: "Teste Node.js",
      url: "http://github.com/...",
      techs: ["Node.js", "..."]
    });

    const repositor = response.data;

    setRepositories([...repositories, repositor]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const updatedList = repositories.filter(repositor => repositor.id !== id);

      setRepositories(updatedList);

      toast.success('O repositório foi excluído com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositor => 
        <li key={repositor.id }>
          {repositor.title}

          <button onClick={() => handleRemoveRepository(repositor.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
