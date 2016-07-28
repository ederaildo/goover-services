var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var programaSchema = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	slug: String,
	titulo: String,
	status: String,
	lancamento: Boolean,
	dataPublicacao: Date,
	backdrop: {
						public_id : String,
		        version : Number,
		        signature : String,
		        width : Number,
		        height : Number,
		        format : String,
		        resource_type : String,
		        url : String,
		        secure_url : String
					},
	categorias: [{
		type: Schema.ObjectId,
		ref: 'Categoria'
	}],
	genero: [{
		type: Schema.ObjectId,
		ref: 'Genero'
	}],
	veiculos: [{
		type: Schema.ObjectId,
		ref: 'Veiculo'
	}],
	destaques: [{
		type: Schema.ObjectId,
		ref: 'Destaque'
	}],
  conteudo : {
      sinopse : String
  },
});

exports.def =
	{
		"Programa":{
			"id":"Programa",
			"required": ["id", "titulo"],
			"properties":{
				"id":{
					"type":"number",
					"description": "ID do Programa"
				},
				"slug":{
					"type":"string",
					"description": "Slug é a parte de uma URL que pode ser legível tanto para humanos quanto para mecanismos de busca. É, normalmente, parte da URL de páginas em sistemas que fazem uso de URL amigável."
				},
				"titulo":{
					"type":"string",
					"description": "Título do Programa"
				},
				"status":{
					"type":"string",
					"description": "Status de publicação do Programa ou Filme.",
					"enum": [
						"rascunho",
						"publicado",
						"arquivado"
					  ]
				},
				"lancamento":{
					"type":"boolean",
					"description": "Campo de indica se o Programa ou Filme é um lançamento."
				},
				"dataPublicacao":{
					"type":"date",
					"description": "Data de Publicação do Programa."
				},
				"backdrop":{
					"type": "string",
					"description": "Campos relativos a imagem no CloudinaryImage"
				},
				"public_id":{
					"type":"string",
					"description": "[backdrop] ID d a imagem no CloudinaryImage"
				},
				"version":{
					"type":"number",
					"description": "[backdrop] Versão da imagem no CloudinaryImage"
				},
				"signature":{
					"type":"string",
					"description": "[backdrop] Assinatura da imagem no CloudinaryImage"
				},
				"width":{
					"type":"number",
					"description": "[backdrop] Largura da Imagem"
				},
				"height":{
					"type":"number",
					"description": "[backdrop] Altura da Imagem"
				},
				"format":{
					"type":"string",
					"description": "[backdrop] Formato da Imagem. Pode ser jpg, png, gif etc."
				},
				"resource_type":{
					"type":"string",
					"description": "[backdrop] Tipo de Recurso, por exemplo image"
				},
				"url":{
					"type":"string",
					"description": "[backdrop] URL com o caminho da imagem."
				},
				"secure_url":{
					"type":"string",
					"description": "[backdrop] URL seguro (https) com o caminho da imagem."
				},
				"categorias":{
					"type":"string",
					"description": "ID das categorias relacionadas ao Programa."
				},
				"genero":{
					"type":"string",
					"description": "ID dos generos relacionados ao Programa. Por exemplo comedia, aventura, romance etc."
				},
				"veiculos":{
					"type":"string",
					"description": "ID dos veiculos relacionados ao Programa. Por exemplo onde passa o programa, canal etc."
				},
				"destaques":{
					"type":"string",
					"description": "ID dos destaques relacionados ao Programa. Por exemplo, destaque  na home etc."
				},
				"conteudo":{
					"type":"string",
					"description": "Todos os campos relativo aos textos de conteúdo de Programas."
				},
				"sinopse":{
					"type":"string",
					"description": "[conteudo] Texto com a sinopse do Programa ou Filme."
				}
				
			}
		}
	};

exports.model = mongoose.model('programas', programaSchema);
