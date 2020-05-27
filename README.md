jQuery ironsys timeline plugin
==============================

## Introduction

This is a simple plugin to visualize events sequence and source on a "timeline" by drawing diagram using canvas.

## ~~Demo~~

~~You can find basic demo here:~~

~~http://ironsys.pl/projects/jquery-ironsys-timeline-plugin/demo/~~

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
		{ "time": "2013-05-14 14:30:03", "entity": "192.168.0.1", "value": "Yeah, what do you mean?" }
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
		<th>option</th><th>type</th><th>default</th><th>meaning</th>
	<tr>
	<tr>
        <td><b>aggregateValues</b></td>
        <td><i>bool</i></td>
        <td>false</td>
        <td>Whether to draw the same values coming from the same source as one block with additional counter aside</td>
    </tr>
    <tr>
        <td><b>autoUnitSize</b></td>
        <td><i>bool</i></td>
        <td>true</td>
        <td>Whether to calculate distance between events on the timeline automatically</td>
    </tr>
    <tr>
        <td><b>borderWidth</b></td>
        <td><i>int</i></td>
        <td>2</td>
        <td>Border width for all drawn boxes</td>
    </tr>
    <tr>
        <td><b>cornerRadius</b></td>
        <td><i>int</i></td>
        <td>10</td>
        <td>Radius of rounded corners for boxes containing values</td>
    </tr>
    <tr>
        <td><b>dateColor</b></td>
        <td><i>color</i></td>
        <td>#888888</td>
        <td>Color for text represanting date / time</td>
    </tr>
    <tr>
        <td><b>dateFontSize</b></td>
        <td><i>int</i></td>
        <td>10</td>
        <td>Font size for text represanting date / time</td>
    </tr>
    <tr>
        <td><b>dateMarginY</b></td>
        <td><i>int</i></td>
        <td>2</td>
        <td>Vertical margin for text represanting date / time</td>
    </tr>
    <tr>
        <td><b>dateMarginX</b></td>
        <td><i>int</i></td>
        <td>8</td>
        <td>Horizontal margin for text represanting date / time</td>
    </tr>
    <tr>
        <td><b>direction</b></td>
        <td><i>string</i></td>
        <td>down</td>
        <td>Direction of the diagram - draws the arrow for the timeline in proper place - "up" and "down" allowed</td>
    </tr>
    <tr>
        <td><b>entityCornerRadius</b></td>
        <td><i>int</i></td>
        <td>5</td>
        <td>Radius of rounded corners for boxes containing entities</td>
    </tr>
    <tr>
        <td><b>entityFontSize</b></td>
        <td><i>int</i></td>
        <td>14</td>
        <td>Font size for text represanting entities</td>
    </tr>
    <tr>
        <td><b>entityPaddingX</b></td>
        <td><i>int</i></td>
        <td>6</td>
        <td>Horizontal padding for boxes containing entities</td>
    </tr>
    <tr>
        <td><b>entityPaddingY</b></td>
        <td><i>int</i></td>
        <td>3</td>
        <td>Vertical padding for boxes containing entities</td>
    </tr>
    <tr>
        <td><b>fontFace</b></td>
        <td><i>string</i></td>
        <td>Arial</td>
        <td>Font face name for all texts</td>
    </tr>
    <tr>
        <td><b>fontSize</b></td>
        <td><i>int</i></td>
        <td>16</td>
        <td>Font size for text representing values</td>
    </tr>
    <tr>
        <td><b>lineColor</b></td>
        <td><i>color</i></td>
        <td>#888888</td>
        <td>Color for timeline, lines between values and entities, and arrows</td>
    </tr>
    <tr>
        <td><b>lineWidth</b></td>
        <td><i>int</i></td>
        <td>2</td>
        <td>Line width for timeline, lines between values and entities, and arrows</td>
    </tr>
    <tr>
        <td><b>offset</b></td>
        <td><i>int</i></td>
        <td>50</td>
        <td>Value of indentation for entity series</td>
    </tr>
    <tr>
        <td><b>paddingX</b></td>
        <td><i>int</i></td>
        <td>10</td>
        <td>Horizontal padding for boxes containing values</td>
    </tr>
    <tr>
        <td><b>paddingY</b></td>
        <td><i>int</i></td>
        <td>6</td>
        <td>Vertical padding for boxes containing values</td>
    </tr>
    <tr>
        <td><b>showDates</b></td>
        <td><i>bool</i></td>
        <td>true</td>
        <td>Wheteher to render time / date texts</td>
    </tr>
    <tr>
        <td><b>showEntities</b></td>
        <td><i>bool</i></td>
        <td>true</td>
        <td>Whether to render entity indentyfing text in entity block (or empty circle instead)</td>
    </tr>
    <tr>
        <td><b>unitSize</b></td>
        <td><i>int</i></td>
        <td>50</td>
        <td>Distance between adjacent values on the timeline</td>
    </tr>
</table>

## Indentation

The data is distributed to sources. Sources are distributed on both sides of timeline. Sources with most inputs are placed
closer to the timeline. The `offset` parameter defines size of subsequent indentations.

## Data aggregation

You may aggregate adjacent values from the same source by setting `aggregateValues` option to <b>true</b>.
The values will be counted and the number will be displayed aside the value box. Only the same values from the same
entity will be aggregated, and only if they are not split by any value from different entity or different value from
the same entity. Please check the demo for example `Damn, what's that?` values.

## Colors

Colors are assigned to entities. Each value block for given entity and corresponding entity block will
have the same color. There are 6 colors defined by default. If there are more than 6 entities, they will also
be distributed among existing colors.

You may pass `colors` array as an option. The following properties for a color object are considered:

`bordercolor` - color for border of a block
`bgcolor` -  background color for the block
`fgcolor` - color for text inside the block

The default `colors` array looks like this:

```javascript
"colors": [
            { "bgcolor": "#FF0000", "bordercolor": "#A60000" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#00AA00", "bordercolor": "#006F00" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#0086FF", "bordercolor": "#0057A6" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#FF8900", "bordercolor": "#A65900" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#FF0086", "bordercolor": "#A60057" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#8900FF", "bordercolor": "#5900A6" ,"fgcolor": "#FFFFFF" }
          ]
```

If `fgcolor` property for color object is not defined, it will be #FFFFFF by default.
If `bgcolor` property for color object is not defined, it will be #888888 by default.
If `bordercolor` property for color object is not defined, it will be the same as `bgcolor`.
