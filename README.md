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

O backend foi desenvolvido utilizando Node, TypeScript, Express e Knex. Para rodá-lo, basta seguir o padrão de projetos feitos em node, utilize os scripts do NPM do projeto, vá até a pasta raíz, execute o comando "npm install" e logo após "npm start". Durante o desenvolvimento, cheguei a pensar em utilizar um ORM como Sequelize para desenvolver a API, porém, quando me veio a cabeça o projeto já tinha começado e eu não quis refazê-lo. Acredito que talvez teria sido mais fácil ter voltado atrás, mas tive pouco tempo livre disponível para desenvolver a aplicação e ela se mostrou bem extensa. Gostaria de ter implementado um swagger, documentado as rotas e alguns procedimentos mais internos de algumas controllers, de ter utilizado um ORM em vez de um Query Builder para facilitar a manipulação de dados e relações entre as entidades do banco, de ter testado partes importantes do código com testes unitários, enfim, várias coisas.

## Frontend

O front foi desenvolvido utilizando React, React Hooks, TypeScript, Redux e Material UI em sua base. Acredito que essas tecnologias facilitam muito o processo de desenvolvimento. Desde os componentes prontos e estilizados do Material UI até o controle de estado mais complexo e re-renders controlado pelo Redux. A arquitetura final do frontend poderia talvez ter um pouco mais de reutilização de código, talvez com custom hooks do React e reaproveitando um pouco mais códigos repetidos ao instanciar tabelas de entidades diferentes e modais também. Gostaria de ter componentizado melhor a aplicação, ter melhorado seu layout, revisado a reutilização de código, que ao meu ver não foi satisfatória, ter escrito testes unitários e ter documentado melhor os componentes e suas utilidades. Poderia até implementar um storybook pra caso a aplicação fosse crescer mais, em um cenário real.

## Testes

Geralmente escrevo testes para os projetos que desenvolvo, tanto no front quanto no backend. Costumo sempre utilizar o Jest e TypeScript para testar; porém, não tive tempo para escrever testes ainda.

## Qualidade de código

Tenho o costume de implementar git-hooks nos projetos em que trabalho para checar a formatação, identação, etc do código utilizando o prettier e o eslint. Também costumo colocar o build no meu hook de push para garantir que os commits que estou enviando para o repositório remoto funcionam corretamente (ou pelo menos buildam). Fiz isso nesse projeto, o que me ajudou a manter um bom padrão dentre tantos arquivos criados nesse projeto.

## Postman

Criei uma coleção no Postman que inclui todos os requests que a API disponibiliza. Na falta de tempo para implementar um swagger, vou exportar minha coleção e colocar na raíz do repositório em .json para que possam ver. Todas as rotas estão comentadas, tituladas e com descrição nos parâmetros.

## Conclusão

O projeto mostrou ter um potencial bem grande, um teste bem extenso que pode mostrar o real conhecimento do desenvolvedor em todas as áreas técnicas de desenvolvimento da aplicação, desde a modelagem do banco de dados e operações de I/O mais complexas em tabelas até a interface gráfica responsiva e estilos agradáveis, criando uma boa experiência do usuário. A aplicação aqui desenvolvida ainda tem muito o que melhorar, comentei algumas coisas sobre cada uma das áreas acima, utilizar um ORM no back, estruturar melhor o front, falta documentação no back e no front, talvez um swagger no backend, etc. A melhor parte dentre as três, que foi mais desenvolvida a um ponto satisfatório, foi o banco. O design simples de tabelas, os triggers criados para garantir a integridade de dados e a documentação bem feita irão proporcionar um bom desempenho garantido a integridade de dados e facilitando a vida de desenvolvedores que possam trabalhar com o mesmo futuramente, escrevi até uns pequenos scripts de teste para o banco. Me considero perfeccionista nas coisas que faço e geralmente não fico satisfeito com pouco. Principalmente se for o meu próprio trabalho. Sempre procuro defeitos nas coisas que faço, por melhor que eu tenha feito, pra sempre poder seguir melhorando. O resultado final e a qualidade do código desse projeto condiz com as 8-10 horas de trabalho que investi nele. Futuramente, irei implementar todas as melhorias que mencionei aqui.
