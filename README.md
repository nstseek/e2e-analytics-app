# E2E Analytics App

Esse repositório foi criado para armazenar o projeto desenvolvido para solucionar o desafio técnico proposto pela empresa E2E Analytics.

O projeto pode ser visualizado [aqui](https://e2e-analytics-app.web.app/)

## Stack/Tecnologias

Dentre as tecnologias permitidas no desafio, escolhi utilizar Node, React e MySQL por afinidade e também facilidade de encontrar um serviço de hospedagem gratuito na internet para essas tecnologias; por exemplo, o Heroku hospeda servidores Node gratuitamente pra sempre, MySQL tem muitos sites que disponibilizam um tier free de armazenamento de banco e o React foi escolhido por afinidade apenas.

## Hospedagem

Como mencionado anteriormente, o backend se encontra hospedado no Heroku, frontend no firebase e banco de dados na Hostinger. Talvez a prévia fique um pouco lenta para carregar devido a hospedagem ser gratuita.

## Banco de dados

O banco de dados foi modelado utilizando o MySQL Workbench, gerando posteriormente um script para a criação do banco. Para mais detalhes, basta abrir o projeto do banco de dados e analisar o design criado. Todas as tabelas e colunas estão comentadas e bem documentadas. O banco possui uma série de triggers que validam e garantem a integridade dos dados que entram e saem do mesmo, evitando comportamentos inesperados da aplicação e difíceis de debugar.

## Backend

O backend foi desenvolvido utilizando Node, TypeScript, Express e Knex. Para rodá-lo, basta seguir o padrão de projetos feitos em node, utilize os scripts do NPM do projeto, vá até a pasta raíz, execute o comando "npm install" e logo após "npm start". Durante o desenvolvimento, cheguei a pensar em utilizar um ORM como Sequelize para desenvolver a API, porém, quando me veio a cabeça o projeto já tinha começado e eu não quis refazê-lo. Acredito que talvez teria sido mais fácil ter voltado atrás, mas fica como lição, afinal, tive muito pouco tempo disponível para desenvolver a aplicação e ela se mostrou bem extensa. Gostaria de ter implementado um swagger, documentado as rotas e alguns procedimentos mais internos de algumas controllers, de ter utilizado um ORM em vez de um Query Builder para facilitar a manipulação de dados e relações entre as entidades do banco, de ter testado partes importantes do código com testes unitários, enfim, várias coisas.

## Frontend

O front foi desenvolvido utilizando React, React Hooks, TypeScript, Redux e Material UI em sua base. Acredito que essas tecnologias facilitam muito o processo de desenvolvimento. Desde os componentes prontos e estilizados do Material UI até o controle de estado mais complexo e re-renders controlado pelo Redux. A aplicação do front acabou se estendendo bastante também e pela falta de tempo, ela está muito longe do que eu gostaria mas não tenho muito o que fazer, a aplicação não é tão pequena para se apegar aos detalhes e deixar os compromissos de lado. Gostaria de ter componentizado melhor a aplicação, ter melhorado seu layout, revisado a reutilização de código, que ao meu ver não foi satisfatória, ter escrito testes unitários e ter documentado melhor os componentes e suas utilidades. Poderia até implementar um storybook pra caso a aplicação fosse crescer mais, em um cenário real.

## Testes

Geralmente escrevo testes para os projetos que desenvolvo, tanto no front quanto no backend. Costumo sempre utilizar o Jest e TypeScript para testar; porém, mal tive tempo para desenvolver uma aplicação verdadeiramente funcional, imagina pra escrever testes.

## Qualidade de código

Tenho o costume de implementar git-hooks nos projetos em que trabalho para checar a formatação, identação, etc do código utilizando o prettier e o eslint. Também costumo colocar o build no meu hook de push para garantir que os commits que estou enviando para o repositório remoto funcionam corretamente (ou pelo menos buildam corretamente). Fiz isso nesse projeto, o que me ajudou a manter um bom padrão dentre tantos arquivos criados nesse projeto.

## Postman

Criei uma coleção no Postman que inclui todos os requests que a API disponibiliza. Na falta de tempo para implementar um swagger, vou exportar minha coleção e colocar na raíz do repositório em .json para que possam ver. Todas as rotas estão comentadas, tituladas e com descrição nos parâmetros.

## Conclusão

Infelizmente o projeto acabou sendo muito longo, mais do que eu esperava e me tomou mais tempo do que eu tinha disponível, não sendo possível terminar a aplicação por completo. Algumas partes do CRUD não foram implementadas no front-end. Não estou satisfeito com o meu resultado, gostaria que o projeto fosse mais curto e dessa forma, que fosse possível me atentar mais aos detalhes. O frontend não ficou bem separado, componentizado, a reutilização de código poderia ter sido melhor, o backend deveria ter sido com Sequelize, precisaria de tempo pra refatorar, nenhuma das duas partes possuem testes nem documentação, nada. A única parte que eu acredito que realmente foi feita de maneira satisfatória foi o banco. O design simples de tabelas, os triggers criados para garantir a integridade de dados e a documentação bem feita me deixaram feliz com o resultado, escrevi até uns pequenos scripts de teste para o banco. Me considero perfeccionista nas coisas que faço e geralmente não fico satisfeito com pouco. Principalmente se for o meu próprio trabalho. Sempre procuro defeitos nas coisas que faço, por melhor que eu tenha feito, pra sempre poder seguir melhorando. E infelizmente, nesse projeto eu encontrei vários. Sei que esse projeto não reflete o potencial que tenho, mas me parece aceitável para umas 8-10 horas de trabalho que investi nele. Espero um dia ter tempo pra voltar e melhorar a qualidade do código desse repositório.
