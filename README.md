# Avaliação Front-End (Vue/Prime)

## Objetivo
Esta avaliação tem como objetivo avaliar a capacidade técnica em tecnologias utilizadas para desenvolvimento front-end.

## Projeto/Repositório (GitHub)
- O link para clone do repositório base com os pacotes instalados está disponível no link [GitHub](https://github.com/ludhriq/avaliacao-biblioteca).
- O projeto está configurado com os seguintes aspectos/pacotes:
  - Javascript
  - ViteJs (Servidor Local)
  - [VueJS](https://vuejs.org) v3.4.29 (SFC .vue)
  - [PrimeVue](https://primevue.org) v4.0.2 (Biblioteca de componentes feito com VueJs para UI/UX)
  - [DayJs](https://day.js.org) (Manipulação de datas)
  - [VeeValidate](https://vee-validate.logaretm.com/v4/) (Formulário)
  - [Yup](https://github.com/jquense/yup) (Validação)
  - [TailwindCSS](https://tailwindcss.com/) v3.4.7

## Lista de Tarefas

### Considerações iniciais
- Os dados fictícios das entidades para confecção das telas estão no arquivo `"data.json"`.
- Todos os dados de cadastros e listagens devem ser salvos em memória, criando um state para leitura e manipulação, mantendo a integridade original do arquivo `"data.json"`.
- Lembre-se de realizar as validações e transformações necessárias para o cadastro e exibição dos dados.
- As telas precisam ser responsivas, adaptadas para interfaces `Mobile` e `Desktop`.
- Respeitar as rotas indicadas em cada item

#### #1) Listagem de Livros `/livros`

  - Criar uma página que irá listar os livros, mostrando o id, a foto de capa, título, ano de publicação, nome do autor e nome da editora
  - Criar botões de redirecionamento para o `Formulário do Livro #2`, `Página do Autor #3` e `Página da Editora #4`
  - Criar botão para redirecionamento para cadastrar um novo livro
  - Possibilidade de ordenar os livros por `ano de publicação`, `id`, `nome do autor`. Em ordem `Crescente` e `Decrescente`
  - Filtro de pesquisa por `Título`, `Autor` e Editora. (case insensitive).
  - Ao clicar em um livro, abrir uma modal exibindo a foto em uma resolução maior, título, autor, editora, ano de publicação e sinopse do livro.

#### #2) Formulário de Livro `/livros/:id(novo|[0-9]+)`

  - Criar uma página com um formulário contendo os campos do livro, com a possibilidade de `criação` e `edição` de um livro.
  - Deve conter os campos: `Título`, `Ano de Publicação`, `Foto de Capa`, `Autor` (um dropdown que listará os autores já existentes), `Editora` (um dropdown que listará as editoras já existentes), `Sinopse`
  - Os campos devem conter `labels` e `placeholders` coerentes.
  - Gerar o id dinâmicamente e salvar o registro no state.
  - `Validar os campos de acordo com os tipos coerentes`.
  - `Todos os campos são obrigatórios`

#### #3) Página do Autor `/autores/:id`

 - Criar uma página que contenha os dados do Autor: `id`, `nome` e uma listagem dos livros desse autor.
 - Criar um botão de redirecionamento para o `Formulário de Autor #4`

#### #4) Formulário de Autor `/autores/:id(novo|[0-9]+)`

  - Criar uma página com um formulário contendo os campos do autor, com a possibilidade de `criação` e `edição` de um autor.
  - Gerar o id dinâmicamente e salvar o registro no state.
  - `Validar os campos de acordo com os tipos de cada um`.
  - `Todos os campos são obrigatórios`

#### #5) Página da Editora `/editoras/:id`

 - Criar uma página que contenha os dados da editora: `id`, `nome` e uma listagem dos livros publicados dessa editora.
 - Criar um botão de redirecionamento para o `Formulário da Editora #6`

#### #6) Formulário de Editora `/editoras/:id(novo|[0-9]+)`

  - Criar uma página com um formulário contendo os campos da editora, com a possibilidade de `criação` e `edição` de uma editora.
  - Gerar o id dinâmicamente e salvar o registro no state
  - `Validar os campos de acordo com os tipos de cada um`
  - `Todos os campos são obrigatórios`

## Considerações finais
- As cores, tamanhos, estilo, ou qualquer outro aspecto visual/adicional que não tenha sido informado `explicitamente` no requisito poderá ser desenvolvido de forma livre pelo candidato, para justamente dar liberdade e avaliar sua criatividade.
- O resultado da avaliação vai levar em conta os seguintes critérios gerais:
  - Estrutura/Organização do Código
    - Nomenclatura e estruturação de arquivos
  - Estrutura Visual/Criatividade (UI/UX)
    - Utilização de css
    - Interface de usuário
    - Utilização correta de ícones e cores
  - Conhecimento em Javascript
    - Utilização de métodos e funcionalidades da linguagem
    - Manipulação de objetos e arrays
    - Estruturação de código
    - Indentação de código
  - Conhecimento específico em VueJS, VueRouter
    - Criação de componentes
    - Utilização correta de reatividade
    - Utilização correta de métodos e funcionalidades
