import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  // Variavel criada para armazenar um array de repositorios e garantir a imutabilidade
  const [ repositories, setRepositories ] = useState( [] ); // inicializa um array vazio  /*<[string,string,string[]]>*/ 
    // title = `Challenge ${Date.now()}` ,
    // url =  'https://github.com/RodrigoPMonteiro/desafio-conceito-reactjs',
    // techs = ['React', 'ReactJs'],
  
  // Sempre que a página for carregada, executará a seguinte arrow funcion:
  // método get da api, acessando a rota "repositories" e  obtendo como resposta(response) os dados retornados
  useEffect( () => {
    api.get('repositories').then(response => {
      setRepositories(response.data)

      //console.log(repositories)
    });
  }, [] ); // array de dependencia 

  /*
    A função abaixo será responsável por adicionar um novo repositório ao array "repositories"
  */
  async function handleAddRepository() {
    // Armazena na variável "response" o restorno do método post para nossa rota "repositories" da api
    const postResponse = await api.post('repositories', { // id não informa????
      title: `Challenge nº ${Date.now()}` ,
      url: 'https://github.com/RodrigoPMonteiro/desafio-conceito-reactjs',
      techs: ['React', 'ReactJs'],
    });

    /* Respeitando a imutabilidade, é possivel adicionar valores do array "repositories" */
    setRepositories( [...repositories, postResponse.data ]);

    console.log(postResponse.data);
  }

  async function handleRemoveRepository(id) {
    /* Utilizando a api importada, podemos deletar exatamente o repositorio 
       cujo id será informado por parâmetro */
    await api.delete(`repositories/${id}`);
    /* Respeitando a imutabilidade, é possivel deletar valores do array "repositories" */
    setRepositories(repositories.filter(repository => repository.id !==id));
  }

/*
  No retorno abaixo será retornado um html onde:
  Faremos uma varredura na variável repositories e para cada repositorio encontrado,
  será exibido seu "title" e ao seu lado um botão "Remover", com a função de remover o respectivo
  repositorio.
  Os dados acima serão retornados em uma lista desordenada.
  O botão Adicionar será exibido após essa lista e terá a função de gerar um novo post( criar um novo repo )

*/
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
