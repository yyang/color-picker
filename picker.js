(function(){

var step = 53, currentHue = 21;
var pickers = [];
var pickerId = 0;

function Picker() {
  // Store it in an array.
  this.id = pickerId;
  pickers[pickerId] = this;
  pickerId ++;

  this.name = arguments[0] ? arguments[0] : '';
  if (arguments[1]) {
    this.hue = arguments[1];
  } else {
    this.hue = currentHue;
    currentHue += step;
  }
  this.calcColors();

  return this;
}

$declare(Picker, {
  calcColors: function() {
    this.dark = new Color('hsp', this.hue, 0.8, 0.5);
    this.main = new Color('hsp', this.hue, 0.9, 0.7);
    this.vivid = new Color('hsp', this.hue, 0.95,0.9);
    this.light = new Color('hsp', this.hue, 0.6, 1);
    this.darkColor = this.dark.getColor('rgba', 0.8);
    this.mainColor = this.main.getColor();
    this.vividColor = this.vivid.getColor();
    this.lightColor = this.light.getColor('rgba', 0.8);
  },
  shift: function(hue, direction) {
    if (arguments.length === 1) {
      direction = 'right';
    }
    switch (direction) {
      case true:
      case 'right':
      case 'forward':
        this.hue += hue;
        break;
      case false:
      case 'left':
      case 'backward':
        this.hue -= hue;
        break;
    }
    this.calcColors();
  }
})

$define(Picker, {
  get: function(name) {
    return pickers.filter(function(el) {
      return el.name === name;
    });
  },
  series: function(numbers, seriesName) {
    if (seriesName === undefined) {
      seriesName = 'colorSeries';
    }
    var pickerSeries = [];
    if (numbers < 7) {
      for (var i = 0; i < numbers; i++) {
        pickerSeries.push(new Picker(seriesName, 10 + 53 * i));
      }
    } else {
      for (var i = 0; i < numbers; i++) {
        pickerSeries.push(new Picker(seriesName, 10 + 29 * i));
      }
    }
    return pickerSeries;
  }
})

$explict('Picker', Picker);

})();