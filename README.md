#### Exercício referente a aula Desenvolvendo SPA com Angular.

#### Bootcamp Avanade Angular Developer.

Esse é o repositório da aula sobre Single Page Application, na qual temos o desafio de reproduzir um Cadastro de Usuários, conforme foto abaixo, utilizando Angular.

<img src="https://github.com/marcelosantosfonseca/Cadastro_de_Usuarios/blob/master/screens_with_tests/Desafio.jpg" >



O CRUD que elaboramos tem como base a Tabela com checkbox oferecida pelo Angular Material para listagem dos usuários. Nesta tabela foi adicionado botões para cadastrar, editar e excluir. Este último é habilitado após clicar no checkbox do usuário que se deseja excluir, com isso, evitando excluir o usuário errado.

Foram inseridos paginação e filtragem.

A interface de inserir usuários é reaproveitada para editar usuários quando necessário.

A data e hora do cadastro são inseridas automaticamente.

Para o cadastro foi desenvolvidas validações de campos e a inserção de uma foto padrão para quando o usuário não tiver inserido sua foto.

Utilizamos o JSONServer (json-server --watch src/assets/db/usuarios.json --port 600) para podermos avaliar e testar as rotas do aplicativo.

Segue foto da SPA desenvolvida.


<img src="https://github.com/marcelosantosfonseca/Cadastro_de_Usuarios/blob/master/screens_with_tests/teste.jpg" >
