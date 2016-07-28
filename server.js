/* global __dirname, done */
//  OpenShift sample Node application
var express     = require('express');
var mongoose    = require('mongoose');
var fs          = require('fs');
var express     = require('express');
var app         = express();
var subpath     = express();
var bodyParser  = require('body-parser');
var url         = require('url');
var categoriaApi  = require('./app/api/categorias.js');
var generoApi     = require('./app/api/generos.js');
var veiculoApi    = require('./app/api/veiculos.js');
var votacaoApi    = require('./app/api/votacao.js');
var programaApi    = require('./app/api/programas.js');
var db            = mongoose.connection;
var config        = require('./config');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", subpath);
var swagger     = require('swagger-node-express').createNew(subpath);
//swagger.setAppHandler(subpath);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP;

if (typeof server_ip_address === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    server_ip_address = "127.0.0.1";
};

//Banco mongodb
db.on('error', function() {
console.log('Database: Erro de conexão'.red);
});
db.on('connecting', function () {
console.log('Database: Conectando'.cyan);
});
db.once('open', function() {
console.log('Database: Conexão Estabelecida'.green);
});
db.on('reconnected', function () {
console.log('Database: Reconectado'.green);
});

mongoose.connect(config.dbUrl, {server: {auto_reconnect: true}});

// Simples validação para segurança para todos os métodos POST, DELETE, PUT
// o header `api_key` ou parametro da URL `api_key`
// tem que ser igual a `1234`.
// todas as outras opções serão permitidas
swagger.addValidator(
	function validate(req, path, httpMethod) {
		//  exemplo de somente permitir POST com a api_key="special-key"
	/*	if ("POST" == httpMethod || "DELETE" == httpMethod || "PUT" == httpMethod) {
			var apiKey = req.headers["api_key"];
			if (!apiKey) {
				apiKey = url.parse(req.url,true).query["api_key"];
			}
			if ("1234" == apiKey) {
				return true;
			}
			return false;
		}*/
		return true;
	}
);

// Listar todos os models do diretório 'models' e suas definições para o swagger
// isso vai ser mostrado nos documentos
var models = {"models":{}},
	modelPath = 'app/models';
    require("fs").readdirSync(modelPath).forEach(function(file) {
    console.log('Load models from - ' + file);
    var outMod = require('./' + modelPath + '/' + file).def;
    for (var atr in outMod) {
        models.models[atr] = outMod[atr];
    }
});
swagger.addModels(models);

swagger
	.addGet(categoriaApi.getAllCategorias)
	.addGet(categoriaApi.getCategoriaById)
	.addGet(categoriaApi.getCategoriaByNome)
	.addGet(generoApi.getAllGeneros)
	.addGet(generoApi.getGeneroById)
	.addGet(generoApi.getGeneroByNome)
	.addGet(veiculoApi.getAllVeiculos)
	.addGet(veiculoApi.getVeiculoById)
	.addGet(veiculoApi.getVeiculoByNome)
	.addGet(votacaoApi.registrarVotoGet)
	.addPost(votacaoApi.registrarVotoPost)
	.addGet(programaApi.getAllProgramas)
	.addGet(programaApi.getProgramaById)
	.addGet(programaApi.getProgramaByTitulo)

swagger.setApiInfo({
	title: "Goover API",
	description: "API dos serviços para o aplicativo Goover.",
	contact: "gooverapp@gmail.com",
	termsOfServiceUrl: "http://helloreverb.com/terms/",
	license: "Apache 2.0",
	licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
});

swagger.setAuthorizations({
	apiKey: {
		type: "apiKey",
		passAs: "header"
	}
});

swagger.configureSwaggerPaths("", "api-docs", "")
swagger.configure("http://gooverservices-gooverprd.rhcloud.com/api", "0.0.1");
//swagger.configure("http://localhost:8080/api", "0.0.1");


// Subir a documentação swagger ui no caminho /docs
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
	if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
		res.writeHead(302, { 'Location' : req.url + '/' });
		res.end();
		return;
	}
	// take off leading /docs so that connect locates file correctly
	req.url = req.url.substr('/docs'.length);
	return docs_handler(req, res, next);
});


//app.use('/api', api);

// START THE SERVER
// =============================================================================
//  Start the app on the specific interface (and port).
app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});
