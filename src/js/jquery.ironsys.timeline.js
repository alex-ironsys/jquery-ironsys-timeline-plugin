;(function($, window, document, undefined){
  var pluginName = 'timeline',
      defaults = {
          "autoUnitSize": true,
          "borderWidth": 2,
          "colors": [
            { "bgcolor": "#FF0000", "bordercolor": "#A60000" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#00AA00", "bordercolor": "#006F00" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#0086FF", "bordercolor": "#0057A6" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#FF8800", "bordercolor": "#A65900" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#00FF88", "bordercolor": "#A60000" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#FF00FF", "bordercolor": "#A60000" ,"fgcolor": "#FFFFFF" }
          ],
          "cornerRadius": 10,
          "cumulateValues": false,
          "direction": "down",
          "fontFace": "Arial",
          "fontSize": 16,
          "height": 500,
          "lineColor": "#888888",
          "lineWidth": 2,
          "offset": 100,
          "paddingX": 5,
          "paddingY": 5,
          "unitSize": 50,
      };
      
  function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend( {}, defaults, options) ;
        this.data = this.prepareData(this.options.data);
        this._defaults = defaults;
        this._name = pluginName;
        this.exposed = false;
        this.uniqueEntities = this.getUniqueEntities();
        this.width = this.$element.width();
        this.midX = Math.round(this.width / 2);
        this.options.unitSize = this.getUnitSize();
        this.height = this.calculateHeight();
        this.init();
  }

  Plugin.prototype.prepareData = function(sourceData) {
    var data = [];
    if(!this.options.cumulateValues) {
      return sourceData;
    } else {
      var previous = { "time": null, "entity": null, "value": null };
      var counter = 1;
      sourceData.forEach(function(record, i) {
        record.count = 1;
        if((record.entity == previous.entity) && (record.value == previous.value)) {
          counter++;
          record = data.pop();
          record.count = counter;
        } else {
          counter = 1;
        }
        data.push(record);
        previous = record;
        console.log(record);
      });
    }
    return data;
  }

  Plugin.prototype.calculateHeight = function() {
    return (this.data.length + 1) * this.options.unitSize;
  }

  Plugin.prototype.getUnitSize = function() {
    if(this.options.autoUnitSize) {
      return (this.options.fontSize + 2 * this.options.paddingY) * 2;
    }
    var minUnitSize = this.options.fontSize + 2 * this.options.paddingY + 4;
    if(this.options.unitSize < minUnitSize) {
      return minUnitSize;
    } else {
      return this.options.unitSize;
    }
  }

  Plugin.prototype.getUniqueEntities = function() {
        var result = {};
        var that = this;
        for(record in this.data) {
          if(!(this.data[record]["entity"] in result)) {
            result[this.data[record]["entity"]] = 1;
          }
          else {
            result[this.data[record]["entity"]]++;
          }
        }

        var tmp = [];
        for(i in result) {
          tmp.push({ "entity": i, "hits": result[i] });
        }
        tmp.sort(function(a,b) {
          return b.hits - a.hits;
        });

        result = {};
        var dir = -1;
        var dist = 1;
        tmp.forEach(function(record, i) {

          if((typeof that.options.colors[i] != 'undefined') && (typeof that.options.colors[i]["bgcolor"] != 'undefined')) {
            var bgcolor = that.options.colors[i]["bgcolor"];
          } else {
            var bgcolor = "#888888";
          }

          if((typeof that.options.colors[i] != 'undefined') && (typeof that.options.colors[i]["bordercolor"] != 'undefined')) {
            var bordercolor = that.options.colors[i]["bordercolor"];
          } else {
            var bordercolor = bgcolor;
          }

          if((typeof that.options.colors[i] != 'undefined') && (typeof that.options.colors[i]["fgcolor"] != 'undefined')) {
            var fgcolor = that.options.colors[i]["fgcolor"];
          } else {
            var fgcolor = "#FFFFFF";
          }

          result[record.entity] = { 
            "hits": record.hits, 
            "direction": dir, 
            "distance": dist,
            "bgcolor": bgcolor,
            "bordercolor": bordercolor,
            "fgcolor": fgcolor
          };
          dir *= -1;
          if(dir == -1) {
            dist++;
          }
        });
        return result;
  }

  Plugin.prototype.getBoxCoords = function(record, i) {
    return {
      "x": this.midX - Math.round(this.ctx.measureText(record.value).width / 2) - this.options.paddingX,
      "y": (i + 1) * this.options.unitSize - Math.round(this.options.fontSize / 2) - this.options.paddingY,
      "width": this.ctx.measureText(record.value).width + 2 * this.options.paddingX,
      "height": this.options.fontSize + 2 * this.options.paddingY
    }
  }

  Plugin.prototype.roundedRect = function(x ,y, width, height, radius, borderColor, fillColor){
      this.ctx.strokeStyle = borderColor;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + radius);
      this.ctx.lineTo(x, y + height-radius);
      this.ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
      this.ctx.lineTo(x + width - radius, y + height);
      this.ctx.quadraticCurveTo(x + width, y + height, x + width, y + height-radius);
      this.ctx.lineTo(x + width, y + radius);
      this.ctx.quadraticCurveTo(x + width, y, x + width-radius, y);
      this.ctx.lineTo(x + radius, y);
      this.ctx.quadraticCurveTo(x, y, x, y + radius);
      this.ctx.stroke();
      this.ctx.fillStyle = fillColor;
      this.ctx.fill(); 
  }

  Plugin.prototype.drawValueBox = function(record, i) {
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = this.options.borderWidth;
      var boxCoords = this.getBoxCoords(record, i);

      this.roundedRect(
        boxCoords.x, 
        boxCoords.y, 
        boxCoords.width, 
        boxCoords.height, 
        this.options.cornerRadius,
        this.uniqueEntities[record.entity]["bordercolor"],
        this.uniqueEntities[record.entity]["bgcolor"]
      );
  }

  Plugin.prototype.drawValueText = function(record, i) {
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = this.uniqueEntities[record.entity]["fgcolor"];
      this.ctx.fillText(record.value, this.midX, (i + 1) * this.options.unitSize);
  }

  Plugin.prototype.drawValueLine = function(record, i) {
      var valueX = this.midX + this.uniqueEntities[record.entity]["direction"] * this.uniqueEntities[record.entity]["distance"] * this.options.offset;
      var valueY = (i + 1) * this.options.unitSize;

      this.ctx.strokeStyle = this.options.lineColor;
      this.ctx.lineWidth = this.options.lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(this.midX, valueY);
      this.ctx.lineTo(valueX, valueY);
      this.ctx.stroke();
  }

  Plugin.prototype.drawValue = function(record, i) {
      this.drawValueLine(record, i);
      this.drawValueBox(record, i);
      this.drawValueText(record, i);
  }
  
  Plugin.prototype.drawTimeline = function() {
      this.ctx.strokeStyle = this.options.lineColor;
      this.ctx.lineWidth = this.options.lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(this.midX, 0);
      this.ctx.lineTo(this.midX, this.height);
      if(this.options.direction == "up") {
        this.ctx.moveTo(this.midX, 0);
        this.ctx.lineTo(this.midX + 5, 8);
        this.ctx.moveTo(this.midX, 0);
        this.ctx.lineTo(this.midX - 5, 8);
      } else {
        this.ctx.moveTo(this.midX, this.height);
        this.ctx.lineTo(this.midX + 5, this.height - 8);
        this.ctx.moveTo(this.midX, this.height);
        this.ctx.lineTo(this.midX - 5, this.height - 8);
      }
      this.ctx.stroke();
  }

  Plugin.prototype.init = function () {
    this.$element.html("<canvas id=\"ironsys_timeline\" width=\"" + this.width + "\" height=\"" + this.height + "\"></canvas>");
    this.canvas = document.getElementById("ironsys_timeline");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = this.options.fontSize + "px " + this.options.fontFace;
    var that = this;

    this.drawTimeline();

    this.data.forEach(function(record, i) {
        that.drawValue(record, i);
    });
  }
  
  $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})(jQuery, window, document);
