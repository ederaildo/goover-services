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
var Programa = require('../models/programa.js');

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


exports.getAllProgramas = {
	'spec': {
		description : "Lista de todos os programas",
		path : "/programa/list",
		method: "GET",
		summary : "Lista com todos as programas disponíveis",
		notes : "Retorna a lista de todos os programas.",
		type : "Programa",
		nickname : "getAllProgramas",
		produces : ["application/json"],
		parameters : [],
		responseMessages : [swe.invalid('programas'), swe.notFound('programas')]
	},
	'action': function (req,res) {
		Programa.model.find(function(err, programas) {
			if (err) return next(swe.invalid('programas'))

			if (programas) {
				res.send(programas);
			} else {
				res.send(404, swe.notFound('programas'));
			};
		});
	}
};

exports.getProgramaById = {
	'spec': {
		description : "Operações de Programas",
		path : "/programa/{programaId}",
		method: "GET",
		summary : "Encontrar programa por ID",
		notes : "Retorna a programa baseado no ID",
		type : "Programa",
		nickname : "getProgramaById",
		produces : ["application/json"],
		parameters : [sw.pathParam("programaId", "ID da programa a ser pesquisada", "string")],
		responseMessages : [swe.invalid('id'), swe.notFound('programa')]
	},
	'action': function (req,res) {
		Programa.model.findOne({_id: req.params.programaId}, function(err, programa) {
			if (err) return res.send(404, { error: 'id inválido' });

			if (programa) {
				res.send(programa);
			} else {
				res.send(404, new Error('programa não encontrado'));
			}
		});
	}
};

exports.getProgramaByTitulo = {
	'spec': {
		description : "Operações de Programas",
		path : "/programa/titulo/{programaTitulo}",
		method: "GET",
		summary : "Encontrar programa por título",
		notes : "Retorna a programa baseado no título",
		type : "Programa",
		nickname : "getProgramaByTitulo",
		produces : ["application/json"],
		parameters : [sw.pathParam("programaTitulo", "Nome ou título da programa a ser pesquisada", "string")],
		responseMessages : [swe.invalid('titulo'), swe.notFound('programa')]
	},
	'action': function (req,res) {
		Programa.model.findOne({titulo: new RegExp(req.params.programaTitulo, "i")}, function(err, programa) {
			if (err) return res.send(404, { error: 'Título inválido' });

			if (programa) {
				res.send(programa);
			} else {
				res.send(404, new Error('programa não encontrado'));
			}
		});
	}
};
