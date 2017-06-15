function initiate() {
	databox = document.getElementById('databox');

	var myfiles = document.getElementById('myfiles');
	myfiles.addEventListener('change', upload, false);

	var show = document.getElementById('show');
	show.addEventListener('click', showList, false);
}

function upload(e) {
	var files = e.target.files;
	var file = files[0];

	var data = new FormData();
	data.append('file', file);

	var url = '/u';
	var request = new XMLHttpRequest();
	var xmlupload = request.upload;
	xmlupload.addEventListener('loadstart', start, false);
	xmlupload.addEventListener('progress', status, false);
	xmlupload.addEventListener('load', show, false);
	request.open('POST', url, true);
	request.send(data);
}


function start() {
	databox.innerHTML = '<progress value="0" max="100">0%</progress>';
}

function status(e) {
	if (e.lengthComputable) {
		var per = parseInt(e.loaded / e.total * 100);
		var progressbar = databox.querySelector('progress');
		progressbar.value = per;
		progressbar.innerHTML = per + '%';
	}
}

function show(e) {
	databox.innerHTML = 'Completed';
}

function showList(e) {
	var url = '/l';
	var request = new XMLHttpRequest();
	var xmlupload = request.upload;
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			databox.innerHTML = parseData(request.responseText);
			;
			parseData(request.responseText);
		}
	}
	request.open('POST', url, true);
	request.send();
}

var getKeys = function (obj) {
	var keys = [];
	for (var key in obj) {
		keys.push(key);
	}
	return keys;
}
function parseData(dataForParse) {
	var arrRows = JSON.parse(dataForParse);
	var keys = getKeys(arrRows[0]);
	var tableList = '<table border = "1"><tr>';
	keys.forEach(function (key) {
		tableList = tableList + '<td>' + key + '</td>';
	});
	tableList = tableList + '</tr>';
	arrRows.forEach(function (row) {
		tableList = tableList + '<tr>';
		keys.forEach(function (key) {
			tableList = tableList + '<td>' + row[key] + '</td>';
		})
		tableList = tableList + '</tr>';
	});
	tableList = tableList + '</table>';
	return tableList;
}


window.addEventListener('load', initiate, false);
