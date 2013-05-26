;(function($, window, document, undefined){
  var pluginName = 'timeline',
      defaults = {
          "aggregateValues": false,
          "autoUnitSize": true,
          "borderWidth": 2,
          "colors": [
            { "bgcolor": "#FF0000", "bordercolor": "#A60000" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#00AA00", "bordercolor": "#006F00" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#0086FF", "bordercolor": "#0057A6" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#FF8900", "bordercolor": "#A65900" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#FF0086", "bordercolor": "#A60057" ,"fgcolor": "#FFFFFF" },
            { "bgcolor": "#8900FF", "bordercolor": "#5900A6" ,"fgcolor": "#FFFFFF" }
          ],
          "cornerRadius": 10,
          "dateColor": "#888888",
          "dateFontSize": 10,
          "dateMarginY": 2,
          "dateMarginX": 8,
          "direction": "down",
          "entityCornerRadius": 5,
          "entityFontSize": 14,
          "entityPaddingX": 6,
          "entityPaddingY": 3,
          "fontFace": "Arial",
          "fontSize": 16,
          "lineColor": "#888888",
          "lineWidth": 2,
          "offset": 50,
          "paddingX": 10,
          "paddingY": 6,
          "showDates": true,
          "showEntities": true,
          "unitSize": 50,
      };
      
  function Plugin(element, options) {
        this._defaults = defaults;
        this._name = pluginName;
        this.exposed = false;
        this.element = element;
        this.$element = $(element);
        this.options = $.extend( {}, defaults, options);
        this.colorsCount = this.options.colors.length;
        this.data = this.prepareData(this.options.data);
        this.options.unitSize = this.getUnitSize();
        this.height = this.calculateHeight();
        this.initCanvas();
        this.metaData = this.getMetaData();
        this.uniqueEntities = this.getUniqueEntities();
        this.midX = Math.round(this.width / 2);
        this.init();
  }

  Plugin.prototype.getMetaData = function() {
    var maxValueWidth = 0;
    var maxEntityWidth = 0;
    var maxDateWidth = 0;

    var that = this;
    this.ctx.font = this.options.fontSize + "px " + this.options.fontFace;
    this.data.forEach(function(record, i) {
      var valueWidth = that.ctx.measureText(record.value).width;
      if(valueWidth > maxValueWidth) {
        maxValueWidth = valueWidth;
      }
    });

    this.ctx.font = this.options.entityFontSize + "px " + this.options.fontFace;
    this.data.forEach(function(record, i) {
      var valueWidth = that.ctx.measureText(record.entity).width;
      if(valueWidth > maxEntityWidth) {
        maxEntityWidth = valueWidth;
      }
    });

    this.ctx.font = this.options.dateFontSize + "px " + this.options.fontFace;
    this.data.forEach(function(record, i) {
      var valueWidth = that.ctx.measureText(record.time).width;
      if(valueWidth > maxDateWidth) {
        maxDateWidth = valueWidth;
      }
    });

    return {
      "maxValueWidth": maxValueWidth,
      "maxEntityWidth": maxEntityWidth,
      "maxDateWidth": maxDateWidth,
      "minOffset": Math.round((maxValueWidth + maxEntityWidth) /2) + maxDateWidth + this.options.paddingX + this.options.entityPaddingX + 2 * this.options.dateMarginX
    }
  }

  Plugin.prototype.initCanvas = function() {
    this.width = this.$element.width();
    this.$element.html("<canvas width=\"" + this.width + "\" height=\"" + this.height + "\"></canvas>");
    this.canvas = this.$element.find("canvas").get(0);
    this.ctx = this.canvas.getContext("2d");
  }

  Plugin.prototype.prepareData = function(sourceData) {
    var data = [];
    if(!this.options.aggregateValues) {
      sourceData.forEach(function(record, i) {
        record.count = 1;
        data.push(record);
      });
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
      });
    }
    return data;
  }

  Plugin.prototype.calculateHeight = function() {
    return (this.data.length + 1) * this.options.unitSize;
  }

  Plugin.prototype.getUnitSize = function() {
    var valueHeight = this.options.fontSize + 2 * this.options.paddingY + 4;
    var enityHeight = this.options.entityFontSize + 2 * this.options.entityPaddingY + 4;
    var dateHeight = this.options.dateFontSize + 2 * this.options.dateMarginY + 4;

    var minUnitSize = Math.max(valueHeight, enityHeight, dateHeight);

    if(this.options.autoUnitSize) {
      return minUnitSize * 2;
    }
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
        var j;
        tmp.forEach(function(record, i) {

          j = parseInt(i) % that.colorsCount;
          if((typeof that.options.colors[j] != 'undefined') && (typeof that.options.colors[j]["bgcolor"] != 'undefined')) {
            var bgcolor = that.options.colors[j]["bgcolor"];
          } else {
            var bgcolor = "#888888";
          }

          if((typeof that.options.colors[j] != 'undefined') && (typeof that.options.colors[j]["bordercolor"] != 'undefined')) {
            var bordercolor = that.options.colors[j]["bordercolor"];
          } else {
            var bordercolor = bgcolor;
          }

          if((typeof that.options.colors[j] != 'undefined') && (typeof that.options.colors[j]["fgcolor"] != 'undefined')) {
            var fgcolor = that.options.colors[j]["fgcolor"];
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
    this.ctx.font = this.options.fontSize + "px " + this.options.fontFace;
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
      this.ctx.font = this.options.fontSize + "px " + this.options.fontFace;
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = this.uniqueEntities[record.entity]["fgcolor"];
      this.ctx.fillText(record.value, this.midX, (i + 1) * this.options.unitSize);
  }

  Plugin.prototype.drawValueLine = function(record, i) {
      var valueX = this.midX + this.uniqueEntities[record.entity]["direction"] * (this.uniqueEntities[record.entity]["distance"] * this.options.offset + this.metaData.minOffset);
      var valueY = (i + 1) * this.options.unitSize;

      this.ctx.strokeStyle = this.options.lineColor;
      this.ctx.lineWidth = this.options.lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(this.midX, valueY);
      this.ctx.lineTo(valueX, valueY);
      this.ctx.stroke();
  }

  Plugin.prototype.drawAggregatedNumber = function(record, i) {
      if(record["count"] > 1) {
        var boxCoords = this.getBoxCoords(record, i);
        this.ctx.font = this.options.dateFontSize + "px " + this.options.fontFace;
        var direction = this.uniqueEntities[record.entity]["direction"];
        this.ctx.textBaseline = "middle";
        if(direction < 0) {
          this.ctx.textAlign = "left";
        } else {
          this.ctx.textAlign = "right";
        }
        this.ctx.fillStyle = this.options.dateColor;
        this.ctx.fillText("x " + record.count, this.midX - direction * (Math.round(boxCoords.width / 2) + 10), (i + 1) * this.options.unitSize);
      }
  }

  Plugin.prototype.drawValue = function(record, i) {
      this.drawValueLine(record, i);
      this.drawValueBox(record, i);
      this.drawValueText(record, i);
      if(this.options.aggregateValues) {
        this.drawAggregatedNumber(record, i);
      }
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

  Plugin.prototype.drawEntity = function(record, i) {
      this.drawEntityBox(record, i);
      if(this.options.showEntities) {
        this.drawEntityText(record, i);
      }
  }

  Plugin.prototype.drawEntityBox = function(record, i) {
      this.ctx.lineCap = "round";
      this.ctx.lineWidth = this.options.borderWidth;
      var boxCoords = this.getEntityBoxCoords(record, i);

      if(this.options.showEntities) {
        this.roundedRect(
          boxCoords.x, 
          boxCoords.y, 
          boxCoords.width, 
          boxCoords.height, 
          this.options.entityCornerRadius,
          this.uniqueEntities[record.entity]["bordercolor"],
          this.uniqueEntities[record.entity]["bgcolor"]
        );
      } else {
          var circleX = this.midX + this.uniqueEntities[record.entity]["direction"] * (this.uniqueEntities[record.entity]["distance"] * this.options.offset + this.metaData.minOffset);
          var circleY = (i + 1) * this.options.unitSize;
          this.ctx.strokeStyle = this.uniqueEntities[record.entity]["bordercolor"];
          this.ctx.beginPath();
          this.ctx.arc(circleX, circleY, Math.round(boxCoords.height / 2), 0, 2 * Math.PI);
          this.ctx.stroke();
          this.ctx.fillStyle = this.uniqueEntities[record.entity]["bgcolor"];
          this.ctx.fill();
      }
  }

  Plugin.prototype.getEntityBoxCoords = function(record, i) {
    this.ctx.font = this.options.entityFontSize + "px " + this.options.fontFace;
    var midX = this.midX + this.uniqueEntities[record.entity]["direction"] * (this.uniqueEntities[record.entity]["distance"] * this.options.offset + this.metaData.minOffset);
    return {
      "x": midX - Math.round(this.ctx.measureText(record.entity).width / 2) - this.options.entityPaddingX,
      "y": (i + 1) * this.options.unitSize - Math.round(this.options.entityFontSize / 2) - this.options.entityPaddingY,
      "width": this.ctx.measureText(record.entity).width + 2 * this.options.entityPaddingX,
      "height": this.options.entityFontSize + 2 * this.options.entityPaddingY
    }
  }

  Plugin.prototype.drawEntityText = function(record, i) {
      var midX = this.midX + this.uniqueEntities[record.entity]["direction"] * (this.uniqueEntities[record.entity]["distance"] * this.options.offset + this.metaData.minOffset);
      this.ctx.font = this.options.entityFontSize + "px " + this.options.fontFace;
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = this.uniqueEntities[record.entity]["fgcolor"];
      this.ctx.fillText(record.entity, midX, (i + 1) * this.options.unitSize);
  }

  Plugin.prototype.drawDate = function(record, i) {
      this.ctx.font = this.options.dateFontSize + "px " + this.options.fontFace;
      var direction = this.uniqueEntities[record.entity]["direction"];
      var midX = this.midX + direction * (Math.round(this.metaData.maxValueWidth / 2) + this.options.paddingX + this.options.dateMarginX);
        this.ctx.textBaseline = "middle";
        if(direction > 0) {
          this.ctx.textAlign = "left";
        } else {
          this.ctx.textAlign = "right";
        }
      this.ctx.textBaseline = "bottom";
      this.ctx.fillStyle = this.options.dateColor;
      this.ctx.fillText(record.time, midX, (i + 1) * this.options.unitSize - this.options.dateMarginY);
  }

  Plugin.prototype.init = function () {
    var that = this;
    this.drawTimeline();
    this.data.forEach(function(record, i) {
        that.drawValue(record, i);
        that.drawEntity(record, i);
        if(that.options.showDates) {
          that.drawDate(record, i);
        }
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
