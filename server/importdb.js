const csv = require('csvtojson');
const sqlite3 = require('sqlite3').verbose();


exports.dbshow = function () {
	var db = new sqlite3.Database('mydb.db');
	db.serialize(function () {
		db.all("SELECT * from USER ", function (err, rows) {
			console.log('LOG >> DB Table: \n', rows);
		});
	});
	db.close();
};

exports.dbdata = function (call) {
	var db = new sqlite3.Database('mydb.db');
	db.serialize(function () {
		db.all("SELECT * from USER ", function (err, rows) {
			call(rows);
		});
	});
	db.close();
};

exports.run = function (csvFilePath, callForData) {
	var
		data = [],
		firstRow = true,
		st, columnsName,
		db = new sqlite3.Database('mydb.db');

	csv({
		noheader: true
	})
	.fromFile(csvFilePath)
	.on('json', (jsonObj) => {
		values = JSONtoValues(jsonObj);
		data.push(values);
		db.serialize(function () {
			if (firstRow) {
				columnsName = values;
				st = stringCreate(values);
				firstRow = false;
				db.run(st);
			} else {
				st = stringInsert(columnsName, values);
				db.run(st);
			}
			console.log('LOG >> STRING :' + st);
		});
	})
	.on('done', (error) => {
		console.log('end');
		callForData(data);
		var fs = require('fs');
		fs.unlink(csvFilePath);
		db.close();
		return data;
	});

};

function JSONtoValues(jsonObj) {
	return exports.JSONtoValues(jsonObj);
}

function stringCreate(values) {
	return exports.stringCreate(values);
}

exports.JSONtoValues = function (jsonObj) {
	var st;
	st = JSON.stringify(jsonObj);
	st = st.slice(1, st.length - 1);
	st = st.replace(/\"+/g, '');
	st = st.replace(/\,+/g, ':');
	return st.split(':');
};

exports.stringCreate = function (values) {
	let st = 'CREATE TABLE if not exists USER (';
	const max_length = values.length / 2;
	for (let i = 1; i <= max_length; i++) {
		st += '[' + values[i * 2 - 1] + '] TEXT' + (i === max_length ? '' : ', ');
	}
	st += ');';
	return st;
};

function stringInsert(columnsName, values) {
	return exports.stringInsert(columnsName, values);
}

exports.stringInsert = function (columnsName, values) {
	let st = 'INSERT into USER (';
	const max_length1 = columnsName.length / 2;
	for (let i = 1; i <= max_length1; i++) {
		st = st + '"' + columnsName[i * 2 - 1] + '"' + (i === max_length1 ? ')' : ',');
	}
	st += ' VALUES (';

	const max_length2 = values.length / 2;
	for (let i = 1; i <= max_length2; i++) {
		st += '"' + values[i * 2 - 1] + '"' + (i === max_length2 ? ')' : ',');
	}
	return st;
};
