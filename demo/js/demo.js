$(document).ready(function(){
	var data = [
		{ "time": "2013-05-14 14:12:03", "entity": "192.168.0.1", "value": "Hello!" },
		{ "time": "2013-05-14 14:13:23", "entity": "192.168.0.2", "value": "Good Morning!" },
		{ "time": "2013-05-14 14:18:43", "entity": "192.168.0.1", "value": "How are you?" },
		{ "time": "2013-05-14 14:18:59", "entity": "192.168.0.1", "value": "Evrything ok?" },
		{ "time": "2013-05-14 14:28:22", "entity": "192.168.0.3", "value": "Hello guys!" },
		{ "time": "2013-05-14 14:28:24", "entity": "192.168.0.4", "value": "Damn, what's that?" },
		{ "time": "2013-05-14 14:28:26", "entity": "192.168.0.4", "value": "Damn, what's that?" },
		{ "time": "2013-05-14 14:28:28", "entity": "192.168.0.3", "value": "What?" },
		{ "time": "2013-05-14 14:28:32", "entity": "192.168.0.4", "value": "Damn, what's that?" },
		{ "time": "2013-05-14 14:29:43", "entity": "192.168.0.3", "value": "What do you mean?" }
	];

	$('#timeline').timeline({
		autoUnitSize: true,
		cumulateValues: false,
		data: data, 
		fontSize: 16, 
		fontFace: "Verdana", 
		unitSize: 40,
		cornerRadius: 10,
		paddingX: 15,
		paddingy: 10,
		borderWidth: 3
	});
});



