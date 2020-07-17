/* eslint-disable camelcase */
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import logoImage from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './style';
import api from '../../services/api';

// import api from './services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GitthubExplorer: repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
  });

  useEffect(() => {
    localStorage.setItem(
      '@GitthubExplorer: repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepostory(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório.');
      return;
    }

    try {
      const reponse = await api.get<Repository>(`repos/${newRepo}`);

      const repository = reponse.data;
      setRepositories([...repositories, repository]);

      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Erro na busca por esse repositório');
    }
  }
  return (
    <>
      <img src={logoImage} alt="GitHub explorer" />
      <Title>Explorer repositórios no Git Hub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepostory}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositorio"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
