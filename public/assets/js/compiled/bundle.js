(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("regenerator/runtime");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel/polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9saWIvcG9seWZpbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcImNvcmUtanMvc2hpbVwiKTtcblxucmVxdWlyZShcInJlZ2VuZXJhdG9yL3J1bnRpbWVcIik7XG5cbmlmIChnbG9iYWwuX2JhYmVsUG9seWZpbGwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwib25seSBvbmUgaW5zdGFuY2Ugb2YgYmFiZWwvcG9seWZpbGwgaXMgYWxsb3dlZFwiKTtcbn1cbmdsb2JhbC5fYmFiZWxQb2x5ZmlsbCA9IHRydWU7Il19
},{"core-js/shim":90,"regenerator/runtime":91}],2:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var $ = require('./$');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = $.toObject($this)
      , length = $.toLength(O.length)
      , index  = $.toIndex(fromIndex, length)
      , value;
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./$":23}],3:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var $   = require('./$')
  , ctx = require('./$.ctx');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = Object($.assertDefined($this))
      , self   = $.ES5Object(O)
      , f      = ctx(callbackfn, that, 3)
      , length = $.toLength(self.length)
      , index  = 0
      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./$":23,"./$.ctx":11}],4:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":23}],5:[function(require,module,exports){
var $        = require('./$')
  , enumKeys = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = Object($.assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = $.ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$":23,"./$.enum-keys":14}],6:[function(require,module,exports){
var $        = require('./$')
  , TAG      = require('./$.wks')('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;
},{"./$":23,"./$.wks":41}],7:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , safe     = require('./$.uid').safe
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , step     = require('./$.iter').step
  , $has     = $.has
  , set      = $.set
  , isObject = $.isObject
  , hide     = $.hide
  , isExtensible = Object.isExtensible || isObject
  , ID       = safe('id')
  , O1       = safe('O1')
  , LAST     = safe('last')
  , FIRST    = safe('first')
  , ITER     = safe('iter')
  , SIZE     = $.DESC ? safe('size') : 'size'
  , id       = 0;

function fastKey(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
}

function getEntry(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that[O1][index];
  // frozen object case
  for(entry = that[FIRST]; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
}

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      assert.inst(that, C, NAME);
      set(that, O1, $.create(null));
      set(that, SIZE, 0);
      set(that, LAST, undefined);
      set(that, FIRST, undefined);
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    require('./$.mix')(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that[FIRST] = that[LAST] = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that[O1][entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that[FIRST] == entry)that[FIRST] = next;
          if(that[LAST] == entry)that[LAST] = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments[1], 3)
          , entry;
        while(entry = entry ? entry.n : this[FIRST]){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if($.DESC)$.setDesc(C.prototype, 'size', {
      get: function(){
        return assert.def(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that[LAST] = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that[LAST],          // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that[FIRST])that[FIRST] = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that[O1][index] = entry;
    } return that;
  },
  getEntry: getEntry,
  // add .keys, .values, .entries, [@@iterator]
  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
  setIter: function(C, NAME, IS_MAP){
    require('./$.iter-define')(C, NAME, function(iterated, kind){
      set(this, ITER, {o: iterated, k: kind});
    }, function(){
      var iter  = this[ITER]
        , kind  = iter.k
        , entry = iter.l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
        // or finish the iteration
        iter.o = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
  }
};
},{"./$":23,"./$.assert":4,"./$.ctx":11,"./$.for-of":15,"./$.iter":22,"./$.iter-define":20,"./$.mix":25,"./$.uid":39}],8:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $def  = require('./$.def')
  , forOf = require('./$.for-of');
module.exports = function(NAME){
  $def($def.P, NAME, {
    toJSON: function toJSON(){
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    }
  });
};
},{"./$.def":12,"./$.for-of":15}],9:[function(require,module,exports){
'use strict';
var $         = require('./$')
  , safe      = require('./$.uid').safe
  , assert    = require('./$.assert')
  , forOf     = require('./$.for-of')
  , $has      = $.has
  , isObject  = $.isObject
  , hide      = $.hide
  , isExtensible = Object.isExtensible || isObject
  , id        = 0
  , ID        = safe('id')
  , WEAK      = safe('weak')
  , LEAK      = safe('leak')
  , method    = require('./$.array-methods')
  , find      = method(5)
  , findIndex = method(6);
function findFrozen(store, key){
  return find(store.array, function(it){
    return it[0] === key;
  });
}
// fallback for frozen keys
function leakStore(that){
  return that[LEAK] || hide(that, LEAK, {
    array: [],
    get: function(key){
      var entry = findFrozen(this, key);
      if(entry)return entry[1];
    },
    has: function(key){
      return !!findFrozen(this, key);
    },
    set: function(key, value){
      var entry = findFrozen(this, key);
      if(entry)entry[1] = value;
      else this.array.push([key, value]);
    },
    'delete': function(key){
      var index = findIndex(this.array, function(it){
        return it[0] === key;
      });
      if(~index)this.array.splice(index, 1);
      return !!~index;
    }
  })[LEAK];
}

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      $.set(assert.inst(that, C, NAME), ID, id++);
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    require('./$.mix')(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return leakStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return leakStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this[ID]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(assert.obj(key))){
      leakStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that[ID]] = value;
    } return that;
  },
  leakStore: leakStore,
  WEAK: WEAK,
  ID: ID
};
},{"./$":23,"./$.array-methods":3,"./$.assert":4,"./$.for-of":15,"./$.mix":25,"./$.uid":39}],10:[function(require,module,exports){
'use strict';
var $     = require('./$')
  , $def  = require('./$.def')
  , BUGGY = require('./$.iter').BUGGY
  , forOf = require('./$.for-of')
  , species = require('./$.species')
  , assertInstance = require('./$.assert').inst;

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = $.g[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  function fixMethod(KEY){
    var fn = proto[KEY];
    require('./$.redef')(proto, KEY,
      KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
      : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
      : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  }
  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    require('./$.mix')(C.prototype, methods);
  } else {
    var inst  = new C
      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
      , buggyZero;
    // wrap for init collections from iterable
    if(!require('./$.iter-detect')(function(iter){ new C(iter); })){ // eslint-disable-line no-new
      C = wrapper(function(target, iterable){
        assertInstance(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    IS_WEAK || inst.forEach(function(val, key){
      buggyZero = 1 / key === -Infinity;
    });
    // fix converting -0 key to +0
    if(buggyZero){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    // + fix .add & .set for chaining
    if(buggyZero || chain !== inst)fixMethod(ADDER);
  }

  require('./$.cof').set(C, NAME);

  O[NAME] = C;
  $def($def.G + $def.W + $def.F * (C != Base), O);
  species(C);
  species($.core[NAME]); // for wrapper

  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);

  return C;
};
},{"./$":23,"./$.assert":4,"./$.cof":6,"./$.def":12,"./$.for-of":15,"./$.iter":22,"./$.iter-detect":21,"./$.mix":25,"./$.redef":28,"./$.species":33}],11:[function(require,module,exports){
// Optional / simple context binding
var assertFunction = require('./$.assert').fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.assert":4}],12:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction
  , $redef     = require('./$.redef');
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
global.core = core;
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    if(type & $def.B && own)exp = ctx(out, global);
    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)$redef(target, key, out);
    // export
    if(exports[key] != out)$.hide(exports, key, exp);
    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$":23,"./$.redef":28}],13:[function(require,module,exports){
var $        = require('./$')
  , document = $.g.document
  , isObject = $.isObject
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$":23}],14:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getDesc    = $.getDesc
    , getSymbols = $.getSymbols;
  if(getSymbols)$.each.call(getSymbols(it), function(key){
    if(getDesc(it, key).enumerable)keys.push(key);
  });
  return keys;
};
},{"./$":23}],15:[function(require,module,exports){
var ctx  = require('./$.ctx')
  , get  = require('./$.iter').get
  , call = require('./$.iter-call');
module.exports = function(iterable, entries, fn, that){
  var iterator = get(iterable)
    , f        = ctx(fn, that, entries ? 2 : 1)
    , step;
  while(!(step = iterator.next()).done){
    if(call(iterator, f, step.value, entries) === false){
      return call.close(iterator);
    }
  }
};
},{"./$.ctx":11,"./$.iter":22,"./$.iter-call":19}],16:[function(require,module,exports){
module.exports = function($){
  $.FW   = true;
  $.path = $.g;
  return $;
};
},{}],17:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var $ = require('./$')
  , toString = {}.toString
  , getNames = $.getNames;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

function getWindowNames(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
}

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames($.toObject(it));
};
},{"./$":23}],18:[function(require,module,exports){
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
};
},{}],19:[function(require,module,exports){
var assertObject = require('./$.assert').obj;
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)assertObject(ret.call(iterator));
}
function call(iterator, fn, value, entries){
  try {
    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
}
call.close = close;
module.exports = call;
},{"./$.assert":4}],20:[function(require,module,exports){
var $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , $               = require('./$')
  , cof             = require('./$.cof')
  , $iter           = require('./$.iter')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values'
  , Iterators       = $iter.Iterators;
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iter.create(Constructor, NAME, next);
  function createMethod(kind){
    function $$(that){
      return new Constructor(that, kind);
    }
    switch(kind){
      case KEYS: return function keys(){ return $$(this); };
      case VALUES: return function values(){ return $$(this); };
    } return function entries(){ return $$(this); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = $.getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    cof.set(IteratorPrototype, TAG, true);
    // FF fix
    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
  }
  // Define iterator
  if($.FW || FORCE)$iter.set(proto, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = $.that;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
  }
};
},{"./$":23,"./$.cof":6,"./$.def":12,"./$.iter":22,"./$.redef":28,"./$.wks":41}],21:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":41}],22:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , cof               = require('./$.cof')
  , classof           = cof.classof
  , assert            = require('./$.assert')
  , assertObject      = assert.obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = require('./$.shared')('iterators')
  , IteratorPrototype = {};
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}

module.exports = {
  // Safari has buggy iterators w/o `next`
  BUGGY: 'keys' in [] && !('next' in [].keys()),
  Iterators: Iterators,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol;
    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
      || SYMBOL_ITERATOR in O
      || $.has(Iterators, classof(O));
  },
  get: function(it){
    var Symbol = $.g.Symbol
      , getIter;
    if(it != undefined){
      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
        || it[SYMBOL_ITERATOR]
        || Iterators[classof(it)];
    }
    assert($.isFunction(getIter), it, ' is not iterable!');
    return assertObject(getIter.call(it));
  },
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  }
};
},{"./$":23,"./$.assert":4,"./$.cof":6,"./$.shared":32,"./$.wks":41}],23:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":16}],24:[function(require,module,exports){
var $ = require('./$');
module.exports = function(object, el){
  var O      = $.toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":23}],25:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":28}],26:[function(require,module,exports){
var $            = require('./$')
  , assertObject = require('./$.assert').obj;
module.exports = function ownKeys(it){
  assertObject(it);
  var keys       = $.getNames(it)
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./$":23,"./$.assert":4}],27:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , invoke = require('./$.invoke')
  , assertFunction = require('./$.assert').fn;
module.exports = function(/* ...pargs */){
  var fn     = assertFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = $.path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that    = this
      , _length = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !_length)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(_length > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./$":23,"./$.assert":4,"./$.invoke":18}],28:[function(require,module,exports){
var $   = require('./$')
  , tpl = String({}.hasOwnProperty)
  , SRC = require('./$.uid').safe('src')
  , _toString = Function.toString;

function $redef(O, key, val, safe){
  if($.isFunction(val)){
    var base = O[key];
    $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
    if(!('name' in val))val.name = key;
  }
  if(O === $.g){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    $.hide(O, key, val);
  }
}

// add fake Function#toString for correct work wrapped methods / constructors
// with methods similar to LoDash isNative
$redef(Function.prototype, 'toString', function toString(){
  return $.has(this, SRC) ? this[SRC] : _toString.call(this);
});

$.core.inspectSource = function(it){
  return _toString.call(it);
};

module.exports = $redef;
},{"./$":23,"./$.uid":39}],29:[function(require,module,exports){
'use strict';
module.exports = function(regExp, replace, isStatic){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(isStatic ? it : this).replace(regExp, replacer);
  };
};
},{}],30:[function(require,module,exports){
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],31:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var $      = require('./$')
  , assert = require('./$.assert');
function check(O, proto){
  assert.obj(O);
  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":23,"./$.assert":4,"./$.ctx":11}],32:[function(require,module,exports){
var $      = require('./$')
  , SHARED = '__core-js_shared__'
  , store  = $.g[SHARED] || ($.g[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$":23}],33:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: $.that
  });
};
},{"./$":23,"./$.wks":41}],34:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var $ = require('./$');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String($.assertDefined(that))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$":23}],35:[function(require,module,exports){
// http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
var $      = require('./$')
  , repeat = require('./$.string-repeat');

module.exports = function(that, minLength, fillChar, left){
  // 1. Let O be CheckObjectCoercible(this value).
  // 2. Let S be ToString(O).
  var S = String($.assertDefined(that));
  // 4. If intMinLength is undefined, return S.
  if(minLength === undefined)return S;
  // 4. Let intMinLength be ToInteger(minLength).
  var intMinLength = $.toInteger(minLength);
  // 5. Let fillLen be the number of characters in S minus intMinLength.
  var fillLen = intMinLength - S.length;
  // 6. If fillLen < 0, then throw a RangeError exception.
  // 7. If fillLen is +∞, then throw a RangeError exception.
  if(fillLen < 0 || fillLen === Infinity){
    throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
  }
  // 8. Let sFillStr be the string represented by fillStr.
  // 9. If sFillStr is undefined, let sFillStr be a space character.
  var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
  // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
  var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
  // truncate if we overflowed
  if(sFillVal.length > fillLen)sFillVal = left
    ? sFillVal.slice(sFillVal.length - fillLen)
    : sFillVal.slice(0, fillLen);
  // 11. Return a string made from sFillVal, followed by S.
  // 11. Return a String made from S, followed by sFillVal.
  return left ? sFillVal.concat(S) : S.concat(sFillVal);
};
},{"./$":23,"./$.string-repeat":36}],36:[function(require,module,exports){
'use strict';
var $ = require('./$');

module.exports = function repeat(count){
  var str = String($.assertDefined(this))
    , res = ''
    , n   = $.toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$":23}],37:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , ctx    = require('./$.ctx')
  , cof    = require('./$.cof')
  , invoke = require('./$.invoke')
  , cel    = require('./$.dom-create')
  , global             = $.g
  , isFunction         = $.isFunction
  , html               = $.html
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
function run(){
  var id = +this;
  if($.has(queue, id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!isFunction(setTask) || !isFunction(clearTask)){
  setTask = function(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(isFunction(fn) ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(cof(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is object
  } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
    defer = function(id){
      global.postMessage(id, '*');
    };
    global.addEventListener('message', listner, false);
  // WebWorkers
  } else if(isFunction(MessageChannel)){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$":23,"./$.cof":6,"./$.ctx":11,"./$.dom-create":13,"./$.invoke":18}],38:[function(require,module,exports){
module.exports = function(exec){
  try {
    exec();
    return false;
  } catch(e){
    return true;
  }
};
},{}],39:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":23}],40:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./$.wks')('unscopables');
if(!(UNSCOPABLES in []))require('./$').hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  [][UNSCOPABLES][key] = true;
};
},{"./$":23,"./$.wks":41}],41:[function(require,module,exports){
var global = require('./$').g
  , store  = require('./$.shared')('wks');
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":23,"./$.shared":32,"./$.uid":39}],42:[function(require,module,exports){
var $                = require('./$')
  , cel              = require('./$.dom-create')
  , cof              = require('./$.cof')
  , $def             = require('./$.def')
  , invoke           = require('./$.invoke')
  , arrayMethod      = require('./$.array-methods')
  , IE_PROTO         = require('./$.uid').safe('__proto__')
  , assert           = require('./$.assert')
  , assertObject     = assert.obj
  , ObjectProto      = Object.prototype
  , html             = $.html
  , A                = []
  , _slice           = A.slice
  , _join            = A.join
  , classof          = cof.classof
  , has              = $.has
  , defineProperty   = $.setDesc
  , getOwnDescriptor = $.getDesc
  , defineProperties = $.setDescs
  , isFunction       = $.isFunction
  , isObject         = $.isObject
  , toObject         = $.toObject
  , toLength         = $.toLength
  , toIndex          = $.toIndex
  , IE8_DOM_DEFINE   = false
  , $indexOf         = require('./$.array-includes')(false)
  , $forEach         = arrayMethod(0)
  , $map             = arrayMethod(1)
  , $filter          = arrayMethod(2)
  , $some            = arrayMethod(3)
  , $every           = arrayMethod(4);

if(!$.DESC){
  try {
    IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
      {get: function(){ return 8; }}
    ).x == 8;
  } catch(e){ /* empty */ }
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)assertObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    assertObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$def($def.S + $def.F * !$.DESC, 'Object', {
  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $.getDesc,
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty: $.setDesc,
  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties: defineProperties
});

  // IE 8- don't enum bug keys
var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
            'toLocaleString,toString,valueOf').split(',')
  // Additional keys for getOwnPropertyNames
  , keys2 = keys1.concat('length', 'prototype')
  , keysLen1 = keys1.length;

// Create object with `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = cel('iframe')
    , i      = keysLen1
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict.prototype[keys1[i]];
  return createDict();
};
function createGetKeys(names, length){
  return function(object){
    var O      = toObject(object)
      , i      = 0
      , result = []
      , key;
    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(length > i)if(has(O, key = names[i++])){
      ~$indexOf(result, key) || result.push(key);
    }
    return result;
  };
}
function Empty(){}
$def($def.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = Object(assert.def(O));
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(isFunction(O.constructor) && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = assertObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
  // 19.1.2.17 / 15.2.3.8 Object.seal(O)
  seal: function seal(it){
    return it; // <- cap
  },
  // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
  freeze: function freeze(it){
    return it; // <- cap
  },
  // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
  preventExtensions: function preventExtensions(it){
    return it; // <- cap
  },
  // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
  isSealed: function isSealed(it){
    return !isObject(it); // <- cap
  },
  // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
  isFrozen: function isFrozen(it){
    return !isObject(it); // <- cap
  },
  // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
  isExtensible: function isExtensible(it){
    return isObject(it); // <- cap
  }
});

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$def($def.P, 'Function', {
  bind: function(that /*, args... */){
    var fn       = assert.fn(this)
      , partArgs = _slice.call(arguments, 1);
    function bound(/* args... */){
      var args   = partArgs.concat(_slice.call(arguments))
        , constr = this instanceof bound
        , ctx    = constr ? $.create(fn.prototype) : that
        , result = invoke(fn, args, ctx);
      return constr ? ctx : result;
    }
    if(fn.prototype)bound.prototype = fn.prototype;
    return bound;
  }
});

// Fix for not array-like ES3 string and DOM objects
if(!(0 in Object('z') && 'z'[0] == 'z')){
  $.ES5Object = function(it){
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
}

var buggySlice = true;
try {
  if(html)_slice.call(html);
  buggySlice = false;
} catch(e){ /* empty */ }

$def($def.P + $def.F * buggySlice, 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return _slice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

$def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
  join: function join(){
    return _join.apply($.ES5Object(this), arguments);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$def($def.S, 'Array', {
  isArray: function(arg){
    return cof(arg) == 'Array';
  }
});
function createArrayReduce(isRight){
  return function(callbackfn, memo){
    assert.fn(callbackfn);
    var O      = toObject(this)
      , length = toLength(O.length)
      , index  = isRight ? length - 1 : 0
      , i      = isRight ? -1 : 1;
    if(arguments.length < 2)for(;;){
      if(index in O){
        memo = O[index];
        index += i;
        break;
      }
      index += i;
      assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
}
$def($def.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
    return $forEach(this, callbackfn, arguments[1]);
  },
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn/*, that = undefined */){
    return $map(this, callbackfn, arguments[1]);
  },
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn/*, that = undefined */){
    return $filter(this, callbackfn, arguments[1]);
  },
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn/*, that = undefined */){
    return $some(this, callbackfn, arguments[1]);
  },
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn/*, that = undefined */){
    return $every(this, callbackfn, arguments[1]);
  },
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(el /*, fromIndex = 0 */){
    return $indexOf(this, el, arguments[1]);
  },
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 21.1.3.25 / 15.5.4.20 String.prototype.trim()
$def($def.P, 'String', {trim: require('./$.replacer')(/^\s*([\s\S]*\S)?\s*$/, '$1')});

// 20.3.3.1 / 15.9.4.4 Date.now()
$def($def.S, 'Date', {now: function(){
  return +new Date;
}});

function lz(num){
  return num > 9 ? num : '0' + num;
}

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS and old webkit had a broken Date implementation.
var date       = new Date(-5e13 - 1)
  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
      && require('./$.throws')(function(){ new Date(NaN).toISOString(); }));
$def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
  if(!isFinite(this))throw RangeError('Invalid time value');
  var d = this
    , y = d.getUTCFullYear()
    , m = d.getUTCMilliseconds()
    , s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
}});

if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
  var tag = classof(it);
  return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
};
},{"./$":23,"./$.array-includes":2,"./$.array-methods":3,"./$.assert":4,"./$.cof":6,"./$.def":12,"./$.dom-create":13,"./$.invoke":18,"./$.replacer":29,"./$.throws":38,"./$.uid":39}],43:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , $def    = require('./$.def')
  , toIndex = $.toIndex;
$def($def.P, 'Array', {
  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
  copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
    var O     = Object($.assertDefined(this))
      , len   = $.toLength(O.length)
      , to    = toIndex(target, len)
      , from  = toIndex(start, len)
      , end   = arguments[2]
      , fin   = end === undefined ? len : toIndex(end, len)
      , count = Math.min(fin - from, len - to)
      , inc   = 1;
    if(from < to && to < from + count){
      inc  = -1;
      from = from + count - 1;
      to   = to   + count - 1;
    }
    while(count-- > 0){
      if(from in O)O[to] = O[from];
      else delete O[to];
      to   += inc;
      from += inc;
    } return O;
  }
});
require('./$.unscope')('copyWithin');
},{"./$":23,"./$.def":12,"./$.unscope":40}],44:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , $def    = require('./$.def')
  , toIndex = $.toIndex;
$def($def.P, 'Array', {
  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  fill: function fill(value /*, start = 0, end = @length */){
    var O      = Object($.assertDefined(this))
      , length = $.toLength(O.length)
      , index  = toIndex(arguments[1], length)
      , end    = arguments[2]
      , endPos = end === undefined ? length : toIndex(end, length);
    while(endPos > index)O[index++] = value;
    return O;
  }
});
require('./$.unscope')('fill');
},{"./$":23,"./$.def":12,"./$.unscope":40}],45:[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var KEY    = 'findIndex'
  , $def   = require('./$.def')
  , forced = true
  , $find  = require('./$.array-methods')(6);
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$def($def.P + $def.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments[1]);
  }
});
require('./$.unscope')(KEY);
},{"./$.array-methods":3,"./$.def":12,"./$.unscope":40}],46:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var KEY    = 'find'
  , $def   = require('./$.def')
  , forced = true
  , $find  = require('./$.array-methods')(5);
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$def($def.P + $def.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments[1]);
  }
});
require('./$.unscope')(KEY);
},{"./$.array-methods":3,"./$.def":12,"./$.unscope":40}],47:[function(require,module,exports){
var $     = require('./$')
  , ctx   = require('./$.ctx')
  , $def  = require('./$.def')
  , $iter = require('./$.iter')
  , call  = require('./$.iter-call');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = Object($.assertDefined(arrayLike))
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
      , index   = 0
      , length, result, step, iterator;
    if($iter.is(O)){
      iterator = $iter.get(O);
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result   = new (typeof this == 'function' ? this : Array);
      for(; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
      }
    } else {
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
      for(; length > index; index++){
        result[index] = mapping ? f(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$":23,"./$.ctx":11,"./$.def":12,"./$.iter":22,"./$.iter-call":19,"./$.iter-detect":21}],48:[function(require,module,exports){
var $          = require('./$')
  , setUnscope = require('./$.unscope')
  , ITER       = require('./$.uid').safe('iter')
  , $iter      = require('./$.iter')
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":23,"./$.iter":22,"./$.iter-define":20,"./$.uid":39,"./$.unscope":40}],49:[function(require,module,exports){
var $def = require('./$.def');
$def($def.S, 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , length = arguments.length
      // strange IE quirks mode bug -> use typeof instead of isFunction
      , result = new (typeof this == 'function' ? this : Array)(length);
    while(length > index)result[index] = arguments[index++];
    result.length = length;
    return result;
  }
});
},{"./$.def":12}],50:[function(require,module,exports){
require('./$.species')(Array);
},{"./$.species":33}],51:[function(require,module,exports){
var $             = require('./$')
  , HAS_INSTANCE  = require('./$.wks')('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(!$.isFunction(this) || !$.isObject(O))return false;
  if(!$.isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"./$":23,"./$.wks":41}],52:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , NAME = 'name'
  , setDesc = $.setDesc
  , FunctionProto = Function.prototype;
// 19.2.4.2 name
NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
  configurable: true,
  get: function(){
    var match = String(this).match(/^\s*function ([^ (]*)/)
      , name  = match ? match[1] : '';
    $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
    return name;
  },
  set: function(value){
    $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
  }
});
},{"./$":23}],53:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments[0]); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":10,"./$.collection-strong":7}],54:[function(require,module,exports){
var Infinity = 1 / 0
  , $def  = require('./$.def')
  , E     = Math.E
  , pow   = Math.pow
  , abs   = Math.abs
  , exp   = Math.exp
  , log   = Math.log
  , sqrt  = Math.sqrt
  , ceil  = Math.ceil
  , floor = Math.floor
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);
function roundTiesToEven(n){
  return n + 1 / EPSILON - 1 / EPSILON;
}

// 20.2.2.28 Math.sign(x)
function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
}
// 20.2.2.5 Math.asinh(x)
function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}
// 20.2.2.14 Math.expm1(x)
function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
}

$def($def.S, 'Math', {
  // 20.2.2.3 Math.acosh(x)
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
  },
  // 20.2.2.5 Math.asinh(x)
  asinh: asinh,
  // 20.2.2.7 Math.atanh(x)
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  },
  // 20.2.2.9 Math.cbrt(x)
  cbrt: function cbrt(x){
    return sign(x = +x) * pow(abs(x), 1 / 3);
  },
  // 20.2.2.11 Math.clz32(x)
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
  },
  // 20.2.2.12 Math.cosh(x)
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  },
  // 20.2.2.14 Math.expm1(x)
  expm1: expm1,
  // 20.2.2.16 Math.fround(x)
  fround: function fround(x){
    var $abs  = abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  },
  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , len  = arguments.length
      , larg = 0
      , arg, div;
    while(i < len){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  },
  // 20.2.2.18 Math.imul(x, y)
  imul: function imul(x, y){
    var UInt16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UInt16 & xn
      , yl = UInt16 & yn;
    return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
  },
  // 20.2.2.20 Math.log1p(x)
  log1p: function log1p(x){
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
  },
  // 20.2.2.21 Math.log10(x)
  log10: function log10(x){
    return log(x) / Math.LN10;
  },
  // 20.2.2.22 Math.log2(x)
  log2: function log2(x){
    return log(x) / Math.LN2;
  },
  // 20.2.2.28 Math.sign(x)
  sign: sign,
  // 20.2.2.30 Math.sinh(x)
  sinh: function sinh(x){
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  },
  // 20.2.2.33 Math.tanh(x)
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  },
  // 20.2.2.34 Math.trunc(x)
  trunc: function trunc(it){
    return (it > 0 ? floor : ceil)(it);
  }
});
},{"./$.def":12}],55:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , isObject   = $.isObject
  , isFunction = $.isFunction
  , NUMBER     = 'Number'
  , $Number    = $.g[NUMBER]
  , Base       = $Number
  , proto      = $Number.prototype;
function toPrimitive(it){
  var fn, val;
  if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
  if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to number");
}
function toNumber(it){
  if(isObject(it))it = toPrimitive(it);
  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
    var binary = false;
    switch(it.charCodeAt(1)){
      case 66 : case 98  : binary = true;
      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
    }
  } return +it;
}
if($.FW && !($Number('0o1') && $Number('0b1'))){
  $Number = function Number(it){
    return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call($.DESC ? $.getNames(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), function(key){
      if($.has(Base, key) && !$.has($Number, key)){
        $.setDesc($Number, key, $.getDesc(Base, key));
      }
    }
  );
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redef')($.g, NUMBER, $Number);
}
},{"./$":23,"./$.redef":28}],56:[function(require,module,exports){
var $     = require('./$')
  , $def  = require('./$.def')
  , abs   = Math.abs
  , floor = Math.floor
  , _isFinite = $.g.isFinite
  , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
function isInteger(it){
  return !$.isObject(it) && _isFinite(it) && floor(it) === it;
}
$def($def.S, 'Number', {
  // 20.1.2.1 Number.EPSILON
  EPSILON: Math.pow(2, -52),
  // 20.1.2.2 Number.isFinite(number)
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  },
  // 20.1.2.3 Number.isInteger(number)
  isInteger: isInteger,
  // 20.1.2.4 Number.isNaN(number)
  isNaN: function isNaN(number){
    return number != number;
  },
  // 20.1.2.5 Number.isSafeInteger(number)
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
  },
  // 20.1.2.6 Number.MAX_SAFE_INTEGER
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
  // 20.1.2.10 Number.MIN_SAFE_INTEGER
  MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
  // 20.1.2.12 Number.parseFloat(string)
  parseFloat: parseFloat,
  // 20.1.2.13 Number.parseInt(string, radix)
  parseInt: parseInt
});
},{"./$":23,"./$.def":12}],57:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":5,"./$.def":12}],58:[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $def = require('./$.def');
$def($def.S, 'Object', {
  is: require('./$.same')
});
},{"./$.def":12,"./$.same":30}],59:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":12,"./$.set-proto":31}],60:[function(require,module,exports){
var $        = require('./$')
  , $def     = require('./$.def')
  , isObject = $.isObject
  , toObject = $.toObject;
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
    , forced = 0
    , method = {};
  method[KEY] = ID == 0 ? function freeze(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 1 ? function seal(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 2 ? function preventExtensions(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 3 ? function isFrozen(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 4 ? function isSealed(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 5 ? function isExtensible(it){
    return isObject(it) ? fn(it) : false;
  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : ID == 7 ? function getPrototypeOf(it){
    return fn(Object($.assertDefined(it)));
  } : ID == 8 ? function keys(it){
    return fn(toObject(it));
  } : require('./$.get-names').get;
  try {
    fn('z');
  } catch(e){
    forced = 1;
  }
  $def($def.S + $def.F * forced, 'Object', method);
});
},{"./$":23,"./$.def":12,"./$.get-names":17}],61:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , tmp = {};
tmp[require('./$.wks')('toStringTag')] = 'z';
if(require('./$').FW && cof(tmp) != 'z'){
  require('./$.redef')(Object.prototype, 'toString', function toString(){
    return '[object ' + cof.classof(this) + ']';
  }, true);
}
},{"./$":23,"./$.cof":6,"./$.redef":28,"./$.wks":41}],62:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , cof      = require('./$.cof')
  , $def     = require('./$.def')
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , setProto = require('./$.set-proto').set
  , same     = require('./$.same')
  , species  = require('./$.species')
  , SPECIES  = require('./$.wks')('species')
  , RECORD   = require('./$.uid').safe('record')
  , PROMISE  = 'Promise'
  , global   = $.g
  , process  = global.process
  , isNode   = cof(process) == 'process'
  , asap     = process && process.nextTick || require('./$.task').set
  , P        = global[PROMISE]
  , isFunction     = $.isFunction
  , isObject       = $.isObject
  , assertFunction = assert.fn
  , assertObject   = assert.obj
  , Wrapper;

function testResolve(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
}

var useNative = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = isFunction(P) && isFunction(P.resolve) && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && $.DESC){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
function isPromise(it){
  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
}
function sameConstructor(a, b){
  // library wrapper special case
  if(!$.FW && a === P && b === Wrapper)return true;
  return same(a, b);
}
function getConstructor(C){
  var S = assertObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  if(isObject(it))then = it.then;
  return isFunction(then) ? then : false;
}
function notify(record){
  var chain = record.c;
  // strange IE + webpack dev server bug - use .call(global)
  if(chain.length)asap.call(global, function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    function run(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    }
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
  });
}
function isUnhandled(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
}
function $reject(value){
  var record = this
    , promise;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  setTimeout(function(){
    // strange IE + webpack dev server bug - use .call(global)
    asap.call(global, function(){
      if(isUnhandled(promise = record.p)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(global.console && console.error){
          console.error('Unhandled promise rejection', value);
        }
      }
      record.a = undefined;
    });
  }, 1);
  notify(record);
}
function $resolve(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      // strange IE + webpack dev server bug - use .call(global)
      asap.call(global, function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    assertFunction(executor);
    var record = {
      p: assert.inst(this, P, PROMISE),       // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false                                // <- handled rejection
    };
    $.hide(this, RECORD, record);
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.mix')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = assertObject(assertObject(this).constructor)[SPECIES];
      var react = {
        ok:   isFunction(onFulfilled) ? onFulfilled : true,
        fail: isFunction(onRejected)  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = assertFunction(res);
        react.rej = assertFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      if(record.s)notify(record);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
cof.set(P, PROMISE);
species(P);
species(Wrapper = $.core[PROMISE]);

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new (getConstructor(this))(function(res, rej){ rej(r); });
  }
});
$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isPromise(x) && sameConstructor(x.constructor, this)
      ? x : new this(function(res){ res(x); });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":23,"./$.assert":4,"./$.cof":6,"./$.ctx":11,"./$.def":12,"./$.for-of":15,"./$.iter-detect":21,"./$.mix":25,"./$.same":30,"./$.set-proto":31,"./$.species":33,"./$.task":37,"./$.uid":39,"./$.wks":41}],63:[function(require,module,exports){
var $         = require('./$')
  , $def      = require('./$.def')
  , setProto  = require('./$.set-proto')
  , $iter     = require('./$.iter')
  , ITERATOR  = require('./$.wks')('iterator')
  , ITER      = require('./$.uid').safe('iter')
  , step      = $iter.step
  , assert    = require('./$.assert')
  , isObject  = $.isObject
  , getProto  = $.getProto
  , $Reflect  = $.g.Reflect
  , _apply    = Function.apply
  , assertObject = assert.obj
  , _isExtensible = Object.isExtensible || isObject
  , _preventExtensions = Object.preventExtensions
  // IE TP has broken Reflect.enumerate
  , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));

function Enumerate(iterated){
  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
}
$iter.create(Enumerate, 'Object', function(){
  var iter = this[ITER]
    , keys = iter.k
    , key;
  if(keys == undefined){
    iter.k = keys = [];
    for(key in iter.o)keys.push(key);
  }
  do {
    if(iter.i >= keys.length)return step(1);
  } while(!((key = keys[iter.i++]) in iter.o));
  return step(0, key);
});

var reflect = {
  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  },
  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
  construct: function construct(target, argumentsList /*, newTarget*/){
    var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = _apply.call(target, instance, argumentsList);
    return isObject(result) ? result : instance;
  },
  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
  defineProperty: function defineProperty(target, propertyKey, attributes){
    assertObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  },
  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = $.getDesc(assertObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  },
  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
  get: function get(target, propertyKey/*, receiver*/){
    var receiver = arguments.length < 3 ? target : arguments[2]
      , desc = $.getDesc(assertObject(target), propertyKey), proto;
    if(desc)return $.has(desc, 'value')
      ? desc.value
      : desc.get === undefined
        ? undefined
        : desc.get.call(receiver);
    return isObject(proto = getProto(target))
      ? get(proto, propertyKey, receiver)
      : undefined;
  },
  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(assertObject(target), propertyKey);
  },
  // 26.1.8 Reflect.getPrototypeOf(target)
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(assertObject(target));
  },
  // 26.1.9 Reflect.has(target, propertyKey)
  has: function has(target, propertyKey){
    return propertyKey in target;
  },
  // 26.1.10 Reflect.isExtensible(target)
  isExtensible: function isExtensible(target){
    return _isExtensible(assertObject(target));
  },
  // 26.1.11 Reflect.ownKeys(target)
  ownKeys: require('./$.own-keys'),
  // 26.1.12 Reflect.preventExtensions(target)
  preventExtensions: function preventExtensions(target){
    assertObject(target);
    try {
      if(_preventExtensions)_preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  },
  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
  set: function set(target, propertyKey, V/*, receiver*/){
    var receiver = arguments.length < 4 ? target : arguments[3]
      , ownDesc  = $.getDesc(assertObject(target), propertyKey)
      , existingDescriptor, proto;
    if(!ownDesc){
      if(isObject(proto = getProto(target))){
        return set(proto, propertyKey, V, receiver);
      }
      ownDesc = $.desc(0);
    }
    if($.has(ownDesc, 'value')){
      if(ownDesc.writable === false || !isObject(receiver))return false;
      existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
      existingDescriptor.value = V;
      $.setDesc(receiver, propertyKey, existingDescriptor);
      return true;
    }
    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }
};
// 26.1.14 Reflect.setPrototypeOf(target, proto)
if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
  setProto.check(target, proto);
  try {
    setProto.set(target, proto);
    return true;
  } catch(e){
    return false;
  }
};

$def($def.G, {Reflect: {}});

$def($def.S + $def.F * buggyEnumerate, 'Reflect', {
  // 26.1.5 Reflect.enumerate(target)
  enumerate: function enumerate(target){
    return new Enumerate(assertObject(target));
  }
});

$def($def.S, 'Reflect', reflect);
},{"./$":23,"./$.assert":4,"./$.def":12,"./$.iter":22,"./$.own-keys":26,"./$.set-proto":31,"./$.uid":39,"./$.wks":41}],64:[function(require,module,exports){
var $       = require('./$')
  , cof     = require('./$.cof')
  , $RegExp = $.g.RegExp
  , Base    = $RegExp
  , proto   = $RegExp.prototype
  , re      = /a/g
  // "new" creates a new object
  , CORRECT_NEW = new $RegExp(re) !== re
  // RegExp allows a regex with flags as the pattern
  , ALLOWS_RE_WITH_FLAGS = function(){
    try {
      return $RegExp(re, 'i') == '/a/i';
    } catch(e){ /* empty */ }
  }();
if($.FW && $.DESC){
  if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
    $RegExp = function RegExp(pattern, flags){
      var patternIsRegExp  = cof(pattern) == 'RegExp'
        , flagsIsUndefined = flags === undefined;
      if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
      return CORRECT_NEW
        ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
        : new Base(patternIsRegExp ? pattern.source : pattern
          , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
    };
    $.each.call($.getNames(Base), function(key){
      key in $RegExp || $.setDesc($RegExp, key, {
        configurable: true,
        get: function(){ return Base[key]; },
        set: function(it){ Base[key] = it; }
      });
    });
    proto.constructor = $RegExp;
    $RegExp.prototype = proto;
    require('./$.redef')($.g, 'RegExp', $RegExp);
  }
  // 21.2.5.3 get RegExp.prototype.flags()
  if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
    configurable: true,
    get: require('./$.replacer')(/^.*\/(\w*)$/, '$1')
  });
}
require('./$.species')($RegExp);
},{"./$":23,"./$.cof":6,"./$.redef":28,"./$.replacer":29,"./$.species":33}],65:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments[0]); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":10,"./$.collection-strong":7}],66:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(false);
$def($def.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.def":12,"./$.string-at":34}],67:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def')
  , toLength = $.toLength;

// should throw error on regex
$def($def.P + $def.F * !require('./$.throws')(function(){ 'q'.endsWith(/./); }), 'String', {
  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    var that = String($.assertDefined(this))
      , endPosition = arguments[1]
      , len = toLength(that.length)
      , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    searchString += '';
    return that.slice(end - searchString.length, end) === searchString;
  }
});
},{"./$":23,"./$.cof":6,"./$.def":12,"./$.throws":38}],68:[function(require,module,exports){
var $def    = require('./$.def')
  , toIndex = require('./$').toIndex
  , fromCharCode = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res = []
      , len = arguments.length
      , i   = 0
      , code;
    while(len > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./$":23,"./$.def":12}],69:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
  includes: function includes(searchString /*, position = 0 */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
  }
});
},{"./$":23,"./$.cof":6,"./$.def":12}],70:[function(require,module,exports){
var set   = require('./$').set
  , $at   = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = $at(O, index);
  iter.i += point.length;
  return step(0, point);
});
},{"./$":23,"./$.iter":22,"./$.iter-define":20,"./$.string-at":34,"./$.uid":39}],71:[function(require,module,exports){
var $    = require('./$')
  , $def = require('./$.def');

$def($def.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl = $.toObject(callSite.raw)
      , len = $.toLength(tpl.length)
      , sln = arguments.length
      , res = []
      , i   = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < sln)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./$":23,"./$.def":12}],72:[function(require,module,exports){
var $def = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.def":12,"./$.string-repeat":36}],73:[function(require,module,exports){
'use strict';
var $    = require('./$')
  , cof  = require('./$.cof')
  , $def = require('./$.def');

// should throw error on regex
$def($def.P + $def.F * !require('./$.throws')(function(){ 'q'.startsWith(/./); }), 'String', {
  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
  startsWith: function startsWith(searchString /*, position = 0 */){
    if(cof(searchString) == 'RegExp')throw TypeError();
    var that  = String($.assertDefined(this))
      , index = $.toLength(Math.min(arguments[1], that.length));
    searchString += '';
    return that.slice(index, index + searchString.length) === searchString;
  }
});
},{"./$":23,"./$.cof":6,"./$.def":12,"./$.throws":38}],74:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $        = require('./$')
  , setTag   = require('./$.cof').set
  , uid      = require('./$.uid')
  , shared   = require('./$.shared')
  , $def     = require('./$.def')
  , $redef   = require('./$.redef')
  , keyOf    = require('./$.keyof')
  , enumKeys = require('./$.enum-keys')
  , assertObject = require('./$.assert').obj
  , ObjectProto = Object.prototype
  , DESC     = $.DESC
  , has      = $.has
  , $create  = $.create
  , getDesc  = $.getDesc
  , setDesc  = $.setDesc
  , desc     = $.desc
  , $names   = require('./$.get-names')
  , getNames = $names.get
  , toObject = $.toObject
  , $Symbol  = $.g.Symbol
  , setter   = false
  , TAG      = uid('tag')
  , HIDDEN   = uid('hidden')
  , _propertyIsEnumerable = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols = shared('symbols')
  , useNative = $.isFunction($Symbol);

var setSymbolDesc = DESC ? function(){ // fallback for old Android
  try {
    return $create(setDesc({}, HIDDEN, {
      get: function(){
        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
      }
    }))[HIDDEN] || setDesc;
  } catch(e){
    return function(it, key, D){
      var protoDesc = getDesc(ObjectProto, key);
      if(protoDesc)delete ObjectProto[key];
      setDesc(it, key, D);
      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
    };
  }
}() : setDesc;

function wrap(tag){
  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
  DESC && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, desc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = $create(D, {enumerable: desc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  assertObject(it);
  var keys = enumKeys(P = toObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)defineProperty(it, key = keys[i++], P[key]);
  return it;
}
function create(it, P){
  return P === undefined ? $create(it) : defineProperties($create(it), P);
}
function propertyIsEnumerable(key){
  var E = _propertyIsEnumerable.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
}
function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
}
function getOwnPropertyNames(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
}
function getOwnPropertySymbols(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
}

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments[0]));
  };
  $redef($Symbol.prototype, 'toString', function(){
    return this[TAG];
  });

  $.create     = create;
  $.setDesc    = defineProperty;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDescs   = defineProperties;
  $.getNames   = $names.get = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;

  if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = require('./$.wks')(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag($.g.JSON, 'JSON', true);
},{"./$":23,"./$.assert":4,"./$.cof":6,"./$.def":12,"./$.enum-keys":14,"./$.get-names":17,"./$.keyof":24,"./$.redef":28,"./$.shared":32,"./$.uid":39,"./$.wks":41}],75:[function(require,module,exports){
'use strict';
var $         = require('./$')
  , weak      = require('./$.collection-weak')
  , leakStore = weak.leakStore
  , ID        = weak.ID
  , WEAK      = weak.WEAK
  , has       = $.has
  , isObject  = $.isObject
  , isExtensible = Object.isExtensible || isObject
  , tmp       = {};

// 23.3 WeakMap Objects
var $WeakMap = require('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments[0]); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return leakStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this[ID]];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    require('./$.redef')(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = leakStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":23,"./$.collection":10,"./$.collection-weak":9,"./$.redef":28}],76:[function(require,module,exports){
'use strict';
var weak = require('./$.collection-weak');

// 23.4 WeakSet Objects
require('./$.collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments[0]); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./$.collection":10,"./$.collection-weak":9}],77:[function(require,module,exports){
'use strict';
var $def      = require('./$.def')
  , $includes = require('./$.array-includes')(true);
$def($def.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments[1]);
  }
});
require('./$.unscope')('includes');
},{"./$.array-includes":2,"./$.def":12,"./$.unscope":40}],78:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
require('./$.collection-to-json')('Map');
},{"./$.collection-to-json":8}],79:[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $       = require('./$')
  , $def    = require('./$.def')
  , ownKeys = require('./$.own-keys');

$def($def.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O      = $.toObject(object)
      , result = {};
    $.each.call(ownKeys(O), function(key){
      $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
    });
    return result;
  }
});
},{"./$":23,"./$.def":12,"./$.own-keys":26}],80:[function(require,module,exports){
// http://goo.gl/XkBrjD
var $    = require('./$')
  , $def = require('./$.def');
function createObjectToArray(isEntries){
  return function(object){
    var O      = $.toObject(object)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = Array(length)
      , key;
    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
    else while(length > i)result[i] = O[keys[i++]];
    return result;
  };
}
$def($def.S, 'Object', {
  values:  createObjectToArray(false),
  entries: createObjectToArray(true)
});
},{"./$":23,"./$.def":12}],81:[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $def = require('./$.def');
$def($def.S, 'RegExp', {
  escape: require('./$.replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&', true)
});

},{"./$.def":12,"./$.replacer":29}],82:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
require('./$.collection-to-json')('Set');
},{"./$.collection-to-json":8}],83:[function(require,module,exports){
// https://github.com/mathiasbynens/String.prototype.at
'use strict';
var $def = require('./$.def')
  , $at  = require('./$.string-at')(true);
$def($def.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./$.def":12,"./$.string-at":34}],84:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  lpad: function lpad(n){
    return $pad(this, n, arguments[1], true);
  }
});
},{"./$.def":12,"./$.string-pad":35}],85:[function(require,module,exports){
'use strict';
var $def = require('./$.def')
  , $pad = require('./$.string-pad');
$def($def.P, 'String', {
  rpad: function rpad(n){
    return $pad(this, n, arguments[1], false);
  }
});
},{"./$.def":12,"./$.string-pad":35}],86:[function(require,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = require('./$')
  , $def    = require('./$.def')
  , $Array  = $.core.Array || Array
  , statics = {};
function setStatics(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = require('./$.ctx')(Function.call, [][key], length);
  });
}
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill,turn');
$def($def.S, 'Array', statics);
},{"./$":23,"./$.ctx":11,"./$.def":12}],87:[function(require,module,exports){
require('./es6.array.iterator');
var $           = require('./$')
  , Iterators   = require('./$.iter').Iterators
  , ITERATOR    = require('./$.wks')('iterator')
  , ArrayValues = Iterators.Array
  , NL          = $.g.NodeList
  , HTC         = $.g.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype;
if($.FW){
  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
}
Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
},{"./$":23,"./$.iter":22,"./$.wks":41,"./es6.array.iterator":48}],88:[function(require,module,exports){
var $def  = require('./$.def')
  , $task = require('./$.task');
$def($def.G + $def.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./$.def":12,"./$.task":37}],89:[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var $         = require('./$')
  , $def      = require('./$.def')
  , invoke    = require('./$.invoke')
  , partial   = require('./$.partial')
  , navigator = $.g.navigator
  , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
function wrap(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      $.isFunction(fn) ? fn : Function(fn)
    ), time);
  } : set;
}
$def($def.G + $def.B + $def.F * MSIE, {
  setTimeout:  wrap($.g.setTimeout),
  setInterval: wrap($.g.setInterval)
});
},{"./$":23,"./$.def":12,"./$.invoke":18,"./$.partial":27}],90:[function(require,module,exports){
require('./modules/es5');
require('./modules/es6.symbol');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.object.statics-accept-primitives');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.number.constructor');
require('./modules/es6.number.statics');
require('./modules/es6.math');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.iterator');
require('./modules/es6.array.species');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.regexp');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.reflect');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.lpad');
require('./modules/es7.string.rpad');
require('./modules/es7.regexp.escape');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.to-array');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/js.array.statics');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/$').core;

},{"./modules/$":23,"./modules/es5":42,"./modules/es6.array.copy-within":43,"./modules/es6.array.fill":44,"./modules/es6.array.find":46,"./modules/es6.array.find-index":45,"./modules/es6.array.from":47,"./modules/es6.array.iterator":48,"./modules/es6.array.of":49,"./modules/es6.array.species":50,"./modules/es6.function.has-instance":51,"./modules/es6.function.name":52,"./modules/es6.map":53,"./modules/es6.math":54,"./modules/es6.number.constructor":55,"./modules/es6.number.statics":56,"./modules/es6.object.assign":57,"./modules/es6.object.is":58,"./modules/es6.object.set-prototype-of":59,"./modules/es6.object.statics-accept-primitives":60,"./modules/es6.object.to-string":61,"./modules/es6.promise":62,"./modules/es6.reflect":63,"./modules/es6.regexp":64,"./modules/es6.set":65,"./modules/es6.string.code-point-at":66,"./modules/es6.string.ends-with":67,"./modules/es6.string.from-code-point":68,"./modules/es6.string.includes":69,"./modules/es6.string.iterator":70,"./modules/es6.string.raw":71,"./modules/es6.string.repeat":72,"./modules/es6.string.starts-with":73,"./modules/es6.symbol":74,"./modules/es6.weak-map":75,"./modules/es6.weak-set":76,"./modules/es7.array.includes":77,"./modules/es7.map.to-json":78,"./modules/es7.object.get-own-property-descriptors":79,"./modules/es7.object.to-array":80,"./modules/es7.regexp.escape":81,"./modules/es7.set.to-json":82,"./modules/es7.string.at":83,"./modules/es7.string.lpad":84,"./modules/es7.string.rpad":85,"./modules/js.array.statics":86,"./modules/web.dom.iterable":87,"./modules/web.immediate":88,"./modules/web.timers":89}],91:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
      innerFn, self || null,
      new Context(tryLocsList || [])
    );

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(function() {
          return invoke(method, arg);
        }) : new Promise(function(resolve) {
          resolve(invoke(method, arg));
        });

      // Avoid propagating enqueueResult failures to Promises returned by
      // later invocations of the iterator.
      previousPromise = enqueueResult["catch"](function(ignored){});

      return enqueueResult;
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3IvcnVudGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvbWFzdGVyL0xJQ0VOU0UgZmlsZS4gQW5cbiAqIGFkZGl0aW9uYWwgZ3JhbnQgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpblxuICogdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID1cbiAgICB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUoKG91dGVyRm4gfHwgR2VuZXJhdG9yKS5wcm90b3R5cGUpO1xuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKFxuICAgICAgaW5uZXJGbiwgc2VsZiB8fCBudWxsLFxuICAgICAgbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pXG4gICAgKTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIG5ldyBBd2FpdEFyZ3VtZW50KGFyZyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gQXdhaXRBcmd1bWVudChhcmcpIHtcbiAgICB0aGlzLmFyZyA9IGFyZztcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgLy8gVGhpcyBpbnZva2UgZnVuY3Rpb24gaXMgd3JpdHRlbiBpbiBhIHN0eWxlIHRoYXQgYXNzdW1lcyBzb21lXG4gICAgLy8gY2FsbGluZyBmdW5jdGlvbiAob3IgUHJvbWlzZSkgd2lsbCBoYW5kbGUgZXhjZXB0aW9ucy5cbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbbWV0aG9kXShhcmcpO1xuICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudFxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZS5hcmcpLnRoZW4oaW52b2tlTmV4dCwgaW52b2tlVGhyb3cpXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmRvbWFpbikge1xuICAgICAgaW52b2tlID0gcHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgIH1cblxuICAgIHZhciBpbnZva2VOZXh0ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcIm5leHRcIik7XG4gICAgdmFyIGludm9rZVRocm93ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInRocm93XCIpO1xuICAgIHZhciBpbnZva2VSZXR1cm4gPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwicmV0dXJuXCIpO1xuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgZW5xdWV1ZVJlc3VsdCA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgICAgfSkgOiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgcmVzb2x2ZShpbnZva2UobWV0aG9kLCBhcmcpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGVucXVldWVSZXN1bHQgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnlcbiAgICAgIC8vIGxhdGVyIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA9IGVucXVldWVSZXN1bHRbXCJjYXRjaFwiXShmdW5jdGlvbihpZ25vcmVkKXt9KTtcblxuICAgICAgcmV0dXJuIGVucXVldWVSZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8XG4gICAgICAgICAgICAgIChtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3IsXG4gICAgICAgICAgICBhcmdcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkWWllbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IGFyZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIHRoaXMuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcbiAgICAgICAgcmV0dXJuICEhY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4gIC8vIG9iamVjdCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgbW9zdCByZWxpYWJsZSB0ZWNobmlxdWUgdGhhdCBkb2VzIG5vdFxuICAvLyB1c2UgaW5kaXJlY3QgZXZhbCAod2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kpLlxuICB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6XG4gIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHRoaXNcbik7XG4iXX0=
},{"_process":94}],92:[function(require,module,exports){
module.exports = require("./lib/polyfill");

},{"./lib/polyfill":1}],93:[function(require,module,exports){
module.exports = require("babel-core/polyfill");

},{"babel-core/polyfill":92}],94:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],95:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _layoutManager = require("layoutManager");

var _layoutManager2 = _interopRequireDefault(_layoutManager);

var _Vector = require("Vector");

var _Vector2 = _interopRequireDefault(_Vector);

var _GameElementsDot = require("GameElements/Dot");

var _GameElementsDot2 = _interopRequireDefault(_GameElementsDot);

var NEIGHBORS = [new _Vector2["default"](0, -1), // NORTH
new _Vector2["default"](1, 0), // EAST
new _Vector2["default"](0, 1), // SOUTH
new _Vector2["default"](-1, 0) // WEST
];

var Board = (function () {
  function Board(options) {
    _classCallCheck(this, Board);

    if (!options) options = {};
    this.width = options.width || 7;
    this.height = options.height || 7;

    // calculate element dimensions
    this.elWidth = _layoutManager2["default"].width / this.width;
    this.elHeight = _layoutManager2["default"].height / this.height;
    this.maxElSize = Math.min(this.elWidth, this.elHeight) / 2;

    // populate elements array
    this.elements = new Array(this.width * this.height);
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        var newDot = new _GameElementsDot2["default"]({
          x: j,
          y: i
        });
        this.setElement(new _Vector2["default"](j, i), newDot);
      }
    }

    this.hasChanged = false; // DO NOT SET THIS VALUE DIRECTLY

    this.cloned = null;

    this.activeEls = [];
    this.loopCompleted = false;
  }

  /**
   * used to set hasChanged var
   *
   * - hasChanged should only be set to "true"
   * at the end of the "turn" function
   * - hasChanged should only be set to "false"
   * by the renderer once all relevant turn animations are done
   */

  _createClass(Board, [{
    key: "setChanged",
    value: function setChanged(bool) {
      this.hasChanged = bool;

      if (!bool) {
        this.activeEls = [];
        this.loopCompleted = false;
      }
    }

    /**
     * Element Vector methods
     */
  }, {
    key: "getElement",
    value: function getElement(vector) {
      return this.elements[vector.y * this.width + vector.x];
    }
  }, {
    key: "setElement",
    value: function setElement(vector, el) {
      this.elements[vector.y * this.width + vector.x] = el;
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(vector) {
      var neighbors = [];
      for (var i = 0; i < NEIGHBORS.length; i++) {
        neighbors.push(this.getElement(vector.add(NEIGHBORS[i])));
      }

      return neighbors;
    }

    /**
     * Turn / Update Methods
     */
  }, {
    key: "turn",
    value: function turn() {
      if (this.activeEls.length < 2) {
        this.setChanged(false);
        return;
      }

      this.startTurn();

      this.removeActiveElsFromGrid();

      this.addPreviousPositions();

      this.shiftElsDown();

      this.createNewEls();

      this.finishTurn();
    }
  }, {
    key: "startTurn",
    value: function startTurn() {

      // if loop is complete, change activeEls to be array including
      // every single element of activeEls type / id / color
      if (this.loopCompleted) {
        var typeId = this.activeEls[0].dotType.id;
        for (var i = 0; i < this.elements.length; i++) {
          var element = this.elements[i];
          if (element.dotType.id === typeId && this.activeEls.indexOf(element) === -1) {

            this.activeEls.push(element);
          }
        }
      }
    }
  }, {
    key: "removeActiveElsFromGrid",
    value: function removeActiveElsFromGrid() {
      // remove activeEls from grid
      for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];

        if (this.activeEls.indexOf(element) !== -1) {
          this.setElement(element.gridPos, null);
        }
      }
    }

    /**
     * adds property to each grid element with a reference
     * to its previous position for use when animating
     */
  }, {
    key: "addPreviousPositions",
    value: function addPreviousPositions() {
      for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        if (!element) continue;

        element.previousGridPos = new _Vector2["default"](element.gridPos.x, element.gridPos.y);
      }
    }
  }, {
    key: "shiftElsDown",
    value: function shiftElsDown() {
      // sort activeEls so that lowest y's are first in arr
      // (not doing this results in errors while shifting stuff down)
      this.activeEls.sort(function (a, b) {
        return a.gridPos.y - b.gridPos.y;
      });

      // shift everything down
      for (var i = 0; i < this.activeEls.length; i++) {
        var element = this.activeEls[i];

        var posVect = element.gridPos;
        var y = posVect.y - 1;
        var x = posVect.x;
        while (y >= 0) {

          var elAbove = this.getElement(new _Vector2["default"](x, y));

          this.setElement(new _Vector2["default"](x, y + 1), elAbove);
          this.setElement(new _Vector2["default"](x, y), null);

          y--;
        }
      }

      // if element exists in position, correct it's gridPos.
      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          var gridPos = new _Vector2["default"](j, i);

          var element = this.getElement(gridPos);
          if (element) {
            element.gridPos = gridPos;
          }
        }
      }
    }
  }, {
    key: "createNewEls",
    value: function createNewEls() {
      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          var gridPos = new _Vector2["default"](j, i);

          var element = this.getElement(gridPos);
          if (!element) {
            var newDot = new _GameElementsDot2["default"](gridPos);
            this.setElement(gridPos, newDot);
          }
        }
      }
    }
  }, {
    key: "finishTurn",
    value: function finishTurn() {
      this.setChanged(true);
    }
  }]);

  return Board;
})();

module.exports = Board;

},{"GameElements/Dot":96,"Vector":99,"layoutManager":101}],96:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsMathUtils = require("../utils/mathUtils");

var _utilsMathUtils2 = _interopRequireDefault(_utilsMathUtils);

var _Vector = require("../Vector");

var _Vector2 = _interopRequireDefault(_Vector);

var DOTTYPES = [{
  id: 1,
  name: 'red',
  color: '#f15c3b'
}, {
  id: 2,
  name: 'yellow',
  color: '#e7dd00'
}, {
  id: 3,
  name: 'green',
  color: '#89ed90'
}];

// {
//   id: 4,
//   name: 'blue',
//   color: '#8abdff'
// },
// {
//   id: 5,
//   name: 'purple',
//   color: '#9d5ab7'
// }

var Dot = function Dot(options) {
  _classCallCheck(this, Dot);

  this.gridPos = new _Vector2["default"](options.x, options.y);
  this.dotType = DOTTYPES[_utilsMathUtils2["default"].randomInt(0, DOTTYPES.length - 1)];
};

module.exports = Dot;

},{"../Vector":99,"../utils/mathUtils":102}],97:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _layoutManager = require("layoutManager");

var _layoutManager2 = _interopRequireDefault(_layoutManager);

var _utilsMathUtils = require("utils/mathUtils");

var _utilsMathUtils2 = _interopRequireDefault(_utilsMathUtils);

var _Board = require("Board");

var _Board2 = _interopRequireDefault(_Board);

var _Renderer = require("Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

var GameView = (function () {
  function GameView(options) {
    _classCallCheck(this, GameView);

    this.el = document.createElement('canvas');
    options.container.append(this.el);
    this.el.width = _layoutManager2["default"].width;
    this.el.height = _layoutManager2["default"].height;

    this.context = this.el.getContext("2d");

    this.mousePressed = false;
    this.currentMousePos = null;
  }

  _createClass(GameView, [{
    key: "start",
    value: function start() {
      this.board = new _Board2["default"]();
      this.renderer = new _Renderer2["default"]({
        context: this.context
      });

      this.bindEvents();

      this.update = this.update.bind(this);
      this.update();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      document.addEventListener('mousedown', this.mouseDown.bind(this));
      document.addEventListener('mousemove', this.mouseMove.bind(this));
      document.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    /**
     * Touch Events
     */
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      if (this.board.hasChanged) return;

      var hoverEl = this.getHoverEl(e);
      if (!hoverEl) return;
      if (!this.mouseInEl(e, hoverEl)) return;

      this.board.activeEls.push(hoverEl);
      this.mousePressed = true;

      this.currentMousePos = e;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      if (!this.mousePressed || !this.board.activeEls.length || this.board.hasChanged) return;

      this.currentMousePos = e;

      var hoverEl = this.getHoverEl(this.currentMousePos);
      if (!hoverEl) return;

      if (this.mouseInEl(this.currentMousePos, hoverEl) && !this.board.loopCompleted) {

        this.handleMouseInEl(hoverEl);
      } else {
        this.handleMouseOutEl(hoverEl);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      if (this.board.hasChanged) return;

      this.board.turn();
      this.mousePressed = false;
    }
  }, {
    key: "getHoverEl",
    value: function getHoverEl(e) {
      var x = e.clientX;
      var y = e.clientY;

      for (var i = 0; i < this.board.elements.length; i++) {
        var element = this.board.elements[i];
        var elRect = {
          x: element.gridPos.x * this.board.elWidth,
          y: element.gridPos.y * this.board.elHeight,
          width: this.board.elWidth,
          height: this.board.elHeight
        };

        if (_utilsMathUtils2["default"].pointInRect(x, y, elRect)) {
          return element;
        }
      }
    }
  }, {
    key: "mouseInEl",
    value: function mouseInEl(e, element) {
      var x = e.clientX;
      var y = e.clientY;
      var circle = {
        x: element.gridPos.x * this.board.elWidth + this.board.elWidth / 2,
        y: element.gridPos.y * this.board.elHeight + this.board.elHeight / 2,
        radius: this.board.maxElSize / 2
      };

      return _utilsMathUtils2["default"].circlePointCollision(x, y, circle);
    }
  }, {
    key: "handleMouseInEl",
    value: function handleMouseInEl(hoverEl) {
      var currentEl = this.board.activeEls[this.board.activeEls.length - 1];
      var neighbors = this.board.getNeighbors(currentEl.gridPos);

      // hoverEl is NOT in activeEls array but IS a neighbor of currentEl
      // and is of the same type as is the same type as currentEl
      if (hoverEl.dotType.id === currentEl.dotType.id && this.board.activeEls.indexOf(hoverEl) === -1 && neighbors.indexOf(hoverEl) !== -1) {

        this.board.activeEls.push(hoverEl);
      }

      // loop is completed
      else if (hoverEl.dotType.id === currentEl.dotType.id && this.board.activeEls.indexOf(hoverEl) === 0 && neighbors.indexOf(hoverEl) !== -1 && this.board.activeEls.length >= 4) {

          this.board.activeEls.push(hoverEl);
          this.board.loopCompleted = true;
        }
    }

    /**
     * This method is pretty complicated. In short, it determines when to remove
     * the last element of the activeEls array when the user is trying to. It could
     * probably be simplified vastly but it seems to work for now.
     *
     * Note: if window.debug = true and you set window.rectBetweenRecents to
     * the rectangle, it will be drawn in renderer.render().
     *
     * Steps:
     * - get the most recent and the second most recent activeEls
     * - get the grid vector pointing from the most recent to the second most recent
     * - generate a rectangle to represent this vector in screen space and modify
     * the x, y, width, & height such that it doesn't overlap too much with either element
     * - do a hit / collision test to check if cursor is in this rectangle
     * and if so remove / [].pop() the most recent activeEl
     */
  }, {
    key: "handleMouseOutEl",
    value: function handleMouseOutEl(hoverEl) {

      // only try to move back if array length is 2 or more
      if (this.board.activeEls.length < 2) return;

      var mostRecentActiveEl = this.board.activeEls[this.board.activeEls.length - 1];

      var secondMostRecentActiveEl = this.board.activeEls[this.board.activeEls.length - 2];

      var vectToSecondMostRecent = secondMostRecentActiveEl.gridPos.subtract(mostRecentActiveEl.gridPos);

      var rectBetweenRecents = {
        width: vectToSecondMostRecent.x * this.board.elWidth,
        height: vectToSecondMostRecent.y * this.board.elHeight
      };

      if (rectBetweenRecents.width !== 0) // horizontal collision rectangle
        {
          var shiftX = undefined;
          if (rectBetweenRecents.width > 0) {
            rectBetweenRecents.width -= this.board.maxElSize;
            shiftX = this.board.maxElSize / 2;
          } else {
            rectBetweenRecents.width += this.board.maxElSize;
            shiftX = -(this.board.maxElSize / 2);
          }

          rectBetweenRecents.height = this.board.maxElSize / 1.5;

          rectBetweenRecents.y = mostRecentActiveEl.gridPos.y * this.board.elHeight + this.board.elHeight / 2 - rectBetweenRecents.height / 2;
          rectBetweenRecents.x = mostRecentActiveEl.gridPos.x * this.board.elWidth + this.board.elWidth / 2 + shiftX;
        } else // vertical collision rectangle
        {
          var shiftY = undefined;
          if (rectBetweenRecents.height > 0) {
            rectBetweenRecents.height -= this.board.maxElSize;
            shiftY = this.board.maxElSize / 2;
          } else {
            rectBetweenRecents.height += this.board.maxElSize;
            shiftY = -(this.board.maxElSize / 2);
          }

          rectBetweenRecents.width = this.board.maxElSize / 1.5;

          rectBetweenRecents.y = mostRecentActiveEl.gridPos.y * this.board.elHeight + this.board.elHeight / 2 + shiftY;
          rectBetweenRecents.x = mostRecentActiveEl.gridPos.x * this.board.elWidth + this.board.elWidth / 2 - rectBetweenRecents.width / 2;
        }

      if (_utilsMathUtils2["default"].pointInRect(this.currentMousePos.clientX, this.currentMousePos.clientY, rectBetweenRecents)) {

        this.board.activeEls.pop();
        if (this.board.loopCompleted) this.board.loopCompleted = false;
      }

      // window.rectBetweenRecents = rectBetweenRecents;
    }

    /**
     * Main Update Loop
     */
  }, {
    key: "update",
    value: function update() {
      requestAnimationFrame(this.update);
      this.renderer.render(this.board, this.currentMousePos);
    }
  }]);

  return GameView;
})();

module.exports = GameView;

},{"Board":95,"Renderer":98,"layoutManager":101,"utils/mathUtils":102}],98:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _layoutManager = require("layoutManager");

var _layoutManager2 = _interopRequireDefault(_layoutManager);

var Renderer = (function () {
  function Renderer(options) {
    _classCallCheck(this, Renderer);

    this.context = options.context;

    this.isAnimatingTurn = false;
    this.activeEls = [];
    this.shiftingEls = [];
    this.newEls = [];
    this.turnAnimationSteps = [];
  }

  _createClass(Renderer, [{
    key: "prepareAnimationTurnData",
    value: function prepareAnimationTurnData(board) {
      this.isAnimatingTurn = true;
      for (var i = 0; i < board.activeEls.length; i++) {
        var element = board.activeEls[i];
        this.activeEls.push({
          currentX: element.gridPos.x,
          currentY: element.gridPos.y,
          dotType: element.dotType,
          radius: board.maxElSize / 2,
          loopedRadius: board.loopCompleted ? board.maxElSize / 1.5 : null,
          loopedAlpha: board.loopCompleted ? 0.5 : null
        });
      }
      for (var i = 0; i < board.elements.length; i++) {
        var element = board.elements[i];
        if (element.previousGridPos) {
          this.shiftingEls.push({
            currentX: element.gridPos.x,
            currentY: element.gridPos.y,
            prevX: element.previousGridPos.x,
            prevY: element.previousGridPos.y,
            dotType: element.dotType,
            radius: board.maxElSize / 2
          });
        } else {
          this.newEls.push({
            currentX: element.gridPos.x,
            currentY: element.gridPos.y,
            prevX: element.gridPos.x,
            prevY: -100,
            dotType: element.dotType,
            radius: board.maxElSize / 2
          });
        }
      }

      this.turnAnimationSteps.push(this.shrinkActive.bind(this));
    }
  }, {
    key: "shrinkActive",
    value: function shrinkActive() {
      var shrinkCompleted = true;
      for (var i = 0; i < this.activeEls.length; i++) {
        var element = this.activeEls[i];

        if (element.radius > 0) {
          element.radius -= 1;

          if (element.loopedAlpha && element.loopedAlpha > 0) {
            element.loopedAlpha -= 0.05;
          }
          if (element.loopedRadius && element.loopedRadius > 0) {
            element.loopedRadius -= 1;
          }

          shrinkCompleted = false;
        }
      }

      if (shrinkCompleted) {
        this.activeEls = [];
        this.turnAnimationSteps.shift();
      }
    }
  }, {
    key: "render",
    value: function render(board, currentMousePos) {
      if (board.hasChanged && !this.isAnimatingTurn) {
        this.prepareAnimationTurnData(board);
      }

      this.context.clearRect(0, 0, _layoutManager2["default"].width, _layoutManager2["default"].height);

      // debug draws
      if (window.debug && window.rectBetweenRecents) {
        this.drawBackBounds();
      }

      if (this.isAnimatingTurn) {
        if (this.turnAnimationSteps.length > 0) {
          this.turnAnimationSteps[0](board, currentMousePos);
        }

        this.drawTurnAnimationBoard(board);

        if (this.turnAnimationSteps.length === 0) {
          this.isAnimatingTurn = false;
          board.setChanged(false);
        }
      } else {
        if (board.activeEls.length > 0) {
          this.drawActiveElConnections(board, currentMousePos);
        }

        for (var i = 0; i < board.elements.length; i++) {
          var element = board.elements[i];
          if (element) this.drawElement(board, element);
        }
      }
    }
  }, {
    key: "drawTurnAnimationBoard",
    value: function drawTurnAnimationBoard(board) {
      if (this.activeEls.length > 0) {
        for (var i = 0; i < this.activeEls.length; i++) {
          var element = this.activeEls[i];
          this.drawTurnAnimationElement(board, element);
        }
      }
    }
  }, {
    key: "drawTurnAnimationElement",
    value: function drawTurnAnimationElement(board, element) {

      if (element.radius < 0) return;

      this.context.fillStyle = element.dotType.color;

      var x = element.currentX * board.elWidth + board.elWidth / 2;
      var y = element.currentY * board.elHeight + board.elHeight / 2;

      if (element.loopedRadius && element.loopedAlpha) {

        this.context.globalAlpha = Math.max(element.loopedAlpha, 0);
        this.context.beginPath();
        this.context.arc(x, y, element.loopedRadius, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.globalAlpha = 1;
      }

      this.context.beginPath();
      this.context.arc(x, y, element.radius, 0, Math.PI * 2, false);
      this.context.fill();
    }
  }, {
    key: "drawActiveElConnections",
    value: function drawActiveElConnections(board, currentMousePos) {
      this.context.beginPath();
      this.context.lineWidth = board.maxElSize / 4;
      this.context.strokeStyle = "#333";

      if (board.activeEls.length > 1) {
        for (var i = 1; i < board.activeEls.length; i++) {
          var prevEl = board.activeEls[i - 1];
          this.context.moveTo(prevEl.gridPos.x * board.elWidth + board.elWidth / 2, prevEl.gridPos.y * board.elHeight + board.elHeight / 2);

          var currentEl = board.activeEls[i];
          this.context.lineTo(currentEl.gridPos.x * board.elWidth + board.elWidth / 2, currentEl.gridPos.y * board.elHeight + board.elHeight / 2);
        }
      }

      var lastEl = board.activeEls[board.activeEls.length - 1];
      this.context.moveTo(lastEl.gridPos.x * board.elWidth + board.elWidth / 2, lastEl.gridPos.y * board.elHeight + board.elHeight / 2);

      if (board.loopCompleted) {
        var firstEl = board.activeEls[0];
        this.context.lineTo(firstEl.gridPos.x * board.elWidth + board.elWidth / 2, firstEl.gridPos.y * board.elHeight + board.elHeight / 2);
      } else {
        this.context.lineTo(currentMousePos.clientX, currentMousePos.clientY);
      }
      this.context.stroke();
    }
  }, {
    key: "drawElement",
    value: function drawElement(board, element) {
      this.context.fillStyle = element.dotType.color;

      var x = element.gridPos.x * board.elWidth + board.elWidth / 2;
      var y = element.gridPos.y * board.elHeight + board.elHeight / 2;

      if (board.loopCompleted && board.activeEls[0].dotType.id === element.dotType.id) {

        this.context.globalAlpha = 0.5;
        this.context.beginPath();
        this.context.arc(x, y, board.maxElSize / 1.5, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.globalAlpha = 1;
      }

      this.context.beginPath();
      this.context.arc(x, y, board.maxElSize / 2, 0, Math.PI * 2, false);
      this.context.fill();
    }
  }, {
    key: "drawBackBounds",
    value: function drawBackBounds() {
      this.context.fillStyle = "#ccc";
      this.context.fillRect(rectBetweenRecents.x, rectBetweenRecents.y, rectBetweenRecents.width, rectBetweenRecents.height);
    }
  }]);

  return Renderer;
})();

module.exports = Renderer;

},{"layoutManager":101}],99:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = (function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  // should ONLY use this when manipulating grid vectors

  _createClass(Vector, [{
    key: "add",
    value: function add(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    }
  }, {
    key: "subtract",
    value: function subtract(vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    }
  }, {
    key: "multiply",
    value: function multiply(valX) {
      return new Vector(this.x * val, this.y * val);
    }
  }]);

  return Vector;
})();

module.exports = Vector;

},{}],100:[function(require,module,exports){
//babel polyfill
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("babelify/polyfill");

// imports

var _GameView = require("GameView");

//first thing: monkey patch

var _GameView2 = _interopRequireDefault(_GameView);

if (!location.origin) {
  location.origin = location.protocol + "//" + location.host;
}

//an easy to access global object
window.Common = window.Common || {};

// set debug status
window.debug = true;

$(window).resize();

var MyApp = (function () {
  function MyApp() {
    _classCallCheck(this, MyApp);

    this.$el = $('#content');

    this.gameView = new _GameView2["default"]({
      container: this.$el
    });

    this.start();
  }

  _createClass(MyApp, [{
    key: "start",
    value: function start() {
      this.gameView.start();

      $(window).resize();
    }
  }]);

  return MyApp;
})();

;

//kickoff app
$(function () {
  window.FastClick.attach(document.body);
  window.app = new MyApp();
});

},{"GameView":97,"babelify/polyfill":93}],101:[function(require,module,exports){

/**
 * LayoutManager is a singleton. Only one instance should be used per game
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LayoutManager = (function () {
  function LayoutManager() {
    _classCallCheck(this, LayoutManager);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.bindEvents();
  }

  _createClass(LayoutManager, [{
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      window.addEventListener('resize', function (e) {
        _this.width = window.innerWidth;
        _this.height = window.innerHeight;
      });
    }
  }]);

  return LayoutManager;
})();

var layoutManager = new LayoutManager();

module.exports = layoutManager;

},{}],102:[function(require,module,exports){
/**
 * Basic Math Utilities
 */
"use strict";

var utils = {

  /**
   * Normalize:
   * Calculates a percent (btwn 0 and 1) that a value
   * represents between a minimum and maximum value
   *
   * - Can handle when max is less than min
   * - Can handle negative numbers
   * - Can handle when val is greater or less than max / min
   */
  norm: function norm(val, min, max) {
    return (val - min) / (max - min);
  },

  /**
   * Lerp (Linear Interpolation):
   * Takes a normalized number / percentage (between 0 and 1)
   * and returns the value of it between a range of min and max
   */
  lerp: function lerp(norm, min, max) {
    return (max - min) * norm + min;
  },

  /**
   * Map:
   * Converts a value in one range into
   * the corresponding value in another range
   */
  map: function map(val, sourceMin, sourceMax, destMin, destMax) {
    return this.lerp(this.norm(val, sourceMin, sourceMax), destMin, destMax);
  },

  /**
   * Clamp:
   * Forces value into range if it is
   * greater than max or less than min
   *
   * - Achieved by calculating the maximum of val and min,
   * then calculating the minimum of what was returned and max
   * - Updated function uses second Math.min / Math.max calls
   * so the function still works when min is greater than max
   * (good for negative numbers, etc)
   */
  clamp: function clamp(val, min, max) {
    // return Math.min(Math.max(val, min), max);
    return Math.min(Math.max(val, Math.min(min, max)), Math.max(min, max));
  },

  /**
   * Distance:
   * Calculates distance between two x,y points by using
   * Pythagoan Theorum to get the hypotenuse.
   */
  distance: function distance(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  },

  /**
   * Circle Collision:
   * Given two circles, c0 and c1, calculates if distance between
   * them is greater or less than the sum of their radii
   */
  circleCollision: function circleCollision(c0, c1) {
    return this.distance(c0.x, c0.y, c1.x, c1.y) <= c0.radius + c1.radius;
  },

  /**
   * Circle / Point Collision:
   * Calculates if distance between point and circle is less than radius
   */
  circlePointCollision: function circlePointCollision(x, y, circle) {
    return this.distance(circle.x, circle.y, x, y) <= circle.radius;
  },

  /**
   * Point in Rectangle:
   * Calculates if point is in a rectangle based on rectangle's
   * x,y coords, width, and height
   */
  pointInRect: function pointInRect(x, y, rect) {
    return this.inRange(x, rect.x, rect.x + rect.width) && this.inRange(y, rect.y, rect.y + rect.height);
  },

  /**
   * In Range:
   * Calcuates if value is between min and max
   * - Using Math.min & Math.max, min can be larger
   * than max and vice versa (useful for when width/height
   * of a rectangle are negative values)
   */
  inRange: function inRange(val, min, max) {
    return val >= Math.min(min, max) && val <= Math.max(min, max);
  },

  /**
   * Range Intersect:
   * Calculates if there is any overlap between two ranges
   * - Useful for calculating if two rectangles are overlapping
   * - Updated function wraps everything in Math.min / Math.max
   * so that mins can be larger than maxes and vise versa
   */
  rangeIntersect: function rangeIntersect(min0, max0, min1, max1) {
    // return max0 >= min1 && min0 <= max1;
    return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
  },

  /**
   * Rectangle Intersect
   * Calculates if two rectangles intersect one another by
   * comparing the ranges with rangeIntersect function
   */
  rectIntersect: function rectIntersect(r0, r1) {
    return this.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) && this.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
  },

  /**
   * randomRange:
   * Calculates a random number between given range
   * - Works with negative numbers (ex: get random number btwn -10 and 10)
   */
  randomRange: function randomRange(min, max) {
    return min + Math.random() * (max - min);
  },

  /**
   * randomInt:
   * Calculates a random integer between given range
   */
  randomInt: function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  },

  /**
   * Random Distribution:
   * Returns a weighted random number based on the number of
   * iterations (the higher the iterations, the higher the
   * chance that the number returned will be in the middle
   * of the range).
   */
  randomDist: function randomDist(min, max, iterations) {
    var total = 0;

    for (var i = 0; i < iterations; i++) {
      total += this.randomRange(min, max);
    }

    return total / iterations;
  },

  roundToPlaces: function roundToPlaces(value, places) {
    var mult = Math.pow(10, places);
    return Math.round(value * mult) / mult;
  },

  roundNearest: function roundNearest(value, nearest) {
    return Math.round(value / nearest) * nearest;
  },

  /**
   * Degrees to Radians:
   * Calculates radians from degrees
   */
  degreesToRads: function degreesToRads(degrees) {
    return degrees / 180 * Math.PI;
  },

  /**
   * Radians to Degrees:
   * Calculates degrees from radians
   */
  radsToDegrees: function radsToDegrees(radians) {
    return radians * 180 / Math.PI;
  },

  /**
   * RotateTo:
   * Takes a point in space and rotates it by
   * an angle around space's center (0,0) coord.
   *
   * - You could rotate it around a different
   * point by modifying point's (x,y) to reflect
   * a different center coordinate.
   */
  rotateTo: function rotateTo(p0, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    var p1 = {
      x: p0.x * cos - p0.y * sin,
      y: p0.y * cos + p0.x * sin
    };
    return p1;
  },

  /**
   * Quadratic Bezier Curve:
   * Two end points and one control point inbetween.
   * Standard function for computing quadratic
   * bezier curves. Basically just a super simplified
   * combination of linear interpolations
   */
  quadraticBezier: function quadraticBezier(p0, p1, p2, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
    pFinal.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
    return pFinal;
  },

  /**
   * Cubic Bezier Curve:
   * Two end points and two control point inbetween.
   */
  cubicBezier: function cubicBezier(p0, p1, p2, p3, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x = Math.pow(1 - t, 3) * p0.x + Math.pow(1 - t, 2) * 3 * t * p1.x + (1 - t) * 3 * t * t * p2.x + t * t * t * p3.x;
    pFinal.y = Math.pow(1 - t, 3) * p0.y + Math.pow(1 - t, 2) * 3 * t * p1.y + (1 - t) * 3 * t * t * p2.y + t * t * t * p3.y;
    return pFinal;
  },

  /**
   * Multi Curve Draw:
   * Draws a series of connected quadratic curves. Gives
   * the illusion of being a bezier curve with many mid-points
   * but not actually 100% accurate. Often good enough though.
   */
  multicurve: function multicurve(points, context) {
    var p0, p1, midx, midy;

    context.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length - 2; i += 1) {
      p0 = points[i];
      p1 = points[i + 1];
      midx = (p0.x + p1.x) / 2;
      midy = (p0.y + p1.y) / 2;
      context.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    p0 = points[points.length - 2];
    p1 = points[points.length - 1];
    context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
  }

};

module.exports = utils;

},{}]},{},[100])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbGliL3BvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuYXJyYXktbWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuYXNzZXJ0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi1zdHJvbmcuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmNvbGxlY3Rpb24tdG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuY29sbGVjdGlvbi13ZWFrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jb2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5jdHguanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmRlZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5mb3Itb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmZ3LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5nZXQtbmFtZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuaXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLml0ZXIuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQubWl4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5vd24ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucGFydGlhbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnJlcGxhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zYW1lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcGFkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC5zdHJpbmctcmVwZWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50YXNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvJC50aHJvd3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQudW5zY29wZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzLyQud2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM1LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmNvcHktd2l0aGluLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmluZC1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkub2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLnN0YXRpY3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN0YXJ0cy13aXRoLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLXNldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hcnJheS5pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudG8tYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVnZXhwLmVzY2FwZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zZXQudG8tanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcuYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLmxwYWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnJwYWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9qcy5hcnJheS5zdGF0aWNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvYmFiZWwtY29yZS9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5pbW1lZGlhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9iYWJlbC1jb3JlL25vZGVfbW9kdWxlcy9jb3JlLWpzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2JhYmVsLWNvcmUvcG9seWZpbGwuanMiLCJub2RlX21vZHVsZXMvYmFiZWxpZnkvcG9seWZpbGwuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiL1VzZXJzL2V0aGFuY2xpbmUvbGVhcm5pbmcvY2FudmFzLWRvdHMvcHVibGljL2Fzc2V0cy9qcy91c2VyL0JvYXJkLmpzIiwiL1VzZXJzL2V0aGFuY2xpbmUvbGVhcm5pbmcvY2FudmFzLWRvdHMvcHVibGljL2Fzc2V0cy9qcy91c2VyL0dhbWVFbGVtZW50cy9Eb3QuanMiLCIvVXNlcnMvZXRoYW5jbGluZS9sZWFybmluZy9jYW52YXMtZG90cy9wdWJsaWMvYXNzZXRzL2pzL3VzZXIvR2FtZVZpZXcuanMiLCIvVXNlcnMvZXRoYW5jbGluZS9sZWFybmluZy9jYW52YXMtZG90cy9wdWJsaWMvYXNzZXRzL2pzL3VzZXIvUmVuZGVyZXIuanMiLCIvVXNlcnMvZXRoYW5jbGluZS9sZWFybmluZy9jYW52YXMtZG90cy9wdWJsaWMvYXNzZXRzL2pzL3VzZXIvVmVjdG9yLmpzIiwiL1VzZXJzL2V0aGFuY2xpbmUvbGVhcm5pbmcvY2FudmFzLWRvdHMvcHVibGljL2Fzc2V0cy9qcy91c2VyL2FwcC5qcyIsIi9Vc2Vycy9ldGhhbmNsaW5lL2xlYXJuaW5nL2NhbnZhcy1kb3RzL3B1YmxpYy9hc3NldHMvanMvdXNlci9sYXlvdXRNYW5hZ2VyLmpzIiwiL1VzZXJzL2V0aGFuY2xpbmUvbGVhcm5pbmcvY2FudmFzLWRvdHMvcHVibGljL2Fzc2V0cy9qcy91c2VyL3V0aWxzL21hdGhVdGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q3RCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwQixVQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUM3QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQ3RCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwQixXQUFPLE1BQU0sQ0FBQztHQUNmOzs7Ozs7QUFNRCxhQUFXLEVBQUUscUJBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUU7QUFDL0MsVUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDdEIsVUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FDakMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FDMUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixVQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUNqQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUMxQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLFdBQU8sTUFBTSxDQUFDO0dBQ2Y7Ozs7Ozs7O0FBUUQsWUFBVSxFQUFFLG9CQUFTLE1BQU0sRUFBRSxPQUFPLEVBQUU7QUFDcEMsUUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7O0FBRXZCLFdBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXpDLFNBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLFFBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZixRQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQixVQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUEsR0FBSSxDQUFDLENBQUM7QUFDekIsVUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBLEdBQUksQ0FBQyxDQUFDO0FBQ3pCLGFBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2xEO0FBQ0QsTUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQy9CLE1BQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvQixXQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ2xEOztDQUdGLENBQUM7O0FBR0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnJlcXVpcmUoXCJjb3JlLWpzL3NoaW1cIik7XG5cbnJlcXVpcmUoXCJyZWdlbmVyYXRvci9ydW50aW1lXCIpO1xuXG5pZiAoZ2xvYmFsLl9iYWJlbFBvbHlmaWxsKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIm9ubHkgb25lIGluc3RhbmNlIG9mIGJhYmVsL3BvbHlmaWxsIGlzIGFsbG93ZWRcIik7XG59XG5nbG9iYWwuX2JhYmVsUG9seWZpbGwgPSB0cnVlO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aVlXSmxiR2xtZVM5dWIyUmxYMjF2WkhWc1pYTXZZbUZpWld3dFkyOXlaUzlzYVdJdmNHOXNlV1pwYkd3dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SmNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVjbVZ4ZFdseVpTaGNJbU52Y21VdGFuTXZjMmhwYlZ3aUtUdGNibHh1Y21WeGRXbHlaU2hjSW5KbFoyVnVaWEpoZEc5eUwzSjFiblJwYldWY0lpazdYRzVjYm1sbUlDaG5iRzlpWVd3dVgySmhZbVZzVUc5c2VXWnBiR3dwSUh0Y2JpQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtGd2liMjVzZVNCdmJtVWdhVzV6ZEdGdVkyVWdiMllnWW1GaVpXd3ZjRzlzZVdacGJHd2dhWE1nWVd4c2IzZGxaRndpS1R0Y2JuMWNibWRzYjJKaGJDNWZZbUZpWld4UWIyeDVabWxzYkNBOUlIUnlkV1U3SWwxOSIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9ICQudG9PYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9ICQudG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyICQgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3R4ID0gcmVxdWlyZSgnLi8kLmN0eCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUWVBFKXtcbiAgdmFyIElTX01BUCAgICAgICAgPSBUWVBFID09IDFcbiAgICAsIElTX0ZJTFRFUiAgICAgPSBUWVBFID09IDJcbiAgICAsIElTX1NPTUUgICAgICAgPSBUWVBFID09IDNcbiAgICAsIElTX0VWRVJZICAgICAgPSBUWVBFID09IDRcbiAgICAsIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDZcbiAgICAsIE5PX0hPTEVTICAgICAgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCgkdGhpcykpXG4gICAgICAsIHNlbGYgICA9ICQuRVM1T2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSAkLnRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IEFycmF5KGxlbmd0aCkgOiBJU19GSUxURVIgPyBbXSA6IHVuZGVmaW5lZFxuICAgICAgLCB2YWwsIHJlcztcbiAgICBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpe1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYoVFlQRSl7XG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmKHJlcylzd2l0Y2goVFlQRSl7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59OyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtc2cxLCBtc2cyKXtcbiAgaWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMiA/IG1zZzEgKyBtc2cyIDogbXNnMSk7XG59XG5hc3NlcnQuZGVmID0gJC5hc3NlcnREZWZpbmVkO1xuYXNzZXJ0LmZuID0gZnVuY3Rpb24oaXQpe1xuICBpZighJC5pc0Z1bmN0aW9uKGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuYXNzZXJ0Lm9iaiA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoISQuaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbmFzc2VydC5pbnN0ID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcbiAgcmV0dXJuIGl0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gYXNzZXJ0OyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZW51bUtleXMgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJyk7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHZhciBUID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKVxuICAgICwgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGkgPSAxO1xuICB3aGlsZShsID4gaSl7XG4gICAgdmFyIFMgICAgICA9ICQuRVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKVxuICAgICAgLCBrZXlzICAgPSBlbnVtS2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn07IiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBUQUcgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAsIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5mdW5jdGlvbiBjb2YoaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufVxuY29mLmNsYXNzb2YgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBUO1xuICByZXR1cm4gaXQgPT0gdW5kZWZpbmVkID8gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogJ051bGwnXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVCA6IGNvZihPKTtcbn07XG5jb2Yuc2V0ID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICEkLmhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkkLmhpZGUoaXQsIFRBRywgdGFnKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGNvZjsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgc2FmZSAgICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZVxuICAsIGFzc2VydCAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzdGVwICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyJykuc3RlcFxuICAsICRoYXMgICAgID0gJC5oYXNcbiAgLCBzZXQgICAgICA9ICQuc2V0XG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gICwgaGlkZSAgICAgPSAkLmhpZGVcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgSUQgICAgICAgPSBzYWZlKCdpZCcpXG4gICwgTzEgICAgICAgPSBzYWZlKCdPMScpXG4gICwgTEFTVCAgICAgPSBzYWZlKCdsYXN0JylcbiAgLCBGSVJTVCAgICA9IHNhZmUoJ2ZpcnN0JylcbiAgLCBJVEVSICAgICA9IHNhZmUoJ2l0ZXInKVxuICAsIFNJWkUgICAgID0gJC5ERVNDID8gc2FmZSgnc2l6ZScpIDogJ3NpemUnXG4gICwgaWQgICAgICAgPSAwO1xuXG5mdW5jdGlvbiBmYXN0S2V5KGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoISRoYXMoaXQsIElEKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IGlkIHRvIGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIGlkXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG9iamVjdCBpZFxuICAgIGhpZGUoaXQsIElELCArK2lkKTtcbiAgLy8gcmV0dXJuIG9iamVjdCBpZCB3aXRoIHByZWZpeFxuICB9IHJldHVybiAnTycgKyBpdFtJRF07XG59XG5cbmZ1bmN0aW9uIGdldEVudHJ5KHRoYXQsIGtleSl7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSksIGVudHJ5O1xuICBpZihpbmRleCAhPT0gJ0YnKXJldHVybiB0aGF0W08xXVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0W0ZJUlNUXTsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFzc2VydC5pbnN0KHRoYXQsIEMsIE5BTUUpO1xuICAgICAgc2V0KHRoYXQsIE8xLCAkLmNyZWF0ZShudWxsKSk7XG4gICAgICBzZXQodGhhdCwgU0laRSwgMCk7XG4gICAgICBzZXQodGhhdCwgTEFTVCwgdW5kZWZpbmVkKTtcbiAgICAgIHNldCh0aGF0LCBGSVJTVCwgdW5kZWZpbmVkKTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVxdWlyZSgnLi8kLm1peCcpKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0W08xXSwgZW50cnkgPSB0aGF0W0ZJUlNUXTsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYoZW50cnkucCllbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXRbRklSU1RdID0gdGhhdFtMQVNUXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0W08xXVtlbnRyeS5pXTtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZihwcmV2KXByZXYubiA9IG5leHQ7XG4gICAgICAgICAgaWYobmV4dCluZXh0LnAgPSBwcmV2O1xuICAgICAgICAgIGlmKHRoYXRbRklSU1RdID09IGVudHJ5KXRoYXRbRklSU1RdID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0W0xBU1RdID09IGVudHJ5KXRoYXRbTEFTVF0gPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdLCAzKVxuICAgICAgICAgICwgZW50cnk7XG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpc1tGSVJTVF0pe1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoJC5ERVNDKSQuc2V0RGVzYyhDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBhc3NlcnQuZGVmKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdFtMQVNUXSA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXRbTEFTVF0sICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXRbRklSU1RdKXRoYXRbRklSU1RdID0gZW50cnk7XG4gICAgICBpZihwcmV2KXByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZihpbmRleCAhPT0gJ0YnKXRoYXRbTzFdW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgc2V0SXRlcjogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICByZXF1aXJlKCcuLyQuaXRlci1kZWZpbmUnKShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICBzZXQodGhpcywgSVRFUiwge286IGl0ZXJhdGVkLCBrOiBraW5kfSk7XG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBpdGVyICA9IHRoaXNbSVRFUl1cbiAgICAgICAgLCBraW5kICA9IGl0ZXIua1xuICAgICAgICAsIGVudHJ5ID0gaXRlci5sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighaXRlci5vIHx8ICEoaXRlci5sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiBpdGVyLm9bRklSU1RdKSl7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIGl0ZXIubyA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBmb3JPZiA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gICRkZWYoJGRlZi5QLCBOQU1FLCB7XG4gICAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgIGZvck9mKHRoaXMsIGZhbHNlLCBhcnIucHVzaCwgYXJyKTtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgc2FmZSAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmVcbiAgLCBhc3NlcnQgICAgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JylcbiAgLCBmb3JPZiAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCAkaGFzICAgICAgPSAkLmhhc1xuICAsIGlzT2JqZWN0ICA9ICQuaXNPYmplY3RcbiAgLCBoaWRlICAgICAgPSAkLmhpZGVcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgaWQgICAgICAgID0gMFxuICAsIElEICAgICAgICA9IHNhZmUoJ2lkJylcbiAgLCBXRUFLICAgICAgPSBzYWZlKCd3ZWFrJylcbiAgLCBMRUFLICAgICAgPSBzYWZlKCdsZWFrJylcbiAgLCBtZXRob2QgICAgPSByZXF1aXJlKCcuLyQuYXJyYXktbWV0aG9kcycpXG4gICwgZmluZCAgICAgID0gbWV0aG9kKDUpXG4gICwgZmluZEluZGV4ID0gbWV0aG9kKDYpO1xuZnVuY3Rpb24gZmluZEZyb3plbihzdG9yZSwga2V5KXtcbiAgcmV0dXJuIGZpbmQoc3RvcmUuYXJyYXksIGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgfSk7XG59XG4vLyBmYWxsYmFjayBmb3IgZnJvemVuIGtleXNcbmZ1bmN0aW9uIGxlYWtTdG9yZSh0aGF0KXtcbiAgcmV0dXJuIHRoYXRbTEVBS10gfHwgaGlkZSh0aGF0LCBMRUFLLCB7XG4gICAgYXJyYXk6IFtdLFxuICAgIGdldDogZnVuY3Rpb24oa2V5KXtcbiAgICAgIHZhciBlbnRyeSA9IGZpbmRGcm96ZW4odGhpcywga2V5KTtcbiAgICAgIGlmKGVudHJ5KXJldHVybiBlbnRyeVsxXTtcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oa2V5KXtcbiAgICAgIHJldHVybiAhIWZpbmRGcm96ZW4odGhpcywga2V5KTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICB2YXIgZW50cnkgPSBmaW5kRnJvemVuKHRoaXMsIGtleSk7XG4gICAgICBpZihlbnRyeSllbnRyeVsxXSA9IHZhbHVlO1xuICAgICAgZWxzZSB0aGlzLmFycmF5LnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICB9LFxuICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgdmFyIGluZGV4ID0gZmluZEluZGV4KHRoaXMuYXJyYXksIGZ1bmN0aW9uKGl0KXtcbiAgICAgICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gICAgICB9KTtcbiAgICAgIGlmKH5pbmRleCl0aGlzLmFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gISF+aW5kZXg7XG4gICAgfVxuICB9KVtMRUFLXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgJC5zZXQoYXNzZXJ0Lmluc3QodGhhdCwgQywgTkFNRSksIElELCBpZCsrKTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVxdWlyZSgnLi8kLm1peCcpKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4zLjMuMiBXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuNC4zLjMgV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIGlmKCFpc09iamVjdChrZXkpKXJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIWlzRXh0ZW5zaWJsZShrZXkpKXJldHVybiBsZWFrU3RvcmUodGhpcylbJ2RlbGV0ZSddKGtleSk7XG4gICAgICAgIHJldHVybiAkaGFzKGtleSwgV0VBSykgJiYgJGhhcyhrZXlbV0VBS10sIHRoaXNbSURdKSAmJiBkZWxldGUga2V5W1dFQUtdW3RoaXNbSURdXTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4zLjMuNCBXZWFrTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuNC4zLjQgV2Vha1NldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighaXNFeHRlbnNpYmxlKGtleSkpcmV0dXJuIGxlYWtTdG9yZSh0aGlzKS5oYXMoa2V5KTtcbiAgICAgICAgcmV0dXJuICRoYXMoa2V5LCBXRUFLKSAmJiAkaGFzKGtleVtXRUFLXSwgdGhpc1tJRF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFpc0V4dGVuc2libGUoYXNzZXJ0Lm9iaihrZXkpKSl7XG4gICAgICBsZWFrU3RvcmUodGhhdCkuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkaGFzKGtleSwgV0VBSykgfHwgaGlkZShrZXksIFdFQUssIHt9KTtcbiAgICAgIGtleVtXRUFLXVt0aGF0W0lEXV0gPSB2YWx1ZTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBsZWFrU3RvcmU6IGxlYWtTdG9yZSxcbiAgV0VBSzogV0VBSyxcbiAgSUQ6IElEXG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBCVUdHWSA9IHJlcXVpcmUoJy4vJC5pdGVyJykuQlVHR1lcbiAgLCBmb3JPZiA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHNwZWNpZXMgPSByZXF1aXJlKCcuLyQuc3BlY2llcycpXG4gICwgYXNzZXJ0SW5zdGFuY2UgPSByZXF1aXJlKCcuLyQuYXNzZXJ0JykuaW5zdDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSyl7XG4gIHZhciBCYXNlICA9ICQuZ1tOQU1FXVxuICAgICwgQyAgICAgPSBCYXNlXG4gICAgLCBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCdcbiAgICAsIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZVxuICAgICwgTyAgICAgPSB7fTtcbiAgZnVuY3Rpb24gZml4TWV0aG9kKEtFWSl7XG4gICAgdmFyIGZuID0gcHJvdG9bS0VZXTtcbiAgICByZXF1aXJlKCcuLyQucmVkZWYnKShwcm90bywgS0VZLFxuICAgICAgS0VZID09ICdkZWxldGUnID8gZnVuY3Rpb24oYSl7IHJldHVybiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7IH1cbiAgICAgIDogS0VZID09ICdoYXMnID8gZnVuY3Rpb24gaGFzKGEpeyByZXR1cm4gZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpOyB9XG4gICAgICA6IEtFWSA9PSAnZ2V0JyA/IGZ1bmN0aW9uIGdldChhKXsgcmV0dXJuIGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgfVxuICAgICAgOiBLRVkgPT0gJ2FkZCcgPyBmdW5jdGlvbiBhZGQoYSl7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgcmV0dXJuIHRoaXM7IH1cbiAgICAgIDogZnVuY3Rpb24gc2V0KGEsIGIpeyBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSwgYik7IHJldHVybiB0aGlzOyB9XG4gICAgKTtcbiAgfVxuICBpZighJC5pc0Z1bmN0aW9uKEMpIHx8ICEoSVNfV0VBSyB8fCAhQlVHR1kgJiYgcHJvdG8uZm9yRWFjaCAmJiBwcm90by5lbnRyaWVzKSl7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlcXVpcmUoJy4vJC5taXgnKShDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluc3QgID0gbmV3IENcbiAgICAgICwgY2hhaW4gPSBpbnN0W0FEREVSXShJU19XRUFLID8ge30gOiAtMCwgMSlcbiAgICAgICwgYnVnZ3laZXJvO1xuICAgIC8vIHdyYXAgZm9yIGluaXQgY29sbGVjdGlvbnMgZnJvbSBpdGVyYWJsZVxuICAgIGlmKCFyZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgbmV3IEMoaXRlcik7IH0pKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgICBhc3NlcnRJbnN0YW5jZSh0YXJnZXQsIEMsIE5BTUUpO1xuICAgICAgICB2YXIgdGhhdCA9IG5ldyBCYXNlO1xuICAgICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgIH0pO1xuICAgICAgQy5wcm90b3R5cGUgPSBwcm90bztcbiAgICAgIHByb3RvLmNvbnN0cnVjdG9yID0gQztcbiAgICB9XG4gICAgSVNfV0VBSyB8fCBpbnN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXkpe1xuICAgICAgYnVnZ3laZXJvID0gMSAvIGtleSA9PT0gLUluZmluaXR5O1xuICAgIH0pO1xuICAgIC8vIGZpeCBjb252ZXJ0aW5nIC0wIGtleSB0byArMFxuICAgIGlmKGJ1Z2d5WmVybyl7XG4gICAgICBmaXhNZXRob2QoJ2RlbGV0ZScpO1xuICAgICAgZml4TWV0aG9kKCdoYXMnKTtcbiAgICAgIElTX01BUCAmJiBmaXhNZXRob2QoJ2dldCcpO1xuICAgIH1cbiAgICAvLyArIGZpeCAuYWRkICYgLnNldCBmb3IgY2hhaW5pbmdcbiAgICBpZihidWdneVplcm8gfHwgY2hhaW4gIT09IGluc3QpZml4TWV0aG9kKEFEREVSKTtcbiAgfVxuXG4gIHJlcXVpcmUoJy4vJC5jb2YnKS5zZXQoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogKEMgIT0gQmFzZSksIE8pO1xuICBzcGVjaWVzKEMpO1xuICBzcGVjaWVzKCQuY29yZVtOQU1FXSk7IC8vIGZvciB3cmFwcGVyXG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldEl0ZXIoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07IiwiLy8gT3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYXNzZXJ0RnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYXNzZXJ0JykuZm47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhc3NlcnRGdW5jdGlvbihmbik7XG4gIGlmKH5sZW5ndGggJiYgdGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH0gcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgPSAkLmdcbiAgLCBjb3JlICAgICAgID0gJC5jb3JlXG4gICwgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvblxuICAsICRyZWRlZiAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKTtcbmZ1bmN0aW9uIGN0eChmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufVxuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5mdW5jdGlvbiAkZGVmKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pLnByb3RvdHlwZVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIGVsc2UgZXhwID0gaXNQcm90byAmJiBpc0Z1bmN0aW9uKG91dCkgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYodGFyZ2V0ICYmICFvd24pJHJlZGVmKHRhcmdldCwga2V5LCBvdXQpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpJC5oaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzLnByb3RvdHlwZSB8fCAoZXhwb3J0cy5wcm90b3R5cGUgPSB7fSkpW2tleV0gPSBvdXQ7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gJGRlZjsiLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGRvY3VtZW50ID0gJC5nLmRvY3VtZW50XG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldEtleXMoaXQpXG4gICAgLCBnZXREZXNjICAgID0gJC5nZXREZXNjXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzO1xuICBpZihnZXRTeW1ib2xzKSQuZWFjaC5jYWxsKGdldFN5bWJvbHMoaXQpLCBmdW5jdGlvbihrZXkpe1xuICAgIGlmKGdldERlc2MoaXQsIGtleSkuZW51bWVyYWJsZSlrZXlzLnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiBrZXlzO1xufTsiLCJ2YXIgY3R4ICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGdldCAgPSByZXF1aXJlKCcuLyQuaXRlcicpLmdldFxuICAsIGNhbGwgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCl7XG4gIHZhciBpdGVyYXRvciA9IGdldChpdGVyYWJsZSlcbiAgICAsIGYgICAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBzdGVwO1xuICB3aGlsZSghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpe1xuICAgIGlmKGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpID09PSBmYWxzZSl7XG4gICAgICByZXR1cm4gY2FsbC5jbG9zZShpdGVyYXRvcik7XG4gICAgfVxuICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJCl7XG4gICQuRlcgICA9IHRydWU7XG4gICQucGF0aCA9ICQuZztcbiAgcmV0dXJuICQ7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcclxudmFyICQgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgdG9TdHJpbmcgPSB7fS50b1N0cmluZ1xyXG4gICwgZ2V0TmFtZXMgPSAkLmdldE5hbWVzO1xyXG5cclxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xyXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xyXG5cclxuZnVuY3Rpb24gZ2V0V2luZG93TmFtZXMoaXQpe1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gZ2V0TmFtZXMoaXQpO1xyXG4gIH0gY2F0Y2goZSl7XHJcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmdldCA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xyXG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XHJcbiAgcmV0dXJuIGdldE5hbWVzKCQudG9PYmplY3QoaXQpKTtcclxufTsiLCIvLyBGYXN0IGFwcGx5XG4vLyBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgY2FzZSA1OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTsiLCJ2YXIgYXNzZXJ0T2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLm9iajtcbmZ1bmN0aW9uIGNsb3NlKGl0ZXJhdG9yKXtcbiAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgaWYocmV0ICE9PSB1bmRlZmluZWQpYXNzZXJ0T2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG59XG5mdW5jdGlvbiBjYWxsKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYXNzZXJ0T2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICB9IGNhdGNoKGUpe1xuICAgIGNsb3NlKGl0ZXJhdG9yKTtcbiAgICB0aHJvdyBlO1xuICB9XG59XG5jYWxsLmNsb3NlID0gY2xvc2U7XG5tb2R1bGUuZXhwb3J0cyA9IGNhbGw7IiwidmFyICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgJCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkaXRlciAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXG4gICwgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgRkZfSVRFUkFUT1IgICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgID0gJ3ZhbHVlcydcbiAgLCBJdGVyYXRvcnMgICAgICAgPSAkaXRlci5JdGVyYXRvcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgJGl0ZXIuY3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgZnVuY3Rpb24gY3JlYXRlTWV0aG9kKGtpbmQpe1xuICAgIGZ1bmN0aW9uICQkKHRoYXQpe1xuICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGF0LCBraW5kKTtcbiAgICB9XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gJCQodGhpcyk7IH07XG4gIH1cbiAgdmFyIFRBRyAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBwcm90byAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCBfbmF0aXZlICA9IHByb3RvW1NZTUJPTF9JVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsIF9kZWZhdWx0ID0gX25hdGl2ZSB8fCBjcmVhdGVNZXRob2QoREVGQVVMVClcbiAgICAsIG1ldGhvZHMsIGtleTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZihfbmF0aXZlKXtcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSAkLmdldFByb3RvKF9kZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgY29mLnNldChJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAvLyBGRiBmaXhcbiAgICBpZigkLkZXICYmICQuaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpJGl0ZXIuc2V0KEl0ZXJhdG9yUHJvdG90eXBlLCAkLnRoYXQpO1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigkLkZXIHx8IEZPUkNFKSRpdGVyLnNldChwcm90bywgX2RlZmF1bHQpO1xuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IF9kZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSAkLnRoYXQ7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKEtFWVMpLFxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqICRpdGVyLkJVR0dZLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxufTsiLCJ2YXIgU1lNQk9MX0lURVJBVE9SID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HICAgID0gZmFsc2U7XG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bU1lNQk9MX0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIGlmKCFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbU1lNQk9MX0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltTWU1CT0xfSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNvZiAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgY2xhc3NvZiAgICAgICAgICAgPSBjb2YuY2xhc3NvZlxuICAsIGFzc2VydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgYXNzZXJ0T2JqZWN0ICAgICAgPSBhc3NlcnQub2JqXG4gICwgU1lNQk9MX0lURVJBVE9SICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBGRl9JVEVSQVRPUiAgICAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEl0ZXJhdG9ycyAgICAgICAgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCdpdGVyYXRvcnMnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuc2V0SXRlcmF0b3IoSXRlcmF0b3JQcm90b3R5cGUsICQudGhhdCk7XG5mdW5jdGlvbiBzZXRJdGVyYXRvcihPLCB2YWx1ZSl7XG4gICQuaGlkZShPLCBTWU1CT0xfSVRFUkFUT1IsIHZhbHVlKTtcbiAgLy8gQWRkIGl0ZXJhdG9yIGZvciBGRiBpdGVyYXRvciBwcm90b2NvbFxuICBpZihGRl9JVEVSQVRPUiBpbiBbXSkkLmhpZGUoTywgRkZfSVRFUkFUT1IsIHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgQlVHR1k6ICdrZXlzJyBpbiBbXSAmJiAhKCduZXh0JyBpbiBbXS5rZXlzKCkpLFxuICBJdGVyYXRvcnM6IEl0ZXJhdG9ycyxcbiAgc3RlcDogZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICAgIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xuICB9LFxuICBpczogZnVuY3Rpb24oaXQpe1xuICAgIHZhciBPICAgICAgPSBPYmplY3QoaXQpXG4gICAgICAsIFN5bWJvbCA9ICQuZy5TeW1ib2w7XG4gICAgcmV0dXJuIChTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SKSBpbiBPXG4gICAgICB8fCBTWU1CT0xfSVRFUkFUT1IgaW4gT1xuICAgICAgfHwgJC5oYXMoSXRlcmF0b3JzLCBjbGFzc29mKE8pKTtcbiAgfSxcbiAgZ2V0OiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIFN5bWJvbCA9ICQuZy5TeW1ib2xcbiAgICAgICwgZ2V0SXRlcjtcbiAgICBpZihpdCAhPSB1bmRlZmluZWQpe1xuICAgICAgZ2V0SXRlciA9IGl0W1N5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgRkZfSVRFUkFUT1JdXG4gICAgICAgIHx8IGl0W1NZTUJPTF9JVEVSQVRPUl1cbiAgICAgICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbiAgICB9XG4gICAgYXNzZXJ0KCQuaXNGdW5jdGlvbihnZXRJdGVyKSwgaXQsICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAgIHJldHVybiBhc3NlcnRPYmplY3QoZ2V0SXRlci5jYWxsKGl0KSk7XG4gIH0sXG4gIHNldDogc2V0SXRlcmF0b3IsXG4gIGNyZWF0ZTogZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQsIHByb3RvKXtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShwcm90byB8fCBJdGVyYXRvclByb3RvdHlwZSwge25leHQ6ICQuZGVzYygxLCBuZXh0KX0pO1xuICAgIGNvZi5zZXQoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKClcbiAgLCBjb3JlICAgPSB7fVxuICAsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICwgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eVxuICAsIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yXG4gICwgbWF4ICAgPSBNYXRoLm1heFxuICAsIG1pbiAgID0gTWF0aC5taW47XG4vLyBUaGUgZW5naW5lIHdvcmtzIGZpbmUgd2l0aCBkZXNjcmlwdG9ycz8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eS5cbnZhciBERVNDID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gMjsgfX0pLmEgPT0gMjtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xudmFyIGhpZGUgPSBjcmVhdGVEZWZpbmVyKDEpO1xuLy8gNy4xLjQgVG9JbnRlZ2VyXG5mdW5jdGlvbiB0b0ludGVnZXIoaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn1cbmZ1bmN0aW9uIGRlc2MoYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufVxuZnVuY3Rpb24gc2ltcGxlU2V0KG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59XG5mdW5jdGlvbiBjcmVhdGVEZWZpbmVyKGJpdG1hcCl7XG4gIHJldHVybiBERVNDID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBkZXNjKGJpdG1hcCwgdmFsdWUpKTtcbiAgfSA6IHNpbXBsZVNldDtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoaXQpe1xuICByZXR1cm4gaXQgIT09IG51bGwgJiYgKHR5cGVvZiBpdCA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZChpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn1cblxudmFyICQgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5mdycpKHtcbiAgZzogZ2xvYmFsLFxuICBjb3JlOiBjb3JlLFxuICBodG1sOiBnbG9iYWwuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAvLyBodHRwOi8vanNwZXJmLmNvbS9jb3JlLWpzLWlzb2JqZWN0XG4gIGlzT2JqZWN0OiAgIGlzT2JqZWN0LFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICB0aGF0OiBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyA3LjEuNCBUb0ludGVnZXJcbiAgdG9JbnRlZ2VyOiB0b0ludGVnZXIsXG4gIC8vIDcuMS4xNSBUb0xlbmd0aFxuICB0b0xlbmd0aDogZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG4gIH0sXG4gIHRvSW5kZXg6IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICAgIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbiAgfSxcbiAgaGFzOiBmdW5jdGlvbihpdCwga2V5KXtcbiAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbiAgfSxcbiAgY3JlYXRlOiAgICAgT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBERVNDOiAgICAgICBERVNDLFxuICBkZXNjOiAgICAgICBkZXNjLFxuICBnZXREZXNjOiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICBkZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgIE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgYXNzZXJ0RGVmaW5lZDogYXNzZXJ0RGVmaW5lZCxcbiAgLy8gRHVtbXksIGZpeCBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZyBpbiBlczUgbW9kdWxlXG4gIEVTNU9iamVjdDogT2JqZWN0LFxuICB0b09iamVjdDogZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiAkLkVTNU9iamVjdChhc3NlcnREZWZpbmVkKGl0KSk7XG4gIH0sXG4gIGhpZGU6IGhpZGUsXG4gIGRlZjogY3JlYXRlRGVmaW5lcigwKSxcbiAgc2V0OiBnbG9iYWwuU3ltYm9sID8gc2ltcGxlU2V0IDogaGlkZSxcbiAgZWFjaDogW10uZm9yRWFjaFxufSk7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuaWYodHlwZW9mIF9fZSAhPSAndW5kZWZpbmVkJylfX2UgPSBjb3JlO1xuaWYodHlwZW9mIF9fZyAhPSAndW5kZWZpbmVkJylfX2cgPSBnbG9iYWw7IiwidmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSAkLnRvT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwidmFyICRyZWRlZiA9IHJlcXVpcmUoJy4vJC5yZWRlZicpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcclxuICBmb3IodmFyIGtleSBpbiBzcmMpJHJlZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XHJcbiAgcmV0dXJuIHRhcmdldDtcclxufTsiLCJ2YXIgJCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBhc3NlcnRPYmplY3QgPSByZXF1aXJlKCcuLyQuYXNzZXJ0Jykub2JqO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvd25LZXlzKGl0KXtcbiAgYXNzZXJ0T2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldE5hbWVzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgcmV0dXJuIGdldFN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBpbnZva2UgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBhc3NlcnRGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5mbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oLyogLi4ucGFyZ3MgKi8pe1xuICB2YXIgZm4gICAgID0gYXNzZXJ0RnVuY3Rpb24odGhpcylcbiAgICAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIHBhcmdzICA9IEFycmF5KGxlbmd0aClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIF8gICAgICA9ICQucGF0aC5fXG4gICAgLCBob2xkZXIgPSBmYWxzZTtcbiAgd2hpbGUobGVuZ3RoID4gaSlpZigocGFyZ3NbaV0gPSBhcmd1bWVudHNbaSsrXSkgPT09IF8paG9sZGVyID0gdHJ1ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHZhciB0aGF0ICAgID0gdGhpc1xuICAgICAgLCBfbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBqID0gMCwgayA9IDAsIGFyZ3M7XG4gICAgaWYoIWhvbGRlciAmJiAhX2xlbmd0aClyZXR1cm4gaW52b2tlKGZuLCBwYXJncywgdGhhdCk7XG4gICAgYXJncyA9IHBhcmdzLnNsaWNlKCk7XG4gICAgaWYoaG9sZGVyKWZvcig7bGVuZ3RoID4gajsgaisrKWlmKGFyZ3Nbal0gPT09IF8pYXJnc1tqXSA9IGFyZ3VtZW50c1trKytdO1xuICAgIHdoaWxlKF9sZW5ndGggPiBrKWFyZ3MucHVzaChhcmd1bWVudHNbaysrXSk7XG4gICAgcmV0dXJuIGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG59OyIsInZhciAkICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgdHBsID0gU3RyaW5nKHt9Lmhhc093blByb3BlcnR5KVxyXG4gICwgU1JDID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ3NyYycpXHJcbiAgLCBfdG9TdHJpbmcgPSBGdW5jdGlvbi50b1N0cmluZztcclxuXHJcbmZ1bmN0aW9uICRyZWRlZihPLCBrZXksIHZhbCwgc2FmZSl7XHJcbiAgaWYoJC5pc0Z1bmN0aW9uKHZhbCkpe1xyXG4gICAgdmFyIGJhc2UgPSBPW2tleV07XHJcbiAgICAkLmhpZGUodmFsLCBTUkMsIGJhc2UgPyBTdHJpbmcoYmFzZSkgOiB0cGwucmVwbGFjZSgvaGFzT3duUHJvcGVydHkvLCBTdHJpbmcoa2V5KSkpO1xyXG4gICAgaWYoISgnbmFtZScgaW4gdmFsKSl2YWwubmFtZSA9IGtleTtcclxuICB9XHJcbiAgaWYoTyA9PT0gJC5nKXtcclxuICAgIE9ba2V5XSA9IHZhbDtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYoIXNhZmUpZGVsZXRlIE9ba2V5XTtcclxuICAgICQuaGlkZShPLCBrZXksIHZhbCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9yc1xyXG4vLyB3aXRoIG1ldGhvZHMgc2ltaWxhciB0byBMb0Rhc2ggaXNOYXRpdmVcclxuJHJlZGVmKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcclxuICByZXR1cm4gJC5oYXModGhpcywgU1JDKSA/IHRoaXNbU1JDXSA6IF90b1N0cmluZy5jYWxsKHRoaXMpO1xyXG59KTtcclxuXHJcbiQuY29yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xyXG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChpdCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICRyZWRlZjsiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJlZ0V4cCwgcmVwbGFjZSwgaXNTdGF0aWMpe1xuICB2YXIgcmVwbGFjZXIgPSByZXBsYWNlID09PSBPYmplY3QocmVwbGFjZSkgPyBmdW5jdGlvbihwYXJ0KXtcbiAgICByZXR1cm4gcmVwbGFjZVtwYXJ0XTtcbiAgfSA6IHJlcGxhY2U7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIFN0cmluZyhpc1N0YXRpYyA/IGl0IDogdGhpcykucmVwbGFjZShyZWdFeHAsIHJlcGxhY2VyKTtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaXMgfHwgZnVuY3Rpb24gaXMoeCwgeSl7XHJcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XHJcbn07IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgYXNzZXJ0ID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpO1xuZnVuY3Rpb24gY2hlY2soTywgcHJvdG8pe1xuICBhc3NlcnQub2JqKE8pO1xuICBhc3NlcnQocHJvdG8gPT09IG51bGwgfHwgJC5pc09iamVjdChwcm90byksIHByb3RvLCBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICA/IGZ1bmN0aW9uKGJ1Z2d5LCBzZXQpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCAkLmdldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgICAgc2V0KHt9LCBbXSk7XG4gICAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgICByZXR1cm4gTztcbiAgICAgICAgfTtcbiAgICAgIH0oKVxuICAgIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsInZhciAkICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcclxuICAsIHN0b3JlICA9ICQuZ1tTSEFSRURdIHx8ICgkLmdbU0hBUkVEXSA9IHt9KTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xyXG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xyXG59OyIsInZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBTUEVDSUVTID0gcmVxdWlyZSgnLi8kLndrcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEMpe1xuICBpZigkLkRFU0MgJiYgIShTUEVDSUVTIGluIEMpKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogJC50aGF0XG4gIH0pO1xufTsiLCIvLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gJC50b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCIvLyBodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1zdHJhd21hbjpzdHJpbmdfcGFkZGluZ1xudmFyICQgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgcmVwZWF0ID0gcmVxdWlyZSgnLi8kLnN0cmluZy1yZXBlYXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBtaW5MZW5ndGgsIGZpbGxDaGFyLCBsZWZ0KXtcbiAgLy8gMS4gTGV0IE8gYmUgQ2hlY2tPYmplY3RDb2VyY2libGUodGhpcyB2YWx1ZSkuXG4gIC8vIDIuIExldCBTIGJlIFRvU3RyaW5nKE8pLlxuICB2YXIgUyA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhhdCkpO1xuICAvLyA0LiBJZiBpbnRNaW5MZW5ndGggaXMgdW5kZWZpbmVkLCByZXR1cm4gUy5cbiAgaWYobWluTGVuZ3RoID09PSB1bmRlZmluZWQpcmV0dXJuIFM7XG4gIC8vIDQuIExldCBpbnRNaW5MZW5ndGggYmUgVG9JbnRlZ2VyKG1pbkxlbmd0aCkuXG4gIHZhciBpbnRNaW5MZW5ndGggPSAkLnRvSW50ZWdlcihtaW5MZW5ndGgpO1xuICAvLyA1LiBMZXQgZmlsbExlbiBiZSB0aGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gUyBtaW51cyBpbnRNaW5MZW5ndGguXG4gIHZhciBmaWxsTGVuID0gaW50TWluTGVuZ3RoIC0gUy5sZW5ndGg7XG4gIC8vIDYuIElmIGZpbGxMZW4gPCAwLCB0aGVuIHRocm93IGEgUmFuZ2VFcnJvciBleGNlcHRpb24uXG4gIC8vIDcuIElmIGZpbGxMZW4gaXMgK+KIniwgdGhlbiB0aHJvdyBhIFJhbmdlRXJyb3IgZXhjZXB0aW9uLlxuICBpZihmaWxsTGVuIDwgMCB8fCBmaWxsTGVuID09PSBJbmZpbml0eSl7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0Nhbm5vdCBzYXRpc2Z5IHN0cmluZyBsZW5ndGggJyArIG1pbkxlbmd0aCArICcgZm9yIHN0cmluZzogJyArIFMpO1xuICB9XG4gIC8vIDguIExldCBzRmlsbFN0ciBiZSB0aGUgc3RyaW5nIHJlcHJlc2VudGVkIGJ5IGZpbGxTdHIuXG4gIC8vIDkuIElmIHNGaWxsU3RyIGlzIHVuZGVmaW5lZCwgbGV0IHNGaWxsU3RyIGJlIGEgc3BhY2UgY2hhcmFjdGVyLlxuICB2YXIgc0ZpbGxTdHIgPSBmaWxsQ2hhciA9PT0gdW5kZWZpbmVkID8gJyAnIDogU3RyaW5nKGZpbGxDaGFyKTtcbiAgLy8gMTAuIExldCBzRmlsbFZhbCBiZSBhIFN0cmluZyBtYWRlIG9mIHNGaWxsU3RyLCByZXBlYXRlZCB1bnRpbCBmaWxsTGVuIGlzIG1ldC5cbiAgdmFyIHNGaWxsVmFsID0gcmVwZWF0LmNhbGwoc0ZpbGxTdHIsIE1hdGguY2VpbChmaWxsTGVuIC8gc0ZpbGxTdHIubGVuZ3RoKSk7XG4gIC8vIHRydW5jYXRlIGlmIHdlIG92ZXJmbG93ZWRcbiAgaWYoc0ZpbGxWYWwubGVuZ3RoID4gZmlsbExlbilzRmlsbFZhbCA9IGxlZnRcbiAgICA/IHNGaWxsVmFsLnNsaWNlKHNGaWxsVmFsLmxlbmd0aCAtIGZpbGxMZW4pXG4gICAgOiBzRmlsbFZhbC5zbGljZSgwLCBmaWxsTGVuKTtcbiAgLy8gMTEuIFJldHVybiBhIHN0cmluZyBtYWRlIGZyb20gc0ZpbGxWYWwsIGZvbGxvd2VkIGJ5IFMuXG4gIC8vIDExLiBSZXR1cm4gYSBTdHJpbmcgbWFkZSBmcm9tIFMsIGZvbGxvd2VkIGJ5IHNGaWxsVmFsLlxuICByZXR1cm4gbGVmdCA/IHNGaWxsVmFsLmNvbmNhdChTKSA6IFMuY29uY2F0KHNGaWxsVmFsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXBlYXQoY291bnQpe1xuICB2YXIgc3RyID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcbiAgICAsIHJlcyA9ICcnXG4gICAgLCBuICAgPSAkLnRvSW50ZWdlcihjb3VudCk7XG4gIGlmKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO1xuICBmb3IoO24gPiAwOyAobiA+Pj49IDEpICYmIChzdHIgKz0gc3RyKSlpZihuICYgMSlyZXMgKz0gc3RyO1xuICByZXR1cm4gcmVzO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjdHggICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBjb2YgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBpbnZva2UgPSByZXF1aXJlKCcuLyQuaW52b2tlJylcbiAgLCBjZWwgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gJC5nXG4gICwgaXNGdW5jdGlvbiAgICAgICAgID0gJC5pc0Z1bmN0aW9uXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gJC5odG1sXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbmZ1bmN0aW9uIHJ1bigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYoJC5oYXMocXVldWUsIGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufVxuZnVuY3Rpb24gbGlzdG5lcihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufVxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIWlzRnVuY3Rpb24oc2V0VGFzaykgfHwgIWlzRnVuY3Rpb24oY2xlYXJUYXNrKSl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbihmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZShpc0Z1bmN0aW9uKGZuKSA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbihpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKGNvZihwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIE1vZGVybiBicm93c2Vycywgc2tpcCBpbXBsZW1lbnRhdGlvbiBmb3IgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyBvYmplY3RcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIGlzRnVuY3Rpb24oZ2xvYmFsLnBvc3RNZXNzYWdlKSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0bmVyLCBmYWxzZSk7XG4gIC8vIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKGlzRnVuY3Rpb24oTWVzc2FnZUNoYW5uZWwpKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdG5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwidmFyIHNpZCA9IDA7XG5mdW5jdGlvbiB1aWQoa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsrc2lkICsgTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoMzYpKTtcbn1cbnVpZC5zYWZlID0gcmVxdWlyZSgnLi8kJykuZy5TeW1ib2wgfHwgdWlkO1xubW9kdWxlLmV4cG9ydHMgPSB1aWQ7IiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi8kLndrcycpKCd1bnNjb3BhYmxlcycpO1xuaWYoIShVTlNDT1BBQkxFUyBpbiBbXSkpcmVxdWlyZSgnLi8kJykuaGlkZShBcnJheS5wcm90b3R5cGUsIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIFtdW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJCcpLmdcbiAgLCBzdG9yZSAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ3drcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgZ2xvYmFsLlN5bWJvbCAmJiBnbG9iYWwuU3ltYm9sW25hbWVdIHx8IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07IiwidmFyICQgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNlbCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgY29mICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBpbnZva2UgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmludm9rZScpXG4gICwgYXJyYXlNZXRob2QgICAgICA9IHJlcXVpcmUoJy4vJC5hcnJheS1tZXRob2RzJylcbiAgLCBJRV9QUk9UTyAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ19fcHJvdG9fXycpXG4gICwgYXNzZXJ0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKVxuICAsIGFzc2VydE9iamVjdCAgICAgPSBhc3NlcnQub2JqXG4gICwgT2JqZWN0UHJvdG8gICAgICA9IE9iamVjdC5wcm90b3R5cGVcbiAgLCBodG1sICAgICAgICAgICAgID0gJC5odG1sXG4gICwgQSAgICAgICAgICAgICAgICA9IFtdXG4gICwgX3NsaWNlICAgICAgICAgICA9IEEuc2xpY2VcbiAgLCBfam9pbiAgICAgICAgICAgID0gQS5qb2luXG4gICwgY2xhc3NvZiAgICAgICAgICA9IGNvZi5jbGFzc29mXG4gICwgaGFzICAgICAgICAgICAgICA9ICQuaGFzXG4gICwgZGVmaW5lUHJvcGVydHkgICA9ICQuc2V0RGVzY1xuICAsIGdldE93bkRlc2NyaXB0b3IgPSAkLmdldERlc2NcbiAgLCBkZWZpbmVQcm9wZXJ0aWVzID0gJC5zZXREZXNjc1xuICAsIGlzRnVuY3Rpb24gICAgICAgPSAkLmlzRnVuY3Rpb25cbiAgLCBpc09iamVjdCAgICAgICAgID0gJC5pc09iamVjdFxuICAsIHRvT2JqZWN0ICAgICAgICAgPSAkLnRvT2JqZWN0XG4gICwgdG9MZW5ndGggICAgICAgICA9ICQudG9MZW5ndGhcbiAgLCB0b0luZGV4ICAgICAgICAgID0gJC50b0luZGV4XG4gICwgSUU4X0RPTV9ERUZJTkUgICA9IGZhbHNlXG4gICwgJGluZGV4T2YgICAgICAgICA9IHJlcXVpcmUoJy4vJC5hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsICRmb3JFYWNoICAgICAgICAgPSBhcnJheU1ldGhvZCgwKVxuICAsICRtYXAgICAgICAgICAgICAgPSBhcnJheU1ldGhvZCgxKVxuICAsICRmaWx0ZXIgICAgICAgICAgPSBhcnJheU1ldGhvZCgyKVxuICAsICRzb21lICAgICAgICAgICAgPSBhcnJheU1ldGhvZCgzKVxuICAsICRldmVyeSAgICAgICAgICAgPSBhcnJheU1ldGhvZCg0KTtcblxuaWYoISQuREVTQyl7XG4gIHRyeSB7XG4gICAgSUU4X0RPTV9ERUZJTkUgPSBkZWZpbmVQcm9wZXJ0eShjZWwoJ2RpdicpLCAneCcsXG4gICAgICB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gODsgfX1cbiAgICApLnggPT0gODtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICAkLnNldERlc2MgPSBmdW5jdGlvbihPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICAgIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpYXNzZXJ0T2JqZWN0KE8pW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICByZXR1cm4gTztcbiAgfTtcbiAgJC5nZXREZXNjID0gZnVuY3Rpb24oTywgUCl7XG4gICAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICAgIHJldHVybiBnZXRPd25EZXNjcmlwdG9yKE8sIFApO1xuICAgIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgICBpZihoYXMoTywgUCkpcmV0dXJuICQuZGVzYyghT2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChPLCBQKSwgT1tQXSk7XG4gIH07XG4gICQuc2V0RGVzY3MgPSBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24oTywgUHJvcGVydGllcyl7XG4gICAgYXNzZXJ0T2JqZWN0KE8pO1xuICAgIHZhciBrZXlzICAgPSAkLmdldEtleXMoUHJvcGVydGllcylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSA9IDBcbiAgICAgICwgUDtcbiAgICB3aGlsZShsZW5ndGggPiBpKSQuc2V0RGVzYyhPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgICByZXR1cm4gTztcbiAgfTtcbn1cbiRkZWYoJGRlZi5TICsgJGRlZi5GICogISQuREVTQywgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjYgLyAxNS4yLjMuMyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJC5nZXREZXNjLFxuICAvLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJC5zZXREZXNjLFxuICAvLyAxOS4xLjIuMyAvIDE1LjIuMy43IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6IGRlZmluZVByb3BlcnRpZXNcbn0pO1xuXG4gIC8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbnZhciBrZXlzMSA9ICgnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSwnICtcbiAgICAgICAgICAgICd0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJykuc3BsaXQoJywnKVxuICAvLyBBZGRpdGlvbmFsIGtleXMgZm9yIGdldE93blByb3BlcnR5TmFtZXNcbiAgLCBrZXlzMiA9IGtleXMxLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpXG4gICwga2V5c0xlbjEgPSBrZXlzMS5sZW5ndGg7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBjZWwoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBrZXlzTGVuMVxuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoJzxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8L3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3QucHJvdG90eXBlW2tleXMxW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5mdW5jdGlvbiBjcmVhdGVHZXRLZXlzKG5hbWVzLCBsZW5ndGgpe1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3Qob2JqZWN0KVxuICAgICAgLCBpICAgICAgPSAwXG4gICAgICAsIHJlc3VsdCA9IFtdXG4gICAgICAsIGtleTtcbiAgICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICAgIHdoaWxlKGxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICAgIH4kaW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbmZ1bmN0aW9uIEVtcHR5KCl7fVxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG4gIGdldFByb3RvdHlwZU9mOiAkLmdldFByb3RvID0gJC5nZXRQcm90byB8fCBmdW5jdGlvbihPKXtcbiAgICBPID0gT2JqZWN0KGFzc2VydC5kZWYoTykpO1xuICAgIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICAgIGlmKGlzRnVuY3Rpb24oTy5jb25zdHJ1Y3RvcikgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG4gIH0sXG4gIC8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJC5nZXROYW1lcyA9ICQuZ2V0TmFtZXMgfHwgY3JlYXRlR2V0S2V5cyhrZXlzMiwga2V5czIubGVuZ3RoLCB0cnVlKSxcbiAgLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJC5jcmVhdGUgPSAkLmNyZWF0ZSB8fCBmdW5jdGlvbihPLCAvKj8qL1Byb3BlcnRpZXMpe1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYoTyAhPT0gbnVsbCl7XG4gICAgICBFbXB0eS5wcm90b3R5cGUgPSBhc3NlcnRPYmplY3QoTyk7XG4gICAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHNoaW1cbiAgICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICAgIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gICAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbiAgfSxcbiAgLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG4gIGtleXM6ICQuZ2V0S2V5cyA9ICQuZ2V0S2V5cyB8fCBjcmVhdGVHZXRLZXlzKGtleXMxLCBrZXlzTGVuMSwgZmFsc2UpLFxuICAvLyAxOS4xLjIuMTcgLyAxNS4yLjMuOCBPYmplY3Quc2VhbChPKVxuICBzZWFsOiBmdW5jdGlvbiBzZWFsKGl0KXtcbiAgICByZXR1cm4gaXQ7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuNSAvIDE1LjIuMy45IE9iamVjdC5mcmVlemUoTylcbiAgZnJlZXplOiBmdW5jdGlvbiBmcmVlemUoaXQpe1xuICAgIHJldHVybiBpdDsgLy8gPC0gY2FwXG4gIH0sXG4gIC8vIDE5LjEuMi4xNSAvIDE1LjIuMy4xMCBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoTylcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKGl0KXtcbiAgICByZXR1cm4gaXQ7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuMTMgLyAxNS4yLjMuMTEgT2JqZWN0LmlzU2VhbGVkKE8pXG4gIGlzU2VhbGVkOiBmdW5jdGlvbiBpc1NlYWxlZChpdCl7XG4gICAgcmV0dXJuICFpc09iamVjdChpdCk7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuMTIgLyAxNS4yLjMuMTIgT2JqZWN0LmlzRnJvemVuKE8pXG4gIGlzRnJvemVuOiBmdW5jdGlvbiBpc0Zyb3plbihpdCl7XG4gICAgcmV0dXJuICFpc09iamVjdChpdCk7IC8vIDwtIGNhcFxuICB9LFxuICAvLyAxOS4xLjIuMTEgLyAxNS4yLjMuMTMgT2JqZWN0LmlzRXh0ZW5zaWJsZShPKVxuICBpc0V4dGVuc2libGU6IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KTsgLy8gPC0gY2FwXG4gIH1cbn0pO1xuXG4vLyAxOS4yLjMuMiAvIDE1LjMuNC41IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKHRoaXNBcmcsIGFyZ3MuLi4pXG4kZGVmKCRkZWYuUCwgJ0Z1bmN0aW9uJywge1xuICBiaW5kOiBmdW5jdGlvbih0aGF0IC8qLCBhcmdzLi4uICovKXtcbiAgICB2YXIgZm4gICAgICAgPSBhc3NlcnQuZm4odGhpcylcbiAgICAgICwgcGFydEFyZ3MgPSBfc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGZ1bmN0aW9uIGJvdW5kKC8qIGFyZ3MuLi4gKi8pe1xuICAgICAgdmFyIGFyZ3MgICA9IHBhcnRBcmdzLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAsIGNvbnN0ciA9IHRoaXMgaW5zdGFuY2VvZiBib3VuZFxuICAgICAgICAsIGN0eCAgICA9IGNvbnN0ciA/ICQuY3JlYXRlKGZuLnByb3RvdHlwZSkgOiB0aGF0XG4gICAgICAgICwgcmVzdWx0ID0gaW52b2tlKGZuLCBhcmdzLCBjdHgpO1xuICAgICAgcmV0dXJuIGNvbnN0ciA/IGN0eCA6IHJlc3VsdDtcbiAgICB9XG4gICAgaWYoZm4ucHJvdG90eXBlKWJvdW5kLnByb3RvdHlwZSA9IGZuLnByb3RvdHlwZTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH1cbn0pO1xuXG4vLyBGaXggZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmcgYW5kIERPTSBvYmplY3RzXG5pZighKDAgaW4gT2JqZWN0KCd6JykgJiYgJ3onWzBdID09ICd6Jykpe1xuICAkLkVTNU9iamVjdCA9IGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG4gIH07XG59XG5cbnZhciBidWdneVNsaWNlID0gdHJ1ZTtcbnRyeSB7XG4gIGlmKGh0bWwpX3NsaWNlLmNhbGwoaHRtbCk7XG4gIGJ1Z2d5U2xpY2UgPSBmYWxzZTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiBidWdneVNsaWNlLCAnQXJyYXknLCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShiZWdpbiwgZW5kKXtcbiAgICB2YXIgbGVuICAgPSB0b0xlbmd0aCh0aGlzLmxlbmd0aClcbiAgICAgICwga2xhc3MgPSBjb2YodGhpcyk7XG4gICAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiBlbmQ7XG4gICAgaWYoa2xhc3MgPT0gJ0FycmF5JylyZXR1cm4gX3NsaWNlLmNhbGwodGhpcywgYmVnaW4sIGVuZCk7XG4gICAgdmFyIHN0YXJ0ICA9IHRvSW5kZXgoYmVnaW4sIGxlbilcbiAgICAgICwgdXBUbyAgID0gdG9JbmRleChlbmQsIGxlbilcbiAgICAgICwgc2l6ZSAgID0gdG9MZW5ndGgodXBUbyAtIHN0YXJ0KVxuICAgICAgLCBjbG9uZWQgPSBBcnJheShzaXplKVxuICAgICAgLCBpICAgICAgPSAwO1xuICAgIGZvcig7IGkgPCBzaXplOyBpKyspY2xvbmVkW2ldID0ga2xhc3MgPT0gJ1N0cmluZydcbiAgICAgID8gdGhpcy5jaGFyQXQoc3RhcnQgKyBpKVxuICAgICAgOiB0aGlzW3N0YXJ0ICsgaV07XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufSk7XG5cbiRkZWYoJGRlZi5QICsgJGRlZi5GICogKCQuRVM1T2JqZWN0ICE9IE9iamVjdCksICdBcnJheScsIHtcbiAgam9pbjogZnVuY3Rpb24gam9pbigpe1xuICAgIHJldHVybiBfam9pbi5hcHBseSgkLkVTNU9iamVjdCh0aGlzKSwgYXJndW1lbnRzKTtcbiAgfVxufSk7XG5cbi8vIDIyLjEuMi4yIC8gMTUuNC4zLjIgQXJyYXkuaXNBcnJheShhcmcpXG4kZGVmKCRkZWYuUywgJ0FycmF5Jywge1xuICBpc0FycmF5OiBmdW5jdGlvbihhcmcpe1xuICAgIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xuICB9XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZUFycmF5UmVkdWNlKGlzUmlnaHQpe1xuICByZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2tmbiwgbWVtbyl7XG4gICAgYXNzZXJ0LmZuKGNhbGxiYWNrZm4pO1xuICAgIHZhciBPICAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gaXNSaWdodCA/IGxlbmd0aCAtIDEgOiAwXG4gICAgICAsIGkgICAgICA9IGlzUmlnaHQgPyAtMSA6IDE7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA8IDIpZm9yKDs7KXtcbiAgICAgIGlmKGluZGV4IGluIE8pe1xuICAgICAgICBtZW1vID0gT1tpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXggKz0gaTtcbiAgICAgIGFzc2VydChpc1JpZ2h0ID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4LCAnUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgIH1cbiAgICBmb3IoO2lzUmlnaHQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpaWYoaW5kZXggaW4gTyl7XG4gICAgICBtZW1vID0gY2FsbGJhY2tmbihtZW1vLCBPW2luZGV4XSwgaW5kZXgsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn1cbiRkZWYoJGRlZi5QLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xMCAvIDE1LjQuNC4xOCBBcnJheS5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBmb3JFYWNoOiAkLmVhY2ggPSAkLmVhY2ggfHwgZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZm9yRWFjaCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuMTUgLyAxNS40LjQuMTkgQXJyYXkucHJvdG90eXBlLm1hcChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH0sXG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbHRlcih0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuMjMgLyAxNS40LjQuMTcgQXJyYXkucHJvdG90eXBlLnNvbWUoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuNSAvIDE1LjQuNC4xNiBBcnJheS5wcm90b3R5cGUuZXZlcnkoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRldmVyeSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9LFxuICAvLyAyMi4xLjMuMTggLyAxNS40LjQuMjEgQXJyYXkucHJvdG90eXBlLnJlZHVjZShjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXG4gIHJlZHVjZTogY3JlYXRlQXJyYXlSZWR1Y2UoZmFsc2UpLFxuICAvLyAyMi4xLjMuMTkgLyAxNS40LjQuMjIgQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlUmlnaHQ6IGNyZWF0ZUFycmF5UmVkdWNlKHRydWUpLFxuICAvLyAyMi4xLjMuMTEgLyAxNS40LjQuMTQgQXJyYXkucHJvdG90eXBlLmluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKGVsIC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gJGluZGV4T2YodGhpcywgZWwsIGFyZ3VtZW50c1sxXSk7XG4gIH0sXG4gIC8vIDIyLjEuMy4xNCAvIDE1LjQuNC4xNSBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxuICBsYXN0SW5kZXhPZjogZnVuY3Rpb24oZWwsIGZyb21JbmRleCAvKiA9IEBbKi0xXSAqLyl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSBsZW5ndGggLSAxO1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKWluZGV4ID0gTWF0aC5taW4oaW5kZXgsICQudG9JbnRlZ2VyKGZyb21JbmRleCkpO1xuICAgIGlmKGluZGV4IDwgMClpbmRleCA9IHRvTGVuZ3RoKGxlbmd0aCArIGluZGV4KTtcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIGluZGV4O1xuICAgIHJldHVybiAtMTtcbiAgfVxufSk7XG5cbi8vIDIxLjEuMy4yNSAvIDE1LjUuNC4yMCBTdHJpbmcucHJvdG90eXBlLnRyaW0oKVxuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7dHJpbTogcmVxdWlyZSgnLi8kLnJlcGxhY2VyJykoL15cXHMqKFtcXHNcXFNdKlxcUyk/XFxzKiQvLCAnJDEnKX0pO1xuXG4vLyAyMC4zLjMuMSAvIDE1LjkuNC40IERhdGUubm93KClcbiRkZWYoJGRlZi5TLCAnRGF0ZScsIHtub3c6IGZ1bmN0aW9uKCl7XG4gIHJldHVybiArbmV3IERhdGU7XG59fSk7XG5cbmZ1bmN0aW9uIGx6KG51bSl7XG4gIHJldHVybiBudW0gPiA5ID8gbnVtIDogJzAnICsgbnVtO1xufVxuXG4vLyAyMC4zLjQuMzYgLyAxNS45LjUuNDMgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcoKVxuLy8gUGhhbnRvbUpTIGFuZCBvbGQgd2Via2l0IGhhZCBhIGJyb2tlbiBEYXRlIGltcGxlbWVudGF0aW9uLlxudmFyIGRhdGUgICAgICAgPSBuZXcgRGF0ZSgtNWUxMyAtIDEpXG4gICwgYnJva2VuRGF0ZSA9ICEoZGF0ZS50b0lTT1N0cmluZyAmJiBkYXRlLnRvSVNPU3RyaW5nKCkgPT0gJzAzODUtMDctMjVUMDc6MDY6MzkuOTk5WidcbiAgICAgICYmIHJlcXVpcmUoJy4vJC50aHJvd3MnKShmdW5jdGlvbigpeyBuZXcgRGF0ZShOYU4pLnRvSVNPU3RyaW5nKCk7IH0pKTtcbiRkZWYoJGRlZi5QICsgJGRlZi5GICogYnJva2VuRGF0ZSwgJ0RhdGUnLCB7dG9JU09TdHJpbmc6IGZ1bmN0aW9uKCl7XG4gIGlmKCFpc0Zpbml0ZSh0aGlzKSl0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgdmFyIGQgPSB0aGlzXG4gICAgLCB5ID0gZC5nZXRVVENGdWxsWWVhcigpXG4gICAgLCBtID0gZC5nZXRVVENNaWxsaXNlY29uZHMoKVxuICAgICwgcyA9IHkgPCAwID8gJy0nIDogeSA+IDk5OTkgPyAnKycgOiAnJztcbiAgcmV0dXJuIHMgKyAoJzAwMDAwJyArIE1hdGguYWJzKHkpKS5zbGljZShzID8gLTYgOiAtNCkgK1xuICAgICctJyArIGx6KGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgbHooZC5nZXRVVENEYXRlKCkpICtcbiAgICAnVCcgKyBseihkLmdldFVUQ0hvdXJzKCkpICsgJzonICsgbHooZC5nZXRVVENNaW51dGVzKCkpICtcbiAgICAnOicgKyBseihkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAobSA+IDk5ID8gbSA6ICcwJyArIGx6KG0pKSArICdaJztcbn19KTtcblxuaWYoY2xhc3NvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdPYmplY3QnKWNvZi5jbGFzc29mID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGFnID0gY2xhc3NvZihpdCk7XG4gIHJldHVybiB0YWcgPT0gJ09iamVjdCcgJiYgaXNGdW5jdGlvbihpdC5jYWxsZWUpID8gJ0FyZ3VtZW50cycgOiB0YWc7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCAkZGVmICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgdG9JbmRleCA9ICQudG9JbmRleDtcbiRkZWYoJGRlZi5QLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxuICBjb3B5V2l0aGluOiBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldC8qID0gMCAqLywgc3RhcnQgLyogPSAwLCBlbmQgPSBAbGVuZ3RoICovKXtcbiAgICB2YXIgTyAgICAgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxuICAgICAgLCBsZW4gICA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIHRvICAgID0gdG9JbmRleCh0YXJnZXQsIGxlbilcbiAgICAgICwgZnJvbSAgPSB0b0luZGV4KHN0YXJ0LCBsZW4pXG4gICAgICAsIGVuZCAgID0gYXJndW1lbnRzWzJdXG4gICAgICAsIGZpbiAgID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB0b0luZGV4KGVuZCwgbGVuKVxuICAgICAgLCBjb3VudCA9IE1hdGgubWluKGZpbiAtIGZyb20sIGxlbiAtIHRvKVxuICAgICAgLCBpbmMgICA9IDE7XG4gICAgaWYoZnJvbSA8IHRvICYmIHRvIDwgZnJvbSArIGNvdW50KXtcbiAgICAgIGluYyAgPSAtMTtcbiAgICAgIGZyb20gPSBmcm9tICsgY291bnQgLSAxO1xuICAgICAgdG8gICA9IHRvICAgKyBjb3VudCAtIDE7XG4gICAgfVxuICAgIHdoaWxlKGNvdW50LS0gPiAwKXtcbiAgICAgIGlmKGZyb20gaW4gTylPW3RvXSA9IE9bZnJvbV07XG4gICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIHRvICAgKz0gaW5jO1xuICAgICAgZnJvbSArPSBpbmM7XG4gICAgfSByZXR1cm4gTztcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKCdjb3B5V2l0aGluJyk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0luZGV4ID0gJC50b0luZGV4O1xuJGRlZigkZGVmLlAsICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG4gIGZpbGw6IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLyl7XG4gICAgdmFyIE8gICAgICA9IE9iamVjdCgkLmFzc2VydERlZmluZWQodGhpcykpXG4gICAgICAsIGxlbmd0aCA9ICQudG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoYXJndW1lbnRzWzFdLCBsZW5ndGgpXG4gICAgICAsIGVuZCAgICA9IGFyZ3VtZW50c1syXVxuICAgICAgLCBlbmRQb3MgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvSW5kZXgoZW5kLCBsZW5ndGgpO1xuICAgIHdoaWxlKGVuZFBvcyA+IGluZGV4KU9baW5kZXgrK10gPSB2YWx1ZTtcbiAgICByZXR1cm4gTztcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKCdmaWxsJyk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjkgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgS0VZICAgID0gJ2ZpbmRJbmRleCdcbiAgLCAkZGVmICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCBmb3JjZWQgPSB0cnVlXG4gICwgJGZpbmQgID0gcmVxdWlyZSgnLi8kLmFycmF5LW1ldGhvZHMnKSg2KTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vJC51bnNjb3BlJykoS0VZKTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMi4xLjMuOCBBcnJheS5wcm90b3R5cGUuZmluZChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgS0VZICAgID0gJ2ZpbmQnXG4gICwgJGRlZiAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgZm9yY2VkID0gdHJ1ZVxuICAsICRmaW5kICA9IHJlcXVpcmUoJy4vJC5hcnJheS1tZXRob2RzJykoNSk7XG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYoS0VZIGluIFtdKUFycmF5KDEpW0tFWV0oZnVuY3Rpb24oKXsgZm9yY2VkID0gZmFsc2U7IH0pO1xuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiBmb3JjZWQsICdBcnJheScsIHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vJC51bnNjb3BlJykoS0VZKTsiLCJ2YXIgJCAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJylcbiAgLCBjYWxsICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNhbGwnKTtcbiRkZWYoJGRlZi5TICsgJGRlZi5GICogIXJlcXVpcmUoJy4vJC5pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZChhcnJheUxpa2UpKVxuICAgICAgLCBtYXBmbiAgID0gYXJndW1lbnRzWzFdXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGYgICAgICAgPSBtYXBwaW5nID8gY3R4KG1hcGZuLCBhcmd1bWVudHNbMl0sIDIpIDogdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZigkaXRlci5pcyhPKSl7XG4gICAgICBpdGVyYXRvciA9ICRpdGVyLmdldChPKTtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgcXVpcmtzIG1vZGUgYnVnIC0+IHVzZSB0eXBlb2YgaW5zdGVhZCBvZiBpc0Z1bmN0aW9uXG4gICAgICByZXN1bHQgICA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSk7XG4gICAgICBmb3IoOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIGYsIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3RyYW5nZSBJRSBxdWlya3MgbW9kZSBidWcgLT4gdXNlIHR5cGVvZiBpbnN0ZWFkIG9mIGlzRnVuY3Rpb25cbiAgICAgIHJlc3VsdCA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSkobGVuZ3RoID0gJC50b0xlbmd0aChPLmxlbmd0aCkpO1xuICAgICAgZm9yKDsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gbWFwcGluZyA/IGYoT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHNldFVuc2NvcGUgPSByZXF1aXJlKCcuLyQudW5zY29wZScpXG4gICwgSVRFUiAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcbiAgLCAkaXRlciAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKVxuICAsIHN0ZXAgICAgICAgPSAkaXRlci5zdGVwXG4gICwgSXRlcmF0b3JzICA9ICRpdGVyLkl0ZXJhdG9ycztcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgJC5zZXQodGhpcywgSVRFUiwge286ICQudG9PYmplY3QoaXRlcmF0ZWQpLCBpOiAwLCBrOiBraW5kfSk7XG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBpdGVyICA9IHRoaXNbSVRFUl1cbiAgICAsIE8gICAgID0gaXRlci5vXG4gICAgLCBraW5kICA9IGl0ZXIua1xuICAgICwgaW5kZXggPSBpdGVyLmkrKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIGl0ZXIubyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuc2V0VW5zY29wZSgna2V5cycpO1xuc2V0VW5zY29wZSgndmFsdWVzJyk7XG5zZXRVbnNjb3BlKCdlbnRyaWVzJyk7IiwidmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMyBBcnJheS5vZiggLi4uaXRlbXMpXG4gIG9mOiBmdW5jdGlvbiBvZigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAvLyBzdHJhbmdlIElFIHF1aXJrcyBtb2RlIGJ1ZyAtPiB1c2UgdHlwZW9mIGluc3RlYWQgb2YgaXNGdW5jdGlvblxuICAgICAgLCByZXN1bHQgPSBuZXcgKHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXkpKGxlbmd0aCk7XG4gICAgd2hpbGUobGVuZ3RoID4gaW5kZXgpcmVzdWx0W2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleCsrXTtcbiAgICByZXN1bHQubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pOyIsInJlcXVpcmUoJy4vJC5zcGVjaWVzJykoQXJyYXkpOyIsInZhciAkICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBIQVNfSU5TVEFOQ0UgID0gcmVxdWlyZSgnLi8kLndrcycpKCdoYXNJbnN0YW5jZScpXG4gICwgRnVuY3Rpb25Qcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIDE5LjIuMy42IEZ1bmN0aW9uLnByb3RvdHlwZVtAQGhhc0luc3RhbmNlXShWKVxuaWYoIShIQVNfSU5TVEFOQ0UgaW4gRnVuY3Rpb25Qcm90bykpJC5zZXREZXNjKEZ1bmN0aW9uUHJvdG8sIEhBU19JTlNUQU5DRSwge3ZhbHVlOiBmdW5jdGlvbihPKXtcbiAgaWYoISQuaXNGdW5jdGlvbih0aGlzKSB8fCAhJC5pc09iamVjdChPKSlyZXR1cm4gZmFsc2U7XG4gIGlmKCEkLmlzT2JqZWN0KHRoaXMucHJvdG90eXBlKSlyZXR1cm4gTyBpbnN0YW5jZW9mIHRoaXM7XG4gIC8vIGZvciBlbnZpcm9ubWVudCB3L28gbmF0aXZlIGBAQGhhc0luc3RhbmNlYCBsb2dpYyBlbm91Z2ggYGluc3RhbmNlb2ZgLCBidXQgYWRkIHRoaXM6XG4gIHdoaWxlKE8gPSAkLmdldFByb3RvKE8pKWlmKHRoaXMucHJvdG90eXBlID09PSBPKXJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59fSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIE5BTUUgPSAnbmFtZSdcbiAgLCBzZXREZXNjID0gJC5zZXREZXNjXG4gICwgRnVuY3Rpb25Qcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIDE5LjIuNC4yIG5hbWVcbk5BTUUgaW4gRnVuY3Rpb25Qcm90byB8fCAkLkZXICYmICQuREVTQyAmJiBzZXREZXNjKEZ1bmN0aW9uUHJvdG8sIE5BTUUsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIG1hdGNoID0gU3RyaW5nKHRoaXMpLm1hdGNoKC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopLylcbiAgICAgICwgbmFtZSAgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG4gICAgJC5oYXModGhpcywgTkFNRSkgfHwgc2V0RGVzYyh0aGlzLCBOQU1FLCAkLmRlc2MoNSwgbmFtZSkpO1xuICAgIHJldHVybiBuYW1lO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAkLmhhcyh0aGlzLCBOQU1FKSB8fCBzZXREZXNjKHRoaXMsIE5BTUUsICQuZGVzYygwLCB2YWx1ZSkpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ01hcCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHNbMF0pOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGVudHJ5ID0gc3Ryb25nLmdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XG4gIH0sXG4gIC8vIDIzLjEuMy45IE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTsiLCJ2YXIgSW5maW5pdHkgPSAxIC8gMFxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgRSAgICAgPSBNYXRoLkVcbiAgLCBwb3cgICA9IE1hdGgucG93XG4gICwgYWJzICAgPSBNYXRoLmFic1xuICAsIGV4cCAgID0gTWF0aC5leHBcbiAgLCBsb2cgICA9IE1hdGgubG9nXG4gICwgc3FydCAgPSBNYXRoLnNxcnRcbiAgLCBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vclxuICAsIEVQU0lMT04gICA9IHBvdygyLCAtNTIpXG4gICwgRVBTSUxPTjMyID0gcG93KDIsIC0yMylcbiAgLCBNQVgzMiAgICAgPSBwb3coMiwgMTI3KSAqICgyIC0gRVBTSUxPTjMyKVxuICAsIE1JTjMyICAgICA9IHBvdygyLCAtMTI2KTtcbmZ1bmN0aW9uIHJvdW5kVGllc1RvRXZlbihuKXtcbiAgcmV0dXJuIG4gKyAxIC8gRVBTSUxPTiAtIDEgLyBFUFNJTE9OO1xufVxuXG4vLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG5mdW5jdGlvbiBzaWduKHgpe1xuICByZXR1cm4gKHggPSAreCkgPT0gMCB8fCB4ICE9IHggPyB4IDogeCA8IDAgPyAtMSA6IDE7XG59XG4vLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG5mdW5jdGlvbiBhc2luaCh4KXtcbiAgcmV0dXJuICFpc0Zpbml0ZSh4ID0gK3gpIHx8IHggPT0gMCA/IHggOiB4IDwgMCA/IC1hc2luaCgteCkgOiBsb2coeCArIHNxcnQoeCAqIHggKyAxKSk7XG59XG4vLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxuZnVuY3Rpb24gZXhwbTEoeCl7XG4gIHJldHVybiAoeCA9ICt4KSA9PSAwID8geCA6IHggPiAtMWUtNiAmJiB4IDwgMWUtNiA/IHggKyB4ICogeCAvIDIgOiBleHAoeCkgLSAxO1xufVxuXG4kZGVmKCRkZWYuUywgJ01hdGgnLCB7XG4gIC8vIDIwLjIuMi4zIE1hdGguYWNvc2goeClcbiAgYWNvc2g6IGZ1bmN0aW9uIGFjb3NoKHgpe1xuICAgIHJldHVybiAoeCA9ICt4KSA8IDEgPyBOYU4gOiBpc0Zpbml0ZSh4KSA/IGxvZyh4IC8gRSArIHNxcnQoeCArIDEpICogc3FydCh4IC0gMSkgLyBFKSArIDEgOiB4O1xuICB9LFxuICAvLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG4gIGFzaW5oOiBhc2luaCxcbiAgLy8gMjAuMi4yLjcgTWF0aC5hdGFuaCh4KVxuICBhdGFuaDogZnVuY3Rpb24gYXRhbmgoeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogbG9nKCgxICsgeCkgLyAoMSAtIHgpKSAvIDI7XG4gIH0sXG4gIC8vIDIwLjIuMi45IE1hdGguY2JydCh4KVxuICBjYnJ0OiBmdW5jdGlvbiBjYnJ0KHgpe1xuICAgIHJldHVybiBzaWduKHggPSAreCkgKiBwb3coYWJzKHgpLCAxIC8gMyk7XG4gIH0sXG4gIC8vIDIwLjIuMi4xMSBNYXRoLmNsejMyKHgpXG4gIGNsejMyOiBmdW5jdGlvbiBjbHozMih4KXtcbiAgICByZXR1cm4gKHggPj4+PSAwKSA/IDMxIC0gZmxvb3IobG9nKHggKyAwLjUpICogTWF0aC5MT0cyRSkgOiAzMjtcbiAgfSxcbiAgLy8gMjAuMi4yLjEyIE1hdGguY29zaCh4KVxuICBjb3NoOiBmdW5jdGlvbiBjb3NoKHgpe1xuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XG4gIH0sXG4gIC8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG4gIGV4cG0xOiBleHBtMSxcbiAgLy8gMjAuMi4yLjE2IE1hdGguZnJvdW5kKHgpXG4gIGZyb3VuZDogZnVuY3Rpb24gZnJvdW5kKHgpe1xuICAgIHZhciAkYWJzICA9IGFicyh4KVxuICAgICAgLCAkc2lnbiA9IHNpZ24oeClcbiAgICAgICwgYSwgcmVzdWx0O1xuICAgIGlmKCRhYnMgPCBNSU4zMilyZXR1cm4gJHNpZ24gKiByb3VuZFRpZXNUb0V2ZW4oJGFicyAvIE1JTjMyIC8gRVBTSUxPTjMyKSAqIE1JTjMyICogRVBTSUxPTjMyO1xuICAgIGEgPSAoMSArIEVQU0lMT04zMiAvIEVQU0lMT04pICogJGFicztcbiAgICByZXN1bHQgPSBhIC0gKGEgLSAkYWJzKTtcbiAgICBpZihyZXN1bHQgPiBNQVgzMiB8fCByZXN1bHQgIT0gcmVzdWx0KXJldHVybiAkc2lnbiAqIEluZmluaXR5O1xuICAgIHJldHVybiAkc2lnbiAqIHJlc3VsdDtcbiAgfSxcbiAgLy8gMjAuMi4yLjE3IE1hdGguaHlwb3QoW3ZhbHVlMVssIHZhbHVlMlssIOKApiBdXV0pXG4gIGh5cG90OiBmdW5jdGlvbiBoeXBvdCh2YWx1ZTEsIHZhbHVlMil7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgc3VtICA9IDBcbiAgICAgICwgaSAgICA9IDBcbiAgICAgICwgbGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbGFyZyA9IDBcbiAgICAgICwgYXJnLCBkaXY7XG4gICAgd2hpbGUoaSA8IGxlbil7XG4gICAgICBhcmcgPSBhYnMoYXJndW1lbnRzW2krK10pO1xuICAgICAgaWYobGFyZyA8IGFyZyl7XG4gICAgICAgIGRpdiAgPSBsYXJnIC8gYXJnO1xuICAgICAgICBzdW0gID0gc3VtICogZGl2ICogZGl2ICsgMTtcbiAgICAgICAgbGFyZyA9IGFyZztcbiAgICAgIH0gZWxzZSBpZihhcmcgPiAwKXtcbiAgICAgICAgZGl2ICA9IGFyZyAvIGxhcmc7XG4gICAgICAgIHN1bSArPSBkaXYgKiBkaXY7XG4gICAgICB9IGVsc2Ugc3VtICs9IGFyZztcbiAgICB9XG4gICAgcmV0dXJuIGxhcmcgPT09IEluZmluaXR5ID8gSW5maW5pdHkgOiBsYXJnICogc3FydChzdW0pO1xuICB9LFxuICAvLyAyMC4yLjIuMTggTWF0aC5pbXVsKHgsIHkpXG4gIGltdWw6IGZ1bmN0aW9uIGltdWwoeCwgeSl7XG4gICAgdmFyIFVJbnQxNiA9IDB4ZmZmZlxuICAgICAgLCB4biA9ICt4XG4gICAgICAsIHluID0gK3lcbiAgICAgICwgeGwgPSBVSW50MTYgJiB4blxuICAgICAgLCB5bCA9IFVJbnQxNiAmIHluO1xuICAgIHJldHVybiAwIHwgeGwgKiB5bCArICgoVUludDE2ICYgeG4gPj4+IDE2KSAqIHlsICsgeGwgKiAoVUludDE2ICYgeW4gPj4+IDE2KSA8PCAxNiA+Pj4gMCk7XG4gIH0sXG4gIC8vIDIwLjIuMi4yMCBNYXRoLmxvZzFwKHgpXG4gIGxvZzFwOiBmdW5jdGlvbiBsb2cxcCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPiAtMWUtOCAmJiB4IDwgMWUtOCA/IHggLSB4ICogeCAvIDIgOiBsb2coMSArIHgpO1xuICB9LFxuICAvLyAyMC4yLjIuMjEgTWF0aC5sb2cxMCh4KVxuICBsb2cxMDogZnVuY3Rpb24gbG9nMTAoeCl7XG4gICAgcmV0dXJuIGxvZyh4KSAvIE1hdGguTE4xMDtcbiAgfSxcbiAgLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpe1xuICAgIHJldHVybiBsb2coeCkgLyBNYXRoLkxOMjtcbiAgfSxcbiAgLy8gMjAuMi4yLjI4IE1hdGguc2lnbih4KVxuICBzaWduOiBzaWduLFxuICAvLyAyMC4yLjIuMzAgTWF0aC5zaW5oKHgpXG4gIHNpbmg6IGZ1bmN0aW9uIHNpbmgoeCl7XG4gICAgcmV0dXJuIGFicyh4ID0gK3gpIDwgMSA/IChleHBtMSh4KSAtIGV4cG0xKC14KSkgLyAyIDogKGV4cCh4IC0gMSkgLSBleHAoLXggLSAxKSkgKiAoRSAvIDIpO1xuICB9LFxuICAvLyAyMC4yLjIuMzMgTWF0aC50YW5oKHgpXG4gIHRhbmg6IGZ1bmN0aW9uIHRhbmgoeCl7XG4gICAgdmFyIGEgPSBleHBtMSh4ID0gK3gpXG4gICAgICAsIGIgPSBleHBtMSgteCk7XG4gICAgcmV0dXJuIGEgPT0gSW5maW5pdHkgPyAxIDogYiA9PSBJbmZpbml0eSA/IC0xIDogKGEgLSBiKSAvIChleHAoeCkgKyBleHAoLXgpKTtcbiAgfSxcbiAgLy8gMjAuMi4yLjM0IE1hdGgudHJ1bmMoeClcbiAgdHJ1bmM6IGZ1bmN0aW9uIHRydW5jKGl0KXtcbiAgICByZXR1cm4gKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgaXNPYmplY3QgICA9ICQuaXNPYmplY3RcbiAgLCBpc0Z1bmN0aW9uID0gJC5pc0Z1bmN0aW9uXG4gICwgTlVNQkVSICAgICA9ICdOdW1iZXInXG4gICwgJE51bWJlciAgICA9ICQuZ1tOVU1CRVJdXG4gICwgQmFzZSAgICAgICA9ICROdW1iZXJcbiAgLCBwcm90byAgICAgID0gJE51bWJlci5wcm90b3R5cGU7XG5mdW5jdGlvbiB0b1ByaW1pdGl2ZShpdCl7XG4gIHZhciBmbiwgdmFsO1xuICBpZihpc0Z1bmN0aW9uKGZuID0gaXQudmFsdWVPZikgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZihpc0Z1bmN0aW9uKGZuID0gaXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gbnVtYmVyXCIpO1xufVxuZnVuY3Rpb24gdG9OdW1iZXIoaXQpe1xuICBpZihpc09iamVjdChpdCkpaXQgPSB0b1ByaW1pdGl2ZShpdCk7XG4gIGlmKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyICYmIGl0LmNoYXJDb2RlQXQoMCkgPT0gNDgpe1xuICAgIHZhciBiaW5hcnkgPSBmYWxzZTtcbiAgICBzd2l0Y2goaXQuY2hhckNvZGVBdCgxKSl7XG4gICAgICBjYXNlIDY2IDogY2FzZSA5OCAgOiBiaW5hcnkgPSB0cnVlO1xuICAgICAgY2FzZSA3OSA6IGNhc2UgMTExIDogcmV0dXJuIHBhcnNlSW50KGl0LnNsaWNlKDIpLCBiaW5hcnkgPyAyIDogOCk7XG4gICAgfVxuICB9IHJldHVybiAraXQ7XG59XG5pZigkLkZXICYmICEoJE51bWJlcignMG8xJykgJiYgJE51bWJlcignMGIxJykpKXtcbiAgJE51bWJlciA9IGZ1bmN0aW9uIE51bWJlcihpdCl7XG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiAkTnVtYmVyID8gbmV3IEJhc2UodG9OdW1iZXIoaXQpKSA6IHRvTnVtYmVyKGl0KTtcbiAgfTtcbiAgJC5lYWNoLmNhbGwoJC5ERVNDID8gJC5nZXROYW1lcyhCYXNlKSA6IChcbiAgICAgIC8vIEVTMzpcbiAgICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAgIC8vIEVTNiAoaW4gY2FzZSwgaWYgbW9kdWxlcyB3aXRoIEVTNiBOdW1iZXIgc3RhdGljcyByZXF1aXJlZCBiZWZvcmUpOlxuICAgICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyJ1xuICAgICkuc3BsaXQoJywnKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgIGlmKCQuaGFzKEJhc2UsIGtleSkgJiYgISQuaGFzKCROdW1iZXIsIGtleSkpe1xuICAgICAgICAkLnNldERlc2MoJE51bWJlciwga2V5LCAkLmdldERlc2MoQmFzZSwga2V5KSk7XG4gICAgICB9XG4gICAgfVxuICApO1xuICAkTnVtYmVyLnByb3RvdHlwZSA9IHByb3RvO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICROdW1iZXI7XG4gIHJlcXVpcmUoJy4vJC5yZWRlZicpKCQuZywgTlVNQkVSLCAkTnVtYmVyKTtcbn0iLCJ2YXIgJCAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgYWJzICAgPSBNYXRoLmFic1xuICAsIGZsb29yID0gTWF0aC5mbG9vclxuICAsIF9pc0Zpbml0ZSA9ICQuZy5pc0Zpbml0ZVxuICAsIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFmZmZmZmZmZmZmZmZmOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxO1xuZnVuY3Rpb24gaXNJbnRlZ2VyKGl0KXtcbiAgcmV0dXJuICEkLmlzT2JqZWN0KGl0KSAmJiBfaXNGaW5pdGUoaXQpICYmIGZsb29yKGl0KSA9PT0gaXQ7XG59XG4kZGVmKCRkZWYuUywgJ051bWJlcicsIHtcbiAgLy8gMjAuMS4yLjEgTnVtYmVyLkVQU0lMT05cbiAgRVBTSUxPTjogTWF0aC5wb3coMiwgLTUyKSxcbiAgLy8gMjAuMS4yLjIgTnVtYmVyLmlzRmluaXRlKG51bWJlcilcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcbiAgICByZXR1cm4gdHlwZW9mIGl0ID09ICdudW1iZXInICYmIF9pc0Zpbml0ZShpdCk7XG4gIH0sXG4gIC8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxuICBpc0ludGVnZXI6IGlzSW50ZWdlcixcbiAgLy8gMjAuMS4yLjQgTnVtYmVyLmlzTmFOKG51bWJlcilcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcil7XG4gICAgcmV0dXJuIG51bWJlciAhPSBudW1iZXI7XG4gIH0sXG4gIC8vIDIwLjEuMi41IE51bWJlci5pc1NhZmVJbnRlZ2VyKG51bWJlcilcbiAgaXNTYWZlSW50ZWdlcjogZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpe1xuICAgIHJldHVybiBpc0ludGVnZXIobnVtYmVyKSAmJiBhYnMobnVtYmVyKSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xuICB9LFxuICAvLyAyMC4xLjIuNiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICBNQVhfU0FGRV9JTlRFR0VSOiBNQVhfU0FGRV9JTlRFR0VSLFxuICAvLyAyMC4xLjIuMTAgTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVJcbiAgTUlOX1NBRkVfSU5URUdFUjogLU1BWF9TQUZFX0lOVEVHRVIsXG4gIC8vIDIwLjEuMi4xMiBOdW1iZXIucGFyc2VGbG9hdChzdHJpbmcpXG4gIHBhcnNlRmxvYXQ6IHBhcnNlRmxvYXQsXG4gIC8vIDIwLjEuMi4xMyBOdW1iZXIucGFyc2VJbnQoc3RyaW5nLCByYWRpeClcbiAgcGFyc2VJbnQ6IHBhcnNlSW50XG59KTsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vJC5hc3NpZ24nKX0pOyIsIi8vIDE5LjEuMy4xMCBPYmplY3QuaXModmFsdWUxLCB2YWx1ZTIpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xuICBpczogcmVxdWlyZSgnLi8kLnNhbWUnKVxufSk7IiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXR9KTsiLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgaXNPYmplY3QgPSAkLmlzT2JqZWN0XG4gICwgdG9PYmplY3QgPSAkLnRvT2JqZWN0O1xuJC5lYWNoLmNhbGwoKCdmcmVlemUsc2VhbCxwcmV2ZW50RXh0ZW5zaW9ucyxpc0Zyb3plbixpc1NlYWxlZCxpc0V4dGVuc2libGUsJyArXG4gICdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsZ2V0UHJvdG90eXBlT2Ysa2V5cyxnZXRPd25Qcm9wZXJ0eU5hbWVzJykuc3BsaXQoJywnKVxuLCBmdW5jdGlvbihLRVksIElEKXtcbiAgdmFyIGZuICAgICA9ICgkLmNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBmb3JjZWQgPSAwXG4gICAgLCBtZXRob2QgPSB7fTtcbiAgbWV0aG9kW0tFWV0gPSBJRCA9PSAwID8gZnVuY3Rpb24gZnJlZXplKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogaXQ7XG4gIH0gOiBJRCA9PSAxID8gZnVuY3Rpb24gc2VhbChpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xuICB9IDogSUQgPT0gMiA/IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogaXQ7XG4gIH0gOiBJRCA9PSAzID8gZnVuY3Rpb24gaXNGcm96ZW4oaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiB0cnVlO1xuICB9IDogSUQgPT0gNCA/IGZ1bmN0aW9uIGlzU2VhbGVkKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogdHJ1ZTtcbiAgfSA6IElEID09IDUgPyBmdW5jdGlvbiBpc0V4dGVuc2libGUoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBmYWxzZTtcbiAgfSA6IElEID09IDYgPyBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gICAgcmV0dXJuIGZuKHRvT2JqZWN0KGl0KSwga2V5KTtcbiAgfSA6IElEID09IDcgPyBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuIGZuKE9iamVjdCgkLmFzc2VydERlZmluZWQoaXQpKSk7XG4gIH0gOiBJRCA9PSA4ID8gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuIGZuKHRvT2JqZWN0KGl0KSk7XG4gIH0gOiByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJykuZ2V0O1xuICB0cnkge1xuICAgIGZuKCd6Jyk7XG4gIH0gY2F0Y2goZSl7XG4gICAgZm9yY2VkID0gMTtcbiAgfVxuICAkZGVmKCRkZWYuUyArICRkZWYuRiAqIGZvcmNlZCwgJ09iamVjdCcsIG1ldGhvZCk7XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCB0bXAgPSB7fTtcbnRtcFtyZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYocmVxdWlyZSgnLi8kJykuRlcgJiYgY29mKHRtcCkgIT0gJ3onKXtcbiAgcmVxdWlyZSgnLi8kLnJlZGVmJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNvZi5jbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGN0eCAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY29mICAgICAgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCAkZGVmICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGFzc2VydCAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgZm9yT2YgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byA9IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXRcbiAgLCBzYW1lICAgICA9IHJlcXVpcmUoJy4vJC5zYW1lJylcbiAgLCBzcGVjaWVzICA9IHJlcXVpcmUoJy4vJC5zcGVjaWVzJylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgUkVDT1JEICAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgncmVjb3JkJylcbiAgLCBQUk9NSVNFICA9ICdQcm9taXNlJ1xuICAsIGdsb2JhbCAgID0gJC5nXG4gICwgcHJvY2VzcyAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgID0gY29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGFzYXAgICAgID0gcHJvY2VzcyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XG4gICwgUCAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBpc0Z1bmN0aW9uICAgICA9ICQuaXNGdW5jdGlvblxuICAsIGlzT2JqZWN0ICAgICAgID0gJC5pc09iamVjdFxuICAsIGFzc2VydEZ1bmN0aW9uID0gYXNzZXJ0LmZuXG4gICwgYXNzZXJ0T2JqZWN0ICAgPSBhc3NlcnQub2JqXG4gICwgV3JhcHBlcjtcblxuZnVuY3Rpb24gdGVzdFJlc29sdmUoc3ViKXtcbiAgdmFyIHRlc3QgPSBuZXcgUChmdW5jdGlvbigpe30pO1xuICBpZihzdWIpdGVzdC5jb25zdHJ1Y3RvciA9IE9iamVjdDtcbiAgcmV0dXJuIFAucmVzb2x2ZSh0ZXN0KSA9PT0gdGVzdDtcbn1cblxudmFyIHVzZU5hdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IGlzRnVuY3Rpb24oUCkgJiYgaXNGdW5jdGlvbihQLnJlc29sdmUpICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgJC5ERVNDKXtcbiAgICAgIHZhciB0aGVuYWJsZVRoZW5Hb3R0ZW4gPSBmYWxzZTtcbiAgICAgIFAucmVzb2x2ZSgkLnNldERlc2Moe30sICd0aGVuJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHRoZW5hYmxlVGhlbkdvdHRlbiA9IHRydWU7IH1cbiAgICAgIH0pKTtcbiAgICAgIHdvcmtzID0gdGhlbmFibGVUaGVuR290dGVuO1xuICAgIH1cbiAgfSBjYXRjaChlKXsgd29ya3MgPSBmYWxzZTsgfVxuICByZXR1cm4gd29ya3M7XG59KCk7XG5cbi8vIGhlbHBlcnNcbmZ1bmN0aW9uIGlzUHJvbWlzZShpdCl7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKHVzZU5hdGl2ZSA/IGNvZi5jbGFzc29mKGl0KSA9PSAnUHJvbWlzZScgOiBSRUNPUkQgaW4gaXQpO1xufVxuZnVuY3Rpb24gc2FtZUNvbnN0cnVjdG9yKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKCEkLkZXICYmIGEgPT09IFAgJiYgYiA9PT0gV3JhcHBlcilyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIHNhbWUoYSwgYik7XG59XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3RvcihDKXtcbiAgdmFyIFMgPSBhc3NlcnRPYmplY3QoQylbU1BFQ0lFU107XG4gIHJldHVybiBTICE9IHVuZGVmaW5lZCA/IFMgOiBDO1xufVxuZnVuY3Rpb24gaXNUaGVuYWJsZShpdCl7XG4gIHZhciB0aGVuO1xuICBpZihpc09iamVjdChpdCkpdGhlbiA9IGl0LnRoZW47XG4gIHJldHVybiBpc0Z1bmN0aW9uKHRoZW4pID8gdGhlbiA6IGZhbHNlO1xufVxuZnVuY3Rpb24gbm90aWZ5KHJlY29yZCl7XG4gIHZhciBjaGFpbiA9IHJlY29yZC5jO1xuICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gIGlmKGNoYWluLmxlbmd0aClhc2FwLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgZnVuY3Rpb24gcnVuKHJlYWN0KXtcbiAgICAgIHZhciBjYiA9IG9rID8gcmVhY3Qub2sgOiByZWFjdC5mYWlsXG4gICAgICAgICwgcmV0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoY2Ipe1xuICAgICAgICAgIGlmKCFvaylyZWNvcmQuaCA9IHRydWU7XG4gICAgICAgICAgcmV0ID0gY2IgPT09IHRydWUgPyB2YWx1ZSA6IGNiKHZhbHVlKTtcbiAgICAgICAgICBpZihyZXQgPT09IHJlYWN0LlApe1xuICAgICAgICAgICAgcmVhY3QucmVqKFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmV0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmV0LCByZWFjdC5yZXMsIHJlYWN0LnJlaik7XG4gICAgICAgICAgfSBlbHNlIHJlYWN0LnJlcyhyZXQpO1xuICAgICAgICB9IGVsc2UgcmVhY3QucmVqKHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICAgcmVhY3QucmVqKGVycik7XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIGNoYWluLmxlbmd0aCA9IDA7XG4gIH0pO1xufVxuZnVuY3Rpb24gaXNVbmhhbmRsZWQocHJvbWlzZSl7XG4gIHZhciByZWNvcmQgPSBwcm9taXNlW1JFQ09SRF1cbiAgICAsIGNoYWluICA9IHJlY29yZC5hIHx8IHJlY29yZC5jXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZWFjdDtcbiAgaWYocmVjb3JkLmgpcmV0dXJuIGZhbHNlO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdCA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3QuZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3QuUCkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gJHJlamVjdCh2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzXG4gICAgLCBwcm9taXNlO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgYXNhcC5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UgPSByZWNvcmQucCkpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWNvcmQuYSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfSwgMSk7XG4gIG5vdGlmeShyZWNvcmQpO1xufVxuZnVuY3Rpb24gJHJlc29sdmUodmFsdWUpe1xuICB2YXIgcmVjb3JkID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocmVjb3JkLmQpcmV0dXJuO1xuICByZWNvcmQuZCA9IHRydWU7XG4gIHJlY29yZCA9IHJlY29yZC5yIHx8IHJlY29yZDsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIGFzYXAuY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge3I6IHJlY29yZCwgZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC52ID0gdmFsdWU7XG4gICAgICByZWNvcmQucyA9IDE7XG4gICAgICBub3RpZnkocmVjb3JkKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtyOiByZWNvcmQsIGQ6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufVxuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIXVzZU5hdGl2ZSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFAgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhc3NlcnRGdW5jdGlvbihleGVjdXRvcik7XG4gICAgdmFyIHJlY29yZCA9IHtcbiAgICAgIHA6IGFzc2VydC5pbnN0KHRoaXMsIFAsIFBST01JU0UpLCAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgfTtcbiAgICAkLmhpZGUodGhpcywgUkVDT1JELCByZWNvcmQpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHJlY29yZCwgMSksIGN0eCgkcmVqZWN0LCByZWNvcmQsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwocmVjb3JkLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgcmVxdWlyZSgnLi8kLm1peCcpKFAucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciBTID0gYXNzZXJ0T2JqZWN0KGFzc2VydE9iamVjdCh0aGlzKS5jb25zdHJ1Y3RvcilbU1BFQ0lFU107XG4gICAgICB2YXIgcmVhY3QgPSB7XG4gICAgICAgIG9rOiAgIGlzRnVuY3Rpb24ob25GdWxmaWxsZWQpID8gb25GdWxmaWxsZWQgOiB0cnVlLFxuICAgICAgICBmYWlsOiBpc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpICA/IG9uUmVqZWN0ZWQgIDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgcHJvbWlzZSA9IHJlYWN0LlAgPSBuZXcgKFMgIT0gdW5kZWZpbmVkID8gUyA6IFApKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgcmVhY3QucmVzID0gYXNzZXJ0RnVuY3Rpb24ocmVzKTtcbiAgICAgICAgcmVhY3QucmVqID0gYXNzZXJ0RnVuY3Rpb24ocmVqKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlY29yZCA9IHRoaXNbUkVDT1JEXTtcbiAgICAgIHJlY29yZC5jLnB1c2gocmVhY3QpO1xuICAgICAgaWYocmVjb3JkLmEpcmVjb3JkLmEucHVzaChyZWFjdCk7XG4gICAgICBpZihyZWNvcmQucylub3RpZnkocmVjb3JkKTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBleHBvcnRcbiRkZWYoJGRlZi5HICsgJGRlZi5XICsgJGRlZi5GICogIXVzZU5hdGl2ZSwge1Byb21pc2U6IFB9KTtcbmNvZi5zZXQoUCwgUFJPTUlTRSk7XG5zcGVjaWVzKFApO1xuc3BlY2llcyhXcmFwcGVyID0gJC5jb3JlW1BST01JU0VdKTtcblxuLy8gc3RhdGljc1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHJldHVybiBuZXcgKGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXMsIHJlail7IHJlaihyKTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAoIXVzZU5hdGl2ZSB8fCB0ZXN0UmVzb2x2ZSh0cnVlKSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgcmV0dXJuIGlzUHJvbWlzZSh4KSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcylcbiAgICAgID8geCA6IG5ldyB0aGlzKGZ1bmN0aW9uKHJlcyl7IHJlcyh4KTsgfSk7XG4gIH1cbn0pO1xuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhKHVzZU5hdGl2ZSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgPSBnZXRDb25zdHJ1Y3Rvcih0aGlzKVxuICAgICAgLCB2YWx1ZXMgPSBbXTtcbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCB2YWx1ZXMucHVzaCwgdmFsdWVzKTtcbiAgICAgIHZhciByZW1haW5pbmcgPSB2YWx1ZXMubGVuZ3RoXG4gICAgICAgICwgcmVzdWx0cyAgID0gQXJyYXkocmVtYWluaW5nKTtcbiAgICAgIGlmKHJlbWFpbmluZykkLmVhY2guY2FsbCh2YWx1ZXMsIGZ1bmN0aW9uKHByb21pc2UsIGluZGV4KXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzKHJlc3VsdHMpO1xuICAgICAgICB9LCByZWopO1xuICAgICAgfSk7XG4gICAgICBlbHNlIHJlcyhyZXN1bHRzKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyA9IGdldENvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXMsIHJlaik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSk7IiwidmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgc2V0UHJvdG8gID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpXG4gICwgJGl0ZXIgICAgID0gcmVxdWlyZSgnLi8kLml0ZXInKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIElURVIgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcbiAgLCBzdGVwICAgICAgPSAkaXRlci5zdGVwXG4gICwgYXNzZXJ0ICAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpXG4gICwgaXNPYmplY3QgID0gJC5pc09iamVjdFxuICAsIGdldFByb3RvICA9ICQuZ2V0UHJvdG9cbiAgLCAkUmVmbGVjdCAgPSAkLmcuUmVmbGVjdFxuICAsIF9hcHBseSAgICA9IEZ1bmN0aW9uLmFwcGx5XG4gICwgYXNzZXJ0T2JqZWN0ID0gYXNzZXJ0Lm9ialxuICAsIF9pc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgX3ByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zXG4gIC8vIElFIFRQIGhhcyBicm9rZW4gUmVmbGVjdC5lbnVtZXJhdGVcbiAgLCBidWdneUVudW1lcmF0ZSA9ICEoJFJlZmxlY3QgJiYgJFJlZmxlY3QuZW51bWVyYXRlICYmIElURVJBVE9SIGluICRSZWZsZWN0LmVudW1lcmF0ZSh7fSkpO1xuXG5mdW5jdGlvbiBFbnVtZXJhdGUoaXRlcmF0ZWQpe1xuICAkLnNldCh0aGlzLCBJVEVSLCB7bzogaXRlcmF0ZWQsIGs6IHVuZGVmaW5lZCwgaTogMH0pO1xufVxuJGl0ZXIuY3JlYXRlKEVudW1lcmF0ZSwgJ09iamVjdCcsIGZ1bmN0aW9uKCl7XG4gIHZhciBpdGVyID0gdGhpc1tJVEVSXVxuICAgICwga2V5cyA9IGl0ZXIua1xuICAgICwga2V5O1xuICBpZihrZXlzID09IHVuZGVmaW5lZCl7XG4gICAgaXRlci5rID0ga2V5cyA9IFtdO1xuICAgIGZvcihrZXkgaW4gaXRlci5vKWtleXMucHVzaChrZXkpO1xuICB9XG4gIGRvIHtcbiAgICBpZihpdGVyLmkgPj0ga2V5cy5sZW5ndGgpcmV0dXJuIHN0ZXAoMSk7XG4gIH0gd2hpbGUoISgoa2V5ID0ga2V5c1tpdGVyLmkrK10pIGluIGl0ZXIubykpO1xuICByZXR1cm4gc3RlcCgwLCBrZXkpO1xufSk7XG5cbnZhciByZWZsZWN0ID0ge1xuICAvLyAyNi4xLjEgUmVmbGVjdC5hcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdClcbiAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KXtcbiAgICByZXR1cm4gX2FwcGx5LmNhbGwodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpO1xuICB9LFxuICAvLyAyNi4xLjIgUmVmbGVjdC5jb25zdHJ1Y3QodGFyZ2V0LCBhcmd1bWVudHNMaXN0IFssIG5ld1RhcmdldF0pXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KHRhcmdldCwgYXJndW1lbnRzTGlzdCAvKiwgbmV3VGFyZ2V0Ki8pe1xuICAgIHZhciBwcm90byAgICA9IGFzc2VydC5mbihhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHRhcmdldCA6IGFyZ3VtZW50c1syXSkucHJvdG90eXBlXG4gICAgICAsIGluc3RhbmNlID0gJC5jcmVhdGUoaXNPYmplY3QocHJvdG8pID8gcHJvdG8gOiBPYmplY3QucHJvdG90eXBlKVxuICAgICAgLCByZXN1bHQgICA9IF9hcHBseS5jYWxsKHRhcmdldCwgaW5zdGFuY2UsIGFyZ3VtZW50c0xpc3QpO1xuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogaW5zdGFuY2U7XG4gIH0sXG4gIC8vIDI2LjEuMyBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKXtcbiAgICBhc3NlcnRPYmplY3QodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgJC5zZXREZXNjKHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIC8vIDI2LjEuNCBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpXG4gIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICB2YXIgZGVzYyA9ICQuZ2V0RGVzYyhhc3NlcnRPYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpO1xuICAgIHJldHVybiBkZXNjICYmICFkZXNjLmNvbmZpZ3VyYWJsZSA/IGZhbHNlIDogZGVsZXRlIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIH0sXG4gIC8vIDI2LjEuNiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5S2V5IFssIHJlY2VpdmVyXSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQodGFyZ2V0LCBwcm9wZXJ0eUtleS8qLCByZWNlaXZlciovKXtcbiAgICB2YXIgcmVjZWl2ZXIgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHRhcmdldCA6IGFyZ3VtZW50c1syXVxuICAgICAgLCBkZXNjID0gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSksIHByb3RvO1xuICAgIGlmKGRlc2MpcmV0dXJuICQuaGFzKGRlc2MsICd2YWx1ZScpXG4gICAgICA/IGRlc2MudmFsdWVcbiAgICAgIDogZGVzYy5nZXQgPT09IHVuZGVmaW5lZFxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6IGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpO1xuICAgIHJldHVybiBpc09iamVjdChwcm90byA9IGdldFByb3RvKHRhcmdldCkpXG4gICAgICA/IGdldChwcm90bywgcHJvcGVydHlLZXksIHJlY2VpdmVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH0sXG4gIC8vIDI2LjEuNyBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICByZXR1cm4gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gIH0sXG4gIC8vIDI2LjEuOCBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClcbiAgZ2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKHRhcmdldCl7XG4gICAgcmV0dXJuIGdldFByb3RvKGFzc2VydE9iamVjdCh0YXJnZXQpKTtcbiAgfSxcbiAgLy8gMjYuMS45IFJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpXG4gIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHJldHVybiBwcm9wZXJ0eUtleSBpbiB0YXJnZXQ7XG4gIH0sXG4gIC8vIDI2LjEuMTAgUmVmbGVjdC5pc0V4dGVuc2libGUodGFyZ2V0KVxuICBpc0V4dGVuc2libGU6IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZSh0YXJnZXQpe1xuICAgIHJldHVybiBfaXNFeHRlbnNpYmxlKGFzc2VydE9iamVjdCh0YXJnZXQpKTtcbiAgfSxcbiAgLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxuICBvd25LZXlzOiByZXF1aXJlKCcuLyQub3duLWtleXMnKSxcbiAgLy8gMjYuMS4xMiBSZWZsZWN0LnByZXZlbnRFeHRlbnNpb25zKHRhcmdldClcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCl7XG4gICAgYXNzZXJ0T2JqZWN0KHRhcmdldCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmKF9wcmV2ZW50RXh0ZW5zaW9ucylfcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuICAvLyAyNi4xLjEzIFJlZmxlY3Quc2V0KHRhcmdldCwgcHJvcGVydHlLZXksIFYgWywgcmVjZWl2ZXJdKVxuICBzZXQ6IGZ1bmN0aW9uIHNldCh0YXJnZXQsIHByb3BlcnR5S2V5LCBWLyosIHJlY2VpdmVyKi8pe1xuICAgIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCA0ID8gdGFyZ2V0IDogYXJndW1lbnRzWzNdXG4gICAgICAsIG93bkRlc2MgID0gJC5nZXREZXNjKGFzc2VydE9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSlcbiAgICAgICwgZXhpc3RpbmdEZXNjcmlwdG9yLCBwcm90bztcbiAgICBpZighb3duRGVzYyl7XG4gICAgICBpZihpc09iamVjdChwcm90byA9IGdldFByb3RvKHRhcmdldCkpKXtcbiAgICAgICAgcmV0dXJuIHNldChwcm90bywgcHJvcGVydHlLZXksIFYsIHJlY2VpdmVyKTtcbiAgICAgIH1cbiAgICAgIG93bkRlc2MgPSAkLmRlc2MoMCk7XG4gICAgfVxuICAgIGlmKCQuaGFzKG93bkRlc2MsICd2YWx1ZScpKXtcbiAgICAgIGlmKG93bkRlc2Mud3JpdGFibGUgPT09IGZhbHNlIHx8ICFpc09iamVjdChyZWNlaXZlcikpcmV0dXJuIGZhbHNlO1xuICAgICAgZXhpc3RpbmdEZXNjcmlwdG9yID0gJC5nZXREZXNjKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSkgfHwgJC5kZXNjKDApO1xuICAgICAgZXhpc3RpbmdEZXNjcmlwdG9yLnZhbHVlID0gVjtcbiAgICAgICQuc2V0RGVzYyhyZWNlaXZlciwgcHJvcGVydHlLZXksIGV4aXN0aW5nRGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG93bkRlc2Muc2V0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IChvd25EZXNjLnNldC5jYWxsKHJlY2VpdmVyLCBWKSwgdHJ1ZSk7XG4gIH1cbn07XG4vLyAyNi4xLjE0IFJlZmxlY3Quc2V0UHJvdG90eXBlT2YodGFyZ2V0LCBwcm90bylcbmlmKHNldFByb3RvKXJlZmxlY3Quc2V0UHJvdG90eXBlT2YgPSBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKXtcbiAgc2V0UHJvdG8uY2hlY2sodGFyZ2V0LCBwcm90byk7XG4gIHRyeSB7XG4gICAgc2V0UHJvdG8uc2V0KHRhcmdldCwgcHJvdG8pO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuJGRlZigkZGVmLkcsIHtSZWZsZWN0OiB7fX0pO1xuXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqIGJ1Z2d5RW51bWVyYXRlLCAnUmVmbGVjdCcsIHtcbiAgLy8gMjYuMS41IFJlZmxlY3QuZW51bWVyYXRlKHRhcmdldClcbiAgZW51bWVyYXRlOiBmdW5jdGlvbiBlbnVtZXJhdGUodGFyZ2V0KXtcbiAgICByZXR1cm4gbmV3IEVudW1lcmF0ZShhc3NlcnRPYmplY3QodGFyZ2V0KSk7XG4gIH1cbn0pO1xuXG4kZGVmKCRkZWYuUywgJ1JlZmxlY3QnLCByZWZsZWN0KTsiLCJ2YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRSZWdFeHAgPSAkLmcuUmVnRXhwXG4gICwgQmFzZSAgICA9ICRSZWdFeHBcbiAgLCBwcm90byAgID0gJFJlZ0V4cC5wcm90b3R5cGVcbiAgLCByZSAgICAgID0gL2EvZ1xuICAvLyBcIm5ld1wiIGNyZWF0ZXMgYSBuZXcgb2JqZWN0XG4gICwgQ09SUkVDVF9ORVcgPSBuZXcgJFJlZ0V4cChyZSkgIT09IHJlXG4gIC8vIFJlZ0V4cCBhbGxvd3MgYSByZWdleCB3aXRoIGZsYWdzIGFzIHRoZSBwYXR0ZXJuXG4gICwgQUxMT1dTX1JFX1dJVEhfRkxBR1MgPSBmdW5jdGlvbigpe1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gJFJlZ0V4cChyZSwgJ2knKSA9PSAnL2EvaSc7XG4gICAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICB9KCk7XG5pZigkLkZXICYmICQuREVTQyl7XG4gIGlmKCFDT1JSRUNUX05FVyB8fCAhQUxMT1dTX1JFX1dJVEhfRkxBR1Mpe1xuICAgICRSZWdFeHAgPSBmdW5jdGlvbiBSZWdFeHAocGF0dGVybiwgZmxhZ3Mpe1xuICAgICAgdmFyIHBhdHRlcm5Jc1JlZ0V4cCAgPSBjb2YocGF0dGVybikgPT0gJ1JlZ0V4cCdcbiAgICAgICAgLCBmbGFnc0lzVW5kZWZpbmVkID0gZmxhZ3MgPT09IHVuZGVmaW5lZDtcbiAgICAgIGlmKCEodGhpcyBpbnN0YW5jZW9mICRSZWdFeHApICYmIHBhdHRlcm5Jc1JlZ0V4cCAmJiBmbGFnc0lzVW5kZWZpbmVkKXJldHVybiBwYXR0ZXJuO1xuICAgICAgcmV0dXJuIENPUlJFQ1RfTkVXXG4gICAgICAgID8gbmV3IEJhc2UocGF0dGVybklzUmVnRXhwICYmICFmbGFnc0lzVW5kZWZpbmVkID8gcGF0dGVybi5zb3VyY2UgOiBwYXR0ZXJuLCBmbGFncylcbiAgICAgICAgOiBuZXcgQmFzZShwYXR0ZXJuSXNSZWdFeHAgPyBwYXR0ZXJuLnNvdXJjZSA6IHBhdHRlcm5cbiAgICAgICAgICAsIHBhdHRlcm5Jc1JlZ0V4cCAmJiBmbGFnc0lzVW5kZWZpbmVkID8gcGF0dGVybi5mbGFncyA6IGZsYWdzKTtcbiAgICB9O1xuICAgICQuZWFjaC5jYWxsKCQuZ2V0TmFtZXMoQmFzZSksIGZ1bmN0aW9uKGtleSl7XG4gICAgICBrZXkgaW4gJFJlZ0V4cCB8fCAkLnNldERlc2MoJFJlZ0V4cCwga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gQmFzZVtrZXldOyB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGl0KXsgQmFzZVtrZXldID0gaXQ7IH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHByb3RvLmNvbnN0cnVjdG9yID0gJFJlZ0V4cDtcbiAgICAkUmVnRXhwLnByb3RvdHlwZSA9IHByb3RvO1xuICAgIHJlcXVpcmUoJy4vJC5yZWRlZicpKCQuZywgJ1JlZ0V4cCcsICRSZWdFeHApO1xuICB9XG4gIC8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzKClcbiAgaWYoLy4vZy5mbGFncyAhPSAnZycpJC5zZXREZXNjKHByb3RvLCAnZmxhZ3MnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogcmVxdWlyZSgnLi8kLnJlcGxhY2VyJykoL14uKlxcLyhcXHcqKSQvLCAnJDEnKVxuICB9KTtcbn1cbnJlcXVpcmUoJy4vJC5zcGVjaWVzJykoJFJlZ0V4cCk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4yIFNldCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzWzBdKTsgfTtcbn0sIHtcbiAgLy8gMjMuMi4zLjEgU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCB2YWx1ZSA9IHZhbHVlID09PSAwID8gMCA6IHZhbHVlLCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZyk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkYXQgID0gcmVxdWlyZSgnLi8kLnN0cmluZy1hdCcpKGZhbHNlKTtcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMyBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0KHBvcylcbiAgY29kZVBvaW50QXQ6IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHBvcyl7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0xlbmd0aCA9ICQudG9MZW5ndGg7XG5cbi8vIHNob3VsZCB0aHJvdyBlcnJvciBvbiByZWdleFxuJGRlZigkZGVmLlAgKyAkZGVmLkYgKiAhcmVxdWlyZSgnLi8kLnRocm93cycpKGZ1bmN0aW9uKCl7ICdxJy5lbmRzV2l0aCgvLi8pOyB9KSwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjYgU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aChzZWFyY2hTdHJpbmcgWywgZW5kUG9zaXRpb25dKVxuICBlbmRzV2l0aDogZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBlbmRQb3NpdGlvbiA9IEBsZW5ndGggKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHZhciB0aGF0ID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcbiAgICAgICwgZW5kUG9zaXRpb24gPSBhcmd1bWVudHNbMV1cbiAgICAgICwgbGVuID0gdG9MZW5ndGgodGhhdC5sZW5ndGgpXG4gICAgICAsIGVuZCA9IGVuZFBvc2l0aW9uID09PSB1bmRlZmluZWQgPyBsZW4gOiBNYXRoLm1pbih0b0xlbmd0aChlbmRQb3NpdGlvbiksIGxlbik7XG4gICAgc2VhcmNoU3RyaW5nICs9ICcnO1xuICAgIHJldHVybiB0aGF0LnNsaWNlKGVuZCAtIHNlYXJjaFN0cmluZy5sZW5ndGgsIGVuZCkgPT09IHNlYXJjaFN0cmluZztcbiAgfVxufSk7IiwidmFyICRkZWYgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCB0b0luZGV4ID0gcmVxdWlyZSgnLi8kJykudG9JbmRleFxuICAsIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgLCAkZnJvbUNvZGVQb2ludCA9IFN0cmluZy5mcm9tQ29kZVBvaW50O1xuXG4vLyBsZW5ndGggc2hvdWxkIGJlIDEsIG9sZCBGRiBwcm9ibGVtXG4kZGVmKCRkZWYuUyArICRkZWYuRiAqICghISRmcm9tQ29kZVBvaW50ICYmICRmcm9tQ29kZVBvaW50Lmxlbmd0aCAhPSAxKSwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4yLjIgU3RyaW5nLmZyb21Db2RlUG9pbnQoLi4uY29kZVBvaW50cylcbiAgZnJvbUNvZGVQb2ludDogZnVuY3Rpb24gZnJvbUNvZGVQb2ludCh4KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciByZXMgPSBbXVxuICAgICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGkgICA9IDBcbiAgICAgICwgY29kZTtcbiAgICB3aGlsZShsZW4gPiBpKXtcbiAgICAgIGNvZGUgPSArYXJndW1lbnRzW2krK107XG4gICAgICBpZih0b0luZGV4KGNvZGUsIDB4MTBmZmZmKSAhPT0gY29kZSl0aHJvdyBSYW5nZUVycm9yKGNvZGUgKyAnIGlzIG5vdCBhIHZhbGlkIGNvZGUgcG9pbnQnKTtcbiAgICAgIHJlcy5wdXNoKGNvZGUgPCAweDEwMDAwXG4gICAgICAgID8gZnJvbUNoYXJDb2RlKGNvZGUpXG4gICAgICAgIDogZnJvbUNoYXJDb2RlKCgoY29kZSAtPSAweDEwMDAwKSA+PiAxMCkgKyAweGQ4MDAsIGNvZGUgJSAweDQwMCArIDB4ZGMwMClcbiAgICAgICk7XG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY29mICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG5cbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuNyBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKHNlYXJjaFN0cmluZywgcG9zaXRpb24gPSAwKVxuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHJldHVybiAhIX5TdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKS5pbmRleE9mKHNlYXJjaFN0cmluZywgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwidmFyIHNldCAgID0gcmVxdWlyZSgnLi8kJykuc2V0XG4gICwgJGF0ICAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSlcbiAgLCBJVEVSICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJylcbiAgLCBzdGVwICA9ICRpdGVyLnN0ZXA7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgc2V0KHRoaXMsIElURVIsIHtvOiBTdHJpbmcoaXRlcmF0ZWQpLCBpOiAwfSk7XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgaXRlciAgPSB0aGlzW0lURVJdXG4gICAgLCBPICAgICA9IGl0ZXIub1xuICAgICwgaW5kZXggPSBpdGVyLmlcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4gc3RlcCgxKTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICBpdGVyLmkgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4gc3RlcCgwLCBwb2ludCk7XG59KTsiLCJ2YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi40IFN0cmluZy5yYXcoY2FsbFNpdGUsIC4uLnN1YnN0aXR1dGlvbnMpXG4gIHJhdzogZnVuY3Rpb24gcmF3KGNhbGxTaXRlKXtcbiAgICB2YXIgdHBsID0gJC50b09iamVjdChjYWxsU2l0ZS5yYXcpXG4gICAgICAsIGxlbiA9ICQudG9MZW5ndGgodHBsLmxlbmd0aClcbiAgICAgICwgc2xuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCByZXMgPSBbXVxuICAgICAgLCBpICAgPSAwO1xuICAgIHdoaWxlKGxlbiA+IGkpe1xuICAgICAgcmVzLnB1c2goU3RyaW5nKHRwbFtpKytdKSk7XG4gICAgICBpZihpIDwgc2xuKXJlcy5wdXNoKFN0cmluZyhhcmd1bWVudHNbaV0pKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsInZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjEzIFN0cmluZy5wcm90b3R5cGUucmVwZWF0KGNvdW50KVxuICByZXBlYXQ6IHJlcXVpcmUoJy4vJC5zdHJpbmctcmVwZWF0Jylcbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjb2YgID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuLy8gc2hvdWxkIHRocm93IGVycm9yIG9uIHJlZ2V4XG4kZGVmKCRkZWYuUCArICRkZWYuRiAqICFyZXF1aXJlKCcuLyQudGhyb3dzJykoZnVuY3Rpb24oKXsgJ3EnLnN0YXJ0c1dpdGgoLy4vKTsgfSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4gIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIGlmKGNvZihzZWFyY2hTdHJpbmcpID09ICdSZWdFeHAnKXRocm93IFR5cGVFcnJvcigpO1xuICAgIHZhciB0aGF0ICA9IFN0cmluZygkLmFzc2VydERlZmluZWQodGhpcykpXG4gICAgICAsIGluZGV4ID0gJC50b0xlbmd0aChNYXRoLm1pbihhcmd1bWVudHNbMV0sIHRoYXQubGVuZ3RoKSk7XG4gICAgc2VhcmNoU3RyaW5nICs9ICcnO1xuICAgIHJldHVybiB0aGF0LnNsaWNlKGluZGV4LCBpbmRleCArIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgc2V0VGFnICAgPSByZXF1aXJlKCcuLyQuY29mJykuc2V0XG4gICwgdWlkICAgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBzaGFyZWQgICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKVxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHJlZGVmICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGtleU9mICAgID0gcmVxdWlyZSgnLi8kLmtleW9mJylcbiAgLCBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKVxuICAsIGFzc2VydE9iamVjdCA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmpcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGVcbiAgLCBERVNDICAgICA9ICQuREVTQ1xuICAsIGhhcyAgICAgID0gJC5oYXNcbiAgLCAkY3JlYXRlICA9ICQuY3JlYXRlXG4gICwgZ2V0RGVzYyAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICA9ICQuc2V0RGVzY1xuICAsIGRlc2MgICAgID0gJC5kZXNjXG4gICwgJG5hbWVzICAgPSByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJylcbiAgLCBnZXROYW1lcyA9ICRuYW1lcy5nZXRcbiAgLCB0b09iamVjdCA9ICQudG9PYmplY3RcbiAgLCAkU3ltYm9sICA9ICQuZy5TeW1ib2xcbiAgLCBzZXR0ZXIgICA9IGZhbHNlXG4gICwgVEFHICAgICAgPSB1aWQoJ3RhZycpXG4gICwgSElEREVOICAgPSB1aWQoJ2hpZGRlbicpXG4gICwgX3Byb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCB1c2VOYXRpdmUgPSAkLmlzRnVuY3Rpb24oJFN5bWJvbCk7XG5cbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQyA/IGZ1bmN0aW9uKCl7IC8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZFxuICB0cnkge1xuICAgIHJldHVybiAkY3JlYXRlKHNldERlc2Moe30sIEhJRERFTiwge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gc2V0RGVzYyh0aGlzLCBISURERU4sIHt2YWx1ZTogZmFsc2V9KVtISURERU5dO1xuICAgICAgfVxuICAgIH0pKVtISURERU5dIHx8IHNldERlc2M7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICAgICAgdmFyIHByb3RvRGVzYyA9IGdldERlc2MoT2JqZWN0UHJvdG8sIGtleSk7XG4gICAgICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gICAgICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICAgICAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylzZXREZXNjKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG4gICAgfTtcbiAgfVxufSgpIDogc2V0RGVzYztcblxuZnVuY3Rpb24gd3JhcCh0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gJC5zZXQoJGNyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSksIFRBRywgdGFnKTtcbiAgREVTQyAmJiBzZXR0ZXIgJiYgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGRlc2MoMSwgdmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3ltO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKXNldERlc2MoaXQsIEhJRERFTiwgZGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSAkY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBkZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIHNldERlc2MoaXQsIGtleSwgRCk7XG59XG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYXNzZXJ0T2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9PYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKWRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyAkY3JlYXRlKGl0KSA6IGRlZmluZVByb3BlcnRpZXMoJGNyZWF0ZShpdCksIFApO1xufVxuZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBfcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0aGlzLCBrZXkpO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldXG4gICAgPyBFIDogdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgdmFyIEQgPSBnZXREZXNjKGl0ID0gdG9PYmplY3QoaXQpLCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOKXJlc3VsdC5wdXNoKGtleSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ2V0TmFtZXModG9PYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighdXNlTmF0aXZlKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgcmV0dXJuIHdyYXAodWlkKGFyZ3VtZW50c1swXSkpO1xuICB9O1xuICAkcmVkZWYoJFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXNbVEFHXTtcbiAgfSk7XG5cbiAgJC5jcmVhdGUgICAgID0gY3JlYXRlO1xuICAkLnNldERlc2MgICAgPSBkZWZpbmVQcm9wZXJ0eTtcbiAgJC5nZXREZXNjICAgID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkLnNldERlc2NzICAgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuICAkLmdldE5hbWVzICAgPSAkbmFtZXMuZ2V0ID0gZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKCQuREVTQyAmJiAkLkZXKSRyZWRlZihPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xufVxuXG52YXIgc3ltYm9sU3RhdGljcyA9IHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICByZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufTtcbi8vIDE5LjQuMi4yIFN5bWJvbC5oYXNJbnN0YW5jZVxuLy8gMTkuNC4yLjMgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZVxuLy8gMTkuNC4yLjQgU3ltYm9sLml0ZXJhdG9yXG4vLyAxOS40LjIuNiBTeW1ib2wubWF0Y2hcbi8vIDE5LjQuMi44IFN5bWJvbC5yZXBsYWNlXG4vLyAxOS40LjIuOSBTeW1ib2wuc2VhcmNoXG4vLyAxOS40LjIuMTAgU3ltYm9sLnNwZWNpZXNcbi8vIDE5LjQuMi4xMSBTeW1ib2wuc3BsaXRcbi8vIDE5LjQuMi4xMiBTeW1ib2wudG9QcmltaXRpdmVcbi8vIDE5LjQuMi4xMyBTeW1ib2wudG9TdHJpbmdUYWdcbi8vIDE5LjQuMi4xNCBTeW1ib2wudW5zY29wYWJsZXNcbiQuZWFjaC5jYWxsKChcbiAgICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLCcgK1xuICAgICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuICApLnNwbGl0KCcsJyksIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgc3ltID0gcmVxdWlyZSgnLi8kLndrcycpKGl0KTtcbiAgICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcbiAgfVxuKTtcblxuc2V0dGVyID0gdHJ1ZTtcblxuJGRlZigkZGVmLkcgKyAkZGVmLlcsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuJGRlZigkZGVmLlMsICdTeW1ib2wnLCBzeW1ib2xTdGF0aWNzKTtcblxuJGRlZigkZGVmLlMgKyAkZGVmLkYgKiAhdXNlTmF0aXZlLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6IGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiBkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiBnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRhZygkLmcuSlNPTiwgJ0pTT04nLCB0cnVlKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCB3ZWFrICAgICAgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi13ZWFrJylcbiAgLCBsZWFrU3RvcmUgPSB3ZWFrLmxlYWtTdG9yZVxuICAsIElEICAgICAgICA9IHdlYWsuSURcbiAgLCBXRUFLICAgICAgPSB3ZWFrLldFQUtcbiAgLCBoYXMgICAgICAgPSAkLmhhc1xuICAsIGlzT2JqZWN0ICA9ICQuaXNPYmplY3RcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGlzT2JqZWN0XG4gICwgdG1wICAgICAgID0ge307XG5cbi8vIDIzLjMgV2Vha01hcCBPYmplY3RzXG52YXIgJFdlYWtNYXAgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdXZWFrTWFwJywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHNbMF0pOyB9O1xufSwge1xuICAvLyAyMy4zLjMuMyBXZWFrTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIGlmKGlzT2JqZWN0KGtleSkpe1xuICAgICAgaWYoIWlzRXh0ZW5zaWJsZShrZXkpKXJldHVybiBsZWFrU3RvcmUodGhpcykuZ2V0KGtleSk7XG4gICAgICBpZihoYXMoa2V5LCBXRUFLKSlyZXR1cm4ga2V5W1dFQUtdW3RoaXNbSURdXTtcbiAgICB9XG4gIH0sXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHdlYWssIHRydWUsIHRydWUpO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG5pZihuZXcgJFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcbiAgJC5lYWNoLmNhbGwoWydkZWxldGUnLCAnaGFzJywgJ2dldCcsICdzZXQnXSwgZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgcHJvdG8gID0gJFdlYWtNYXAucHJvdG90eXBlXG4gICAgICAsIG1ldGhvZCA9IHByb3RvW2tleV07XG4gICAgcmVxdWlyZSgnLi8kLnJlZGVmJykocHJvdG8sIGtleSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAvLyBzdG9yZSBmcm96ZW4gb2JqZWN0cyBvbiBsZWFreSBtYXBcbiAgICAgIGlmKGlzT2JqZWN0KGEpICYmICFpc0V4dGVuc2libGUoYSkpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gbGVha1N0b3JlKHRoaXMpW2tleV0oYSwgYik7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgLy8gc3RvcmUgYWxsIHRoZSByZXN0IG9uIG5hdGl2ZSB3ZWFrbWFwXG4gICAgICB9IHJldHVybiBtZXRob2QuY2FsbCh0aGlzLCBhLCBiKTtcbiAgICB9KTtcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlYWsgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi13ZWFrJyk7XG5cbi8vIDIzLjQgV2Vha1NldCBPYmplY3RzXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbicpKCdXZWFrU2V0JywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHNbMF0pOyB9O1xufSwge1xuICAvLyAyMy40LjMuMSBXZWFrU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywgdmFsdWUsIHRydWUpO1xuICB9XG59LCB3ZWFrLCBmYWxzZSwgdHJ1ZSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWYgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4vJC5hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuJGRlZigkZGVmLlAsICdBcnJheScsIHtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2RvbWVuaWMvQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiwgZnJvbUluZGV4ID0gMCAqLyl7XG4gICAgcmV0dXJuICRpbmNsdWRlcyh0aGlzLCBlbCwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuLyQudW5zY29wZScpKCdpbmNsdWRlcycpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJyk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi85MzUzNzgxXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIG93bktleXMgPSByZXF1aXJlKCcuLyQub3duLWtleXMnKTtcblxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgID0gJC50b09iamVjdChvYmplY3QpXG4gICAgICAsIHJlc3VsdCA9IHt9O1xuICAgICQuZWFjaC5jYWxsKG93bktleXMoTyksIGZ1bmN0aW9uKGtleSl7XG4gICAgICAkLnNldERlc2MocmVzdWx0LCBrZXksICQuZGVzYygwLCAkLmdldERlc2MoTywga2V5KSkpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pOyIsIi8vIGh0dHA6Ly9nb28uZ2wvWGtCcmpEXG52YXIgJCAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdFRvQXJyYXkoaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgdmFyIE8gICAgICA9ICQudG9PYmplY3Qob2JqZWN0KVxuICAgICAgLCBrZXlzICAgPSAkLmdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBBcnJheShsZW5ndGgpXG4gICAgICAsIGtleTtcbiAgICBpZihpc0VudHJpZXMpd2hpbGUobGVuZ3RoID4gaSlyZXN1bHRbaV0gPSBba2V5ID0ga2V5c1tpKytdLCBPW2tleV1dO1xuICAgIGVsc2Ugd2hpbGUobGVuZ3RoID4gaSlyZXN1bHRbaV0gPSBPW2tleXNbaSsrXV07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge1xuICB2YWx1ZXM6ICBjcmVhdGVPYmplY3RUb0FycmF5KGZhbHNlKSxcbiAgZW50cmllczogY3JlYXRlT2JqZWN0VG9BcnJheSh0cnVlKVxufSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JlbmphbWluZ3IvUmV4RXhwLmVzY2FwZVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ1JlZ0V4cCcsIHtcbiAgZXNjYXBlOiByZXF1aXJlKCcuLyQucmVwbGFjZXInKSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnLCB0cnVlKVxufSk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG5yZXF1aXJlKCcuLyQuY29sbGVjdGlvbi10by1qc29uJykoJ1NldCcpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbid1c2Ugc3RyaWN0JztcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcbiRkZWYoJGRlZi5QLCAnU3RyaW5nJywge1xuICBhdDogZnVuY3Rpb24gYXQocG9zKXtcbiAgICByZXR1cm4gJGF0KHRoaXMsIHBvcyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgJHBhZCA9IHJlcXVpcmUoJy4vJC5zdHJpbmctcGFkJyk7XG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgbHBhZDogZnVuY3Rpb24gbHBhZChuKXtcbiAgICByZXR1cm4gJHBhZCh0aGlzLCBuLCBhcmd1bWVudHNbMV0sIHRydWUpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRwYWQgPSByZXF1aXJlKCcuLyQuc3RyaW5nLXBhZCcpO1xuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIHJwYWQ6IGZ1bmN0aW9uIHJwYWQobil7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbiwgYXJndW1lbnRzWzFdLCBmYWxzZSk7XG4gIH1cbn0pOyIsIi8vIEphdmFTY3JpcHQgMS42IC8gU3RyYXdtYW4gYXJyYXkgc3RhdGljcyBzaGltXG52YXIgJCAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgJGRlZiAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRBcnJheSAgPSAkLmNvcmUuQXJyYXkgfHwgQXJyYXlcbiAgLCBzdGF0aWNzID0ge307XG5mdW5jdGlvbiBzZXRTdGF0aWNzKGtleXMsIGxlbmd0aCl7XG4gICQuZWFjaC5jYWxsKGtleXMuc3BsaXQoJywnKSwgZnVuY3Rpb24oa2V5KXtcbiAgICBpZihsZW5ndGggPT0gdW5kZWZpbmVkICYmIGtleSBpbiAkQXJyYXkpc3RhdGljc1trZXldID0gJEFycmF5W2tleV07XG4gICAgZWxzZSBpZihrZXkgaW4gW10pc3RhdGljc1trZXldID0gcmVxdWlyZSgnLi8kLmN0eCcpKEZ1bmN0aW9uLmNhbGwsIFtdW2tleV0sIGxlbmd0aCk7XG4gIH0pO1xufVxuc2V0U3RhdGljcygncG9wLHJldmVyc2Usc2hpZnQsa2V5cyx2YWx1ZXMsZW50cmllcycsIDEpO1xuc2V0U3RhdGljcygnaW5kZXhPZixldmVyeSxzb21lLGZvckVhY2gsbWFwLGZpbHRlcixmaW5kLGZpbmRJbmRleCxpbmNsdWRlcycsIDMpO1xuc2V0U3RhdGljcygnam9pbixzbGljZSxjb25jYXQscHVzaCxzcGxpY2UsdW5zaGlmdCxzb3J0LGxhc3RJbmRleE9mLCcgK1xuICAgICAgICAgICAncmVkdWNlLHJlZHVjZVJpZ2h0LGNvcHlXaXRoaW4sZmlsbCx0dXJuJyk7XG4kZGVmKCRkZWYuUywgJ0FycmF5Jywgc3RhdGljcyk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciAkICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgSXRlcmF0b3JzICAgPSByZXF1aXJlKCcuLyQuaXRlcicpLkl0ZXJhdG9yc1xuICAsIElURVJBVE9SICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuQXJyYXlcbiAgLCBOTCAgICAgICAgICA9ICQuZy5Ob2RlTGlzdFxuICAsIEhUQyAgICAgICAgID0gJC5nLkhUTUxDb2xsZWN0aW9uXG4gICwgTkxQcm90byAgICAgPSBOTCAmJiBOTC5wcm90b3R5cGVcbiAgLCBIVENQcm90byAgICA9IEhUQyAmJiBIVEMucHJvdG90eXBlO1xuaWYoJC5GVyl7XG4gIGlmKE5MICYmICEoSVRFUkFUT1IgaW4gTkxQcm90bykpJC5oaWRlKE5MUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gIGlmKEhUQyAmJiAhKElURVJBVE9SIGluIEhUQ1Byb3RvKSkkLmhpZGUoSFRDUHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG59XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBBcnJheVZhbHVlczsiLCJ2YXIgJGRlZiAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkdGFzayA9IHJlcXVpcmUoJy4vJC50YXNrJyk7XG4kZGVmKCRkZWYuRyArICRkZWYuQiwge1xuICBzZXRJbW1lZGlhdGU6ICAgJHRhc2suc2V0LFxuICBjbGVhckltbWVkaWF0ZTogJHRhc2suY2xlYXJcbn0pOyIsIi8vIGllOS0gc2V0VGltZW91dCAmIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbnZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsICRkZWYgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGludm9rZSAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIHBhcnRpYWwgICA9IHJlcXVpcmUoJy4vJC5wYXJ0aWFsJylcbiAgLCBuYXZpZ2F0b3IgPSAkLmcubmF2aWdhdG9yXG4gICwgTVNJRSAgICAgID0gISFuYXZpZ2F0b3IgJiYgL01TSUUgLlxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xuZnVuY3Rpb24gd3JhcChzZXQpe1xuICByZXR1cm4gTVNJRSA/IGZ1bmN0aW9uKGZuLCB0aW1lIC8qLCAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gc2V0KGludm9rZShcbiAgICAgIHBhcnRpYWwsXG4gICAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICAkLmlzRnVuY3Rpb24oZm4pID8gZm4gOiBGdW5jdGlvbihmbilcbiAgICApLCB0aW1lKTtcbiAgfSA6IHNldDtcbn1cbiRkZWYoJGRlZi5HICsgJGRlZi5CICsgJGRlZi5GICogTVNJRSwge1xuICBzZXRUaW1lb3V0OiAgd3JhcCgkLmcuc2V0VGltZW91dCksXG4gIHNldEludGVydmFsOiB3cmFwKCQuZy5zZXRJbnRlcnZhbClcbn0pOyIsInJlcXVpcmUoJy4vbW9kdWxlcy9lczUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LmlzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5mdW5jdGlvbi5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubnVtYmVyLmNvbnN0cnVjdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm51bWJlci5zdGF0aWNzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2Lm1hdGgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuc3RyaW5nLmZyb20tY29kZS1wb2ludCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmF3Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuY29kZS1wb2ludC1hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcuZW5kcy13aXRoJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5zdHJpbmcucmVwZWF0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnN0cmluZy5zdGFydHMtd2l0aCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lm9mJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LnNwZWNpZXMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuY29weS13aXRoaW4nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYuYXJyYXkuZmlsbCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5hcnJheS5maW5kJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LmFycmF5LmZpbmQtaW5kZXgnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYucmVnZXhwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9lczYubWFwJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM2LnNldCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi53ZWFrLW1hcCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi53ZWFrLXNldCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNi5yZWZsZWN0Jyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LmFycmF5LmluY2x1ZGVzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3LnN0cmluZy5hdCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcubHBhZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zdHJpbmcucnBhZCcpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5yZWdleHAuZXNjYXBlJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvZXM3Lm9iamVjdC50by1hcnJheScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5tYXAudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VzNy5zZXQudG8tanNvbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2pzLmFycmF5LnN0YXRpY3MnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy93ZWIudGltZXJzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvd2ViLmltbWVkaWF0ZScpO1xucmVxdWlyZSgnLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tb2R1bGVzLyQnKS5jb3JlO1xuIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciBpdGVyYXRvclN5bWJvbCA9XG4gICAgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKChvdXRlckZuIHx8IEdlbmVyYXRvcikucHJvdG90eXBlKTtcblxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChcbiAgICAgIGlubmVyRm4sIHNlbGYgfHwgbnVsbCxcbiAgICAgIG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKVxuICAgICk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudGAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuIFNvbWUgbWF5IGNvbnNpZGVyIHRoZSBuYW1lIG9mIHRoaXMgbWV0aG9kIHRvb1xuICAvLyBjdXRlc3ksIGJ1dCB0aGV5IGFyZSBjdXJtdWRnZW9ucy5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBuZXcgQXdhaXRBcmd1bWVudChhcmcpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEF3YWl0QXJndW1lbnQoYXJnKSB7XG4gICAgdGhpcy5hcmcgPSBhcmc7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIC8vIFRoaXMgaW52b2tlIGZ1bmN0aW9uIGlzIHdyaXR0ZW4gaW4gYSBzdHlsZSB0aGF0IGFzc3VtZXMgc29tZVxuICAgIC8vIGNhbGxpbmcgZnVuY3Rpb24gKG9yIFByb21pc2UpIHdpbGwgaGFuZGxlIGV4Y2VwdGlvbnMuXG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW21ldGhvZF0oYXJnKTtcbiAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRcbiAgICAgICAgPyBQcm9taXNlLnJlc29sdmUodmFsdWUuYXJnKS50aGVuKGludm9rZU5leHQsIGludm9rZVRocm93KVxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgaW52b2tlTmV4dCA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJuZXh0XCIpO1xuICAgIHZhciBpbnZva2VUaHJvdyA9IGludm9rZS5iaW5kKGdlbmVyYXRvciwgXCJ0aHJvd1wiKTtcbiAgICB2YXIgaW52b2tlUmV0dXJuID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInJldHVyblwiKTtcbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgdmFyIGVucXVldWVSZXN1bHQgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICAgIH0pIDogbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHJlc29sdmUoaW52b2tlKG1ldGhvZCwgYXJnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBlbnF1ZXVlUmVzdWx0IGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5XG4gICAgICAvLyBsYXRlciBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICBwcmV2aW91c1Byb21pc2UgPSBlbnF1ZXVlUmVzdWx0W1wiY2F0Y2hcIl0oZnVuY3Rpb24oaWdub3JlZCl7fSk7XG5cbiAgICAgIHJldHVybiBlbnF1ZXVlUmVzdWx0O1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIiB8fFxuICAgICAgICAgICAgICAobWV0aG9kID09PSBcInRocm93XCIgJiYgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSxcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yLFxuICAgICAgICAgICAgYXJnXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTGlrZSByZXR1cm5pbmcgZ2VuZXJhdG9yLnRocm93KHVuY2F1Z2h0KSwgYnV0IHdpdGhvdXQgdGhlXG4gICAgICAgICAgICAvLyBvdmVyaGVhZCBvZiBhbiBleHRyYSBmdW5jdGlvbiBjYWxsLlxuICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGVnYXRlIGdlbmVyYXRvciByYW4gYW5kIGhhbmRsZWQgaXRzIG93biBleGNlcHRpb25zIHNvXG4gICAgICAgICAgLy8gcmVnYXJkbGVzcyBvZiB3aGF0IHRoZSBtZXRob2Qgd2FzLCB3ZSBjb250aW51ZSBhcyBpZiBpdCBpc1xuICAgICAgICAgIC8vIFwibmV4dFwiIHdpdGggYW4gdW5kZWZpbmVkIGFyZy5cbiAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG4gICAgICAgICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSBhcmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZGVsZWdhdGUgJiYgbWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICB0aGlzLnNlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gQW1vbmcgdGhlIHZhcmlvdXMgdHJpY2tzIGZvciBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbFxuICAvLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3RcbiAgLy8gdXNlIGluZGlyZWN0IGV2YWwgKHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5KS5cbiAgdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgPyB3aW5kb3cgOlxuICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOiB0aGlzXG4pO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWlZV0psYkdsbWVTOXViMlJsWDIxdlpIVnNaWE12WW1GaVpXd3RZMjl5WlM5dWIyUmxYMjF2WkhWc1pYTXZjbVZuWlc1bGNtRjBiM0l2Y25WdWRHbHRaUzVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxS2x4dUlDb2dRMjl3ZVhKcFoyaDBJQ2hqS1NBeU1ERTBMQ0JHWVdObFltOXZheXdnU1c1akxseHVJQ29nUVd4c0lISnBaMmgwY3lCeVpYTmxjblpsWkM1Y2JpQXFYRzRnS2lCVWFHbHpJSE52ZFhKalpTQmpiMlJsSUdseklHeHBZMlZ1YzJWa0lIVnVaR1Z5SUhSb1pTQkNVMFF0YzNSNWJHVWdiR2xqWlc1elpTQm1iM1Z1WkNCcGJpQjBhR1ZjYmlBcUlHaDBkSEJ6T2k4dmNtRjNMbWRwZEdoMVlpNWpiMjB2Wm1GalpXSnZiMnN2Y21WblpXNWxjbUYwYjNJdmJXRnpkR1Z5TDB4SlEwVk9VMFVnWm1sc1pTNGdRVzVjYmlBcUlHRmtaR2wwYVc5dVlXd2daM0poYm5RZ2IyWWdjR0YwWlc1MElISnBaMmgwY3lCallXNGdZbVVnWm05MWJtUWdhVzRnZEdobElGQkJWRVZPVkZNZ1ptbHNaU0JwYmx4dUlDb2dkR2hsSUhOaGJXVWdaR2x5WldOMGIzSjVMbHh1SUNvdlhHNWNiaUVvWm5WdVkzUnBiMjRvWjJ4dlltRnNLU0I3WEc0Z0lGd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNGdJSFpoY2lCb1lYTlBkMjRnUFNCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVPMXh1SUNCMllYSWdkVzVrWldacGJtVmtPeUF2THlCTmIzSmxJR052YlhCeVpYTnphV0pzWlNCMGFHRnVJSFp2YVdRZ01DNWNiaUFnZG1GeUlHbDBaWEpoZEc5eVUzbHRZbTlzSUQxY2JpQWdJQ0IwZVhCbGIyWWdVM2x0WW05c0lEMDlQU0JjSW1aMWJtTjBhVzl1WENJZ0ppWWdVM2x0WW05c0xtbDBaWEpoZEc5eUlIeDhJRndpUUVCcGRHVnlZWFJ2Y2x3aU8xeHVYRzRnSUhaaGNpQnBiazF2WkhWc1pTQTlJSFI1Y0dWdlppQnRiMlIxYkdVZ1BUMDlJRndpYjJKcVpXTjBYQ0k3WEc0Z0lIWmhjaUJ5ZFc1MGFXMWxJRDBnWjJ4dlltRnNMbkpsWjJWdVpYSmhkRzl5VW5WdWRHbHRaVHRjYmlBZ2FXWWdLSEoxYm5ScGJXVXBJSHRjYmlBZ0lDQnBaaUFvYVc1TmIyUjFiR1VwSUh0Y2JpQWdJQ0FnSUM4dklFbG1JSEpsWjJWdVpYSmhkRzl5VW5WdWRHbHRaU0JwY3lCa1pXWnBibVZrSUdkc2IySmhiR3g1SUdGdVpDQjNaU2R5WlNCcGJpQmhJRzF2WkhWc1pTeGNiaUFnSUNBZ0lDOHZJRzFoYTJVZ2RHaGxJR1Y0Y0c5eWRITWdiMkpxWldOMElHbGtaVzUwYVdOaGJDQjBieUJ5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1V1WEc0Z0lDQWdJQ0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSEoxYm5ScGJXVTdYRzRnSUNBZ2ZWeHVJQ0FnSUM4dklFUnZiaWQwSUdKdmRHaGxjaUJsZG1Gc2RXRjBhVzVuSUhSb1pTQnlaWE4wSUc5bUlIUm9hWE1nWm1sc1pTQnBaaUIwYUdVZ2NuVnVkR2x0WlNCM1lYTmNiaUFnSUNBdkx5QmhiSEpsWVdSNUlHUmxabWx1WldRZ1oyeHZZbUZzYkhrdVhHNGdJQ0FnY21WMGRYSnVPMXh1SUNCOVhHNWNiaUFnTHk4Z1JHVm1hVzVsSUhSb1pTQnlkVzUwYVcxbElHZHNiMkpoYkd4NUlDaGhjeUJsZUhCbFkzUmxaQ0JpZVNCblpXNWxjbUYwWldRZ1kyOWtaU2tnWVhNZ1pXbDBhR1Z5WEc0Z0lDOHZJRzF2WkhWc1pTNWxlSEJ2Y25SeklDaHBaaUIzWlNkeVpTQnBiaUJoSUcxdlpIVnNaU2tnYjNJZ1lTQnVaWGNzSUdWdGNIUjVJRzlpYW1WamRDNWNiaUFnY25WdWRHbHRaU0E5SUdkc2IySmhiQzV5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1VnUFNCcGJrMXZaSFZzWlNBL0lHMXZaSFZzWlM1bGVIQnZjblJ6SURvZ2UzMDdYRzVjYmlBZ1puVnVZM1JwYjI0Z2QzSmhjQ2hwYm01bGNrWnVMQ0J2ZFhSbGNrWnVMQ0J6Wld4bUxDQjBjbmxNYjJOelRHbHpkQ2tnZTF4dUlDQWdJQzh2SUVsbUlHOTFkR1Z5Um00Z2NISnZkbWxrWldRc0lIUm9aVzRnYjNWMFpYSkdiaTV3Y205MGIzUjVjR1VnYVc1emRHRnVZMlZ2WmlCSFpXNWxjbUYwYjNJdVhHNGdJQ0FnZG1GeUlHZGxibVZ5WVhSdmNpQTlJRTlpYW1WamRDNWpjbVZoZEdVb0tHOTFkR1Z5Um00Z2ZId2dSMlZ1WlhKaGRHOXlLUzV3Y205MGIzUjVjR1VwTzF4dVhHNGdJQ0FnWjJWdVpYSmhkRzl5TGw5cGJuWnZhMlVnUFNCdFlXdGxTVzUyYjJ0bFRXVjBhRzlrS0Z4dUlDQWdJQ0FnYVc1dVpYSkdiaXdnYzJWc1ppQjhmQ0J1ZFd4c0xGeHVJQ0FnSUNBZ2JtVjNJRU52Ym5SbGVIUW9kSEo1VEc5amMweHBjM1FnZkh3Z1cxMHBYRzRnSUNBZ0tUdGNibHh1SUNBZ0lISmxkSFZ5YmlCblpXNWxjbUYwYjNJN1hHNGdJSDFjYmlBZ2NuVnVkR2x0WlM1M2NtRndJRDBnZDNKaGNEdGNibHh1SUNBdkx5QlVjbmt2WTJGMFkyZ2dhR1ZzY0dWeUlIUnZJRzFwYm1sdGFYcGxJR1JsYjNCMGFXMXBlbUYwYVc5dWN5NGdVbVYwZFhKdWN5QmhJR052YlhCc1pYUnBiMjVjYmlBZ0x5OGdjbVZqYjNKa0lHeHBhMlVnWTI5dWRHVjRkQzUwY25sRmJuUnlhV1Z6VzJsZExtTnZiWEJzWlhScGIyNHVJRlJvYVhNZ2FXNTBaWEptWVdObElHTnZkV3hrWEc0Z0lDOHZJR2hoZG1VZ1ltVmxiaUFvWVc1a0lIZGhjeUJ3Y21WMmFXOTFjMng1S1NCa1pYTnBaMjVsWkNCMGJ5QjBZV3RsSUdFZ1kyeHZjM1Z5WlNCMGJ5QmlaVnh1SUNBdkx5QnBiblp2YTJWa0lIZHBkR2h2ZFhRZ1lYSm5kVzFsYm5SekxDQmlkWFFnYVc0Z1lXeHNJSFJvWlNCallYTmxjeUIzWlNCallYSmxJR0ZpYjNWMElIZGxYRzRnSUM4dklHRnNjbVZoWkhrZ2FHRjJaU0JoYmlCbGVHbHpkR2x1WnlCdFpYUm9iMlFnZDJVZ2QyRnVkQ0IwYnlCallXeHNMQ0J6YnlCMGFHVnlaU2R6SUc1dklHNWxaV1JjYmlBZ0x5OGdkRzhnWTNKbFlYUmxJR0VnYm1WM0lHWjFibU4wYVc5dUlHOWlhbVZqZEM0Z1YyVWdZMkZ1SUdWMlpXNGdaMlYwSUdGM1lYa2dkMmwwYUNCaGMzTjFiV2x1WjF4dUlDQXZMeUIwYUdVZ2JXVjBhRzlrSUhSaGEyVnpJR1Y0WVdOMGJIa2diMjVsSUdGeVozVnRaVzUwTENCemFXNWpaU0IwYUdGMElHaGhjSEJsYm5NZ2RHOGdZbVVnZEhKMVpWeHVJQ0F2THlCcGJpQmxkbVZ5ZVNCallYTmxMQ0J6YnlCM1pTQmtiMjRuZENCb1lYWmxJSFJ2SUhSdmRXTm9JSFJvWlNCaGNtZDFiV1Z1ZEhNZ2IySnFaV04wTGlCVWFHVmNiaUFnTHk4Z2IyNXNlU0JoWkdScGRHbHZibUZzSUdGc2JHOWpZWFJwYjI0Z2NtVnhkV2x5WldRZ2FYTWdkR2hsSUdOdmJYQnNaWFJwYjI0Z2NtVmpiM0prTENCM2FHbGphRnh1SUNBdkx5Qm9ZWE1nWVNCemRHRmliR1VnYzJoaGNHVWdZVzVrSUhOdklHaHZjR1ZtZFd4c2VTQnphRzkxYkdRZ1ltVWdZMmhsWVhBZ2RHOGdZV3hzYjJOaGRHVXVYRzRnSUdaMWJtTjBhVzl1SUhSeWVVTmhkR05vS0dadUxDQnZZbW9zSUdGeVp5a2dlMXh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdleUIwZVhCbE9pQmNJbTV2Y20xaGJGd2lMQ0JoY21jNklHWnVMbU5oYkd3b2IySnFMQ0JoY21jcElIMDdYRzRnSUNBZ2ZTQmpZWFJqYUNBb1pYSnlLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdleUIwZVhCbE9pQmNJblJvY205M1hDSXNJR0Z5WnpvZ1pYSnlJSDA3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnZG1GeUlFZGxibE4wWVhSbFUzVnpjR1Z1WkdWa1UzUmhjblFnUFNCY0luTjFjM0JsYm1SbFpGTjBZWEowWENJN1hHNGdJSFpoY2lCSFpXNVRkR0YwWlZOMWMzQmxibVJsWkZscFpXeGtJRDBnWENKemRYTndaVzVrWldSWmFXVnNaRndpTzF4dUlDQjJZWElnUjJWdVUzUmhkR1ZGZUdWamRYUnBibWNnUFNCY0ltVjRaV04xZEdsdVoxd2lPMXh1SUNCMllYSWdSMlZ1VTNSaGRHVkRiMjF3YkdWMFpXUWdQU0JjSW1OdmJYQnNaWFJsWkZ3aU8xeHVYRzRnSUM4dklGSmxkSFZ5Ym1sdVp5QjBhR2x6SUc5aWFtVmpkQ0JtY205dElIUm9aU0JwYm01bGNrWnVJR2hoY3lCMGFHVWdjMkZ0WlNCbFptWmxZM1FnWVhOY2JpQWdMeThnWW5KbFlXdHBibWNnYjNWMElHOW1JSFJvWlNCa2FYTndZWFJqYUNCemQybDBZMmdnYzNSaGRHVnRaVzUwTGx4dUlDQjJZWElnUTI5dWRHbHVkV1ZUWlc1MGFXNWxiQ0E5SUh0OU8xeHVYRzRnSUM4dklFUjFiVzE1SUdOdmJuTjBjblZqZEc5eUlHWjFibU4wYVc5dWN5QjBhR0YwSUhkbElIVnpaU0JoY3lCMGFHVWdMbU52Ym5OMGNuVmpkRzl5SUdGdVpGeHVJQ0F2THlBdVkyOXVjM1J5ZFdOMGIzSXVjSEp2ZEc5MGVYQmxJSEJ5YjNCbGNuUnBaWE1nWm05eUlHWjFibU4wYVc5dWN5QjBhR0YwSUhKbGRIVnliaUJIWlc1bGNtRjBiM0pjYmlBZ0x5OGdiMkpxWldOMGN5NGdSbTl5SUdaMWJHd2djM0JsWXlCamIyMXdiR2xoYm1ObExDQjViM1VnYldGNUlIZHBjMmdnZEc4Z1kyOXVabWxuZFhKbElIbHZkWEpjYmlBZ0x5OGdiV2x1YVdacFpYSWdibTkwSUhSdklHMWhibWRzWlNCMGFHVWdibUZ0WlhNZ2IyWWdkR2hsYzJVZ2RIZHZJR1oxYm1OMGFXOXVjeTVjYmlBZ1puVnVZM1JwYjI0Z1IyVnVaWEpoZEc5eUtDa2dlMzFjYmlBZ1puVnVZM1JwYjI0Z1IyVnVaWEpoZEc5eVJuVnVZM1JwYjI0b0tTQjdmVnh1SUNCbWRXNWpkR2x2YmlCSFpXNWxjbUYwYjNKR2RXNWpkR2x2YmxCeWIzUnZkSGx3WlNncElIdDlYRzVjYmlBZ2RtRnlJRWR3SUQwZ1IyVnVaWEpoZEc5eVJuVnVZM1JwYjI1UWNtOTBiM1I1Y0dVdWNISnZkRzkwZVhCbElEMGdSMlZ1WlhKaGRHOXlMbkJ5YjNSdmRIbHdaVHRjYmlBZ1IyVnVaWEpoZEc5eVJuVnVZM1JwYjI0dWNISnZkRzkwZVhCbElEMGdSM0F1WTI5dWMzUnlkV04wYjNJZ1BTQkhaVzVsY21GMGIzSkdkVzVqZEdsdmJsQnliM1J2ZEhsd1pUdGNiaUFnUjJWdVpYSmhkRzl5Um5WdVkzUnBiMjVRY205MGIzUjVjR1V1WTI5dWMzUnlkV04wYjNJZ1BTQkhaVzVsY21GMGIzSkdkVzVqZEdsdmJqdGNiaUFnUjJWdVpYSmhkRzl5Um5WdVkzUnBiMjR1WkdsemNHeGhlVTVoYldVZ1BTQmNJa2RsYm1WeVlYUnZja1oxYm1OMGFXOXVYQ0k3WEc1Y2JpQWdMeThnU0dWc2NHVnlJR1p2Y2lCa1pXWnBibWx1WnlCMGFHVWdMbTVsZUhRc0lDNTBhSEp2ZHl3Z1lXNWtJQzV5WlhSMWNtNGdiV1YwYUc5a2N5QnZaaUIwYUdWY2JpQWdMeThnU1hSbGNtRjBiM0lnYVc1MFpYSm1ZV05sSUdsdUlIUmxjbTF6SUc5bUlHRWdjMmx1WjJ4bElDNWZhVzUyYjJ0bElHMWxkR2h2WkM1Y2JpQWdablZ1WTNScGIyNGdaR1ZtYVc1bFNYUmxjbUYwYjNKTlpYUm9iMlJ6S0hCeWIzUnZkSGx3WlNrZ2UxeHVJQ0FnSUZ0Y0ltNWxlSFJjSWl3Z1hDSjBhSEp2ZDF3aUxDQmNJbkpsZEhWeWJsd2lYUzVtYjNKRllXTm9LR1oxYm1OMGFXOXVLRzFsZEdodlpDa2dlMXh1SUNBZ0lDQWdjSEp2ZEc5MGVYQmxXMjFsZEdodlpGMGdQU0JtZFc1amRHbHZiaWhoY21jcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11WDJsdWRtOXJaU2h0WlhSb2IyUXNJR0Z5WnlrN1hHNGdJQ0FnSUNCOU8xeHVJQ0FnSUgwcE8xeHVJQ0I5WEc1Y2JpQWdjblZ1ZEdsdFpTNXBjMGRsYm1WeVlYUnZja1oxYm1OMGFXOXVJRDBnWm5WdVkzUnBiMjRvWjJWdVJuVnVLU0I3WEc0Z0lDQWdkbUZ5SUdOMGIzSWdQU0IwZVhCbGIyWWdaMlZ1Um5WdUlEMDlQU0JjSW1aMWJtTjBhVzl1WENJZ0ppWWdaMlZ1Um5WdUxtTnZibk4wY25WamRHOXlPMXh1SUNBZ0lISmxkSFZ5YmlCamRHOXlYRzRnSUNBZ0lDQS9JR04wYjNJZ1BUMDlJRWRsYm1WeVlYUnZja1oxYm1OMGFXOXVJSHg4WEc0Z0lDQWdJQ0FnSUM4dklFWnZjaUIwYUdVZ2JtRjBhWFpsSUVkbGJtVnlZWFJ2Y2taMWJtTjBhVzl1SUdOdmJuTjBjblZqZEc5eUxDQjBhR1VnWW1WemRDQjNaU0JqWVc1Y2JpQWdJQ0FnSUNBZ0x5OGdaRzhnYVhNZ2RHOGdZMmhsWTJzZ2FYUnpJQzV1WVcxbElIQnliM0JsY25SNUxseHVJQ0FnSUNBZ0lDQW9ZM1J2Y2k1a2FYTndiR0Y1VG1GdFpTQjhmQ0JqZEc5eUxtNWhiV1VwSUQwOVBTQmNJa2RsYm1WeVlYUnZja1oxYm1OMGFXOXVYQ0pjYmlBZ0lDQWdJRG9nWm1Gc2MyVTdYRzRnSUgwN1hHNWNiaUFnY25WdWRHbHRaUzV0WVhKcklEMGdablZ1WTNScGIyNG9aMlZ1Um5WdUtTQjdYRzRnSUNBZ1oyVnVSblZ1TGw5ZmNISnZkRzlmWHlBOUlFZGxibVZ5WVhSdmNrWjFibU4wYVc5dVVISnZkRzkwZVhCbE8xeHVJQ0FnSUdkbGJrWjFiaTV3Y205MGIzUjVjR1VnUFNCUFltcGxZM1F1WTNKbFlYUmxLRWR3S1R0Y2JpQWdJQ0J5WlhSMWNtNGdaMlZ1Um5WdU8xeHVJQ0I5TzF4dVhHNGdJQzh2SUZkcGRHaHBiaUIwYUdVZ1ltOWtlU0J2WmlCaGJua2dZWE41Ym1NZ1puVnVZM1JwYjI0c0lHQmhkMkZwZENCNFlDQnBjeUIwY21GdWMyWnZjbTFsWkNCMGIxeHVJQ0F2THlCZ2VXbGxiR1FnY21WblpXNWxjbUYwYjNKU2RXNTBhVzFsTG1GM2NtRndLSGdwWUN3Z2MyOGdkR2hoZENCMGFHVWdjblZ1ZEdsdFpTQmpZVzRnZEdWemRGeHVJQ0F2THlCZ2RtRnNkV1VnYVc1emRHRnVZMlZ2WmlCQmQyRnBkRUZ5WjNWdFpXNTBZQ0IwYnlCa1pYUmxjbTFwYm1VZ2FXWWdkR2hsSUhscFpXeGtaV1FnZG1Gc2RXVWdhWE5jYmlBZ0x5OGdiV1ZoYm5RZ2RHOGdZbVVnWVhkaGFYUmxaQzRnVTI5dFpTQnRZWGtnWTI5dWMybGtaWElnZEdobElHNWhiV1VnYjJZZ2RHaHBjeUJ0WlhSb2IyUWdkRzl2WEc0Z0lDOHZJR04xZEdWemVTd2dZblYwSUhSb1pYa2dZWEpsSUdOMWNtMTFaR2RsYjI1ekxseHVJQ0J5ZFc1MGFXMWxMbUYzY21Gd0lEMGdablZ1WTNScGIyNG9ZWEpuS1NCN1hHNGdJQ0FnY21WMGRYSnVJRzVsZHlCQmQyRnBkRUZ5WjNWdFpXNTBLR0Z5WnlrN1hHNGdJSDA3WEc1Y2JpQWdablZ1WTNScGIyNGdRWGRoYVhSQmNtZDFiV1Z1ZENoaGNtY3BJSHRjYmlBZ0lDQjBhR2x6TG1GeVp5QTlJR0Z5Wnp0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlFRnplVzVqU1hSbGNtRjBiM0lvWjJWdVpYSmhkRzl5S1NCN1hHNGdJQ0FnTHk4Z1ZHaHBjeUJwYm5admEyVWdablZ1WTNScGIyNGdhWE1nZDNKcGRIUmxiaUJwYmlCaElITjBlV3hsSUhSb1lYUWdZWE56ZFcxbGN5QnpiMjFsWEc0Z0lDQWdMeThnWTJGc2JHbHVaeUJtZFc1amRHbHZiaUFvYjNJZ1VISnZiV2x6WlNrZ2QybHNiQ0JvWVc1a2JHVWdaWGhqWlhCMGFXOXVjeTVjYmlBZ0lDQm1kVzVqZEdsdmJpQnBiblp2YTJVb2JXVjBhRzlrTENCaGNtY3BJSHRjYmlBZ0lDQWdJSFpoY2lCeVpYTjFiSFFnUFNCblpXNWxjbUYwYjNKYmJXVjBhRzlrWFNoaGNtY3BPMXh1SUNBZ0lDQWdkbUZ5SUhaaGJIVmxJRDBnY21WemRXeDBMblpoYkhWbE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUhaaGJIVmxJR2x1YzNSaGJtTmxiMllnUVhkaGFYUkJjbWQxYldWdWRGeHVJQ0FnSUNBZ0lDQS9JRkJ5YjIxcGMyVXVjbVZ6YjJ4MlpTaDJZV3gxWlM1aGNtY3BMblJvWlc0b2FXNTJiMnRsVG1WNGRDd2dhVzUyYjJ0bFZHaHliM2NwWEc0Z0lDQWdJQ0FnSURvZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0haaGJIVmxLUzUwYUdWdUtHWjFibU4wYVc5dUtIVnVkM0poY0hCbFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdWMmhsYmlCaElIbHBaV3hrWldRZ1VISnZiV2x6WlNCcGN5QnlaWE52YkhabFpDd2dhWFJ6SUdacGJtRnNJSFpoYkhWbElHSmxZMjl0WlhOY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUhSb1pTQXVkbUZzZFdVZ2IyWWdkR2hsSUZCeWIyMXBjMlU4ZTNaaGJIVmxMR1J2Ym1WOVBpQnlaWE4xYkhRZ1ptOXlJSFJvWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnWTNWeWNtVnVkQ0JwZEdWeVlYUnBiMjR1SUVsbUlIUm9aU0JRY205dGFYTmxJR2x6SUhKbGFtVmpkR1ZrTENCb2IzZGxkbVZ5TENCMGFHVmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklISmxjM1ZzZENCbWIzSWdkR2hwY3lCcGRHVnlZWFJwYjI0Z2QybHNiQ0JpWlNCeVpXcGxZM1JsWkNCM2FYUm9JSFJvWlNCellXMWxYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QnlaV0Z6YjI0dUlFNXZkR1VnZEdoaGRDQnlaV3BsWTNScGIyNXpJRzltSUhscFpXeGtaV1FnVUhKdmJXbHpaWE1nWVhKbElHNXZkRnh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdkR2h5YjNkdUlHSmhZMnNnYVc1MGJ5QjBhR1VnWjJWdVpYSmhkRzl5SUdaMWJtTjBhVzl1TENCaGN5QnBjeUIwYUdVZ1kyRnpaVnh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdkMmhsYmlCaGJpQmhkMkZwZEdWa0lGQnliMjFwYzJVZ2FYTWdjbVZxWldOMFpXUXVJRlJvYVhNZ1pHbG1abVZ5Wlc1alpTQnBibHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdZbVZvWVhacGIzSWdZbVYwZDJWbGJpQjVhV1ZzWkNCaGJtUWdZWGRoYVhRZ2FYTWdhVzF3YjNKMFlXNTBMQ0JpWldOaGRYTmxJR2wwWEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJoYkd4dmQzTWdkR2hsSUdOdmJuTjFiV1Z5SUhSdklHUmxZMmxrWlNCM2FHRjBJSFJ2SUdSdklIZHBkR2dnZEdobElIbHBaV3hrWldSY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUhKbGFtVmpkR2x2YmlBb2MzZGhiR3h2ZHlCcGRDQmhibVFnWTI5dWRHbHVkV1VzSUcxaGJuVmhiR3g1SUM1MGFISnZkeUJwZENCaVlXTnJYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QnBiblJ2SUhSb1pTQm5aVzVsY21GMGIzSXNJR0ZpWVc1a2IyNGdhWFJsY21GMGFXOXVMQ0IzYUdGMFpYWmxjaWt1SUZkcGRHaGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklHRjNZV2wwTENCaWVTQmpiMjUwY21GemRDd2dkR2hsY21VZ2FYTWdibThnYjNCd2IzSjBkVzVwZEhrZ2RHOGdaWGhoYldsdVpTQjBhR1ZjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJSEpsYW1WamRHbHZiaUJ5WldGemIyNGdiM1YwYzJsa1pTQjBhR1VnWjJWdVpYSmhkRzl5SUdaMWJtTjBhVzl1TENCemJ5QjBhR1ZjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRzl1YkhrZ2IzQjBhVzl1SUdseklIUnZJSFJvY205M0lHbDBJR1p5YjIwZ2RHaGxJR0YzWVdsMElHVjRjSEpsYzNOcGIyNHNJR0Z1WkZ4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnYkdWMElIUm9aU0JuWlc1bGNtRjBiM0lnWm5WdVkzUnBiMjRnYUdGdVpHeGxJSFJvWlNCbGVHTmxjSFJwYjI0dVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhOMWJIUXVkbUZzZFdVZ1BTQjFibmR5WVhCd1pXUTdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnY21WemRXeDBPMXh1SUNBZ0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ2NISnZZMlZ6Y3lBOVBUMGdYQ0p2WW1wbFkzUmNJaUFtSmlCd2NtOWpaWE56TG1SdmJXRnBiaWtnZTF4dUlDQWdJQ0FnYVc1MmIydGxJRDBnY0hKdlkyVnpjeTVrYjIxaGFXNHVZbWx1WkNocGJuWnZhMlVwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSFpoY2lCcGJuWnZhMlZPWlhoMElEMGdhVzUyYjJ0bExtSnBibVFvWjJWdVpYSmhkRzl5TENCY0ltNWxlSFJjSWlrN1hHNGdJQ0FnZG1GeUlHbHVkbTlyWlZSb2NtOTNJRDBnYVc1MmIydGxMbUpwYm1Rb1oyVnVaWEpoZEc5eUxDQmNJblJvY205M1hDSXBPMXh1SUNBZ0lIWmhjaUJwYm5admEyVlNaWFIxY200Z1BTQnBiblp2YTJVdVltbHVaQ2huWlc1bGNtRjBiM0lzSUZ3aWNtVjBkWEp1WENJcE8xeHVJQ0FnSUhaaGNpQndjbVYyYVc5MWMxQnliMjFwYzJVN1hHNWNiaUFnSUNCbWRXNWpkR2x2YmlCbGJuRjFaWFZsS0cxbGRHaHZaQ3dnWVhKbktTQjdYRzRnSUNBZ0lDQjJZWElnWlc1eGRXVjFaVkpsYzNWc2RDQTlYRzRnSUNBZ0lDQWdJQzh2SUVsbUlHVnVjWFZsZFdVZ2FHRnpJR0psWlc0Z1kyRnNiR1ZrSUdKbFptOXlaU3dnZEdobGJpQjNaU0IzWVc1MElIUnZJSGRoYVhRZ2RXNTBhV3hjYmlBZ0lDQWdJQ0FnTHk4Z1lXeHNJSEJ5WlhacGIzVnpJRkJ5YjIxcGMyVnpJR2hoZG1VZ1ltVmxiaUJ5WlhOdmJIWmxaQ0JpWldadmNtVWdZMkZzYkdsdVp5QnBiblp2YTJVc1hHNGdJQ0FnSUNBZ0lDOHZJSE52SUhSb1lYUWdjbVZ6ZFd4MGN5QmhjbVVnWVd4M1lYbHpJR1JsYkdsMlpYSmxaQ0JwYmlCMGFHVWdZMjl5Y21WamRDQnZjbVJsY2k0Z1NXWmNiaUFnSUNBZ0lDQWdMeThnWlc1eGRXVjFaU0JvWVhNZ2JtOTBJR0psWlc0Z1kyRnNiR1ZrSUdKbFptOXlaU3dnZEdobGJpQnBkQ0JwY3lCcGJYQnZjblJoYm5RZ2RHOWNiaUFnSUNBZ0lDQWdMeThnWTJGc2JDQnBiblp2YTJVZ2FXMXRaV1JwWVhSbGJIa3NJSGRwZEdodmRYUWdkMkZwZEdsdVp5QnZiaUJoSUdOaGJHeGlZV05ySUhSdklHWnBjbVVzWEc0Z0lDQWdJQ0FnSUM4dklITnZJSFJvWVhRZ2RHaGxJR0Z6ZVc1aklHZGxibVZ5WVhSdmNpQm1kVzVqZEdsdmJpQm9ZWE1nZEdobElHOXdjRzl5ZEhWdWFYUjVJSFJ2SUdSdlhHNGdJQ0FnSUNBZ0lDOHZJR0Z1ZVNCdVpXTmxjM05oY25rZ2MyVjBkWEFnYVc0Z1lTQndjbVZrYVdOMFlXSnNaU0IzWVhrdUlGUm9hWE1nY0hKbFpHbGpkR0ZpYVd4cGRIbGNiaUFnSUNBZ0lDQWdMeThnYVhNZ2QyaDVJSFJvWlNCUWNtOXRhWE5sSUdOdmJuTjBjblZqZEc5eUlITjVibU5vY205dWIzVnpiSGtnYVc1MmIydGxjeUJwZEhOY2JpQWdJQ0FnSUNBZ0x5OGdaWGhsWTNWMGIzSWdZMkZzYkdKaFkyc3NJR0Z1WkNCM2FIa2dZWE41Ym1NZ1puVnVZM1JwYjI1eklITjVibU5vY205dWIzVnpiSGxjYmlBZ0lDQWdJQ0FnTHk4Z1pYaGxZM1YwWlNCamIyUmxJR0psWm05eVpTQjBhR1VnWm1seWMzUWdZWGRoYVhRdUlGTnBibU5sSUhkbElHbHRjR3hsYldWdWRDQnphVzF3YkdWY2JpQWdJQ0FnSUNBZ0x5OGdZWE41Ym1NZ1puVnVZM1JwYjI1eklHbHVJSFJsY20xeklHOW1JR0Z6ZVc1aklHZGxibVZ5WVhSdmNuTXNJR2wwSUdseklHVnpjR1ZqYVdGc2JIbGNiaUFnSUNBZ0lDQWdMeThnYVcxd2IzSjBZVzUwSUhSdklHZGxkQ0IwYUdseklISnBaMmgwTENCbGRtVnVJSFJvYjNWbmFDQnBkQ0J5WlhGMWFYSmxjeUJqWVhKbExseHVJQ0FnSUNBZ0lDQndjbVYyYVc5MWMxQnliMjFwYzJVZ1B5QndjbVYyYVc5MWMxQnliMjFwYzJVdWRHaGxiaWhtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2FXNTJiMnRsS0cxbGRHaHZaQ3dnWVhKbktUdGNiaUFnSUNBZ0lDQWdmU2tnT2lCdVpYY2dVSEp2YldselpTaG1kVzVqZEdsdmJpaHlaWE52YkhabEtTQjdYRzRnSUNBZ0lDQWdJQ0FnY21WemIyeDJaU2hwYm5admEyVW9iV1YwYUc5a0xDQmhjbWNwS1R0Y2JpQWdJQ0FnSUNBZ2ZTazdYRzVjYmlBZ0lDQWdJQzh2SUVGMmIybGtJSEJ5YjNCaFoyRjBhVzVuSUdWdWNYVmxkV1ZTWlhOMWJIUWdabUZwYkhWeVpYTWdkRzhnVUhKdmJXbHpaWE1nY21WMGRYSnVaV1FnWW5sY2JpQWdJQ0FnSUM4dklHeGhkR1Z5SUdsdWRtOWpZWFJwYjI1eklHOW1JSFJvWlNCcGRHVnlZWFJ2Y2k1Y2JpQWdJQ0FnSUhCeVpYWnBiM1Z6VUhKdmJXbHpaU0E5SUdWdWNYVmxkV1ZTWlhOMWJIUmJYQ0pqWVhSamFGd2lYU2htZFc1amRHbHZiaWhwWjI1dmNtVmtLWHQ5S1R0Y2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUdWdWNYVmxkV1ZTWlhOMWJIUTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdSR1ZtYVc1bElIUm9aU0IxYm1sbWFXVmtJR2hsYkhCbGNpQnRaWFJvYjJRZ2RHaGhkQ0JwY3lCMWMyVmtJSFJ2SUdsdGNHeGxiV1Z1ZENBdWJtVjRkQ3hjYmlBZ0lDQXZMeUF1ZEdoeWIzY3NJR0Z1WkNBdWNtVjBkWEp1SUNoelpXVWdaR1ZtYVc1bFNYUmxjbUYwYjNKTlpYUm9iMlJ6S1M1Y2JpQWdJQ0IwYUdsekxsOXBiblp2YTJVZ1BTQmxibkYxWlhWbE8xeHVJQ0I5WEc1Y2JpQWdaR1ZtYVc1bFNYUmxjbUYwYjNKTlpYUm9iMlJ6S0VGemVXNWpTWFJsY21GMGIzSXVjSEp2ZEc5MGVYQmxLVHRjYmx4dUlDQXZMeUJPYjNSbElIUm9ZWFFnYzJsdGNHeGxJR0Z6ZVc1aklHWjFibU4wYVc5dWN5QmhjbVVnYVcxd2JHVnRaVzUwWldRZ2IyNGdkRzl3SUc5bVhHNGdJQzh2SUVGemVXNWpTWFJsY21GMGIzSWdiMkpxWldOMGN6c2dkR2hsZVNCcWRYTjBJSEpsZEhWeWJpQmhJRkJ5YjIxcGMyVWdabTl5SUhSb1pTQjJZV3gxWlNCdlpseHVJQ0F2THlCMGFHVWdabWx1WVd3Z2NtVnpkV3gwSUhCeWIyUjFZMlZrSUdKNUlIUm9aU0JwZEdWeVlYUnZjaTVjYmlBZ2NuVnVkR2x0WlM1aGMzbHVZeUE5SUdaMWJtTjBhVzl1S0dsdWJtVnlSbTRzSUc5MWRHVnlSbTRzSUhObGJHWXNJSFJ5ZVV4dlkzTk1hWE4wS1NCN1hHNGdJQ0FnZG1GeUlHbDBaWElnUFNCdVpYY2dRWE41Ym1OSmRHVnlZWFJ2Y2loY2JpQWdJQ0FnSUhkeVlYQW9hVzV1WlhKR2Jpd2diM1YwWlhKR2Jpd2djMlZzWml3Z2RISjVURzlqYzB4cGMzUXBYRzRnSUNBZ0tUdGNibHh1SUNBZ0lISmxkSFZ5YmlCeWRXNTBhVzFsTG1selIyVnVaWEpoZEc5eVJuVnVZM1JwYjI0b2IzVjBaWEpHYmlsY2JpQWdJQ0FnSUQ4Z2FYUmxjaUF2THlCSlppQnZkWFJsY2tadUlHbHpJR0VnWjJWdVpYSmhkRzl5TENCeVpYUjFjbTRnZEdobElHWjFiR3dnYVhSbGNtRjBiM0l1WEc0Z0lDQWdJQ0E2SUdsMFpYSXVibVY0ZENncExuUm9aVzRvWm5WdVkzUnBiMjRvY21WemRXeDBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMzVnNkQzVrYjI1bElEOGdjbVZ6ZFd4MExuWmhiSFZsSURvZ2FYUmxjaTV1WlhoMEtDazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQjlPMXh1WEc0Z0lHWjFibU4wYVc5dUlHMWhhMlZKYm5admEyVk5aWFJvYjJRb2FXNXVaWEpHYml3Z2MyVnNaaXdnWTI5dWRHVjRkQ2tnZTF4dUlDQWdJSFpoY2lCemRHRjBaU0E5SUVkbGJsTjBZWFJsVTNWemNHVnVaR1ZrVTNSaGNuUTdYRzVjYmlBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z2FXNTJiMnRsS0cxbGRHaHZaQ3dnWVhKbktTQjdYRzRnSUNBZ0lDQnBaaUFvYzNSaGRHVWdQVDA5SUVkbGJsTjBZWFJsUlhobFkzVjBhVzVuS1NCN1hHNGdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2loY0lrZGxibVZ5WVhSdmNpQnBjeUJoYkhKbFlXUjVJSEoxYm01cGJtZGNJaWs3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaHpkR0YwWlNBOVBUMGdSMlZ1VTNSaGRHVkRiMjF3YkdWMFpXUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHMWxkR2h2WkNBOVBUMGdYQ0owYUhKdmQxd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RHaHliM2NnWVhKbk8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnTHk4Z1FtVWdabTl5WjJsMmFXNW5MQ0J3WlhJZ01qVXVNeTR6TGpNdU15QnZaaUIwYUdVZ2MzQmxZenBjYmlBZ0lDQWdJQ0FnTHk4Z2FIUjBjSE02THk5d1pXOXdiR1V1Ylc5NmFXeHNZUzV2Y21jdmZtcHZjbVZ1Wkc5eVptWXZaWE0yTFdSeVlXWjBMbWgwYld3amMyVmpMV2RsYm1WeVlYUnZjbkpsYzNWdFpWeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1pHOXVaVkpsYzNWc2RDZ3BPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0IzYUdsc1pTQW9kSEoxWlNrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnWkdWc1pXZGhkR1VnUFNCamIyNTBaWGgwTG1SbGJHVm5ZWFJsTzF4dUlDQWdJQ0FnSUNCcFppQW9aR1ZzWldkaGRHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9iV1YwYUc5a0lEMDlQU0JjSW5KbGRIVnlibHdpSUh4OFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNodFpYUm9iMlFnUFQwOUlGd2lkR2h5YjNkY0lpQW1KaUJrWld4bFoyRjBaUzVwZEdWeVlYUnZjbHR0WlhSb2IyUmRJRDA5UFNCMWJtUmxabWx1WldRcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QkJJSEpsZEhWeWJpQnZjaUIwYUhKdmR5QW9kMmhsYmlCMGFHVWdaR1ZzWldkaGRHVWdhWFJsY21GMGIzSWdhR0Z6SUc1dklIUm9jbTkzWEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJ0WlhSb2IyUXBJR0ZzZDJGNWN5QjBaWEp0YVc1aGRHVnpJSFJvWlNCNWFXVnNaQ29nYkc5dmNDNWNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuUmxlSFF1WkdWc1pXZGhkR1VnUFNCdWRXeHNPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJKWmlCMGFHVWdaR1ZzWldkaGRHVWdhWFJsY21GMGIzSWdhR0Z6SUdFZ2NtVjBkWEp1SUcxbGRHaHZaQ3dnWjJsMlpTQnBkQ0JoWEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJqYUdGdVkyVWdkRzhnWTJ4bFlXNGdkWEF1WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnY21WMGRYSnVUV1YwYUc5a0lEMGdaR1ZzWldkaGRHVXVhWFJsY21GMGIzSmJYQ0p5WlhSMWNtNWNJbDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY21WMGRYSnVUV1YwYUc5a0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ5WldOdmNtUWdQU0IwY25sRFlYUmphQ2h5WlhSMWNtNU5aWFJvYjJRc0lHUmxiR1ZuWVhSbExtbDBaWEpoZEc5eUxDQmhjbWNwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NtVmpiM0prTG5SNWNHVWdQVDA5SUZ3aWRHaHliM2RjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJRWxtSUhSb1pTQnlaWFIxY200Z2JXVjBhRzlrSUhSb2NtVjNJR0Z1SUdWNFkyVndkR2x2Yml3Z2JHVjBJSFJvWVhSY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QmxlR05sY0hScGIyNGdjSEpsZG1GcGJDQnZkbVZ5SUhSb1pTQnZjbWxuYVc1aGJDQnlaWFIxY200Z2IzSWdkR2h5YjNjdVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXVjBhRzlrSUQwZ1hDSjBhSEp2ZDF3aU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHRnlaeUE5SUhKbFkyOXlaQzVoY21jN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0cxbGRHaHZaQ0E5UFQwZ1hDSnlaWFIxY201Y0lpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJEYjI1MGFXNTFaU0IzYVhSb0lIUm9aU0J2ZFhSbGNpQnlaWFIxY200c0lHNXZkeUIwYUdGMElIUm9aU0JrWld4bFoyRjBaVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJwZEdWeVlYUnZjaUJvWVhNZ1ltVmxiaUIwWlhKdGFXNWhkR1ZrTGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1MGFXNTFaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnY21WamIzSmtJRDBnZEhKNVEyRjBZMmdvWEc0Z0lDQWdJQ0FnSUNBZ0lDQmtaV3hsWjJGMFpTNXBkR1Z5WVhSdmNsdHRaWFJvYjJSZExGeHVJQ0FnSUNBZ0lDQWdJQ0FnWkdWc1pXZGhkR1V1YVhSbGNtRjBiM0lzWEc0Z0lDQWdJQ0FnSUNBZ0lDQmhjbWRjYmlBZ0lDQWdJQ0FnSUNBcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuUmxlSFF1WkdWc1pXZGhkR1VnUFNCdWRXeHNPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJNYVd0bElISmxkSFZ5Ym1sdVp5Qm5aVzVsY21GMGIzSXVkR2h5YjNjb2RXNWpZWFZuYUhRcExDQmlkWFFnZDJsMGFHOTFkQ0IwYUdWY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUc5MlpYSm9aV0ZrSUc5bUlHRnVJR1Y0ZEhKaElHWjFibU4wYVc5dUlHTmhiR3d1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnRaWFJvYjJRZ1BTQmNJblJvY205M1hDSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCaGNtY2dQU0J5WldOdmNtUXVZWEpuTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEdsdWRXVTdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdMeThnUkdWc1pXZGhkR1VnWjJWdVpYSmhkRzl5SUhKaGJpQmhibVFnYUdGdVpHeGxaQ0JwZEhNZ2IzZHVJR1Y0WTJWd2RHbHZibk1nYzI5Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJ5WldkaGNtUnNaWE56SUc5bUlIZG9ZWFFnZEdobElHMWxkR2h2WkNCM1lYTXNJSGRsSUdOdmJuUnBiblZsSUdGeklHbG1JR2wwSUdselhHNGdJQ0FnSUNBZ0lDQWdMeThnWENKdVpYaDBYQ0lnZDJsMGFDQmhiaUIxYm1SbFptbHVaV1FnWVhKbkxseHVJQ0FnSUNBZ0lDQWdJRzFsZEdodlpDQTlJRndpYm1WNGRGd2lPMXh1SUNBZ0lDQWdJQ0FnSUdGeVp5QTlJSFZ1WkdWbWFXNWxaRHRjYmx4dUlDQWdJQ0FnSUNBZ0lIWmhjaUJwYm1adklEMGdjbVZqYjNKa0xtRnlaenRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9hVzVtYnk1a2IyNWxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjUwWlhoMFcyUmxiR1ZuWVhSbExuSmxjM1ZzZEU1aGJXVmRJRDBnYVc1bWJ5NTJZV3gxWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVibVY0ZENBOUlHUmxiR1ZuWVhSbExtNWxlSFJNYjJNN1hHNGdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOMFlYUmxJRDBnUjJWdVUzUmhkR1ZUZFhOd1pXNWtaV1JaYVdWc1pEdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJwYm1adk8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lHTnZiblJsZUhRdVpHVnNaV2RoZEdVZ1BTQnVkV3hzTzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdhV1lnS0cxbGRHaHZaQ0E5UFQwZ1hDSnVaWGgwWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2MzUmhkR1VnUFQwOUlFZGxibE4wWVhSbFUzVnpjR1Z1WkdWa1dXbGxiR1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVjMlZ1ZENBOUlHRnlaenRjYmlBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEdWNGRDNXpaVzUwSUQwZ2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHMWxkR2h2WkNBOVBUMGdYQ0owYUhKdmQxd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSE4wWVhSbElEMDlQU0JIWlc1VGRHRjBaVk4xYzNCbGJtUmxaRk4wWVhKMEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCemRHRjBaU0E5SUVkbGJsTjBZWFJsUTI5dGNHeGxkR1ZrTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ1lYSm5PMXh1SUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJR2xtSUNoamIyNTBaWGgwTG1ScGMzQmhkR05vUlhoalpYQjBhVzl1S0dGeVp5a3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRWxtSUhSb1pTQmthWE53WVhSamFHVmtJR1Y0WTJWd2RHbHZiaUIzWVhNZ1kyRjFaMmgwSUdKNUlHRWdZMkYwWTJnZ1lteHZZMnNzWEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUIwYUdWdUlHeGxkQ0IwYUdGMElHTmhkR05vSUdKc2IyTnJJR2hoYm1Sc1pTQjBhR1VnWlhoalpYQjBhVzl1SUc1dmNtMWhiR3g1TGx4dUlDQWdJQ0FnSUNBZ0lDQWdiV1YwYUc5a0lEMGdYQ0p1WlhoMFhDSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCaGNtY2dQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvYldWMGFHOWtJRDA5UFNCY0luSmxkSFZ5Ymx3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnWTI5dWRHVjRkQzVoWW5KMWNIUW9YQ0p5WlhSMWNtNWNJaXdnWVhKbktUdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUhOMFlYUmxJRDBnUjJWdVUzUmhkR1ZGZUdWamRYUnBibWM3WEc1Y2JpQWdJQ0FnSUNBZ2RtRnlJSEpsWTI5eVpDQTlJSFJ5ZVVOaGRHTm9LR2x1Ym1WeVJtNHNJSE5sYkdZc0lHTnZiblJsZUhRcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvY21WamIzSmtMblI1Y0dVZ1BUMDlJRndpYm05eWJXRnNYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJKWmlCaGJpQmxlR05sY0hScGIyNGdhWE1nZEdoeWIzZHVJR1p5YjIwZ2FXNXVaWEpHYml3Z2QyVWdiR1ZoZG1VZ2MzUmhkR1VnUFQwOVhHNGdJQ0FnSUNBZ0lDQWdMeThnUjJWdVUzUmhkR1ZGZUdWamRYUnBibWNnWVc1a0lHeHZiM0FnWW1GamF5Qm1iM0lnWVc1dmRHaGxjaUJwYm5adlkyRjBhVzl1TGx4dUlDQWdJQ0FnSUNBZ0lITjBZWFJsSUQwZ1kyOXVkR1Y0ZEM1a2IyNWxYRzRnSUNBZ0lDQWdJQ0FnSUNBL0lFZGxibE4wWVhSbFEyOXRjR3hsZEdWa1hHNGdJQ0FnSUNBZ0lDQWdJQ0E2SUVkbGJsTjBZWFJsVTNWemNHVnVaR1ZrV1dsbGJHUTdYRzVjYmlBZ0lDQWdJQ0FnSUNCMllYSWdhVzVtYnlBOUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGJIVmxPaUJ5WldOdmNtUXVZWEpuTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdaRzl1WlRvZ1kyOXVkR1Y0ZEM1a2IyNWxYRzRnSUNBZ0lDQWdJQ0FnZlR0Y2JseHVJQ0FnSUNBZ0lDQWdJR2xtSUNoeVpXTnZjbVF1WVhKbklEMDlQU0JEYjI1MGFXNTFaVk5sYm5ScGJtVnNLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWTI5dWRHVjRkQzVrWld4bFoyRjBaU0FtSmlCdFpYUm9iMlFnUFQwOUlGd2libVY0ZEZ3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJRVJsYkdsaVpYSmhkR1ZzZVNCbWIzSm5aWFFnZEdobElHeGhjM1FnYzJWdWRDQjJZV3gxWlNCemJ5QjBhR0YwSUhkbElHUnZiaWQwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUdGalkybGtaVzUwWVd4c2VTQndZWE56SUdsMElHOXVJSFJ2SUhSb1pTQmtaV3hsWjJGMFpTNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1lYSm5JRDBnZFc1a1pXWnBibVZrTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2FXNW1ienRjYmlBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0owYUhKdmQxd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2MzUmhkR1VnUFNCSFpXNVRkR0YwWlVOdmJYQnNaWFJsWkR0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJFYVhOd1lYUmphQ0IwYUdVZ1pYaGpaWEIwYVc5dUlHSjVJR3h2YjNCcGJtY2dZbUZqYXlCaGNtOTFibVFnZEc4Z2RHaGxYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1kyOXVkR1Y0ZEM1a2FYTndZWFJqYUVWNFkyVndkR2x2YmloaGNtY3BJR05oYkd3Z1lXSnZkbVV1WEc0Z0lDQWdJQ0FnSUNBZ2JXVjBhRzlrSUQwZ1hDSjBhSEp2ZDF3aU8xeHVJQ0FnSUNBZ0lDQWdJR0Z5WnlBOUlISmxZMjl5WkM1aGNtYzdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1SUNCOVhHNWNiaUFnTHk4Z1JHVm1hVzVsSUVkbGJtVnlZWFJ2Y2k1d2NtOTBiM1I1Y0dVdWUyNWxlSFFzZEdoeWIzY3NjbVYwZFhKdWZTQnBiaUIwWlhKdGN5QnZaaUIwYUdWY2JpQWdMeThnZFc1cFptbGxaQ0F1WDJsdWRtOXJaU0JvWld4d1pYSWdiV1YwYUc5a0xseHVJQ0JrWldacGJtVkpkR1Z5WVhSdmNrMWxkR2h2WkhNb1IzQXBPMXh1WEc0Z0lFZHdXMmwwWlhKaGRHOXlVM2x0WW05c1hTQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQjlPMXh1WEc0Z0lFZHdMblJ2VTNSeWFXNW5JRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnY21WMGRYSnVJRndpVzI5aWFtVmpkQ0JIWlc1bGNtRjBiM0pkWENJN1hHNGdJSDA3WEc1Y2JpQWdablZ1WTNScGIyNGdjSFZ6YUZSeWVVVnVkSEo1S0d4dlkzTXBJSHRjYmlBZ0lDQjJZWElnWlc1MGNua2dQU0I3SUhSeWVVeHZZem9nYkc5amMxc3dYU0I5TzF4dVhHNGdJQ0FnYVdZZ0tERWdhVzRnYkc5amN5a2dlMXh1SUNBZ0lDQWdaVzUwY25rdVkyRjBZMmhNYjJNZ1BTQnNiMk56V3pGZE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDZ3lJR2x1SUd4dlkzTXBJSHRjYmlBZ0lDQWdJR1Z1ZEhKNUxtWnBibUZzYkhsTWIyTWdQU0JzYjJOeld6SmRPMXh1SUNBZ0lDQWdaVzUwY25rdVlXWjBaWEpNYjJNZ1BTQnNiMk56V3pOZE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhSb2FYTXVkSEo1Ulc1MGNtbGxjeTV3ZFhOb0tHVnVkSEo1S1R0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlISmxjMlYwVkhKNVJXNTBjbmtvWlc1MGNua3BJSHRjYmlBZ0lDQjJZWElnY21WamIzSmtJRDBnWlc1MGNua3VZMjl0Y0d4bGRHbHZiaUI4ZkNCN2ZUdGNiaUFnSUNCeVpXTnZjbVF1ZEhsd1pTQTlJRndpYm05eWJXRnNYQ0k3WEc0Z0lDQWdaR1ZzWlhSbElISmxZMjl5WkM1aGNtYzdYRzRnSUNBZ1pXNTBjbmt1WTI5dGNHeGxkR2x2YmlBOUlISmxZMjl5WkR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlFTnZiblJsZUhRb2RISjVURzlqYzB4cGMzUXBJSHRjYmlBZ0lDQXZMeUJVYUdVZ2NtOXZkQ0JsYm5SeWVTQnZZbXBsWTNRZ0tHVm1abVZqZEdsMlpXeDVJR0VnZEhKNUlITjBZWFJsYldWdWRDQjNhWFJvYjNWMElHRWdZMkYwWTJoY2JpQWdJQ0F2THlCdmNpQmhJR1pwYm1Gc2JIa2dZbXh2WTJzcElHZHBkbVZ6SUhWeklHRWdjR3hoWTJVZ2RHOGdjM1J2Y21VZ2RtRnNkV1Z6SUhSb2NtOTNiaUJtY205dFhHNGdJQ0FnTHk4Z2JHOWpZWFJwYjI1eklIZG9aWEpsSUhSb1pYSmxJR2x6SUc1dklHVnVZMnh2YzJsdVp5QjBjbmtnYzNSaGRHVnRaVzUwTGx4dUlDQWdJSFJvYVhNdWRISjVSVzUwY21sbGN5QTlJRnQ3SUhSeWVVeHZZem9nWENKeWIyOTBYQ0lnZlYwN1hHNGdJQ0FnZEhKNVRHOWpjMHhwYzNRdVptOXlSV0ZqYUNod2RYTm9WSEo1Ulc1MGNua3NJSFJvYVhNcE8xeHVJQ0FnSUhSb2FYTXVjbVZ6WlhRb2RISjFaU2s3WEc0Z0lIMWNibHh1SUNCeWRXNTBhVzFsTG10bGVYTWdQU0JtZFc1amRHbHZiaWh2WW1wbFkzUXBJSHRjYmlBZ0lDQjJZWElnYTJWNWN5QTlJRnRkTzF4dUlDQWdJR1p2Y2lBb2RtRnlJR3RsZVNCcGJpQnZZbXBsWTNRcElIdGNiaUFnSUNBZ0lHdGxlWE11Y0hWemFDaHJaWGtwTzF4dUlDQWdJSDFjYmlBZ0lDQnJaWGx6TG5KbGRtVnljMlVvS1R0Y2JseHVJQ0FnSUM4dklGSmhkR2hsY2lCMGFHRnVJSEpsZEhWeWJtbHVaeUJoYmlCdlltcGxZM1FnZDJsMGFDQmhJRzVsZUhRZ2JXVjBhRzlrTENCM1pTQnJaV1Z3WEc0Z0lDQWdMeThnZEdocGJtZHpJSE5wYlhCc1pTQmhibVFnY21WMGRYSnVJSFJvWlNCdVpYaDBJR1oxYm1OMGFXOXVJR2wwYzJWc1ppNWNiaUFnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnYm1WNGRDZ3BJSHRjYmlBZ0lDQWdJSGRvYVd4bElDaHJaWGx6TG14bGJtZDBhQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdhMlY1SUQwZ2EyVjVjeTV3YjNBb0tUdGNiaUFnSUNBZ0lDQWdhV1lnS0d0bGVTQnBiaUJ2WW1wbFkzUXBJSHRjYmlBZ0lDQWdJQ0FnSUNCdVpYaDBMblpoYkhWbElEMGdhMlY1TzF4dUlDQWdJQ0FnSUNBZ0lHNWxlSFF1Wkc5dVpTQTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGgwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDOHZJRlJ2SUdGMmIybGtJR055WldGMGFXNW5JR0Z1SUdGa1pHbDBhVzl1WVd3Z2IySnFaV04wTENCM1pTQnFkWE4wSUdoaGJtY2dkR2hsSUM1MllXeDFaVnh1SUNBZ0lDQWdMeThnWVc1a0lDNWtiMjVsSUhCeWIzQmxjblJwWlhNZ2IyWm1JSFJvWlNCdVpYaDBJR1oxYm1OMGFXOXVJRzlpYW1WamRDQnBkSE5sYkdZdUlGUm9hWE5jYmlBZ0lDQWdJQzh2SUdGc2MyOGdaVzV6ZFhKbGN5QjBhR0YwSUhSb1pTQnRhVzVwWm1sbGNpQjNhV3hzSUc1dmRDQmhibTl1ZVcxcGVtVWdkR2hsSUdaMWJtTjBhVzl1TGx4dUlDQWdJQ0FnYm1WNGRDNWtiMjVsSUQwZ2RISjFaVHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnVaWGgwTzF4dUlDQWdJSDA3WEc0Z0lIMDdYRzVjYmlBZ1puVnVZM1JwYjI0Z2RtRnNkV1Z6S0dsMFpYSmhZbXhsS1NCN1hHNGdJQ0FnYVdZZ0tHbDBaWEpoWW14bEtTQjdYRzRnSUNBZ0lDQjJZWElnYVhSbGNtRjBiM0pOWlhSb2IyUWdQU0JwZEdWeVlXSnNaVnRwZEdWeVlYUnZjbE41YldKdmJGMDdYRzRnSUNBZ0lDQnBaaUFvYVhSbGNtRjBiM0pOWlhSb2IyUXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR2wwWlhKaGRHOXlUV1YwYUc5a0xtTmhiR3dvYVhSbGNtRmliR1VwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHbDBaWEpoWW14bExtNWxlSFFnUFQwOUlGd2lablZ1WTNScGIyNWNJaWtnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYVhSbGNtRmliR1U3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDZ2hhWE5PWVU0b2FYUmxjbUZpYkdVdWJHVnVaM1JvS1NrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnYVNBOUlDMHhMQ0J1WlhoMElEMGdablZ1WTNScGIyNGdibVY0ZENncElIdGNiaUFnSUNBZ0lDQWdJQ0IzYUdsc1pTQW9LeXRwSUR3Z2FYUmxjbUZpYkdVdWJHVnVaM1JvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2FHRnpUM2R1TG1OaGJHd29hWFJsY21GaWJHVXNJR2twS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUc1bGVIUXVkbUZzZFdVZ1BTQnBkR1Z5WVdKc1pWdHBYVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdibVY0ZEM1a2IyNWxJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYaDBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lHNWxlSFF1ZG1Gc2RXVWdQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdJQ0FnSUNBZ2JtVjRkQzVrYjI1bElEMGdkSEoxWlR0Y2JseHVJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGgwTzF4dUlDQWdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGgwTG01bGVIUWdQU0J1WlhoME8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklGSmxkSFZ5YmlCaGJpQnBkR1Z5WVhSdmNpQjNhWFJvSUc1dklIWmhiSFZsY3k1Y2JpQWdJQ0J5WlhSMWNtNGdleUJ1WlhoME9pQmtiMjVsVW1WemRXeDBJSDA3WEc0Z0lIMWNiaUFnY25WdWRHbHRaUzUyWVd4MVpYTWdQU0IyWVd4MVpYTTdYRzVjYmlBZ1puVnVZM1JwYjI0Z1pHOXVaVkpsYzNWc2RDZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z2V5QjJZV3gxWlRvZ2RXNWtaV1pwYm1Wa0xDQmtiMjVsT2lCMGNuVmxJSDA3WEc0Z0lIMWNibHh1SUNCRGIyNTBaWGgwTG5CeWIzUnZkSGx3WlNBOUlIdGNiaUFnSUNCamIyNXpkSEoxWTNSdmNqb2dRMjl1ZEdWNGRDeGNibHh1SUNBZ0lISmxjMlYwT2lCbWRXNWpkR2x2YmloemEybHdWR1Z0Y0ZKbGMyVjBLU0I3WEc0Z0lDQWdJQ0IwYUdsekxuQnlaWFlnUFNBd08xeHVJQ0FnSUNBZ2RHaHBjeTV1WlhoMElEMGdNRHRjYmlBZ0lDQWdJSFJvYVhNdWMyVnVkQ0E5SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0FnSUhSb2FYTXVaRzl1WlNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnZEdocGN5NWtaV3hsWjJGMFpTQTlJRzUxYkd3N1hHNWNiaUFnSUNBZ0lIUm9hWE11ZEhKNVJXNTBjbWxsY3k1bWIzSkZZV05vS0hKbGMyVjBWSEo1Ulc1MGNua3BPMXh1WEc0Z0lDQWdJQ0JwWmlBb0lYTnJhWEJVWlcxd1VtVnpaWFFwSUh0Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2JtRnRaU0JwYmlCMGFHbHpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0x5OGdUbTkwSUhOMWNtVWdZV0p2ZFhRZ2RHaGxJRzl3ZEdsdFlXd2diM0prWlhJZ2IyWWdkR2hsYzJVZ1kyOXVaR2wwYVc5dWN6cGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2JtRnRaUzVqYUdGeVFYUW9NQ2tnUFQwOUlGd2lkRndpSUNZbVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdoaGMwOTNiaTVqWVd4c0tIUm9hWE1zSUc1aGJXVXBJQ1ltWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0ZwYzA1aFRpZ3JibUZ0WlM1emJHbGpaU2d4S1NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTmJibUZ0WlYwZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JseHVJQ0FnSUhOMGIzQTZJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NWtiMjVsSUQwZ2RISjFaVHRjYmx4dUlDQWdJQ0FnZG1GeUlISnZiM1JGYm5SeWVTQTlJSFJvYVhNdWRISjVSVzUwY21sbGMxc3dYVHRjYmlBZ0lDQWdJSFpoY2lCeWIyOTBVbVZqYjNKa0lEMGdjbTl2ZEVWdWRISjVMbU52YlhCc1pYUnBiMjQ3WEc0Z0lDQWdJQ0JwWmlBb2NtOXZkRkpsWTI5eVpDNTBlWEJsSUQwOVBTQmNJblJvY205M1hDSXBJSHRjYmlBZ0lDQWdJQ0FnZEdoeWIzY2djbTl2ZEZKbFkyOXlaQzVoY21jN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbkoyWVd3N1hHNGdJQ0FnZlN4Y2JseHVJQ0FnSUdScGMzQmhkR05vUlhoalpYQjBhVzl1T2lCbWRXNWpkR2x2YmlobGVHTmxjSFJwYjI0cElIdGNiaUFnSUNBZ0lHbG1JQ2gwYUdsekxtUnZibVVwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHliM2NnWlhoalpYQjBhVzl1TzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMllYSWdZMjl1ZEdWNGRDQTlJSFJvYVhNN1hHNGdJQ0FnSUNCbWRXNWpkR2x2YmlCb1lXNWtiR1VvYkc5akxDQmpZWFZuYUhRcElIdGNiaUFnSUNBZ0lDQWdjbVZqYjNKa0xuUjVjR1VnUFNCY0luUm9jbTkzWENJN1hHNGdJQ0FnSUNBZ0lISmxZMjl5WkM1aGNtY2dQU0JsZUdObGNIUnBiMjQ3WEc0Z0lDQWdJQ0FnSUdOdmJuUmxlSFF1Ym1WNGRDQTlJR3h2WXp0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUNFaFkyRjFaMmgwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdkR2hwY3k1MGNubEZiblJ5YVdWekxteGxibWQwYUNBdElERTdJR2tnUGowZ01Ec2dMUzFwS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJsYm5SeWVTQTlJSFJvYVhNdWRISjVSVzUwY21sbGMxdHBYVHRjYmlBZ0lDQWdJQ0FnZG1GeUlISmxZMjl5WkNBOUlHVnVkSEo1TG1OdmJYQnNaWFJwYjI0N1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0dWdWRISjVMblJ5ZVV4dll5QTlQVDBnWENKeWIyOTBYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJGZUdObGNIUnBiMjRnZEdoeWIzZHVJRzkxZEhOcFpHVWdiMllnWVc1NUlIUnllU0JpYkc5amF5QjBhR0YwSUdOdmRXeGtJR2hoYm1Sc1pWeHVJQ0FnSUNBZ0lDQWdJQzh2SUdsMExDQnpieUJ6WlhRZ2RHaGxJR052YlhCc1pYUnBiMjRnZG1Gc2RXVWdiMllnZEdobElHVnVkR2x5WlNCbWRXNWpkR2x2YmlCMGIxeHVJQ0FnSUNBZ0lDQWdJQzh2SUhSb2NtOTNJSFJvWlNCbGVHTmxjSFJwYjI0dVhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHaGhibVJzWlNoY0ltVnVaRndpS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR2xtSUNobGJuUnllUzUwY25sTWIyTWdQRDBnZEdocGN5NXdjbVYyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUdoaGMwTmhkR05vSUQwZ2FHRnpUM2R1TG1OaGJHd29aVzUwY25rc0lGd2lZMkYwWTJoTWIyTmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJR2hoYzBacGJtRnNiSGtnUFNCb1lYTlBkMjR1WTJGc2JDaGxiblJ5ZVN3Z1hDSm1hVzVoYkd4NVRHOWpYQ0lwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0doaGMwTmhkR05vSUNZbUlHaGhjMFpwYm1Gc2JIa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuQnlaWFlnUENCbGJuUnllUzVqWVhSamFFeHZZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhR0Z1Wkd4bEtHVnVkSEo1TG1OaGRHTm9URzlqTENCMGNuVmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kR2hwY3k1d2NtVjJJRHdnWlc1MGNua3VabWx1WVd4c2VVeHZZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhR0Z1Wkd4bEtHVnVkSEo1TG1acGJtRnNiSGxNYjJNcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hvWVhORFlYUmphQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSb2FYTXVjSEpsZGlBOElHVnVkSEo1TG1OaGRHTm9URzlqS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJvWVc1a2JHVW9aVzUwY25rdVkyRjBZMmhNYjJNc0lIUnlkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaG9ZWE5HYVc1aGJHeDVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXdjbVYySUR3Z1pXNTBjbmt1Wm1sdVlXeHNlVXh2WXlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYUdGdVpHeGxLR1Z1ZEhKNUxtWnBibUZzYkhsTWIyTXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2loY0luUnllU0J6ZEdGMFpXMWxiblFnZDJsMGFHOTFkQ0JqWVhSamFDQnZjaUJtYVc1aGJHeDVYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHNYRzVjYmlBZ0lDQmhZbkoxY0hRNklHWjFibU4wYVc5dUtIUjVjR1VzSUdGeVp5a2dlMXh1SUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SUhSb2FYTXVkSEo1Ulc1MGNtbGxjeTVzWlc1bmRHZ2dMU0F4T3lCcElENDlJREE3SUMwdGFTa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1pXNTBjbmtnUFNCMGFHbHpMblJ5ZVVWdWRISnBaWE5iYVYwN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hsYm5SeWVTNTBjbmxNYjJNZ1BEMGdkR2hwY3k1d2NtVjJJQ1ltWEc0Z0lDQWdJQ0FnSUNBZ0lDQm9ZWE5QZDI0dVkyRnNiQ2hsYm5SeWVTd2dYQ0ptYVc1aGJHeDVURzlqWENJcElDWW1YRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbkJ5WlhZZ1BDQmxiblJ5ZVM1bWFXNWhiR3g1VEc5aktTQjdYRzRnSUNBZ0lDQWdJQ0FnZG1GeUlHWnBibUZzYkhsRmJuUnllU0E5SUdWdWRISjVPMXh1SUNBZ0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaG1hVzVoYkd4NVJXNTBjbmtnSmlaY2JpQWdJQ0FnSUNBZ0lDQW9kSGx3WlNBOVBUMGdYQ0ppY21WaGExd2lJSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lIUjVjR1VnUFQwOUlGd2lZMjl1ZEdsdWRXVmNJaWtnSmlaY2JpQWdJQ0FnSUNBZ0lDQm1hVzVoYkd4NVJXNTBjbmt1ZEhKNVRHOWpJRHc5SUdGeVp5QW1KbHh1SUNBZ0lDQWdJQ0FnSUdGeVp5QThQU0JtYVc1aGJHeDVSVzUwY25rdVptbHVZV3hzZVV4dll5a2dlMXh1SUNBZ0lDQWdJQ0F2THlCSloyNXZjbVVnZEdobElHWnBibUZzYkhrZ1pXNTBjbmtnYVdZZ1kyOXVkSEp2YkNCcGN5QnViM1FnYW5WdGNHbHVaeUIwYnlCaFhHNGdJQ0FnSUNBZ0lDOHZJR3h2WTJGMGFXOXVJRzkxZEhOcFpHVWdkR2hsSUhSeWVTOWpZWFJqYUNCaWJHOWpheTVjYmlBZ0lDQWdJQ0FnWm1sdVlXeHNlVVZ1ZEhKNUlEMGdiblZzYkR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2RtRnlJSEpsWTI5eVpDQTlJR1pwYm1Gc2JIbEZiblJ5ZVNBL0lHWnBibUZzYkhsRmJuUnllUzVqYjIxd2JHVjBhVzl1SURvZ2UzMDdYRzRnSUNBZ0lDQnlaV052Y21RdWRIbHdaU0E5SUhSNWNHVTdYRzRnSUNBZ0lDQnlaV052Y21RdVlYSm5JRDBnWVhKbk8xeHVYRzRnSUNBZ0lDQnBaaUFvWm1sdVlXeHNlVVZ1ZEhKNUtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJtVjRkQ0E5SUdacGJtRnNiSGxGYm5SeWVTNW1hVzVoYkd4NVRHOWpPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1amIyMXdiR1YwWlNoeVpXTnZjbVFwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCeVpYUjFjbTRnUTI5dWRHbHVkV1ZUWlc1MGFXNWxiRHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdZMjl0Y0d4bGRHVTZJR1oxYm1OMGFXOXVLSEpsWTI5eVpDd2dZV1owWlhKTWIyTXBJSHRjYmlBZ0lDQWdJR2xtSUNoeVpXTnZjbVF1ZEhsd1pTQTlQVDBnWENKMGFISnZkMXdpS1NCN1hHNGdJQ0FnSUNBZ0lIUm9jbTkzSUhKbFkyOXlaQzVoY21jN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHbG1JQ2h5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0ppY21WaGExd2lJSHg4WEc0Z0lDQWdJQ0FnSUNBZ2NtVmpiM0prTG5SNWNHVWdQVDA5SUZ3aVkyOXVkR2x1ZFdWY0lpa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtNWxlSFFnUFNCeVpXTnZjbVF1WVhKbk8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaHlaV052Y21RdWRIbHdaU0E5UFQwZ1hDSnlaWFIxY201Y0lpa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuSjJZV3dnUFNCeVpXTnZjbVF1WVhKbk8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG01bGVIUWdQU0JjSW1WdVpGd2lPMXh1SUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0p1YjNKdFlXeGNJaUFtSmlCaFpuUmxja3h2WXlrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG01bGVIUWdQU0JoWm5SbGNreHZZenRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdabWx1YVhOb09pQm1kVzVqZEdsdmJpaG1hVzVoYkd4NVRHOWpLU0I3WEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ2RHaHBjeTUwY25sRmJuUnlhV1Z6TG14bGJtZDBhQ0F0SURFN0lHa2dQajBnTURzZ0xTMXBLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQmxiblJ5ZVNBOUlIUm9hWE11ZEhKNVJXNTBjbWxsYzF0cFhUdGNiaUFnSUNBZ0lDQWdhV1lnS0dWdWRISjVMbVpwYm1Gc2JIbE1iMk1nUFQwOUlHWnBibUZzYkhsTWIyTXBJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbU52YlhCc1pYUmxLR1Z1ZEhKNUxtTnZiWEJzWlhScGIyNHNJR1Z1ZEhKNUxtRm1kR1Z5VEc5aktUdGNiaUFnSUNBZ0lDQWdJQ0J5WlhObGRGUnllVVZ1ZEhKNUtHVnVkSEo1S1R0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1EyOXVkR2x1ZFdWVFpXNTBhVzVsYkR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNWNiaUFnSUNCY0ltTmhkR05vWENJNklHWjFibU4wYVc5dUtIUnllVXh2WXlrZ2UxeHVJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJSFJvYVhNdWRISjVSVzUwY21sbGN5NXNaVzVuZEdnZ0xTQXhPeUJwSUQ0OUlEQTdJQzB0YVNrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnWlc1MGNua2dQU0IwYUdsekxuUnllVVZ1ZEhKcFpYTmJhVjA3WEc0Z0lDQWdJQ0FnSUdsbUlDaGxiblJ5ZVM1MGNubE1iMk1nUFQwOUlIUnllVXh2WXlrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCeVpXTnZjbVFnUFNCbGJuUnllUzVqYjIxd2JHVjBhVzl1TzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2h5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0owYUhKdmQxd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnZEdoeWIzZHVJRDBnY21WamIzSmtMbUZ5Wnp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsYzJWMFZISjVSVzUwY25rb1pXNTBjbmtwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2h5YjNkdU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQzh2SUZSb1pTQmpiMjUwWlhoMExtTmhkR05vSUcxbGRHaHZaQ0J0ZFhOMElHOXViSGtnWW1VZ1kyRnNiR1ZrSUhkcGRHZ2dZU0JzYjJOaGRHbHZibHh1SUNBZ0lDQWdMeThnWVhKbmRXMWxiblFnZEdoaGRDQmpiM0p5WlhOd2IyNWtjeUIwYnlCaElHdHViM2R1SUdOaGRHTm9JR0pzYjJOckxseHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Z3aWFXeHNaV2RoYkNCallYUmphQ0JoZEhSbGJYQjBYQ0lwTzF4dUlDQWdJSDBzWEc1Y2JpQWdJQ0JrWld4bFoyRjBaVmxwWld4a09pQm1kVzVqZEdsdmJpaHBkR1Z5WVdKc1pTd2djbVZ6ZFd4MFRtRnRaU3dnYm1WNGRFeHZZeWtnZTF4dUlDQWdJQ0FnZEdocGN5NWtaV3hsWjJGMFpTQTlJSHRjYmlBZ0lDQWdJQ0FnYVhSbGNtRjBiM0k2SUhaaGJIVmxjeWhwZEdWeVlXSnNaU2tzWEc0Z0lDQWdJQ0FnSUhKbGMzVnNkRTVoYldVNklISmxjM1ZzZEU1aGJXVXNYRzRnSUNBZ0lDQWdJRzVsZUhSTWIyTTZJRzVsZUhSTWIyTmNiaUFnSUNBZ0lIMDdYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQkRiMjUwYVc1MVpWTmxiblJwYm1Wc08xeHVJQ0FnSUgxY2JpQWdmVHRjYm4wcEtGeHVJQ0F2THlCQmJXOXVaeUIwYUdVZ2RtRnlhVzkxY3lCMGNtbGphM01nWm05eUlHOWlkR0ZwYm1sdVp5QmhJSEpsWm1WeVpXNWpaU0IwYnlCMGFHVWdaMnh2WW1Gc1hHNGdJQzh2SUc5aWFtVmpkQ3dnZEdocGN5QnpaV1Z0Y3lCMGJ5QmlaU0IwYUdVZ2JXOXpkQ0J5Wld4cFlXSnNaU0IwWldOb2JtbHhkV1VnZEdoaGRDQmtiMlZ6SUc1dmRGeHVJQ0F2THlCMWMyVWdhVzVrYVhKbFkzUWdaWFpoYkNBb2QyaHBZMmdnZG1sdmJHRjBaWE1nUTI5dWRHVnVkQ0JUWldOMWNtbDBlU0JRYjJ4cFkza3BMbHh1SUNCMGVYQmxiMllnWjJ4dlltRnNJRDA5UFNCY0ltOWlhbVZqZEZ3aUlEOGdaMnh2WW1Gc0lEcGNiaUFnZEhsd1pXOW1JSGRwYm1SdmR5QTlQVDBnWENKdlltcGxZM1JjSWlBL0lIZHBibVJ2ZHlBNlhHNGdJSFI1Y0dWdlppQnpaV3htSUQwOVBTQmNJbTlpYW1WamRGd2lJRDhnYzJWc1ppQTZJSFJvYVhOY2JpazdYRzRpWFgwPSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vbGliL3BvbHlmaWxsXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtY29yZS9wb2x5ZmlsbFwiKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gdHJ1ZTtcbiAgICB2YXIgY3VycmVudFF1ZXVlO1xuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG59XG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHF1ZXVlLnB1c2goZnVuKTtcbiAgICBpZiAoIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgbGF5b3V0TWFuYWdlciBmcm9tIFwibGF5b3V0TWFuYWdlclwiO1xuaW1wb3J0IFZlY3RvciBmcm9tIFwiVmVjdG9yXCI7XG5pbXBvcnQgRG90IGZyb20gXCJHYW1lRWxlbWVudHMvRG90XCI7XG5cbmNvbnN0IE5FSUdIQk9SUyA9IFtcbiAgbmV3IFZlY3RvcigwLCAtMSksIC8vIE5PUlRIXG4gIG5ldyBWZWN0b3IoMSwgMCksIC8vIEVBU1RcbiAgbmV3IFZlY3RvcigwLCAxKSwgLy8gU09VVEhcbiAgbmV3IFZlY3RvcigtMSwgMCkgLy8gV0VTVFxuXVxuXG5jbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNztcbiAgICB0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDc7XG5cbiAgICAvLyBjYWxjdWxhdGUgZWxlbWVudCBkaW1lbnNpb25zXG4gICAgdGhpcy5lbFdpZHRoID0gbGF5b3V0TWFuYWdlci53aWR0aCAvIHRoaXMud2lkdGg7XG4gICAgdGhpcy5lbEhlaWdodCA9IGxheW91dE1hbmFnZXIuaGVpZ2h0IC8gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5tYXhFbFNpemUgPSBNYXRoLm1pbih0aGlzLmVsV2lkdGgsIHRoaXMuZWxIZWlnaHQpIC8gMjtcblxuICAgIC8vIHBvcHVsYXRlIGVsZW1lbnRzIGFycmF5XG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLndpZHRoOyBqKyspIHtcbiAgICAgICAgbGV0IG5ld0RvdCA9IG5ldyBEb3Qoe1xuICAgICAgICAgIHg6IGosXG4gICAgICAgICAgeTogaSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0RWxlbWVudChuZXcgVmVjdG9yKGosIGkpLCBuZXdEb3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaGFzQ2hhbmdlZCA9IGZhbHNlOyAvLyBETyBOT1QgU0VUIFRISVMgVkFMVUUgRElSRUNUTFlcblxuICAgIHRoaXMuY2xvbmVkID0gbnVsbDtcblxuICAgIHRoaXMuYWN0aXZlRWxzID0gW107XG4gICAgdGhpcy5sb29wQ29tcGxldGVkID0gZmFsc2U7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1c2VkIHRvIHNldCBoYXNDaGFuZ2VkIHZhclxuICAgKlxuICAgKiAtIGhhc0NoYW5nZWQgc2hvdWxkIG9ubHkgYmUgc2V0IHRvIFwidHJ1ZVwiXG4gICAqIGF0IHRoZSBlbmQgb2YgdGhlIFwidHVyblwiIGZ1bmN0aW9uXG4gICAqIC0gaGFzQ2hhbmdlZCBzaG91bGQgb25seSBiZSBzZXQgdG8gXCJmYWxzZVwiXG4gICAqIGJ5IHRoZSByZW5kZXJlciBvbmNlIGFsbCByZWxldmFudCB0dXJuIGFuaW1hdGlvbnMgYXJlIGRvbmVcbiAgICovXG4gIHNldENoYW5nZWQoYm9vbCkge1xuICAgIHRoaXMuaGFzQ2hhbmdlZCA9IGJvb2w7XG5cbiAgICBpZiAoIWJvb2wpIHtcbiAgICAgIHRoaXMuYWN0aXZlRWxzID0gW107XG4gICAgICB0aGlzLmxvb3BDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRWxlbWVudCBWZWN0b3IgbWV0aG9kc1xuICAgKi9cbiAgZ2V0RWxlbWVudCh2ZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1sodmVjdG9yLnkgKiB0aGlzLndpZHRoKSArIHZlY3Rvci54XTtcbiAgfVxuXG4gIHNldEVsZW1lbnQodmVjdG9yLCBlbCkge1xuICAgIHRoaXMuZWxlbWVudHNbKHZlY3Rvci55ICogdGhpcy53aWR0aCkgKyB2ZWN0b3IueF0gPSBlbDtcbiAgfVxuXG4gIGdldE5laWdoYm9ycyh2ZWN0b3IpIHtcbiAgICBsZXQgbmVpZ2hib3JzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBORUlHSEJPUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5laWdoYm9ycy5wdXNoKHRoaXMuZ2V0RWxlbWVudCh2ZWN0b3IuYWRkKE5FSUdIQk9SU1tpXSkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmVpZ2hib3JzO1xuICB9XG5cblxuICAvKipcbiAgICogVHVybiAvIFVwZGF0ZSBNZXRob2RzXG4gICAqL1xuICB0dXJuKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZUVscy5sZW5ndGggPCAyKSB7XG4gICAgICB0aGlzLnNldENoYW5nZWQoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RhcnRUdXJuKCk7XG5cbiAgICB0aGlzLnJlbW92ZUFjdGl2ZUVsc0Zyb21HcmlkKCk7XG5cbiAgICB0aGlzLmFkZFByZXZpb3VzUG9zaXRpb25zKCk7XG5cbiAgICB0aGlzLnNoaWZ0RWxzRG93bigpO1xuXG4gICAgdGhpcy5jcmVhdGVOZXdFbHMoKTtcblxuICAgIHRoaXMuZmluaXNoVHVybigpO1xuICB9XG5cbiAgc3RhcnRUdXJuKCkge1xuXG4gICAgLy8gaWYgbG9vcCBpcyBjb21wbGV0ZSwgY2hhbmdlIGFjdGl2ZUVscyB0byBiZSBhcnJheSBpbmNsdWRpbmdcbiAgICAvLyBldmVyeSBzaW5nbGUgZWxlbWVudCBvZiBhY3RpdmVFbHMgdHlwZSAvIGlkIC8gY29sb3JcbiAgICBpZiAodGhpcy5sb29wQ29tcGxldGVkKSB7XG4gICAgICBsZXQgdHlwZUlkID0gdGhpcy5hY3RpdmVFbHNbMF0uZG90VHlwZS5pZDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudHNbaV07XG4gICAgICAgIGlmIChlbGVtZW50LmRvdFR5cGUuaWQgPT09IHR5cGVJZCAmJlxuICAgICAgICAgIHRoaXMuYWN0aXZlRWxzLmluZGV4T2YoZWxlbWVudCkgPT09IC0xKSB7XG5cbiAgICAgICAgICB0aGlzLmFjdGl2ZUVscy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWN0aXZlRWxzRnJvbUdyaWQgKCkge1xuICAgIC8vIHJlbW92ZSBhY3RpdmVFbHMgZnJvbSBncmlkXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZWxlbWVudHNbaV07XG5cbiAgICAgIGlmICh0aGlzLmFjdGl2ZUVscy5pbmRleE9mKGVsZW1lbnQpICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNldEVsZW1lbnQoZWxlbWVudC5ncmlkUG9zLCBudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBhZGRzIHByb3BlcnR5IHRvIGVhY2ggZ3JpZCBlbGVtZW50IHdpdGggYSByZWZlcmVuY2VcbiAgICogdG8gaXRzIHByZXZpb3VzIHBvc2l0aW9uIGZvciB1c2Ugd2hlbiBhbmltYXRpbmdcbiAgICovXG4gIGFkZFByZXZpb3VzUG9zaXRpb25zKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzW2ldO1xuICAgICAgaWYgKCFlbGVtZW50KSBjb250aW51ZTtcblxuICAgICAgZWxlbWVudC5wcmV2aW91c0dyaWRQb3MgPSBuZXcgVmVjdG9yKGVsZW1lbnQuZ3JpZFBvcy54LCBlbGVtZW50LmdyaWRQb3MueSk7XG4gICAgfVxuICB9XG5cbiAgc2hpZnRFbHNEb3duKCkge1xuICAgIC8vIHNvcnQgYWN0aXZlRWxzIHNvIHRoYXQgbG93ZXN0IHkncyBhcmUgZmlyc3QgaW4gYXJyXG4gICAgLy8gKG5vdCBkb2luZyB0aGlzIHJlc3VsdHMgaW4gZXJyb3JzIHdoaWxlIHNoaWZ0aW5nIHN0dWZmIGRvd24pXG4gICAgdGhpcy5hY3RpdmVFbHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZ3JpZFBvcy55IC0gYi5ncmlkUG9zLnk7XG4gICAgfSk7XG5cbiAgICAvLyBzaGlmdCBldmVyeXRoaW5nIGRvd25cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IHRoaXMuYWN0aXZlRWxzW2ldO1xuXG4gICAgICBsZXQgcG9zVmVjdCA9IGVsZW1lbnQuZ3JpZFBvcztcbiAgICAgIGxldCB5ID0gcG9zVmVjdC55IC0gMTtcbiAgICAgIGxldCB4ID0gcG9zVmVjdC54O1xuICAgICAgd2hpbGUoeSA+PSAwKSB7XG5cbiAgICAgICAgbGV0IGVsQWJvdmUgPSB0aGlzLmdldEVsZW1lbnQobmV3IFZlY3Rvcih4LCB5KSk7XG5cbiAgICAgICAgdGhpcy5zZXRFbGVtZW50KG5ldyBWZWN0b3IoeCwgeSArIDEpLCBlbEFib3ZlKTtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50KG5ldyBWZWN0b3IoeCwgeSksIG51bGwpO1xuXG4gICAgICAgIHktLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBlbGVtZW50IGV4aXN0cyBpbiBwb3NpdGlvbiwgY29ycmVjdCBpdCdzIGdyaWRQb3MuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhlaWdodDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMud2lkdGg7IGorKykge1xuICAgICAgICBsZXQgZ3JpZFBvcyA9IG5ldyBWZWN0b3IoaiwgaSk7XG5cbiAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQoZ3JpZFBvcyk7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5ncmlkUG9zID0gZ3JpZFBvcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZU5ld0VscygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVpZ2h0OyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XG4gICAgICAgIGxldCBncmlkUG9zID0gbmV3IFZlY3RvcihqLCBpKTtcblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudChncmlkUG9zKTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgbGV0IG5ld0RvdCA9IG5ldyBEb3QoZ3JpZFBvcyk7XG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50KGdyaWRQb3MsIG5ld0RvdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5pc2hUdXJuKCkge1xuICAgIHRoaXMuc2V0Q2hhbmdlZCh0cnVlKTtcbiAgfVxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZDtcbiIsImltcG9ydCBtYXRoVXRpbHMgZnJvbSBcIi4uL3V0aWxzL21hdGhVdGlsc1wiO1xuaW1wb3J0IFZlY3RvciBmcm9tIFwiLi4vVmVjdG9yXCI7XG5cbmNvbnN0IERPVFRZUEVTID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ3JlZCcsXG4gICAgY29sb3I6ICcjZjE1YzNiJ1xuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgbmFtZTogJ3llbGxvdycsXG4gICAgY29sb3I6ICcjZTdkZDAwJ1xuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgbmFtZTogJ2dyZWVuJyxcbiAgICBjb2xvcjogJyM4OWVkOTAnXG4gIH0sXG4gIC8vIHtcbiAgLy8gICBpZDogNCxcbiAgLy8gICBuYW1lOiAnYmx1ZScsXG4gIC8vICAgY29sb3I6ICcjOGFiZGZmJ1xuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgaWQ6IDUsXG4gIC8vICAgbmFtZTogJ3B1cnBsZScsXG4gIC8vICAgY29sb3I6ICcjOWQ1YWI3J1xuICAvLyB9XG5dO1xuXG5jbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5ncmlkUG9zID0gbmV3IFZlY3RvcihvcHRpb25zLngsIG9wdGlvbnMueSk7XG4gICAgdGhpcy5kb3RUeXBlID0gRE9UVFlQRVNbbWF0aFV0aWxzLnJhbmRvbUludCgwLCBET1RUWVBFUy5sZW5ndGggLSAxKV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEb3Q7XG4iLCJpbXBvcnQgbGF5b3V0TWFuYWdlciBmcm9tIFwibGF5b3V0TWFuYWdlclwiO1xuaW1wb3J0IG1hdGhVdGlscyBmcm9tIFwidXRpbHMvbWF0aFV0aWxzXCI7XG5pbXBvcnQgQm9hcmQgZnJvbSBcIkJvYXJkXCI7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIlJlbmRlcmVyXCI7XG5cbmNsYXNzIEdhbWVWaWV3IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBvcHRpb25zLmNvbnRhaW5lci5hcHBlbmQodGhpcy5lbCk7XG4gICAgdGhpcy5lbC53aWR0aCA9IGxheW91dE1hbmFnZXIud2lkdGg7XG4gICAgdGhpcy5lbC5oZWlnaHQgPSBsYXlvdXRNYW5hZ2VyLmhlaWdodDtcblxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWwuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRNb3VzZVBvcyA9IG51bGw7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih7XG4gICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXAuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogVG91Y2ggRXZlbnRzXG4gICAqL1xuICBtb3VzZURvd24oZSkge1xuICAgIGlmICh0aGlzLmJvYXJkLmhhc0NoYW5nZWQpIHJldHVybjtcblxuICAgIGxldCBob3ZlckVsID0gdGhpcy5nZXRIb3ZlckVsKGUpO1xuICAgIGlmICghaG92ZXJFbCkgcmV0dXJuO1xuICAgIGlmICghdGhpcy5tb3VzZUluRWwoZSwgaG92ZXJFbCkpIHJldHVybjtcblxuICAgIHRoaXMuYm9hcmQuYWN0aXZlRWxzLnB1c2goaG92ZXJFbCk7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5jdXJyZW50TW91c2VQb3MgPSBlO1xuICB9XG5cbiAgbW91c2VNb3ZlKGUpIHtcbiAgICBpZiAoIXRoaXMubW91c2VQcmVzc2VkIHx8IXRoaXMuYm9hcmQuYWN0aXZlRWxzLmxlbmd0aCB8fFxuICAgICAgdGhpcy5ib2FyZC5oYXNDaGFuZ2VkKSByZXR1cm47XG5cbiAgICB0aGlzLmN1cnJlbnRNb3VzZVBvcyA9IGU7XG5cbiAgICBsZXQgaG92ZXJFbCA9IHRoaXMuZ2V0SG92ZXJFbCh0aGlzLmN1cnJlbnRNb3VzZVBvcyk7XG4gICAgaWYgKCFob3ZlckVsKSByZXR1cm47XG5cblxuICAgIGlmICh0aGlzLm1vdXNlSW5FbCh0aGlzLmN1cnJlbnRNb3VzZVBvcywgaG92ZXJFbCkgJiZcbiAgICAgICF0aGlzLmJvYXJkLmxvb3BDb21wbGV0ZWQpIHtcblxuICAgICAgdGhpcy5oYW5kbGVNb3VzZUluRWwoaG92ZXJFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlTW91c2VPdXRFbChob3ZlckVsKTtcbiAgICB9XG5cblxuICB9XG5cbiAgbW91c2VVcChlKSB7XG4gICAgaWYgKHRoaXMuYm9hcmQuaGFzQ2hhbmdlZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5ib2FyZC50dXJuKCk7XG4gICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcbiAgfVxuXG5cbiAgZ2V0SG92ZXJFbChlKSB7XG4gICAgbGV0IHggPSBlLmNsaWVudFg7XG4gICAgbGV0IHkgPSBlLmNsaWVudFk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYm9hcmQuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5ib2FyZC5lbGVtZW50c1tpXTtcbiAgICAgIGxldCBlbFJlY3QgPSB7XG4gICAgICAgIHg6IGVsZW1lbnQuZ3JpZFBvcy54ICogdGhpcy5ib2FyZC5lbFdpZHRoLFxuICAgICAgICB5OiBlbGVtZW50LmdyaWRQb3MueSAqIHRoaXMuYm9hcmQuZWxIZWlnaHQsXG4gICAgICAgIHdpZHRoOiB0aGlzLmJvYXJkLmVsV2lkdGgsXG4gICAgICAgIGhlaWdodDogdGhpcy5ib2FyZC5lbEhlaWdodFxuICAgICAgfVxuXG4gICAgICBpZiAobWF0aFV0aWxzLnBvaW50SW5SZWN0KHgsIHksIGVsUmVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VJbkVsKGUsIGVsZW1lbnQpIHtcbiAgICBsZXQgeCA9IGUuY2xpZW50WDtcbiAgICBsZXQgeSA9IGUuY2xpZW50WTtcbiAgICBsZXQgY2lyY2xlID0ge1xuICAgICAgeDogZWxlbWVudC5ncmlkUG9zLnggKiB0aGlzLmJvYXJkLmVsV2lkdGggKyB0aGlzLmJvYXJkLmVsV2lkdGggLyAyLFxuICAgICAgeTogZWxlbWVudC5ncmlkUG9zLnkgKiB0aGlzLmJvYXJkLmVsSGVpZ2h0ICsgdGhpcy5ib2FyZC5lbEhlaWdodCAvIDIsXG4gICAgICByYWRpdXM6IHRoaXMuYm9hcmQubWF4RWxTaXplIC8gMlxuICAgIH1cblxuICAgIHJldHVybiBtYXRoVXRpbHMuY2lyY2xlUG9pbnRDb2xsaXNpb24oeCwgeSwgY2lyY2xlKTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlSW5FbChob3ZlckVsKSB7XG4gICAgbGV0IGN1cnJlbnRFbCA9IHRoaXMuYm9hcmQuYWN0aXZlRWxzW3RoaXMuYm9hcmQuYWN0aXZlRWxzLmxlbmd0aCAtIDFdO1xuICAgIGxldCBuZWlnaGJvcnMgPSB0aGlzLmJvYXJkLmdldE5laWdoYm9ycyhjdXJyZW50RWwuZ3JpZFBvcyk7XG5cbiAgICAvLyBob3ZlckVsIGlzIE5PVCBpbiBhY3RpdmVFbHMgYXJyYXkgYnV0IElTIGEgbmVpZ2hib3Igb2YgY3VycmVudEVsXG4gICAgLy8gYW5kIGlzIG9mIHRoZSBzYW1lIHR5cGUgYXMgaXMgdGhlIHNhbWUgdHlwZSBhcyBjdXJyZW50RWxcbiAgICBpZiAoaG92ZXJFbC5kb3RUeXBlLmlkID09PSBjdXJyZW50RWwuZG90VHlwZS5pZCAmJlxuICAgICAgdGhpcy5ib2FyZC5hY3RpdmVFbHMuaW5kZXhPZihob3ZlckVsKSA9PT0gLTEgJiZcbiAgICAgIG5laWdoYm9ycy5pbmRleE9mKGhvdmVyRWwpICE9PSAtMSkge1xuXG4gICAgICB0aGlzLmJvYXJkLmFjdGl2ZUVscy5wdXNoKGhvdmVyRWwpO1xuICAgIH1cblxuICAgIC8vIGxvb3AgaXMgY29tcGxldGVkXG4gICAgZWxzZSBpZiAoaG92ZXJFbC5kb3RUeXBlLmlkID09PSBjdXJyZW50RWwuZG90VHlwZS5pZCAmJlxuICAgICAgdGhpcy5ib2FyZC5hY3RpdmVFbHMuaW5kZXhPZihob3ZlckVsKSA9PT0gMCAmJlxuICAgICAgbmVpZ2hib3JzLmluZGV4T2YoaG92ZXJFbCkgIT09IC0xICYmXG4gICAgICB0aGlzLmJvYXJkLmFjdGl2ZUVscy5sZW5ndGggPj0gNCkge1xuXG4gICAgICB0aGlzLmJvYXJkLmFjdGl2ZUVscy5wdXNoKGhvdmVyRWwpO1xuICAgICAgdGhpcy5ib2FyZC5sb29wQ29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwcmV0dHkgY29tcGxpY2F0ZWQuIEluIHNob3J0LCBpdCBkZXRlcm1pbmVzIHdoZW4gdG8gcmVtb3ZlXG4gICAqIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGFjdGl2ZUVscyBhcnJheSB3aGVuIHRoZSB1c2VyIGlzIHRyeWluZyB0by4gSXQgY291bGRcbiAgICogcHJvYmFibHkgYmUgc2ltcGxpZmllZCB2YXN0bHkgYnV0IGl0IHNlZW1zIHRvIHdvcmsgZm9yIG5vdy5cbiAgICpcbiAgICogTm90ZTogaWYgd2luZG93LmRlYnVnID0gdHJ1ZSBhbmQgeW91IHNldCB3aW5kb3cucmVjdEJldHdlZW5SZWNlbnRzIHRvXG4gICAqIHRoZSByZWN0YW5nbGUsIGl0IHdpbGwgYmUgZHJhd24gaW4gcmVuZGVyZXIucmVuZGVyKCkuXG4gICAqXG4gICAqIFN0ZXBzOlxuICAgKiAtIGdldCB0aGUgbW9zdCByZWNlbnQgYW5kIHRoZSBzZWNvbmQgbW9zdCByZWNlbnQgYWN0aXZlRWxzXG4gICAqIC0gZ2V0IHRoZSBncmlkIHZlY3RvciBwb2ludGluZyBmcm9tIHRoZSBtb3N0IHJlY2VudCB0byB0aGUgc2Vjb25kIG1vc3QgcmVjZW50XG4gICAqIC0gZ2VuZXJhdGUgYSByZWN0YW5nbGUgdG8gcmVwcmVzZW50IHRoaXMgdmVjdG9yIGluIHNjcmVlbiBzcGFjZSBhbmQgbW9kaWZ5XG4gICAqIHRoZSB4LCB5LCB3aWR0aCwgJiBoZWlnaHQgc3VjaCB0aGF0IGl0IGRvZXNuJ3Qgb3ZlcmxhcCB0b28gbXVjaCB3aXRoIGVpdGhlciBlbGVtZW50XG4gICAqIC0gZG8gYSBoaXQgLyBjb2xsaXNpb24gdGVzdCB0byBjaGVjayBpZiBjdXJzb3IgaXMgaW4gdGhpcyByZWN0YW5nbGVcbiAgICogYW5kIGlmIHNvIHJlbW92ZSAvIFtdLnBvcCgpIHRoZSBtb3N0IHJlY2VudCBhY3RpdmVFbFxuICAgKi9cbiAgaGFuZGxlTW91c2VPdXRFbChob3ZlckVsKSB7XG5cbiAgICAvLyBvbmx5IHRyeSB0byBtb3ZlIGJhY2sgaWYgYXJyYXkgbGVuZ3RoIGlzIDIgb3IgbW9yZVxuICAgIGlmICh0aGlzLmJvYXJkLmFjdGl2ZUVscy5sZW5ndGggPCAyKSByZXR1cm47XG5cbiAgICBsZXQgbW9zdFJlY2VudEFjdGl2ZUVsID1cbiAgICAgIHRoaXMuYm9hcmQuYWN0aXZlRWxzW3RoaXMuYm9hcmQuYWN0aXZlRWxzLmxlbmd0aCAtIDFdO1xuXG4gICAgbGV0IHNlY29uZE1vc3RSZWNlbnRBY3RpdmVFbCA9XG4gICAgICB0aGlzLmJvYXJkLmFjdGl2ZUVsc1t0aGlzLmJvYXJkLmFjdGl2ZUVscy5sZW5ndGggLSAyXTtcblxuICAgIGxldCB2ZWN0VG9TZWNvbmRNb3N0UmVjZW50ID1cbiAgICAgIHNlY29uZE1vc3RSZWNlbnRBY3RpdmVFbC5ncmlkUG9zLnN1YnRyYWN0KG1vc3RSZWNlbnRBY3RpdmVFbC5ncmlkUG9zKTtcblxuICAgIGxldCByZWN0QmV0d2VlblJlY2VudHMgPSB7XG4gICAgICB3aWR0aDogdmVjdFRvU2Vjb25kTW9zdFJlY2VudC54ICogdGhpcy5ib2FyZC5lbFdpZHRoLFxuICAgICAgaGVpZ2h0OiB2ZWN0VG9TZWNvbmRNb3N0UmVjZW50LnkgKiB0aGlzLmJvYXJkLmVsSGVpZ2h0LFxuICAgIH07XG5cbiAgICBpZiAocmVjdEJldHdlZW5SZWNlbnRzLndpZHRoICE9PSAwKSAvLyBob3Jpem9udGFsIGNvbGxpc2lvbiByZWN0YW5nbGVcbiAgICB7XG4gICAgICBsZXQgc2hpZnRYO1xuICAgICAgaWYgKHJlY3RCZXR3ZWVuUmVjZW50cy53aWR0aCA+IDApIHtcbiAgICAgICAgcmVjdEJldHdlZW5SZWNlbnRzLndpZHRoIC09IHRoaXMuYm9hcmQubWF4RWxTaXplO1xuICAgICAgICBzaGlmdFggPSAodGhpcy5ib2FyZC5tYXhFbFNpemUgLyAyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY3RCZXR3ZWVuUmVjZW50cy53aWR0aCArPSB0aGlzLmJvYXJkLm1heEVsU2l6ZTtcbiAgICAgICAgc2hpZnRYID0gLSh0aGlzLmJvYXJkLm1heEVsU2l6ZSAvIDIpO1xuICAgICAgfVxuXG4gICAgICByZWN0QmV0d2VlblJlY2VudHMuaGVpZ2h0ID0gdGhpcy5ib2FyZC5tYXhFbFNpemUgLyAxLjU7XG5cbiAgICAgIHJlY3RCZXR3ZWVuUmVjZW50cy55ID0gKG1vc3RSZWNlbnRBY3RpdmVFbC5ncmlkUG9zLnkgKiB0aGlzLmJvYXJkLmVsSGVpZ2h0KSArXG4gICAgICAgICh0aGlzLmJvYXJkLmVsSGVpZ2h0IC8gMikgLSAocmVjdEJldHdlZW5SZWNlbnRzLmhlaWdodCAvIDIpO1xuICAgICAgcmVjdEJldHdlZW5SZWNlbnRzLnggPSAobW9zdFJlY2VudEFjdGl2ZUVsLmdyaWRQb3MueCAqIHRoaXMuYm9hcmQuZWxXaWR0aCkgK1xuICAgICAgICAodGhpcy5ib2FyZC5lbFdpZHRoIC8gMikgKyBzaGlmdFg7XG5cbiAgICB9IGVsc2UgLy8gdmVydGljYWwgY29sbGlzaW9uIHJlY3RhbmdsZVxuICAgIHtcbiAgICAgIGxldCBzaGlmdFk7XG4gICAgICBpZiAocmVjdEJldHdlZW5SZWNlbnRzLmhlaWdodCA+IDApIHtcbiAgICAgICAgcmVjdEJldHdlZW5SZWNlbnRzLmhlaWdodCAtPSB0aGlzLmJvYXJkLm1heEVsU2l6ZTtcbiAgICAgICAgc2hpZnRZID0gKHRoaXMuYm9hcmQubWF4RWxTaXplIC8gMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWN0QmV0d2VlblJlY2VudHMuaGVpZ2h0ICs9IHRoaXMuYm9hcmQubWF4RWxTaXplO1xuICAgICAgICBzaGlmdFkgPSAtKHRoaXMuYm9hcmQubWF4RWxTaXplIC8gMik7XG4gICAgICB9XG5cbiAgICAgIHJlY3RCZXR3ZWVuUmVjZW50cy53aWR0aCA9IHRoaXMuYm9hcmQubWF4RWxTaXplIC8gMS41O1xuXG4gICAgICByZWN0QmV0d2VlblJlY2VudHMueSA9IChtb3N0UmVjZW50QWN0aXZlRWwuZ3JpZFBvcy55ICogdGhpcy5ib2FyZC5lbEhlaWdodCkgK1xuICAgICAgICAodGhpcy5ib2FyZC5lbEhlaWdodCAvIDIpICsgc2hpZnRZO1xuICAgICAgcmVjdEJldHdlZW5SZWNlbnRzLnggPSAobW9zdFJlY2VudEFjdGl2ZUVsLmdyaWRQb3MueCAqIHRoaXMuYm9hcmQuZWxXaWR0aCkgK1xuICAgICAgICAodGhpcy5ib2FyZC5lbFdpZHRoIC8gMikgLSAocmVjdEJldHdlZW5SZWNlbnRzLndpZHRoIC8gMik7XG4gICAgfVxuXG4gICAgaWYgKG1hdGhVdGlscy5wb2ludEluUmVjdCh0aGlzLmN1cnJlbnRNb3VzZVBvcy5jbGllbnRYLFxuICAgICAgdGhpcy5jdXJyZW50TW91c2VQb3MuY2xpZW50WSwgcmVjdEJldHdlZW5SZWNlbnRzKSkge1xuXG4gICAgICB0aGlzLmJvYXJkLmFjdGl2ZUVscy5wb3AoKTtcbiAgICAgIGlmICh0aGlzLmJvYXJkLmxvb3BDb21wbGV0ZWQpIHRoaXMuYm9hcmQubG9vcENvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHdpbmRvdy5yZWN0QmV0d2VlblJlY2VudHMgPSByZWN0QmV0d2VlblJlY2VudHM7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBNYWluIFVwZGF0ZSBMb29wXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLmJvYXJkLCB0aGlzLmN1cnJlbnRNb3VzZVBvcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lVmlldztcbiIsImltcG9ydCBsYXlvdXRNYW5hZ2VyIGZyb20gXCJsYXlvdXRNYW5hZ2VyXCI7XG5cbmNsYXNzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuY29udGV4dCA9IG9wdGlvbnMuY29udGV4dDtcblxuICAgIHRoaXMuaXNBbmltYXRpbmdUdXJuID0gZmFsc2U7XG4gICAgdGhpcy5hY3RpdmVFbHMgPSBbXTtcbiAgICB0aGlzLnNoaWZ0aW5nRWxzID0gW107XG4gICAgdGhpcy5uZXdFbHMgPSBbXTtcbiAgICB0aGlzLnR1cm5BbmltYXRpb25TdGVwcyA9IFtdO1xuICB9XG5cbiAgcHJlcGFyZUFuaW1hdGlvblR1cm5EYXRhKGJvYXJkKSB7XG4gICAgdGhpcy5pc0FuaW1hdGluZ1R1cm4gPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuYWN0aXZlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IGJvYXJkLmFjdGl2ZUVsc1tpXTtcbiAgICAgIHRoaXMuYWN0aXZlRWxzLnB1c2goe1xuICAgICAgICBjdXJyZW50WDogZWxlbWVudC5ncmlkUG9zLngsXG4gICAgICAgIGN1cnJlbnRZOiBlbGVtZW50LmdyaWRQb3MueSxcbiAgICAgICAgZG90VHlwZTogZWxlbWVudC5kb3RUeXBlLFxuICAgICAgICByYWRpdXM6IGJvYXJkLm1heEVsU2l6ZSAvIDIsXG4gICAgICAgIGxvb3BlZFJhZGl1czogYm9hcmQubG9vcENvbXBsZXRlZCA/IGJvYXJkLm1heEVsU2l6ZSAvIDEuNSA6IG51bGwsXG4gICAgICAgIGxvb3BlZEFscGhhOiBib2FyZC5sb29wQ29tcGxldGVkID8gMC41IDogbnVsbFxuICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBlbGVtZW50ID0gYm9hcmQuZWxlbWVudHNbaV07XG4gICAgICBpZiAoZWxlbWVudC5wcmV2aW91c0dyaWRQb3MpIHtcbiAgICAgICAgdGhpcy5zaGlmdGluZ0Vscy5wdXNoKHtcbiAgICAgICAgICBjdXJyZW50WDogZWxlbWVudC5ncmlkUG9zLngsXG4gICAgICAgICAgY3VycmVudFk6IGVsZW1lbnQuZ3JpZFBvcy55LFxuICAgICAgICAgIHByZXZYOiBlbGVtZW50LnByZXZpb3VzR3JpZFBvcy54LFxuICAgICAgICAgIHByZXZZOiBlbGVtZW50LnByZXZpb3VzR3JpZFBvcy55LFxuICAgICAgICAgIGRvdFR5cGU6IGVsZW1lbnQuZG90VHlwZSxcbiAgICAgICAgICByYWRpdXM6IGJvYXJkLm1heEVsU2l6ZSAvIDIsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uZXdFbHMucHVzaCh7XG4gICAgICAgICAgY3VycmVudFg6IGVsZW1lbnQuZ3JpZFBvcy54LFxuICAgICAgICAgIGN1cnJlbnRZOiBlbGVtZW50LmdyaWRQb3MueSxcbiAgICAgICAgICBwcmV2WDogZWxlbWVudC5ncmlkUG9zLngsXG4gICAgICAgICAgcHJldlk6IC0xMDAsXG4gICAgICAgICAgZG90VHlwZTogZWxlbWVudC5kb3RUeXBlLFxuICAgICAgICAgIHJhZGl1czogYm9hcmQubWF4RWxTaXplIC8gMixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50dXJuQW5pbWF0aW9uU3RlcHMucHVzaCh0aGlzLnNocmlua0FjdGl2ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNocmlua0FjdGl2ZSgpIHtcbiAgICB2YXIgc2hyaW5rQ29tcGxldGVkID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IHRoaXMuYWN0aXZlRWxzW2ldO1xuXG4gICAgICBpZiAoZWxlbWVudC5yYWRpdXMgPiAwKSB7XG4gICAgICAgIGVsZW1lbnQucmFkaXVzIC09IDE7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQubG9vcGVkQWxwaGEgJiYgZWxlbWVudC5sb29wZWRBbHBoYSA+IDApIHtcbiAgICAgICAgICBlbGVtZW50Lmxvb3BlZEFscGhhIC09IDAuMDU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQubG9vcGVkUmFkaXVzICYmIGVsZW1lbnQubG9vcGVkUmFkaXVzID4gMCkge1xuICAgICAgICAgIGVsZW1lbnQubG9vcGVkUmFkaXVzIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBzaHJpbmtDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2hyaW5rQ29tcGxldGVkKSB7XG4gICAgICB0aGlzLmFjdGl2ZUVscyA9IFtdO1xuICAgICAgdGhpcy50dXJuQW5pbWF0aW9uU3RlcHMuc2hpZnQoKTtcbiAgICB9XG4gIH1cblxuXG4gIHJlbmRlcihib2FyZCwgY3VycmVudE1vdXNlUG9zKSB7XG4gICAgaWYgKGJvYXJkLmhhc0NoYW5nZWQgJiYgIXRoaXMuaXNBbmltYXRpbmdUdXJuKSB7XG4gICAgICB0aGlzLnByZXBhcmVBbmltYXRpb25UdXJuRGF0YShib2FyZCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBsYXlvdXRNYW5hZ2VyLndpZHRoLCBsYXlvdXRNYW5hZ2VyLmhlaWdodCk7XG5cbiAgICAvLyBkZWJ1ZyBkcmF3c1xuICAgIGlmICh3aW5kb3cuZGVidWcgJiYgd2luZG93LnJlY3RCZXR3ZWVuUmVjZW50cykge1xuICAgICAgdGhpcy5kcmF3QmFja0JvdW5kcygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQW5pbWF0aW5nVHVybikge1xuICAgICAgaWYgKHRoaXMudHVybkFuaW1hdGlvblN0ZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy50dXJuQW5pbWF0aW9uU3RlcHNbMF0oYm9hcmQsIGN1cnJlbnRNb3VzZVBvcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJhd1R1cm5BbmltYXRpb25Cb2FyZChib2FyZCk7XG5cbiAgICAgIGlmICh0aGlzLnR1cm5BbmltYXRpb25TdGVwcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZ1R1cm4gPSBmYWxzZTtcbiAgICAgICAgYm9hcmQuc2V0Q2hhbmdlZChmYWxzZSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGJvYXJkLmFjdGl2ZUVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZHJhd0FjdGl2ZUVsQ29ubmVjdGlvbnMoYm9hcmQsIGN1cnJlbnRNb3VzZVBvcyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9hcmQuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBib2FyZC5lbGVtZW50c1tpXTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHRoaXMuZHJhd0VsZW1lbnQoYm9hcmQsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyYXdUdXJuQW5pbWF0aW9uQm9hcmQoYm9hcmQpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVFbHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuYWN0aXZlRWxzW2ldO1xuICAgICAgICB0aGlzLmRyYXdUdXJuQW5pbWF0aW9uRWxlbWVudChib2FyZCwgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhd1R1cm5BbmltYXRpb25FbGVtZW50KGJvYXJkLCBlbGVtZW50KSB7XG5cbiAgICBpZiAoZWxlbWVudC5yYWRpdXMgPCAwKSByZXR1cm47XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gZWxlbWVudC5kb3RUeXBlLmNvbG9yO1xuXG4gICAgbGV0IHggPSBlbGVtZW50LmN1cnJlbnRYICogYm9hcmQuZWxXaWR0aCArIGJvYXJkLmVsV2lkdGggLyAyO1xuICAgIGxldCB5ID0gZWxlbWVudC5jdXJyZW50WSAqIGJvYXJkLmVsSGVpZ2h0ICsgYm9hcmQuZWxIZWlnaHQgLyAyO1xuXG4gICAgaWYgKGVsZW1lbnQubG9vcGVkUmFkaXVzICYmIGVsZW1lbnQubG9vcGVkQWxwaGEpIHtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gTWF0aC5tYXgoZWxlbWVudC5sb29wZWRBbHBoYSwgMCk7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHgsIHksIGVsZW1lbnQubG9vcGVkUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICAgIHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMoeCwgeSwgZWxlbWVudC5yYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgfVxuXG5cblxuICBkcmF3QWN0aXZlRWxDb25uZWN0aW9ucyhib2FyZCwgY3VycmVudE1vdXNlUG9zKSB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSBib2FyZC5tYXhFbFNpemUgLyA0O1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFwiIzMzM1wiO1xuXG4gICAgaWYgKGJvYXJkLmFjdGl2ZUVscy5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGJvYXJkLmFjdGl2ZUVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcHJldkVsID0gYm9hcmQuYWN0aXZlRWxzW2kgLSAxXTtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhwcmV2RWwuZ3JpZFBvcy54ICogYm9hcmQuZWxXaWR0aCArIGJvYXJkLmVsV2lkdGggLyAyLFxuICAgICAgICAgIHByZXZFbC5ncmlkUG9zLnkgKiBib2FyZC5lbEhlaWdodCArIGJvYXJkLmVsSGVpZ2h0IC8gMik7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRFbCA9IGJvYXJkLmFjdGl2ZUVsc1tpXTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhjdXJyZW50RWwuZ3JpZFBvcy54ICogYm9hcmQuZWxXaWR0aCArIGJvYXJkLmVsV2lkdGggLyAyLFxuICAgICAgICAgIGN1cnJlbnRFbC5ncmlkUG9zLnkgKiBib2FyZC5lbEhlaWdodCArIGJvYXJkLmVsSGVpZ2h0IC8gMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGxhc3RFbCA9IGJvYXJkLmFjdGl2ZUVsc1tib2FyZC5hY3RpdmVFbHMubGVuZ3RoIC0gMV07XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhsYXN0RWwuZ3JpZFBvcy54ICogYm9hcmQuZWxXaWR0aCArIGJvYXJkLmVsV2lkdGggLyAyLFxuICAgICAgbGFzdEVsLmdyaWRQb3MueSAqIGJvYXJkLmVsSGVpZ2h0ICsgYm9hcmQuZWxIZWlnaHQgLyAyKTtcblxuICAgIGlmIChib2FyZC5sb29wQ29tcGxldGVkKSB7XG4gICAgICBsZXQgZmlyc3RFbCA9IGJvYXJkLmFjdGl2ZUVsc1swXTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oZmlyc3RFbC5ncmlkUG9zLnggKiBib2FyZC5lbFdpZHRoICsgYm9hcmQuZWxXaWR0aCAvIDIsXG4gICAgICAgIGZpcnN0RWwuZ3JpZFBvcy55ICogYm9hcmQuZWxIZWlnaHQgKyBib2FyZC5lbEhlaWdodCAvIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKGN1cnJlbnRNb3VzZVBvcy5jbGllbnRYLCBjdXJyZW50TW91c2VQb3MuY2xpZW50WSk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIGRyYXdFbGVtZW50KGJvYXJkLCBlbGVtZW50KSB7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGVsZW1lbnQuZG90VHlwZS5jb2xvcjtcblxuICAgIGxldCB4ID0gZWxlbWVudC5ncmlkUG9zLnggKiBib2FyZC5lbFdpZHRoICsgYm9hcmQuZWxXaWR0aCAvIDI7XG4gICAgbGV0IHkgPSBlbGVtZW50LmdyaWRQb3MueSAqIGJvYXJkLmVsSGVpZ2h0ICsgYm9hcmQuZWxIZWlnaHQgLyAyO1xuXG4gICAgaWYgKGJvYXJkLmxvb3BDb21wbGV0ZWQgJiZcbiAgICAgIGJvYXJkLmFjdGl2ZUVsc1swXS5kb3RUeXBlLmlkID09PSBlbGVtZW50LmRvdFR5cGUuaWQpIHtcblxuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMC41O1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCBib2FyZC5tYXhFbFNpemUgLyAxLjUsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgICAgdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCBib2FyZC5tYXhFbFNpemUgLyAyLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG5cbiAgfVxuXG4gIGRyYXdCYWNrQm91bmRzKCkge1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiNjY2NcIjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QocmVjdEJldHdlZW5SZWNlbnRzLngsIHJlY3RCZXR3ZWVuUmVjZW50cy55LFxuICAgICAgcmVjdEJldHdlZW5SZWNlbnRzLndpZHRoLCByZWN0QmV0d2VlblJlY2VudHMuaGVpZ2h0KTtcblxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyZXI7XG4iLCJcblxuY2xhc3MgVmVjdG9yIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIC8vIHNob3VsZCBPTkxZIHVzZSB0aGlzIHdoZW4gbWFuaXB1bGF0aW5nIGdyaWQgdmVjdG9yc1xuICBhZGQodmVjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICsgdmVjdG9yLngsIHRoaXMueSArIHZlY3Rvci55KTtcbiAgfVxuICBzdWJ0cmFjdCh2ZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggLSB2ZWN0b3IueCwgdGhpcy55IC0gdmVjdG9yLnkpO1xuICB9XG5cbiAgbXVsdGlwbHkodmFsWCkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAqIHZhbCwgdGhpcy55ICogdmFsKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjtcbiIsIi8vYmFiZWwgcG9seWZpbGxcbmltcG9ydCBcImJhYmVsaWZ5L3BvbHlmaWxsXCI7XG5cbi8vIGltcG9ydHNcbmltcG9ydCBHYW1lVmlldyBmcm9tIFwiR2FtZVZpZXdcIjtcblxuXG4vL2ZpcnN0IHRoaW5nOiBtb25rZXkgcGF0Y2hcbmlmICggIWxvY2F0aW9uLm9yaWdpbiApIHtcbiAgbG9jYXRpb24ub3JpZ2luID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xufVxuXG4vL2FuIGVhc3kgdG8gYWNjZXNzIGdsb2JhbCBvYmplY3RcbndpbmRvdy5Db21tb24gPSB3aW5kb3cuQ29tbW9uIHx8IHt9O1xuXG4vLyBzZXQgZGVidWcgc3RhdHVzXG53aW5kb3cuZGVidWcgPSB0cnVlO1xuXG4kKCB3aW5kb3cgKS5yZXNpemUoKTtcblxuXG5jbGFzcyBNeUFwcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuJGVsID0gJCgnI2NvbnRlbnQnKTtcblxuICAgIHRoaXMuZ2FtZVZpZXcgPSBuZXcgR2FtZVZpZXcoe1xuICAgICAgY29udGFpbmVyOiB0aGlzLiRlbCxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhcnQoKTtcblxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5nYW1lVmlldy5zdGFydCgpO1xuXG4gICAgJCggd2luZG93ICkucmVzaXplKCk7XG4gIH1cblxufTtcblxuXG4vL2tpY2tvZmYgYXBwXG4kKCAoKSA9PiB7XG4gIHdpbmRvdy5GYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuICB3aW5kb3cuYXBwID0gbmV3IE15QXBwKCk7XG59ICk7XG4iLCJcbi8qKlxuICogTGF5b3V0TWFuYWdlciBpcyBhIHNpbmdsZXRvbi4gT25seSBvbmUgaW5zdGFuY2Ugc2hvdWxkIGJlIHVzZWQgcGVyIGdhbWVcbiAqL1xuXG5jbGFzcyBMYXlvdXRNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZSkgPT4ge1xuICAgICAgdGhpcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgbGF5b3V0TWFuYWdlciA9IG5ldyBMYXlvdXRNYW5hZ2VyKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbGF5b3V0TWFuYWdlcjtcbiIsIi8qKlxuICogQmFzaWMgTWF0aCBVdGlsaXRpZXNcbiAqL1xudmFyIHV0aWxzID0ge1xuXG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZTpcbiAgICogQ2FsY3VsYXRlcyBhIHBlcmNlbnQgKGJ0d24gMCBhbmQgMSkgdGhhdCBhIHZhbHVlXG4gICAqIHJlcHJlc2VudHMgYmV0d2VlbiBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVcbiAgICpcbiAgICogLSBDYW4gaGFuZGxlIHdoZW4gbWF4IGlzIGxlc3MgdGhhbiBtaW5cbiAgICogLSBDYW4gaGFuZGxlIG5lZ2F0aXZlIG51bWJlcnNcbiAgICogLSBDYW4gaGFuZGxlIHdoZW4gdmFsIGlzIGdyZWF0ZXIgb3IgbGVzcyB0aGFuIG1heCAvIG1pblxuICAgKi9cbiAgbm9ybTogZnVuY3Rpb24odmFsLCBtaW4sIG1heCkge1xuICAgIHJldHVybiAodmFsIC0gbWluKSAvIChtYXggLSBtaW4pO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIExlcnAgKExpbmVhciBJbnRlcnBvbGF0aW9uKTpcbiAgICogVGFrZXMgYSBub3JtYWxpemVkIG51bWJlciAvIHBlcmNlbnRhZ2UgKGJldHdlZW4gMCBhbmQgMSlcbiAgICogYW5kIHJldHVybnMgdGhlIHZhbHVlIG9mIGl0IGJldHdlZW4gYSByYW5nZSBvZiBtaW4gYW5kIG1heFxuICAgKi9cbiAgbGVycDogZnVuY3Rpb24obm9ybSwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gKG1heCAtIG1pbikgKiBub3JtICsgbWluO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIE1hcDpcbiAgICogQ29udmVydHMgYSB2YWx1ZSBpbiBvbmUgcmFuZ2UgaW50b1xuICAgKiB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBpbiBhbm90aGVyIHJhbmdlXG4gICAqL1xuICBtYXA6IGZ1bmN0aW9uKHZhbCwgc291cmNlTWluLCBzb3VyY2VNYXgsIGRlc3RNaW4sIGRlc3RNYXgpIHtcbiAgICByZXR1cm4gdGhpcy5sZXJwKHRoaXMubm9ybSh2YWwsIHNvdXJjZU1pbiwgc291cmNlTWF4KSwgZGVzdE1pbiwgZGVzdE1heCk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQ2xhbXA6XG4gICAqIEZvcmNlcyB2YWx1ZSBpbnRvIHJhbmdlIGlmIGl0IGlzXG4gICAqIGdyZWF0ZXIgdGhhbiBtYXggb3IgbGVzcyB0aGFuIG1pblxuICAgKlxuICAgKiAtIEFjaGlldmVkIGJ5IGNhbGN1bGF0aW5nIHRoZSBtYXhpbXVtIG9mIHZhbCBhbmQgbWluLFxuICAgKiB0aGVuIGNhbGN1bGF0aW5nIHRoZSBtaW5pbXVtIG9mIHdoYXQgd2FzIHJldHVybmVkIGFuZCBtYXhcbiAgICogLSBVcGRhdGVkIGZ1bmN0aW9uIHVzZXMgc2Vjb25kIE1hdGgubWluIC8gTWF0aC5tYXggY2FsbHNcbiAgICogc28gdGhlIGZ1bmN0aW9uIHN0aWxsIHdvcmtzIHdoZW4gbWluIGlzIGdyZWF0ZXIgdGhhbiBtYXhcbiAgICogKGdvb2QgZm9yIG5lZ2F0aXZlIG51bWJlcnMsIGV0YylcbiAgICovXG4gIGNsYW1wOiBmdW5jdGlvbih2YWwsIG1pbiwgbWF4KSB7XG4gICAgLy8gcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbCwgbWluKSwgbWF4KTtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsLCBNYXRoLm1pbihtaW4sbWF4KSksIE1hdGgubWF4KG1pbiwgbWF4KSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogRGlzdGFuY2U6XG4gICAqIENhbGN1bGF0ZXMgZGlzdGFuY2UgYmV0d2VlbiB0d28geCx5IHBvaW50cyBieSB1c2luZ1xuICAgKiBQeXRoYWdvYW4gVGhlb3J1bSB0byBnZXQgdGhlIGh5cG90ZW51c2UuXG4gICAqL1xuICBkaXN0YW5jZTogZnVuY3Rpb24oeDAsIHkwLCB4MSwgeTEpIHtcbiAgICB2YXIgZHggPSB4MSAtIHgwO1xuICAgIHZhciBkeSA9IHkxIC0geTA7XG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENpcmNsZSBDb2xsaXNpb246XG4gICAqIEdpdmVuIHR3byBjaXJjbGVzLCBjMCBhbmQgYzEsIGNhbGN1bGF0ZXMgaWYgZGlzdGFuY2UgYmV0d2VlblxuICAgKiB0aGVtIGlzIGdyZWF0ZXIgb3IgbGVzcyB0aGFuIHRoZSBzdW0gb2YgdGhlaXIgcmFkaWlcbiAgICovXG4gIGNpcmNsZUNvbGxpc2lvbjogZnVuY3Rpb24oYzAsIGMxKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzdGFuY2UoYzAueCwgYzAueSwgYzEueCwgYzEueSkgPD0gYzAucmFkaXVzICsgYzEucmFkaXVzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaXJjbGUgLyBQb2ludCBDb2xsaXNpb246XG4gICAqIENhbGN1bGF0ZXMgaWYgZGlzdGFuY2UgYmV0d2VlbiBwb2ludCBhbmQgY2lyY2xlIGlzIGxlc3MgdGhhbiByYWRpdXNcbiAgICovXG4gIGNpcmNsZVBvaW50Q29sbGlzaW9uOiBmdW5jdGlvbih4LCB5LCBjaXJjbGUpIHtcbiAgICByZXR1cm4gdGhpcy5kaXN0YW5jZShjaXJjbGUueCwgY2lyY2xlLnksIHgsIHkpIDw9IGNpcmNsZS5yYWRpdXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFBvaW50IGluIFJlY3RhbmdsZTpcbiAgICogQ2FsY3VsYXRlcyBpZiBwb2ludCBpcyBpbiBhIHJlY3RhbmdsZSBiYXNlZCBvbiByZWN0YW5nbGUnc1xuICAgKiB4LHkgY29vcmRzLCB3aWR0aCwgYW5kIGhlaWdodFxuICAgKi9cbiAgcG9pbnRJblJlY3Q6IGZ1bmN0aW9uKHgsIHksIHJlY3QpIHtcbiAgICByZXR1cm4gdGhpcy5pblJhbmdlKHgsIHJlY3QueCwgcmVjdC54ICsgcmVjdC53aWR0aCkgJiZcbiAgICAgIHRoaXMuaW5SYW5nZSh5LCByZWN0LnksIHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgfSxcblxuICAvKipcbiAgICogSW4gUmFuZ2U6XG4gICAqIENhbGN1YXRlcyBpZiB2YWx1ZSBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gICAqIC0gVXNpbmcgTWF0aC5taW4gJiBNYXRoLm1heCwgbWluIGNhbiBiZSBsYXJnZXJcbiAgICogdGhhbiBtYXggYW5kIHZpY2UgdmVyc2EgKHVzZWZ1bCBmb3Igd2hlbiB3aWR0aC9oZWlnaHRcbiAgICogb2YgYSByZWN0YW5nbGUgYXJlIG5lZ2F0aXZlIHZhbHVlcylcbiAgICovXG4gIGluUmFuZ2U6IGZ1bmN0aW9uKHZhbCwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gdmFsID49IE1hdGgubWluKG1pbixtYXgpICYmIHZhbCA8PSBNYXRoLm1heChtaW4sbWF4KTtcbiAgfSxcblxuICAvKipcbiAgICogUmFuZ2UgSW50ZXJzZWN0OlxuICAgKiBDYWxjdWxhdGVzIGlmIHRoZXJlIGlzIGFueSBvdmVybGFwIGJldHdlZW4gdHdvIHJhbmdlc1xuICAgKiAtIFVzZWZ1bCBmb3IgY2FsY3VsYXRpbmcgaWYgdHdvIHJlY3RhbmdsZXMgYXJlIG92ZXJsYXBwaW5nXG4gICAqIC0gVXBkYXRlZCBmdW5jdGlvbiB3cmFwcyBldmVyeXRoaW5nIGluIE1hdGgubWluIC8gTWF0aC5tYXhcbiAgICogc28gdGhhdCBtaW5zIGNhbiBiZSBsYXJnZXIgdGhhbiBtYXhlcyBhbmQgdmlzZSB2ZXJzYVxuICAgKi9cbiAgcmFuZ2VJbnRlcnNlY3Q6IGZ1bmN0aW9uKG1pbjAsIG1heDAsIG1pbjEsIG1heDEpIHtcbiAgICAvLyByZXR1cm4gbWF4MCA+PSBtaW4xICYmIG1pbjAgPD0gbWF4MTtcbiAgICByZXR1cm4gTWF0aC5tYXgobWluMCwgbWF4MCkgPj0gTWF0aC5taW4obWluMSwgbWF4MSkgJiZcbiAgICAgIE1hdGgubWluKG1pbjAsIG1heDApIDw9IE1hdGgubWF4KG1pbjEsIG1heDEpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWN0YW5nbGUgSW50ZXJzZWN0XG4gICAqIENhbGN1bGF0ZXMgaWYgdHdvIHJlY3RhbmdsZXMgaW50ZXJzZWN0IG9uZSBhbm90aGVyIGJ5XG4gICAqIGNvbXBhcmluZyB0aGUgcmFuZ2VzIHdpdGggcmFuZ2VJbnRlcnNlY3QgZnVuY3Rpb25cbiAgICovXG4gIHJlY3RJbnRlcnNlY3Q6IGZ1bmN0aW9uKHIwLCByMSkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlSW50ZXJzZWN0KHIwLngsIHIwLnggKyByMC53aWR0aCwgcjEueCwgcjEueCArIHIxLndpZHRoKSAmJlxuICAgICAgdGhpcy5yYW5nZUludGVyc2VjdChyMC55LCByMC55ICsgcjAuaGVpZ2h0LCByMS55LCByMS55ICsgcjEuaGVpZ2h0KTtcbiAgfSxcblxuICAvKipcbiAgICogcmFuZG9tUmFuZ2U6XG4gICAqIENhbGN1bGF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gZ2l2ZW4gcmFuZ2VcbiAgICogLSBXb3JrcyB3aXRoIG5lZ2F0aXZlIG51bWJlcnMgKGV4OiBnZXQgcmFuZG9tIG51bWJlciBidHduIC0xMCBhbmQgMTApXG4gICAqL1xuICByYW5kb21SYW5nZTogZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICByZXR1cm4gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xuICB9LFxuXG4gIC8qKlxuICAgKiByYW5kb21JbnQ6XG4gICAqIENhbGN1bGF0ZXMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIGdpdmVuIHJhbmdlXG4gICAqL1xuICByYW5kb21JbnQ6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJhbmRvbSBEaXN0cmlidXRpb246XG4gICAqIFJldHVybnMgYSB3ZWlnaHRlZCByYW5kb20gbnVtYmVyIGJhc2VkIG9uIHRoZSBudW1iZXIgb2ZcbiAgICogaXRlcmF0aW9ucyAodGhlIGhpZ2hlciB0aGUgaXRlcmF0aW9ucywgdGhlIGhpZ2hlciB0aGVcbiAgICogY2hhbmNlIHRoYXQgdGhlIG51bWJlciByZXR1cm5lZCB3aWxsIGJlIGluIHRoZSBtaWRkbGVcbiAgICogb2YgdGhlIHJhbmdlKS5cbiAgICovXG4gIHJhbmRvbURpc3Q6IGZ1bmN0aW9uKG1pbiwgbWF4LCBpdGVyYXRpb25zKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICB0b3RhbCArPSB0aGlzLnJhbmRvbVJhbmdlKG1pbiwgbWF4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG90YWwgLyBpdGVyYXRpb25zO1xuICB9LFxuXG5cbiAgcm91bmRUb1BsYWNlczogZnVuY3Rpb24odmFsdWUsIHBsYWNlcykge1xuICAgIHZhciBtdWx0ID0gTWF0aC5wb3coMTAsIHBsYWNlcyk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0KSAvIG11bHQ7XG4gIH0sXG5cbiAgcm91bmROZWFyZXN0OiBmdW5jdGlvbih2YWx1ZSwgbmVhcmVzdCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gbmVhcmVzdCkgKiBuZWFyZXN0O1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIERlZ3JlZXMgdG8gUmFkaWFuczpcbiAgICogQ2FsY3VsYXRlcyByYWRpYW5zIGZyb20gZGVncmVlc1xuICAgKi9cbiAgZGVncmVlc1RvUmFkczogZnVuY3Rpb24oZGVncmVlcykge1xuICAgIHJldHVybiBkZWdyZWVzIC8gMTgwICogTWF0aC5QSTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBSYWRpYW5zIHRvIERlZ3JlZXM6XG4gICAqIENhbGN1bGF0ZXMgZGVncmVlcyBmcm9tIHJhZGlhbnNcbiAgICovXG4gIHJhZHNUb0RlZ3JlZXM6IGZ1bmN0aW9uKHJhZGlhbnMpIHtcbiAgICByZXR1cm4gcmFkaWFucyAqIDE4MCAvIE1hdGguUEk7XG4gIH0sXG5cblxuICAvKipcbiAgICogUm90YXRlVG86XG4gICAqIFRha2VzIGEgcG9pbnQgaW4gc3BhY2UgYW5kIHJvdGF0ZXMgaXQgYnlcbiAgICogYW4gYW5nbGUgYXJvdW5kIHNwYWNlJ3MgY2VudGVyICgwLDApIGNvb3JkLlxuICAgKlxuICAgKiAtIFlvdSBjb3VsZCByb3RhdGUgaXQgYXJvdW5kIGEgZGlmZmVyZW50XG4gICAqIHBvaW50IGJ5IG1vZGlmeWluZyBwb2ludCdzICh4LHkpIHRvIHJlZmxlY3RcbiAgICogYSBkaWZmZXJlbnQgY2VudGVyIGNvb3JkaW5hdGUuXG4gICAqL1xuICByb3RhdGVUbyhwMCwgYW5nbGUpIHtcbiAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICB2YXIgcDEgPSB7XG4gICAgICB4OiAocDAueCAqIGNvcykgLSAocDAueSAqIHNpbiksXG4gICAgICB5OiAocDAueSAqIGNvcykgKyAocDAueCAqIHNpbilcbiAgICB9O1xuICAgIHJldHVybiBwMTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBRdWFkcmF0aWMgQmV6aWVyIEN1cnZlOlxuICAgKiBUd28gZW5kIHBvaW50cyBhbmQgb25lIGNvbnRyb2wgcG9pbnQgaW5iZXR3ZWVuLlxuICAgKiBTdGFuZGFyZCBmdW5jdGlvbiBmb3IgY29tcHV0aW5nIHF1YWRyYXRpY1xuICAgKiBiZXppZXIgY3VydmVzLiBCYXNpY2FsbHkganVzdCBhIHN1cGVyIHNpbXBsaWZpZWRcbiAgICogY29tYmluYXRpb24gb2YgbGluZWFyIGludGVycG9sYXRpb25zXG4gICAqL1xuICBxdWFkcmF0aWNCZXppZXI6IGZ1bmN0aW9uKHAwLCBwMSwgcDIsIHQsIHBGaW5hbCkge1xuICAgIHBGaW5hbCA9IHBGaW5hbCB8fCB7fTtcbiAgICBwRmluYWwueCA9IE1hdGgucG93KDEgLSB0LCAyKSAqIHAwLnggK1xuICAgICAgICAgICAoMSAtIHQpICogMiAqIHQgKiBwMS54ICtcbiAgICAgICAgICAgdCAqIHQgKiBwMi54O1xuICAgIHBGaW5hbC55ID0gTWF0aC5wb3coMSAtIHQsIDIpICogcDAueSArXG4gICAgICAgICAgICgxIC0gdCkgKiAyICogdCAqIHAxLnkgK1xuICAgICAgICAgICB0ICogdCAqIHAyLnk7XG4gICAgcmV0dXJuIHBGaW5hbDtcbiAgfSxcblxuICAvKipcbiAgICogQ3ViaWMgQmV6aWVyIEN1cnZlOlxuICAgKiBUd28gZW5kIHBvaW50cyBhbmQgdHdvIGNvbnRyb2wgcG9pbnQgaW5iZXR3ZWVuLlxuICAgKi9cbiAgY3ViaWNCZXppZXI6IGZ1bmN0aW9uKHAwLCBwMSwgcDIsIHAzLCB0LCBwRmluYWwpIHtcbiAgICBwRmluYWwgPSBwRmluYWwgfHwge307XG4gICAgcEZpbmFsLnggPSBNYXRoLnBvdygxIC0gdCwgMykgKiBwMC54ICtcbiAgICAgICAgICAgTWF0aC5wb3coMSAtIHQsIDIpICogMyAqIHQgKiBwMS54ICtcbiAgICAgICAgICAgKDEgLSB0KSAqIDMgKiB0ICogdCAqIHAyLnggK1xuICAgICAgICAgICB0ICogdCAqIHQgKiBwMy54O1xuICAgIHBGaW5hbC55ID0gTWF0aC5wb3coMSAtIHQsIDMpICogcDAueSArXG4gICAgICAgICAgIE1hdGgucG93KDEgLSB0LCAyKSAqIDMgKiB0ICogcDEueSArXG4gICAgICAgICAgICgxIC0gdCkgKiAzICogdCAqIHQgKiBwMi55ICtcbiAgICAgICAgICAgdCAqIHQgKiB0ICogcDMueTtcbiAgICByZXR1cm4gcEZpbmFsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNdWx0aSBDdXJ2ZSBEcmF3OlxuICAgKiBEcmF3cyBhIHNlcmllcyBvZiBjb25uZWN0ZWQgcXVhZHJhdGljIGN1cnZlcy4gR2l2ZXNcbiAgICogdGhlIGlsbHVzaW9uIG9mIGJlaW5nIGEgYmV6aWVyIGN1cnZlIHdpdGggbWFueSBtaWQtcG9pbnRzXG4gICAqIGJ1dCBub3QgYWN0dWFsbHkgMTAwJSBhY2N1cmF0ZS4gT2Z0ZW4gZ29vZCBlbm91Z2ggdGhvdWdoLlxuICAgKi9cbiAgbXVsdGljdXJ2ZTogZnVuY3Rpb24ocG9pbnRzLCBjb250ZXh0KSB7XG4gICAgdmFyIHAwLCBwMSwgbWlkeCwgbWlkeTtcblxuICAgIGNvbnRleHQubW92ZVRvKHBvaW50c1swXS54LCBwb2ludHNbMF0ueSk7XG5cbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aCAtIDI7IGkgKz0gMSkge1xuICAgICAgcDAgPSBwb2ludHNbaV07XG4gICAgICBwMSA9IHBvaW50c1tpICsgMV07XG4gICAgICBtaWR4ID0gKHAwLnggKyBwMS54KSAvIDI7XG4gICAgICBtaWR5ID0gKHAwLnkgKyBwMS55KSAvIDI7XG4gICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8ocDAueCwgcDAueSwgbWlkeCwgbWlkeSk7XG4gICAgfVxuICAgIHAwID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXTtcbiAgICBwMSA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XG4gICAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHAwLngsIHAwLnksIHAxLngsIHAxLnkpO1xuICB9XG5cblxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuIl19
