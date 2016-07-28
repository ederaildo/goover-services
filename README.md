[![Goover Logo](http://gooverbackend-gooverprd.rhcloud.com/images/logo.png)](http://www.gooverapp.com/)


#Goover Services

## Sobre

Goover é um aplicativo que demonstra a tendência de público para os diversos programas ou séries da TV (Aberta e Paga), Stream  e canais de Internet.

O Services é uma aplicação que disponibiliza serviços RESTFul construída sob a estrutura de um Node.JS. Esses serviços REST serão consumidos pelo aplicativo mobile Goover.

## Pré Requisitos

Para instalar e executar é preciso ter as seguintes ferramentas instaladas:

* [MongoDB](www.mongodb.org)
* [NPM (Node.Js)](www.npm.org)

## Instalação

O Goover Services foi construído sob o Node.JS.
Para a instalação é preciso ter o NPM instalado, ir no diretório raiz e executar o comando:

```
npm install
```

No arquivo .env estão disponíveis as configurações de banco de dados para conexão.

## Run

Para subir o servidor com a aplicação, é necessário o MongoDB com a base de dados gooverdb estar rodando localmente.

```
node server
```

O servidor irá rodar em localhost porta 8080. Então é só acessar no browser:
dd a comment to this line

```
http://localhost:8080/docs
```

## Documentação

O Goover Services foi desenvolvido juntamente com o framework [Swagger](www.swagger.io). O Swagger é um framework para APIs que, entre outras coisas, permite documentar todos os serviços de uma API.
Para acessar a documentação dos serviços e testá-los via interface Swagger basta acessar a URL:

```
http://localhost:8080/docs
```


## Contributors



## License