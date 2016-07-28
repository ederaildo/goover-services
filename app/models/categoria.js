var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var categoriaSchema = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	nome: String
});

exports.def =
	{
		"Categoria":{
			"id":"Categoria",
			"required": ["id", "nome"],
			"properties":{
				"id":{
					"type":"number",
					"description": "ID da Categoria"
				},
				"nome":{
					"type":"string",
					"description": "Título da Categoria"
				}
			}
		}
	};

exports.model = mongoose.model('categorias', categoriaSchema);
