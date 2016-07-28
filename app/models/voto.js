var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var votoSchema = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	idUser: String,
	programa: mongoose.Schema.ObjectId,
	valorVoto: Number
});

exports.def =
	{
		"Voto":{
			"id":"Voto",
			"required": ["id", "programa", "valorVoto"],
			"properties":{
				"id":{
					"description": "ID do Voto"
				},
				"idUser":{
					"type":"string",
					"description": "Usuário que registrou o voto"
				},
				"programa":{
					"type":"number",
					"description": "ID do Programa que recebeu o voto"
				},
				"valorVoto":{
					"type":"number",
					"description": "Valor do voto recebido pelo programa de 1 a 5."
				}
			}
		}
	};

exports.model = mongoose.model('votos', votoSchema);
