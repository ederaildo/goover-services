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
var Categoria = require('../models/categoria.js');

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


exports.getAllCategorias = {
	'spec': {
		description : "Lista de todas as categorias",
		path : "/categoria/list",
		method: "GET",
		summary : "Lista com todas as categorias disponíveis",
		notes : "Retorna a lista de todas as categorias.",
		type : "Categoria",
		nickname : "getAllCategorias",
		produces : ["application/json"],
		parameters : [],
		responseMessages : [swe.invalid('categorias'), swe.notFound('categorias')]
	},
	'action': function (req,res) {
		Categoria.model.find(function(err, categorias) {
			if (err) return next(swe.invalid('categorias'))

			if (categorias) {
				res.send(categorias);
			} else {
				res.send(404, swe.notFound('categorias'));
			};
		});
	}
};

exports.getCategoriaById = {
	'spec': {
		description : "Operações de Categorias",
		path : "/categoria/{categoriaId}",
		method: "GET",
		summary : "Encontrar categoria por ID",
		notes : "Retorna a categoria baseado no ID",
		type : "Categoria",
		nickname : "getCategoriaById",
		produces : ["application/json"],
		parameters : [sw.pathParam("categoriaId", "ID da categoria a ser pesquisada", "string")],
		responseMessages : [swe.invalid('id'), swe.notFound('categoria')]
	},
	'action': function (req,res) {
		Categoria.model.findOne({_id: req.params.categoriaId}, function(err, categoria) {
			if (err) return res.send(404, { error: 'id inválido' });

			if (categoria) {
				res.send(categoria);
			} else {
				res.send(404, new Error('categoria não encontrada'));
			}
		});
	}
};

exports.getCategoriaByNome = {
	'spec': {
		description : "Operações de Categorias",
		path : "/categoria/nome/{categoriaNome}",
		method: "GET",
		summary : "Encontrar categoria por nome",
		notes : "Retorna a categoria baseado no nome",
		type : "Categoria",
		nickname : "getCategoriaByNome",
		produces : ["application/json"],
		parameters : [sw.pathParam("categoriaNome", "Nome ou título da categoria a ser pesquisada", "string")],
		responseMessages : [swe.invalid('nome'), swe.notFound('categoria')]
	},
	'action': function (req,res) {
		Categoria.model.findOne({nome: new RegExp(req.params.categoriaNome, "i")}, function(err, categoria) {
			if (err) return res.send(404, { error: 'nome inválido' });

			if (categoria) {
				res.send(categoria);
			} else {
				res.send(404, new Error('categoria não encontrada'));
			}
		});
	}
};
