# Back-End para Mentoria Bootcamp DIO

## Consumindo APIs a partir de front-end Angular com um back-end Java

- [x] Extensões básicas do VSCode
- [x] Preparação do ambiente Gitpod
  - Instalação Angular CLI
- [x] Criação do projeto
  - Com template e style inline
  - Com rotas e usando SCSS
  - Comando usado: `ng new bootcamp-dio-angular-java-front --commit false --directory ./ --inline-style --inline-template --minimal --routing --skip-git --style scss`
- [x] Heroes module
  - Comando: `ng generate module heroes --route heroes --routing true`
- [x] Hero model
- [x] Criação de repository encapsulando chamadas HTTP
  - Comando: `ng generate service heroes-repository`
- [x] Criação de service encapsulando chamadas ao repository
  - Comando: `cd src/app/heroes`
  - Comando: `ng generate service heroes`
  - Com lista de heróis interna
  - Notificando de alteração de lista
- [x] Rota de listagem de heróis
  - [x] Subscribe simples
    - Propriedade heróis no componente
    - Começar chamando Service sem fazer subscribe e explicar pq não deu certo
    - Vai dar erro de CORS
  - [x] Proxy para API, evitando CORS
  - [x] Unsubscribe no onDestroy
  - [x] Pipe Async, removendo subscribe/unsubscribe e propriedade heróis do componente
- [x] Rota para inclusão de herói
  - Consome Service
  - Retorna para listagem
  - Comando: `cd src/app/heroes`
  - Comando: `ng g component new-hero --module heroes`
- [ ] Rota para alteração de herói
  - Consome Service
  - Retorna para listagem
- [ ] Na rota de listagem de heróis, botão de editar que vai para a rota de edição
  - Consome Service
  - Retorna para listagem
- [ ] Na rota de listagem do herói, botão de exclusão do herói
  - Exibe botão para confirmar exclusão
- [ ] Estilização simples de tudo (opcional)

## Referências

- [Angular - Tour of Heroes application and tutorial](https://angular.io/tutorial)
