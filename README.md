jquery-ironsys-timeline-plugin
==============================

## Introduction

This is a simple plugin to visualize events sequence and source on a "timeline" by drawing diagram using canvas.

## Demo

You can find basic demo here:

http://ironsys.pl/projects/jquery-ironsys-timeline-plugin/demo/

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

Data consumed by plugin is an array of objects. Each of them has 3 fields `time`, `entity` and `value`. Let's consider messages as an example. You can imagine `time` is a time the message was sent, `entity` is the author of the message (in this example it's actually his IP address) and `value` is content of the message:

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

## How it works?

The plugin will create canvas inside the specified DOM element. The canvas will have the width of this element. The height of the canvas will be dynamically calculated depending on the given data. The timeline will be dravn vertically with items representing the values on the timeline. The entities will be draw aside values. The more often given entity creates input, the closer it is to the timeline. The colors of elements on canvas are configurable. Each entity gets own color automatically (so all the values by given enityt have the same color).

The data IS NOT sorted by the plugin. The timeline IS NOT proportional - all values are placed on the line within the same distance to neighbours.

## Options

Generally no options are required. You just have to pass valid data array while initializing plugin:

```javascript
<script>
$(document).ready(function(){
  $('#place_canvas_here').timeline({ data: myDataArray });
});
</script>
```
However there are many options you may cofigure manually.

<table>
	<tr>
		<th>option</th><th>default</th><th>meaning</th>
	<tr>
    <tr>
        <td>autoUnitSize</td>
        <td>true</td>
        <td></td>
    </tr>
    <tr>
        <td>borderWidth</td>
        <td>2</td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
