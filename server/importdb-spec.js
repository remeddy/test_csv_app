'use strict';
var importdb = require('./importdb.js');
var expect = require('chai').expect;

describe('#JSONtoValues()', function () {
	it('test 1', function () {
		var input = {
			field1: 'Francheska',
			field2: 'Valena',
			field3: 'fran@pp.ua'
		};
		var expected = ['field1',
			'Francheska',
			'field2',
			'Valena',
			'field3',
			'fran@pp.ua'
		];
		var actual = importdb.JSONtoValues(input);
		expect(actual).to.eql(expected);
	});

	it('test 2', function () {
		var input = {
			field1: 'Francheska',
			field2: 'Valena'
		};
		var expected = ['field1',
			'Francheska',
			'field2',
			'Valena'
		];
		var actual = importdb.JSONtoValues(input);
		expect(actual).to.eql(expected);
	});
});

describe('#stringCreate()', function () {
	it('test 1', function () {
		var input = ['field1', 'First Name', 'field2', 'Surname', 'field3', 'Email'];
		var expected = 'CREATE TABLE if not exists USER ([First Name] TEXT, [Surname] TEXT, [Email] TEXT);';
		var actual = importdb.stringCreate(input);
		expect(actual).to.eql(expected);
	});

	it('test 1', function () {
		var input = ['field1', 'id', 'field2', 'Name', 'field3', 'Date'];
		var expected = 'CREATE TABLE if not exists USER ([id] TEXT, [Name] TEXT, [Date] TEXT);';
		var actual = importdb.stringCreate(input);
		expect(actual).to.eql(expected);
	});

});

describe('#stringInsert()', function () {
	it('test 1', function () {
		var input = ['field1',
			'Monika',
			'field2',
			'Beluchi',
			'field3',
			'monika@gov.iop.com.ua'
		];
		var colums = ['field1', 'First Name', 'field2', 'Surname', 'field3', 'Email'];
		var expected = 'INSERT into USER ("First Name","Surname","Email") VALUES ("Monika","Beluchi","monika@gov.iop.com.ua")';
		var actual = importdb.stringInsert(colums, input);
		expect(actual).to.eql(expected);
	});

	it('test 2', function () {
		var input = ['field1',
			'Anna',
			'field2',
			'Bunina',
			'field3',
			'ann1234@yandex.ru'
		];
		var colums = ['field1', 'First Name', 'field2', 'Surname', 'field3', 'Email'];
		var expected = 'INSERT into USER ("First Name","Surname","Email") VALUES ("Anna","Bunina","ann1234@yandex.ru")';
		var actual = importdb.stringInsert(colums, input);
		expect(actual).to.eql(expected);
	});


});
