var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var generoSchema = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	nome: String
});

exports.def =
	{
		"Genero":{
			"id":"Genero",
			"required": ["id", "nome"],
			"properties":{
				"id":{
					"type":"number",
					"description": "ID do Genero"
				},
				"nome":{
					"type":"string",
					"description": "Título do Gênero"
				}
			}
		}
	};

exports.model = mongoose.model('generos', generoSchema);
