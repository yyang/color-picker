(function(){

var rP = 0.299, gP = 0.587, bP = 0.114;

/* HSP Color Model integraded according to Darel Rex Finley.
 * Ref: http://alienryderflex.com/hsp.html
 * In this method, we assume that 0 <= h <= 360, 0 <= s,p <= 1.
 * HSL and HSV codes are interaged according to Axon Flux.
 * Ref: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * Modified so that the code satisfies 0 <= h <= 360.
 */

function fromHSVtoRGB(colorObj) {
  var h = colorObj.h, s = colorObj.s, v = colorObj.v;
  var r, g, b;
  var i = ~~(h / 60);
  var f = h / 60 - i;

  switch (i) {
    case 0:
      r = v;
      g = v * (1 - s * (1 - f));
      b = v * (1 - s);
      break;
    case 1:
      r = v * (1 - s * f);
      g = v;
      b = v * (1 - s);
      break;
    case 2:
      r = v * (1 - s);
      g = v;
      b = v * (1 - s * (1 - f));
      break;
    case 3:
      r = v * (1 - s);
      g = v * (1 - s * f);
      b = v;
      break;
    case 4:
      r = v * (1 - s * (1 - f));
      g = v * (1 - s);
      b = v;
      break;
    case 5:
      r = v;
      g = v * (1 - s);
      b = v * (1 - s * f);
      break;
  }

  return {
    r: r > 1 ? 255 : ~~(r * 255),
    g: g > 1 ? 255 : ~~(g * 255),
    b: b > 1 ? 255 : ~~(b * 255)
  }
}

function fromHSPtoRGB(colorObj) {
  var h = colorObj.h, s = colorObj.s, p = colorObj.p;
  var r, g, b;
  var i = (s === 1) ? ~~(h / 60) + 6 : ~~(h / 60), gH = h / 360;
  var minOverMax = 1 - s, part;

  switch (i) {
    case 0:
      gH = 6 * (gH - 0 / 6); 
      part = 1 + gH * (1 / minOverMax - 1);
      b = p / Math.sqrt(rP / minOverMax / minOverMax + gP * part * part + bP);
      r = b / minOverMax; 
      g = b + gH * (r - b);
      break;
    case 1:
      gH =  6 * (-gH + 2 / 6); 
      part = 1 + gH * (1 / minOverMax - 1);
      b = p / Math.sqrt(gP / minOverMax / minOverMax + rP * part * part + bP);
      g = b / minOverMax;
      r = b + gH * (g - b);
      break;
    case 2:
      gH =  6 * (gH - 2 / 6);
      part = 1 + gH * (1 / minOverMax - 1);
      r = p / Math.sqrt(gP / minOverMax / minOverMax + bP * part * part + rP);
      g = r / minOverMax;
      b = r + gH * (g - r);
      break;
    case 3:
      gH =  6 * (-gH + 4 / 6);
      part = 1 + gH * (1 / minOverMax - 1);
      r = p / Math.sqrt(bP / minOverMax / minOverMax + gP * part * part + rP);
      b = r / minOverMax;
      g = r + gH * (b - r);
      break;
    case 4:
      gH =  6 * (gH - 4 / 6);
      part = 1 + gH * (1 / minOverMax - 1);
      g = p / Math.sqrt(bP / minOverMax / minOverMax + rP * part * part + gP);
      b = g / minOverMax;
      r = g + gH * (b - g);
      break;
    case 5:
      gH =  6 * (-gH + 6 / 6); part = 1 + gH * (1 / minOverMax - 1);
      g = p / Math.sqrt(rP / minOverMax / minOverMax + bP * part * part + gP);
      r = g / minOverMax;
      b = g + gH * (r - g);
      break;
    case 6:
      gH = 6 * (gH - 0 / 6);
      r = Math.sqrt(P * P / (rP + gP * gH * gH));
      g = r * gH;
      b = 0;
      break;
    case 7:
      gH = 6 * (-gH + 2 / 6);
      g = Math.sqrt(p * p / (gP + rP * gH * gH));
      r = g * gH;
      b = 0;
      break;
    case 8:
      gH = 6 * (gH - 2 / 6);
      g = Math.sqrt(p * p / (gP + bP * gH * gH));
      b = g * gH;
      r = 0;
      break;
    case 9:
      gH = 6 * (-gH + 4 / 6);
      b = Math.sqrt(p * p / (bP + gP * gH * gH));
      g = b * gH;
      r = 0;
      break;
    case 10:
      gH = 6 * (gH - 4 / 6);
      b = Math.sqrt(p * p / (bP + rP * gH * gH));
      r = b * gH;
      g = 0;
      break;
    case 11:
      gH = 6 * (-gH + 6 / 6);
      r = Math.sqrt(p * p / (rP + bP * gH * gH));
      b = r * gH;
      g = 0;
      break;
  }

  return {
    r: r > 1 ? 255 : ~~(r * 255),
    g: g > 1 ? 255 : ~~(g * 255),
    b: b > 1 ? 255 : ~~(b * 255)
  }
}

function fromHSLtoRGB(colorObj) {
  var h = colorObj.h, s = colorObj.s, v = colorObj.l;
  var r, g, b;

  if(s == 0){
    r = g = b = l;
  }else{
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 120);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 120);
  }

  return {
    r: r > 1 ? 255 : ~~(r * 255),
    g: g > 1 ? 255 : ~~(g * 255),
    b: b > 1 ? 255 : ~~(b * 255)
  }

  function hue2rgb(p, q, t){
    t = (t + 360) % 360;
    if (t < 60) {
      return p + (q - p) * t / 60;
    } else if (t < 180) {
      return q;
    } else if (t < 240) {
      return p + (q - p) * (240 - t) / 60;
    } else {
      return p;
    }
  }
}

function fromRGBtoHSP(colorObj) {
  var r = colorObj.r / 255, g = colorObj.g / 255, b = colorObj.b / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s;

  if(max === min){
    h = 0;
    s = 0;
  }else{
    s = 1 - min / max;
    switch(max){
      case r:
        h = (g - b) / (max - min) + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / (max - min) + 2;
        break;
      case b:
        h = (r - g) / (max - min) + 4;
        break;
    }
  }

  return {
    h: ~~(h * 60),
    s: s,
    p: Math.sqrt(r*r*rP + g*g*gP + b*b*bP),
  };
}

function fromRGBtoHSL(colorObj) {
  var r = colorObj.r / 255, g = colorObj.g / 255, b = colorObj.b / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max === min){
    h = s = 0; // achromatic
  }else{
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case
        g: h = (b - r) / d + 2;
        break;
      case
        b: h = (r - g) / d + 4;
        break;
    }
  }

  return {
    h: ~~(h * 60),
    s: s,
    l: l,
  };
}

function fromRGBtoHSV(colorObj) {
  var r = colorObj.r / 255, g = colorObj.g / 255, b = colorObj.b / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  if(max === min){
    h = 0;
    s = 0;
  }else{
    s = 1 - min / max;
    switch(max){
      case r:
        h = (g - b) / (max - min) + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / (max - min) + 2;
        break;
      case b:
        h = (r - g) / (max - min) + 4;
        break;
    }
  }

  return {
    h: ~~(h * 60),
    s: s,
    v: v,
  };
}

/* The following code is re-distributed from @ashi009's work on apollo.js.
 * It provides a save method to define object prototype.
 */

function $define(object, prototype) {
  var setterGetterPattern = /^(set|get)([A-Z])(.*)/;
  var setterGetters = {};
  for (var key in prototype) {
    var matches = setterGetterPattern.exec(key);
    var fn = prototype[key];
    Object.defineProperty(object, key, {
      value: fn,
      writeable: true // false
    });
    if (matches) {
      if (matches[1] === 'set') {
        if (fn.length === 1)
          continue;
      } else {
        if (fn.length === 0)
          continue;
      }
      var name = matches[2].toLowerCase() + matches[3];
      if (!setterGetters.hasOwnProperty(name))
        setterGetters[name] = {};
      setterGetters[name][matches[1]] = fn;
    }
  }
  Object.defineProperties(object, setterGetters);
}

function $declare(object, prototype) {
  object.prototype.constructor = object;
  $define(object.prototype, prototype);
}

function $explict(name, obj) {
  window[name] = obj;
}

/* The following methods are used internally.
 */

function parseColor(colorString) {

}

function getHexString(rgbColorObj) {
  function toHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
  return toHex(rgbColorObj.r) + toHex(rgbColorObj.g) + toHex(rgbColorObj.b);
}

function getColorString(mode, color, alpha) {
  var colorDigits = [];
  for (var i = 0; i < mode.length; i++) {
    if (['s','l','v','p'].indexOf(mode[i]) > 0) {
      colorDigits.push(~~(color[mode[i]] * 100) + '%');
    } else if (mode[i] === 'a') {
      if (alpha >= 0 && alpha <= 1) {
        colorDigits.push(alpha);
      } else {
        throw 'Invalid alpha value';
      }
    } else {
      colorDigits.push(color[mode[i]]);
    }
  }
  return mode + '(' + colorDigits.toString() + ')';
}

// Constructor
function Color() {
  if (arguments.length === 0) {
    throw 'Color has not been specified';
  } else if (arguments.length === 1) {
    var pasedColor = parseColor(arguments[0]);
    //TODO: Color Parser!
    //return new Color(parsedColor.mode, parsedColor.arg1, parsedColor.arg2, parsedColor.arg3);
  } else if (arguments.length !== 4) {
    throw 'Invalid number of arguments';
  }
  switch (arguments[0]) {
    case 'rgb':
      this.rgb = {r: arguments[1], g: arguments[2], b: arguments[3]};
      this.hsp = fromRGBtoHSP(this.rgb);
      break;
    case 'hsp':
      this.hsp = {h: arguments[1], s: arguments[2], p: arguments[3]};
      this.rgb = fromHSPtoRGB(this.hsp.h, this.hsp.s, this.hsp.p);
      break;
    case 'hsv':
      this.rgb = fromHSVtoRGB(arguments[1], arguments[2], arguments[3]);
      this.hsp = fromRGBtoHSP(this.rgb);
      break;
    case 'hsl':
      this.rgb = fromHSLtoRGB(arguments[1], arguments[2], arguments[3]);
      this.hsp = fromRGBtoHSP(this.rgb);
      break;
    default: 
      throw 'Invalid color mode.'
  }
  return this;
}

// Methods
$declare(Color, {
  getColor: function() {
    if (arguments.length === 0) {
      return getColorString('rgb', this.rgb);
    }
    var mode = arguments[0];
    switch (mode) {
      case 'hex':
        return getHexString(this.rgb);
      case 'hexString':1
        return '#' + getHexString(this.rgb);
      case 'rgb':
        return this.rgb;
      case 'hsp':
        return this.hsp;
      case 'hsv':
        return fromRGBtoHSV(this.rgb);
      case 'hsl':
        return fromRGBtoHSL(this.rgb);
      case 'rgbString':
        return getColorString('rgb', this.rgb);
      case 'hslString':
        return getColorString('hsl', fromRGBtoHSL(this.rgb));
      case 'rgba':
        return getColorString('rgba', this.rgb, arguments[1]);
      case 'hsla':
        return getColorString('hsla', fromRGBtoHSL(this.rgb), arguments[1]);
    }
  },
  lighten: function(amount) {
    return new Color('hsp', this.hsp.h, this.hsp.s, this.hsp.p - amount);
  },
  darken: function(amount) {
    return new Color('hsp', this.hsp.h, this.hsp.s, this.hsp.p + amount);
  },
  desaturate: function(amount) {
    return new Color('hsp', this.hsp.h, this.hsp.s - amount, this.hsp.p);
  },
  saturate: function(amount) {
    return new Color('hsp', this.hsp.h, this.hsp.s + amount, this.hsp.p);
  },
  greyscale: function() {
    return new Color('hsp', 0, 0, this.hsp.p);
  }
});

$explict('Color', Color);

})();
