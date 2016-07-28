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
var Voto = require('../models/voto.js');
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

exports.registrarVotoGet = {
	'spec': {
		description : "Operações de Votação",
		path : "/voto/registrarVotoGet/{idUser}/{idPrograma}/{valorVoto}",
		method: "GET",
		summary : "Registrar voto via método do tipo GET",
		notes : "Registrar voto via método do tipo GET",
		type : "Voto",
		nickname : "registrarVotoGet",
		produces : ["application/json"],
		parameters :	[	sw.pathParam("idUser", "ID do usuário que está registrando o voto", "string"),
										sw.pathParam("idPrograma", "ID do programa que o usuário está registrando o voto", "string"),
										sw.pathParam("valorVoto", "Valor do voto que o usuário está registrando baseado nas estrelas escolhidas", "number")
									],
		responseMessages : [swe.invalid('id do usuário'), swe.notFound('programa'), swe.invalid('valor do voto')]
	},
	'action': function (req,res) {
			Voto.model.create({
					idUser: req.params.idUser,
					programa: req.params.idPrograma,
					valorVoto: req.params.valorVoto
			 	}, function (err, name) {
				if (err) return res.send(500, { error: err });

				if (name) {
					res.send(name);
				} else {
					res.send(500, { error: 'phone not added' });
				};
			});
	}
};

exports.registrarVotoPost = {
	'spec': {
		path : "/voto/registrarVotoPost",
		summary : "Registrar voto via método do tipo POST (Envio de Formulário)",
		notes : "Registrar voto via método do tipo POST (Envio de Formulário)",
		method: "POST",
		type: "Voto",
		parameters : [{
				name: "Voto",
				description: "Objeto voto submetido pelo formulário",
				required: true,
				type: "Voto",
				paramType: "body"
			}
		],
		nickname : "registrarVotoPost",
		responseMessages : [swe.invalid('input')]
	},
	'action': function(req, res, next) {
			var body = req.body;
			if(!body || !body.valorVoto){
				throw swe.invalid('Voto');
			} else {
			// Create the new document (database will be updated automatically)
			Voto.model.create({
								idUser: body.idUser,
								programa: body.idPrograma,
								valorVoto: body.valorVoto
				}, function (err, idUser) {
				if (err) return res.send(500, { error: err });
				if (idUser) {
					res.send(idUser);
				} else {
					res.send(500, { error: 'Voto não registrado' });
				};
			});
		}
	}
};
