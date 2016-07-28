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
var Veiculo = require('../models/veiculo.js');

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


exports.getAllVeiculos = {
	'spec': {
		description : "Lista de todos os veículos",
		path : "/veiculo/list",
		method: "GET",
		summary : "Lista com todos os veículos disponíveis",
		notes : "Retorna a lista de todos os veículos.",
		type : "Veiculo",
		nickname : "getAllVeiculos",
		produces : ["application/json"],
		parameters : [],
		responseMessages : [swe.invalid('veiculos'), swe.notFound('veiculos')]
	},
	'action': function (req,res) {
		Veiculo.model.find(function(err, veiculos) {
			if (err) return next(swe.invalid('veiculos'))

			if (veiculos) {
				res.send(veiculos);
			} else {
				res.send(404, swe.notFound('veiculos'));
			};
		});
	}
};

exports.getVeiculoById = {
	'spec': {
		description : "Operações de Veículos",
		path : "/veiculo/{veiculoId}",
		method: "GET",
		summary : "Encontrar veículo por ID",
		notes : "Retorna o veículo baseado no ID",
		type : "Veiculo",
		nickname : "getVeiculoById",
		produces : ["application/json"],
		parameters : [sw.pathParam("veiculoId", "ID da veículo a ser pesquisado", "string")],
		responseMessages : [swe.invalid('id'), swe.notFound('veiculo')]
	},
	'action': function (req,res) {
		Veiculo.model.findOne({_id: req.params.veiculoId}, function(err, veiculo) {
			if (err) return res.send(404, { error: 'id inválido' });

			if (veiculo) {
				res.send(veiculo);
			} else {
				res.send(404, new Error('veiculo não encontrada'));
			}
		});
	}
};

exports.getVeiculoByNome = {
	'spec': {
		description : "Operações de Veículos",
		path : "/veiculo/nome/{veiculoNome}",
		method: "GET",
		summary : "Encontrar veículo por nome",
		notes : "Retorna a veículo baseado no nome",
		type : "Veiculo",
		nickname : "getVeiculoByNome",
		produces : ["application/json"],
		parameters : [sw.pathParam("veiculoNome", "Nome ou título da veículo a ser pesquisada", "string")],
		responseMessages : [swe.invalid('nome'), swe.notFound('veiculo')]
	},
	'action': function (req,res) {
		Veiculo.model.findOne({nome: new RegExp(req.params.veiculoNome, "i")}, function(err, veiculo) {
			if (err) return res.send(404, { error: 'nome inválido' });

			if (veiculo) {
				res.send(veiculo);
			} else {
				res.send(404, new Error('veículo não encontrada'));
			}
		});
	}
};
