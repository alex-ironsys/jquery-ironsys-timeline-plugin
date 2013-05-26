jquery-ironsys-timeline-plugin
==============================

## Introduction

This is a simple plugin to visualize data on a timeline using canvas.

## Installation and usage

Include jQuery. Include plugin ( src/js/jquery.ironsys.timeline.js ).
Then select DOM element in which the canvas with visualization will be created.

```html
<head>
  <script src="jquery.js"></script>
  <script src="js/jquery.ironsys.timeline.js" type="text/javascript"></script>
</head>
<body>
  <div id="place_canvas_here"></div>
</body>

<script>
$(document).ready(function(){
  $('#place_canvas_here').timeline({ data: myDataArray });
});
</script>
```
## Data

Data consumed by plugin is an array of objects. Each of them has 3 fields `time`, `entity` and `value`. Let's consider messages as an example. You can imagine `time` is a time the message was sent, `entity` is the author of the message and `value` is content of the message:

```javascript
var data = [
		{ "time": "2013-05-14 14:12:03", "entity": "192.168.0.1", "value": "Hello!" },
		{ "time": "2013-05-14 14:13:23", "entity": "192.168.0.2", "value": "Good Morning!" },
		{ "time": "2013-05-14 14:18:43", "entity": "192.168.0.1", "value": "How are you?" },
		{ "time": "2013-05-14 14:18:59", "entity": "192.168.0.1", "value": "Everything ok?" },
		{ "time": "2013-05-14 14:19:21", "entity": "192.168.0.2", "value": "Yeah, I'm fine" },
		{ "time": "2013-05-14 14:28:22", "entity": "192.168.0.3", "value": "Hello guys!" },
		{ "time": "2013-05-14 14:28:24", "entity": "192.168.0.4", "value": "Damn, what's that?" },
		{ "time": "2013-05-14 14:28:26", "entity": "192.168.0.4", "value": "Damn, what's that?" },
		{ "time": "2013-05-14 14:28:28", "entity": "192.168.0.3", "value": "What?" },
		{ "time": "2013-05-14 14:28:32", "entity": "192.168.0.4", "value": "Damn, what's that?" },
		{ "time": "2013-05-14 14:29:43", "entity": "192.168.0.3", "value": "What do you mean?" },
		{ "time": "2013-05-14 14:30:03", "entity": "192.168.0.1", "value": "Yeah, what do you mean?" },
	];
```
