/* global next */
/**
* All API methods and database connection info
*/
var sw = require('swagger-node-express'),
		colors = require('colors'),
		swe = sw.errors,
		config = require('../../config'),
		util = require('util');

/**
* Carregar o model
*/
var Genero = require('../models/genero.js');

/**
* Todos os métodos e a conexão com o banco para a API
*
* Tudo que está em "spec" é para a documentação que o Swagger irá gerar,
* tudo em "actions" é para a finalidade da funcionalidade da API
*
* Dentro da spec...
* 	@property caminho utilizado para acesso ao método
* 	@property notes A longer version of what the operation does (shows up in the
* 		"Implementation Notes" part of a methods decription when the method is
*		expanded on the documentation page)
* 	@property summary Short summary of what the operation does (shows up on the same line as
*		the "path" when the method is hidden on the documentation page)
* 	@property method The HTTP method used for the Operations
* 	@property parameters Inputs to the methods (can be a blank array if no inputs are needed)
* 	@property type The data type returned by the method. Can be void, a simple-type, a complex,
		or a container (more info at: https://github.com/wordnik/swagger-core/wiki/datatypes)
* 	@property items An array of the model definitions
* 	@property responseMessages Describes how messages from the method maps to the API logic
* 	@property errorResponses Describes how errors messages from the method maps to the API logic
* 	@property nickname Used to provide a shebang (#!) in the swagger-ui
*/


exports.getAllGeneros = {
	'spec': {
		description : "Lista de todas os gêneros",
		path : "/genero/list",
		method: "GET",
		summary : "Lista com todas as gêneros disponíveis",
		notes : "Retorna a lista de todas os gêneros.",
		type : "Genero",
		nickname : "getAllGeneros",
		produces : ["application/json"],
		parameters : [],
		responseMessages : [swe.invalid('generos'), swe.notFound('generos')]
	},
	'action': function (req,res) {
		Genero.model.find(function(err, generos) {
			if (err) return next(swe.invalid('generos'))

			if (generos) {
				res.send(generos);
			} else {
				res.send(404, swe.notFound('generos'));
			};
		});
	}
};

exports.getGeneroById = {
	'spec': {
		description : "Operações de Generos",
		path : "/genero/{generoId}",
		method: "GET",
		summary : "Encontrar gênero por ID",
		notes : "Retorna a gênero baseado no ID",
		type : "Genero",
		nickname : "getGeneroById",
		produces : ["application/json"],
		parameters : [sw.pathParam("generoId", "ID da gênero a ser pesquisada", "string")],
		responseMessages : [swe.invalid('id'), swe.notFound('genero')]
	},
	'action': function (req,res) {
		Genero.model.findOne({_id: req.params.generoId}, function(err, genero) {
			if (err) return res.send(404, { error: 'id inválido' });

			if (genero) {
				res.send(genero);
			} else {
				res.send(404, new Error('gênero não encontrada'));
			}
		});
	}
};

exports.getGeneroByNome = {
	'spec': {
		description : "Operações de Generos",
		path : "/genero/nome/{generoNome}",
		method: "GET",
		summary : "Encontrar genero por nome",
		notes : "Retorna a genero baseado no nome",
		type : "Genero",
		nickname : "getGeneroByNome",
		produces : ["application/json"],
		parameters : [sw.pathParam("generoNome", "Nome ou título da genero a ser pesquisada", "string")],
		responseMessages : [swe.invalid('nome'), swe.notFound('genero')]
	},
	'action': function (req,res) {
		Genero.model.findOne({nome: new RegExp(req.params.generoNome, "i")}, function(err, genero) {
			if (err) return res.send(404, { error: 'nome inválido' });

			if (genero) {
				res.send(genero);
			} else {
				res.send(404, new Error('genero não encontrado'));
			}
		});
	}
};
