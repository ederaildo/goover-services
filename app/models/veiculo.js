var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var veiculoSchema = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	nome: String
});

exports.def =
	{
		"Veiculo":{
			"id":"Veiculo",
			"required": ["id", "nome"],
			"properties":{
				"id":{
					"type":"number",
					"description": "ID do Veículo"
				},
				"nome":{
					"type":"string",
					"description": "Título do Veículo"
				}
			}
		}
	};

exports.model = mongoose.model('veiculos', veiculoSchema);
