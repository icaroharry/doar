[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=master)](https://travis-ci.org/meanjs/mean)
[![Dependencies Status](https://david-dm.org/meanjs/mean.svg)](https://david-dm.org/meanjs/mean)
[![Coverage Status](https://coveralls.io/repos/meanjs/mean/badge.svg?branch=master&service=github)](https://coveralls.io/github/meanjs/mean?branch=master)

#Introdução

Esse projeto faz parte da matéria de [Engenharia de Software](http://homepages.dcc.ufmg.br/~figueiredo/disciplinas/2016a/dcc603.htm). O sistema que foi desenvolvido é um software voltado para ONGs e instituições de caridade que necessitam de doações esporádicas ou periódicas. A ideia é conectar, por meio de um sistema on-line, as instituições e potenciais doadores. Ou seja, as ONGs podem se cadastrar e listar as doações que precisam. Após isso, doadores podem registrar o interesse de doação para que a ONG entre em contato com ele e seja combinada a melhor forma de receber a doação.

##Processos de software

No início do projeto, foi planejado o uso do SCRUM, por ser um método ao qual estou mais familiarizado, mas ao decorrer do primeiro sprint, percebi que ele não estava adequado. O fato do sistema ter requisitos bem definidos e uma certa simplicidade, a revisão diária (daily standups) e bi-semanal (sprints) do projeto estavam sendo desnecessárias e despendendo muito tempo. Além disso, o fato do projeto estar sendo desenvolvido aos poucos, gerou um atraso nos prazos do primeiro sprint e consequentemente uma desorganização do planejamento inicial. Por esse motivo, decidi utilizar o Modelo Cascata.

![Modelo Cascata](https://upload.wikimedia.org/wikipedia/commons/0/08/Modelo_em_cascata.png)

Portanto, o sistema foi desenvolvido seguindo o [Modelo Cascata](https://pt.wikipedia.org/wiki/Modelo_em_cascata), tendo suas etapas bem definidas e documentadas. Esse modelo foi escolhido por vários motivos:
 - A simplicidade do sistema;
 - Seus requisitos bem definidos e claros;
 - Ao fato de o sistema ter sido desenvolvido por apenas uma pessoa;
 - Ao calendário de prazos e ao pouco tempo que pôde ser dedicado ao projeto (já que o mesmo não foi de dedicação exclusiva, devido a existência de outras matérias e outros projetos paralelos);

A escolha do Modelo Cascata promoveu uma flexibilidade quanto ao calendário. Não houve a necessidade de um planejamento contínuo e repetitivo.

Todavia, pode-se destacar que o Modelo Cascata, devido as características do projeto em questão tomou para si características de outros processos de software, como a Engenharia de Software Orientada a Reuso. Tendo em vista a grande quantidade de ferramentas e módulos reusáveis que foram integrados no projeto, a fase de implementação e projeto agregou a análise de componentes e sua integração.

Além disso, como projeto da disciplina, pode-se considerar que o processo teve etapas bem definidas e modeladas, como prega o Modelo Cascata. Porém, minha ideia é continuar desenvolvendo o sistema, logo a entrega da disciplina seria a versão inicial e o processo deve continuar com o Desenvolvimento Incremental.

##Escolha da linguagem e framework

Apesar da preferência da disciplina pelo Java, optei por desenvolver o sistema utilizando JavaScript [(ECMAScript 5)](http://www.ecmascript.org/http://www.ecmascript.org/). Essa escolha se deu por diversos fatores, entre eles:

 - Familiaridade com a linguagem;
 - O desejo de que o projeto se transforme em uma plataforma funcional que rode em browsers;
 - Presença de frameworks aos quais possuo experiência de uso.

O JavaScript atualmente é uma das linguagens mais utilizadas para o desenvolvimento web. Seu surgimento voltado para os browsers fez com que a linguagem se desenvolvesse de maneira a atender completamente sistemas web que seguem a arquitetura cliente-servidor. Por isso, atualmente é possível desenvolver sistemas completos, desde o banco de dados, até a interface com o usuário, utilizando JavaScript como linguagem de programação. Portanto, essa foi a abordagem escolhida para o projeto.

###Banco de Dados
Para o banco de dados, ao invés de uma abordagem tradicional com banco de dados relacionais acessados por SQL, foi escolhido o uso do [MongoDB](https://www.mongodb.com/). Um banco de dados "NoSQL" acessado e controlado por JavaScript. Sua arquitetura trabalha muito bem com a linguagem e permite uma alta [escalabilidade horizontal](https://gist.github.com/lucasuyezu/b64c7bc5cf7f81c2f7bd).

O MongoDB é um banco de dados orientado a documentos, ao invés de linhas em tabelas. Portanto registra-se apenas JSON (objetos JavaScript) em "coleções" na base de dados. Ou seja, em bancos de dados relacionais utiliza-se o conceito de tabelas e a cada registro cria-se uma nova linha na tabela. Por exemplo, vamos considerar uma tabela simples de usuário.

![Tabela de Usuário](https://lh3.googleusercontent.com/--DxMGXwWlgA/V2hRXODG6cI/AAAAAAAABWo/qtdXfupgBlUmKRmTTftFIHGjZmX1p1fdACLcB/s0/user.png "Tabela de usuário")

Podemos inserir um novo usuário utilizando SQL:

```SQL
INSERT INTO Usuários ("Ícaro", "icaro", "senha")
```

Já o MongoDB utiliza o conceito de coleção. Então podemos considerar uma coleção Usuários. E inserir um novo usuário da seguinte forma:

```javascript
//Cria a coleção
db.createCollection("Usuários");
//Insere um novo usuário na coleção Usuários
db.Usuários.insert({
  nome: "Icaro",
  login: "icaro",
  senha: "senha"
});
``` 
É interessante destacar que o MongoDB não possui uma estrutura fixa como tabelas em SQL, o que significa que você pode criar usuários com diferentes estruturas, por exemplo:

```javascript
// Usuário 1
db.Usuários.insert({
  nome: "Icaro",
  login: "icaro",
  senha: "senha"
});
// Usuário 2
db.Usuários.insert({
  nome: "José",
  login: "jose",
  password: "senha2",
  endereço: {
    rua: "Rua das flores, 222",
    bairro: "Bairro das pedras"
  }
});
``` 
Portanto é preciso ter cuidado. Essa flexibilidade é muito útil em várias aplicações do MongoDB, entretanto, para o caso desse projeto, principalmente pelo uso da Orientação a Objetos, é interessante que haja uma melhor estruturação dos modelos. Sendo assim, usa-se o [Mongoose](http://mongoosejs.com/), um ODM (object document mapper), que cria restrições para os documentos do MongoDB, de forma que eles se comportem como um objeto.

###Servidor

No lado do servidor, utiliza-se também a linguagem JavaScript, dessa vez com o [NodeJS](https://nodejs.org/en/). Essa plataforma permite que o JavaScript, inicialmente criado para rodar em browsers, seja rodado no lado do servidor. O que o NodeJS faz é basicamente utilizar o interpretador de JS do Google Chrome, chamado V8, para interpretar a linguagem em um servidor e convertê-lo para uma linguagem de baixo nível.

A arquitetura do NodeJS trabalha com um "core" mínimo, semelhante a arquitetura de Kernel. Ou seja, os criadores desenvolvem apenas as funcionalidades básicas com a plataforma e permitem que os desenvolvedores terceiros criem módulos (espécies de plugins) para que ele (NodeJS) seja extendido. 

Por isso, para que haja uma comunicação cliente-servidor com o NodeJS, utiliza-se um módulo que implementa métodos que acessam o HTTP e realizam essa comunicação. O módulo HTTP utilizado nesse projeto chama-se [Express](http://expressjs.com/pt-br/).

###Cliente

No lado do cliente, também é utilizado o JavaScript, dessa vez com um framework [MVVM](http://www.devmedia.com.br/entendendo-o-pattern-model-view-viewmodel-mvvm/18411) chamado [AngularJS](http://angularjs.org). Esse framework permite receber os dados do servidor e trabalhá-los para sua melhor exibição para o usuário.

###Reutilização de código

Como pode-ser perceber, optei por uma abordagem com uma alta reutilização de código. Na minha visão, essa característica permite desenvolver um software robusto e poderoso com pouco recurso e tempo. Além disso, o JavaScript possui uma comunidade muito ativa, logo existe uma infinidade de bibliotecas e frameworks muito bem feitos e documentados. Vale também destacar que todas as bibliotecas e frameworks utilizados e, consequentemente, esse projeto são Open-Source. Tendo o seu código fonte disponível no [GitHub](http://github.com).

O framework utilizado chama-se [MEAN.JS](http://meanjs.org). Ele agrega todas as ferramentas citadas acima de forma a facilitar o desenvolvimento, com uma estrutura pré-definida e bem organizada.

##Testes
O projeto possui testes unitários e de integração (e2e). Eles podem ser encontrados na pasta `tests` dentro de cada módulo. O framework escolhido possui uma cobertura de código de 70%, como explicitado em sua documentação.

#Especificações de requisitos
##Requisitos funcionais
 - Cadastro de ONGs e doadores.
 - Cada usuário (ONG ou doador) deve ser identificado por um identificador único que será o email.
 - O sistema deve permitir autenticação e cadastro utilizando outras ferramentas. Ex: Facebook, Google, etc.
 - As necessidades de doação registradas pela ONG devem estar disponíveis para visualização de qualquer pessoa, registrada ou não no sistema.
 - Após um recebimento e registro de doação, a doação deve ficar disponível para visualização de qualquer pessoa.
 - As intenções de doação só podem ser feitas por doadores cadastrados.
 - As intenções de doação só podem ser visualizadas pela ONG e doador em questão.
 - Ao receber uma intenção de doação, a ONG deve receber um email com as informações da doação e do doador.
 - Após o registro de doação recebida, o sistema deve enviar um email para o doador informando a confirmação e mostrando novas necessidades de doação.

##Requisitos Não-Funcionais

 - A interface de usuário deve ser o mais simples possível para evitar que as doações sejam atrapalhadas por isso.
 - Doações em dinheiro devem seguir a legislação vigente, se existir, sobre isso.
 - A comunicação entre doador e ONG deve ser flexível: não obrigar que eles conversem o tempo todo dentro do sistema, para que o processo não fique "engessado".

## Diagrama de casos de uso
![enter image description here](https://lh3.googleusercontent.com/-Xwq50X1awCI/V1XknnPgxlI/AAAAAAAABVs/JF6MqGq4MLg_YD04eAIllSOuiWtBXyc2ACLcB/s0/Diagrama+de+caso+de+uso+-+Doar.png "Diagrama de caso de uso")
## Descrição dos cenários de casos de uso

###Pedir doação
 - **Ator:** ONG
 - **Pré-condição:** ONG cadastrada
 - **Fluxo normal:** 
   1. Digitar qual a doação necessária.
   2. Informar o valor/quantidade
   3. Informar qual o tipo da doação: *recorrente* ou *esporádica*
   4. Informar observações
 - **Pós-condição:** Doação é registrada e fica disponível para a visualização de doadores.


###Registrar recebimento de doação
 - **Ator:** ONG
 - **Pré-condição:** ONG cadastrada e doação recebida
 - **Fluxo normal:** 
   1. Selecionar qual a doação foi recebida.
   2. Informar o valor/quantidade
   3. Informar observações
   4. ***Notificar doador***
 - **Pós-condição:** Se a doação é esporádica e o valor/quantidade for maior ou igual ao valor/quantidade pedido, remover doação da lista de necessidades da ONG.



###Notificar doador
 - **Ator:** Doador
 - **Pré-condição:** Doação recebida e registrada
 - **Fluxo normal:** 
   1. Notificar doador sobre recebimento da doação enviada.
   2. Mostrar outras doações necessárias



###Oferecer doação
 - **Ator:** Doador
 - **Pré-condição:** Doador cadastrado
 - **Fluxo normal:** 
   1. Selecionar qual doação ele quer realizar
   2. Informar o valor/quantidade
   3. Informar observações
   4. Informar forma de entrega
 - **Pós-condição:** ONG recebe a intenção de doação e pode entrar em contato com o doador

#Projeto

O projeto do sistema Doar mostra-se bem interessante. Por se tratar de uma aplicação para web, são necessários diversos padrões arquiteturais a fim de que o sistema comunique-se com os vários protocolos existentes e ao mesmo tempo cresça e se torne mais robusto de forma organizada e consistente.

Compreende-se a necessidade da aplicação dos padrôes: 
 - Cliente-servidor
 - MVC
 - MVVM (variação do MVC)

Além disso, devido as diferentes ferramentas utilizadas, são necessários o uso de diferentes *design patterns* no código, que serão vistos na documentação do código, como:
 - Dependecy Injection (AngularJS)
 - Constructor Pattern (uso de OO com JavaScript)

##Estrutura geral do projeto

 O projeto foi arquitetado com uma estrutura de cliente-servidor, tendo suas "peças" bem definidas e separadas pelo modelo MVC. As ferramentas foram detalhadas na introdução e sua conexão pode ser detalhada pelo seguinte diagrama de componentes:

 ![enter image description here](https://lh3.googleusercontent.com/-6BB0-bUfZiw/V2hmleoBlTI/AAAAAAAABXE/V2rG1TcRuecXmHY7xhyV59zfv6Rp2KGlACLcB/s0/componentes.png "Diagrama de componentes")

Para melhor explicação da arquitetura, utilizarei o exemplo da classe User que é uma versão simplificada da classe User verdadeira utilizada no sistema.

###Model
A camada de Model do sistema é composta pelo banco de dados MongoDB e pelo modelo de objetos feito com Mongoose ODM. Como explicado na introdução, o banco de dados NoSQL, MongoDB, salva apenas documentos, que são basicamente objetos javascript: 

```javascript
{
  nome: "João",
  sobrenome: "da Silva",
  cidade: "Paracatu"
}
```

Para manter uma estrutura coerente e consistente, utilizamos um modelo em Mongoose, que basicamente simula uma tabela SQL e pode ser considerado uma `Classe` em Orientação a Objetos.

```javascript
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
// Schema (semelhante a tabela) User
var UserSchema = new Schema({
  nome: {
    type: String,
    default: ''
  },
  nascimento: {
    type: String,
    default: ''
  },
  cidade: {
    type: String,
    default: ''
  }
});
```

Dessa maneira, o Mongoose não nos permitirá persistir objetos que estejam fora dessa estrutura.

    Nota: o JavaScript até a versão ES5 (utilizada nesse projeto) não possui o conceito de Classe e Objeto, sendo assim não é considerada uma linguagem Orientada a Objetos nativa (como Java). Entretanto, existem design patterns que simulam esses conceitos, como exemplificado no código acima com o uso da keyword new. Esse design pattern é chamado Constructor e permite que sejam criados objetos de determinada classe e assim sejam utilizados conceitos como Herança.

###Controller

A camada de Controller do projeto é composta pelos Controllers em NodeJS e pelas rotas em ExpressJS que são chamadas pela camada superior e chamam os controllers.

Os controllers possuem as regras de negócio. Ou seja, eles determinam como os dados serão trabalhados para serem retornados ou persistidos. Por exemplo:

```javascript

var mongoose = require('mongoose'),
  User = mongoose.model('User');

// Função para atualizar usuário
exports.update = function (req, res) {
  // Recebe o novo usuário da requisição HTTP
  var user = req.user;
  if (user) {
    user.save(function (err) {
      if (err) {
        // Retorna erro HTTP 400
        return res.status(400);
      }
    });
  } else {
    res.status(400);
  }
};
```

As rotas são a porta de comunicação entre o lado do cliente e o lado do servidor. Nessa aplicação, as rotas são chamadas pelo cliente por meio de [AngularJS Services](https://docs.angularjs.org/guide/services).

O que as rotas fazem é basicamente receber uma requisição HTTP do cliente, verificar se o cliente tem autorização para a requisição que ele deseja (segurança), chamar o controller que realiza a função desejada e retornar a resposta para o cliente, também pelo HTTP. Para o exemplo citado acima, a rota funciona da seguinte forma:

```javascript
module.exports = function (app) {
  // User Routes
  var users = require('./userController');

  app.route('/api/users').put(users.update);  
};

```

Esse exemplo feito com o ExpressJS demonstra como funcionam as rotas. Ao receber uma requisição HTTP do tipo `put` na rota `/api/users`, a aplicação chamará o controller de User (exemplificado acima).

###View

Na arquitetura MVC, a View passa a impressão de ser uma parte simples, por ser responsável apenas por exibir os dados para o usuário. Porém as aplicações web tem se tornado cada vez mais complexas e com isso os browsers tem se tornado cada vez mais poderosos e consequentemente complexos. Por isso, a View desse projeto é tratada como uma aplicação a parte, onde os dados recebidos do servidor são trabalhados, modificados e por vezes otimizados, de acordo com a necessidade do sistema. 

Sendo assim, esse projeto utiliza o AngularJS, um framework pensado para obter alta performance com grande foco na interface e na experiência do usuário e ao mesmo tempo com um código escalável, bem estruturado e organizado.

O AngularJS utiliza o padrão arquitetural MVVM, muito semelhante ao MVC, com a difença que o ViewModel (que substitui o Controller) possui uma referência do Model que se comunica com a View, ou seja, se essa referência é alterada, a View se atualiza automaticamente (e vice-versa) graças a um mecanismo de data-binding, nesse caso implementado pelo AngularJS.

Dessa forma o Angular funciona com os seguintes passos:
 1. Um service requisita uma rota do servidor;
 2. Ele recebe o dado que é salvo na aplicação, normalmente no `$scope` (referência do Model)
 3. Os controllers do Angular (ViewModel) são responsáveis por trabalhar os dados;
 4. A view exibe os dados.

Caso os dados sejam alterados e queiram ser persistidos na base de dados, realiza-se esse passo-a-passo de trás pra frente.

####Angular Model

Como brevemente explicado acima, os modelos no Angular são os dados recebidos do servidor. Logo, normalmente, eles estão na estrutura pré definida pelo modelo do servidor.

Através de services, requisita-se a rota desejada. Continuando o exemplo acima, caso desejemos atualizar um usuário devemos criar o seguinte serviço no Angular:

```javascript
angular.module('users').service('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
```

Esse exemplo simplesmente define a criação de um Service que atuará realizando uma requisição PUT para a rota `api/users` quando solicitado.

####Angular ViewModel

A camada de ViewModel, implementada por meio de estruturas denominadas controllers, são as responsáveis por chamar o serviço e com isso receber ou enviar os dados, mantendo uma referência ao modelo que é acessado pela View.

No caso do exemplo, o controller seria responsável por enviar os dados atualizados na View para o backend.

####Angular View

As Views no AngularJS são páginas em HTML extendidas com alguns comandos únicos implementados pelo framework. Por meio delas, pode-se acessar a ViewModel e alterar os dados ou chamar métodos do controller que façam isso.

```HTML
<section>
  <div class="page-header">
    <h1>User <span ng-bind="user.username"></span></h1>
  </div>
  <div class="col-md-12">
    <form name="userForm" ng-submit="update()" novalidate>
      <fieldset>
        <div class="form-group" show-errors>
          <label for="nome">Nome</label>
          <input type="text" id="nome" name="nome" class="form-control" ng-model="user.nome" placeholder="First Name" required />
          <div ng-messages="userForm.nome.$error" role="alert">
            <p class="help-block error-text" ng-message="required">First name is required.</p>
          </div>
        </div>
        <div class="form-group" show-errors>
          <label for="sobrenome">Sobrenome</label>
          <input type="text" id="sobrenome" name="sobrenome" class="form-control" ng-model="user.sobrenome" placeholder="Last Name" required />
          <div ng-messages="userForm.sobrenome.$error" role="alert">
            <p class="help-block error-text" ng-message="required">Last name is required.</p>
          </div>
        </div>
        <div class="form-group" show-errors>
          <label class="control-label" for="cidade">Cidade</label>
          <div class="controls">
            <input class="form-control" type="text" name="cidade" ng-model="user.cidade" id="cidade" ng-list required />
            <div ng-messages="userForm.cidade.$error" role="alert">
              <p class="help-block error-text" ng-message="required">At least one role is required.</p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <input type="submit" value="Update" class="btn btn-default">
        </div>
        <div ng-show="error" class="text-danger">
          <strong ng-bind="error"></strong>
        </div>
      </fieldset>
    </form>
  </div>
</section>

```