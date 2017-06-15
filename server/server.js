const
	express = require('express'), // Create object Express
	fileUpload = require('express-fileupload'),
	app = express(); // Create to  Express- application

var
	path = require('path'),
	currentDir = parametr('--directory'),
	fs = require('fs'),
	inportdb = require('./importdb');

if (currentDir === undefined) {
	currentDir = __dirname;
}

var port = parametr('--port');

app.use(fileUpload());

app.get('/', function (req, res) {
	res.sendfile(path.join(currentDir, 'index.html'));
});

app.get('/*', function (req, res) {
	var fullPath = path.join(currentDir, req.url);
	console.log('LOG >> GET: ', req.url);
	if (fs.existsSync(fullPath)) {
		res.sendfile(fullPath);
	} else {
		res.send('Not found :(');
	}
});

app.post('/u', function (req, res) {
	var fs = require('fs');

	if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
		fs.mkdirSync(path.join(__dirname, 'uploads'));
	}

	var fullPath = path.join(__dirname, 'uploads', Date.now().toString());
	if (!req.files) return res.status(400).send('No files were uploaded.');
	let sampleFile = req.files.file;
	sampleFile.mv(fullPath, function (err) {
		if (err) return res.status(500).send(err);
		inportdb.run(fullPath, function (data) {});
		res.send('File uploaded!');
	});
});

app.post('/l', function (req, res) {
	var tableData;
	inportdb.dbdata((data) => {
		tableData = JSON.stringify(data);
		res.send(tableData);
	});
});

port = port ? Number(port) : 3000;
app.listen(port);

console.log('Start WEB server!');
console.log('Path of static files: ' + currentDir);
console.log('Port:' + port);

function parametr(par) {
	var res;
	process.argv.forEach((item, i, arr) => {
		if (par === item)
			res = process.argv[i + 1];
	});
	return res;
}
