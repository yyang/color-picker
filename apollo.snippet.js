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