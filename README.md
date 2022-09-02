# Blogs-Api
Nesse projeto foi desenvolvido uma API e um banco de dados para a produção de conteúdo de um blog. Foram desenvolvidos endpoints conectados ao banco de dados seguindo o padrão REST. Foi utilizado a ORM Sequelize para fazer o mapeamento com o banco de dados.
<br>
<br>
<h2>Primeiros passos:</h2>
<ol>
  <li>Clone o repositório</li>
  <li>digite o comando npm install</li>
  <li>crie um arquivo .env na raiz com os seguintes parâmetros:</li>
    <ul>
    #### SERVER VARS
    NODE_ENV=development
    API_PORT=3000

    #### DATABASE VARS
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_DB_NAME=blogs-api
    MYSQL_USER=root
    MYSQL_PASSWORD=password

    #### SECRECT VARS
    JWT_SECRET=suaSenhaSecreta
    </ul>
  <li>rode o comando npm run migration para criar as tabelas do banco</li>
  <li>rode o comando npm run seed, para povoar as tabelas do banco</li>
  <li>rode o comando npm run dev para iniciar o servidor</li>
  <li>acesse http://localhost:3006/docs/ no navegador para visualizar a documentação</li>
</ol>
<br>
<br>
<div align='center'>
  <img src='https://user-images.githubusercontent.com/88631168/188205985-8304be15-65b9-4f43-8481-779dbe2cb07b.png' width='700px' />
</div>
  
