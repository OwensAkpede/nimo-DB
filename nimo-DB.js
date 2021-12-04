function NimoDB() {
  Object.observe = Object.observe || function (obj, f) {


  }
  Object.assign = Object.assign || function (p, c) {
    for (var d in c) {
      p[d] = c[d]
    }
    return p
  }

  function parsekey(key) {
    if ('number' === typeof key || key instanceof Number) {
      key = `number:${Number(key)}`;
    } else {
      key = `string:${String(key)}`;
    }
    return key;
  }

  parsekey.decode = function (key) {
    var type = key.substring(0, key.indexOf(':'))
    type = type.charAt(0).toUpperCase() + type.substring(1);
    type = type.trim() || 'String'
    key = key.substring(key.indexOf(':') + 1)
    if (type in Window === false) {
      type = 'String'
    }
    key = window[type](key);
    return key;
  }
  //var attr = this.varructor;
  var attr = {},
    SynID = 'Sync storage',
    done = "done",
    SynNAME = location.href,
    keyPath = "NIMO_DB_ID",
    def = 'records',
    _name = keyPath,
    tmp = '[hyper database 2003]',
    _this = this;
  this.Sync = function () {
    // if ('object' === typeof id) {
    //   config = id
    // }
    // if ('object' !== typeof config) {
    //   config = { cache: true }
    // }
    // if ('function' === typeof id) {
    //   foo = id
    // }
    // if ('string' === typeof foo) {
    //   id = foo
    // }
    //d.__proto__.varructor.name
    //var
    var id, foo = new Function();
    var config = {
      cache: true,
      typeSensitive: true,
      accept: ['array', 'object', 'number', 'string']
    };
    for (var i = 0; arguments.length > i; i++) {
      var ty = arguments[i] ? typeof arguments[i] : null;
      if ('string' === ty || arguments[i] instanceof String) {
        id = arguments[i]
      } else if ('object' === ty) {
        arguments[i].__proto__ = config
        config = arguments[i];
        // Object.assign(config,arguments[i])
        config.settled = true
      } else if ('function' === ty) {
        foo = arguments[i]
      }
    }


    //return
    if (id === SynID) {
      NimoDB.__proto__.console.error(`"${id}" is already taken for our prototype`)
    }

    if ('string' !== typeof id && id instanceof String === false || !id.trim()) {
      id = SynID
    } else {
      //  id=btoa(id)
    }

    id = id.trim();

    // id = SynID;
    //  foo = foo || new Function();
    //var db = NimoDB_syn.syn[id]=NimoDB_syn.syn[id]||{};

    // var argument = arguments;
    var db = NimoDB.store[id] = NimoDB.store[id] || {};
    //   NimoDB.table = NimoDB.table || {};
    //NimoDB_syn.store[id] = db;
    // var chunck = {};
    // db.e = {}

    db.Syncdata = db.Syncdata || []
    db.config = db.config || config;
    db.data = db.data || {};
    db.keys = db.keys || [];
    db.dataAsArray = db.dataAsArray || [];
    db.SyncResolving = db.SyncResolving || 0
    db.opening = db.opening || 0;

    if ('cache' in db.config === false) {
      db.config.cache = true;
    }

    //dataAsArray

    db.obj = db.obj || {
      ready: new Promise(function (r) {
        db.SyncResolver = r;
      }),
      /*config:config*/
    }
    var obj = db.obj

    var p = function (exec, promise, parent, argument, foo) {
      if (db.config.filter && db.config.filter instanceof Function && 'function' === typeof db.config.filter) {
        var filter = new db.config.filter(argument)
        //  filter.value=false;
        for (var key in filter) {
          if (key.toLowerCase() === String(argument._name).toLowerCase()) {
            filter = filter[key]()
            break;
          }
        }
        if (!filter) {
          return
        }
      }
      if (foo) {
        // if () {
        //   argument[0] = ;
        // }
        exec = foo('string' === typeof argument[0] && db.config.typeSensitive ? parsekey(argument[0]) : argument[0], argument[1], argument[2])
      }

      promise = promise || new Promise(function (r) {
        db.Syncdata.push({
          readyMode: parent.__ready__,
          name: argument[0],
          value: argument[1],
          type: argument._name,
          r: r,
          exec: parseString(exec)
        })
      });

      if (parent.__proto__.__ready__) {
        //Object.unfreeze(db.data);
        if ('string' === typeof exec && exec.eval) {
          exec = eval(String(exec))
        }
        db.data.__proto__.length = db.keys.length;
        // Object.freeze(db.data);
        // console.log();
        return exec;
      }
      return promise;
    },
      push = function (val, c) {
        // if (val instanceof Array) {
        //   if (val.length - 1 >= 0) {
        //     var d=val[val.length - 1]
        //     val.pop();
        //     push(val, d)
        //     if(c){
        //       val=c
        //     }else{
        //       return;
        //     }
        //   }else{
        //     return;
        //   }
        // }

        // console.log(val);
        var name = val.name;
        var value = val.value;
        if ('string' === typeof val.exec && val.exec.eval) {
          val.exec = eval(String(val.exec))
        }

        if (db.config.cache) {
          if (!val.type.includes('get') && !val.type.includes('key') || !val.readyMode) {
            db.items[val.type](name, value)
          }
          val.r(val.exec)
        } else {
          // console.log(val);
          db.items[val.type](name, value).then(val.r)
          //    val.r(db.items[val.type](name, value));
        }
        val.type = val.type.toLowerCase();
        if (db.Events[val.type] instanceof Array) {
          for (var i = 0; i < db.Events[val.type].length; i++) {
            'use strict';
            try {
              db.Events[val.type][i](name)
            } catch (error) {

            }
          }
        } else {
          db.Events[val.type] = []
        }
      },
      then = function (e) {
        e = attr.row.init(e)
        if (db.SyncResolving > 1) {
          return
        }

        db.SyncResolving += 1;
        db.items = e;
        if (!db.config.cache) {
          push.resolve()
          return;
        }
        e.getAllItem(function (key, value) {
          if (db.config.typeSensitive) {
            key = parsekey(key);
          }
          db.data[key] = value.value;
          db.keys.push(key)
          // console.log();
          /* db.data[key]=function (e) {
             if (e) {
               db.obj.setItem(key,e)
              // nonPromise.localStorage.setItem(key,e);
             }else{
               return value;
             }
           }*/
          // console.log(key);
        }).then(function (data) {

          //  db.data = data;
          // db.keys = Object.keys(db.data);
          db.data.__proto__.length = db.keys.length;
          // Object.freeze(db.data);
          push.resolve()
          // (obj.onready || new Function())(nonPromise)
          //delete obj.onready;

        })
      },
      parseString = function (e, v) {
        v = v || ';'
        if ('string' === typeof e && !e.eval) {
          e = e.substring(e.lastIndexOf(v) + 1)
        }
        return e;
      };
    push.resolve = function () {
      for (var val of db.Syncdata) {
        push(val)
      }

      if (db.config.cache) {
        if (!db.SyncResolved) {
          db.SyncResolver(nonPromise);
        }
      }
      foo(nonPromise);
      db.Syncdata = [];
      db.Syncdata.push = push
      db.SyncResolved = true
      //  if (Object.observe) {
      //    Object.observe(db.data, function (e) {
      //      for (var da of e) {
      //        if (da.type in observer) {
      //        //  console.log(da.type);
      //          observer[da.type](da.name, da.object[da.name])
      //        }
      //      }
      //    });
      //  }

    }

    obj.parsekey = parsekey.decode;
    obj.setItem = (function setItem() {
      //console.log(s);
      // if (db.config.cache) {
      //   if (name in db.data === false || s === true) { db.keys.push(parsekey(name)); };
      //   if (!s) {
      //     db.data[parsekey(name)] = value;
      //   }
      // }
      // var exec = done;
      // var ready = this.__ready__
      var type = arguments.callee.name || 'setItem'
      arguments._name = type
      // var exec = new String(`done`);
      // exec.eval=true;
      return p(null, null, this, arguments, function (name, value, s) {
        if (db.config.cache) {
          if (name in db.data === false || s === true) {
            //  name = parsekey(name);
            db.keys.push(name);
          };
          if (!s) {
            db.data[name] = value;
          }
        }
        return done;
      });
    });

    obj.getItem = (function getItem() {
      // var exec = db.data[parsekey(name)];
      // var ready = this.__ready__
      var type = arguments.callee.name || 'getItem'
      arguments._name = type

      return p(null, null, this, arguments, function (name) {
        return db.data[name];
      });
    });

    obj.removeItem = (function removeItem() {
      // if (db.config.cache) {
      //   delete db.data[parsekey(name)];
      //   db.keys = Object.keys(db.data);
      // }
      // var exec = done;
      // var ready = this.__ready__
      var type = arguments.callee.name || 'removeItem'
      arguments._name = type

      return p(null, null, this, arguments, function (name) {
        if (db.config.cache) {
          delete db.data[name];
          db.keys = Object.keys(db.data);
        }
        return done;
      });
    });

    obj.clear = (function clear() {
      //   if (db.config.cache) {
      //   for (var i = 0; i < db.keys.length; i++) {
      //     delete db.data[db.keys[i]]
      //   }
      //   db.keys = Object.keys(db.data);
      // }
      //   var exec = done;
      // var ready = this.__ready__
      var type = arguments.callee.name || 'clear'
      arguments._name = type

      return p(null, null, this, arguments, function () {
        if (db.config.cache) {
          for (var i = 0; i < db.keys.length; i++) {
            delete db.data[db.keys[i]]
          }
          db.keys = Object.keys(db.data);
        }
        return done;
      });
    });

    obj.getAllItem = (function getAllItem() {
      //var foo =arguments[0]
      //var exec = db.data;
      //var ready = this.__ready__
      var type = arguments.callee.name || 'getAllItem'
      arguments._name = type
      //console.trace(this.__ready__);
      return p(null /*exec*/, null, this, arguments, function () {
        return db.data;
      });
    });

    obj.keys = (function keys() {
      //  var exec = db.keys;
      //var ready = this.__ready__
      var type = arguments.callee.name || 'keys'
      arguments._name = type
      return p(null, null, this, arguments, function () {
        return db.keys
      });
    });

    obj.has = (function has() {
      // var exec = parsekey(name) in db.data;
      //var ready = this.__ready__
      var type = arguments.callee.name || 'has'
      arguments._name = type
      return p(null, null, this, arguments, function (name) {
        return name in db.data
      });
    });

    obj.on = function (name, foo) {
      name = String(name).toLowerCase();
      if (foo instanceof Function && 'function' === typeof foo) {
        if (db.Events[name]) {
          db.Events[name][db.Events[name].length] = foo
        } else {
          db.Events[name] = [foo]
        }
      }
    }
    /* obj.getAllItemAsArray = function () {
       var exec = `db.dataAsArray`;
       return p(exec, new Promise(function (r) { db.Syncdata.push({ type:type|| 'getAllItemAsArray', r: r, exec: exec }) }), this);
     } 
 
     obj.keys = function () {
       var exec = `db.keys`;
       return p(exec, new Promise(function (r) { db.Syncdata.push({ type:type|| 'keys', r: r, exec: exec }) }), this);
     } */

    var observer = {
      add: function (name, value) {
        obj.setItem(name, value, true)
      },
      delete: obj.removeItem
    }
    observer.update = obj.setItem
    //  observer.update.s=true
    //getAllItemAsArray


    // Object.freeze(obj);
    var nonPromise = db.data
    nonPromise.__proto__ = {}
    nonPromise.__proto__.__ready__ = true;
    nonPromise.__proto__.__proto__ = obj;

    Object.freeze(obj);

    if (db.SyncResolving > 0 && config.settled) {
      NimoDB.__proto__.console.error(`${JSON.stringify(config)}\n-Above Object will be overwrite, for the returned values are instance of the previous initialized values for "${id}"`)
    }

    if (db.items) {
      push.resolve();
    } else if (db.SyncResolving < 1) {
      Object.assign(db.config, config)
      arguments.callee['stable'](id, db, then)
      db.SyncResolving += 1;
      db.Events = db.Events || {}
    }

    obj.name = id;
    ////  new Promise(function (d) {
    // new Promise(function (r) {

    //   _this.devMode = false;
    // _this.open(location.href, id).then(function (e) {
    //   if (!e) {
    //     then(_this.create(location.href, id));
    //   } else {
    //     then(e)
    //   }
    // })

    //     })
    // })

    return obj;
    /*setTimeout(function () {
      (obj.onready || new Function())(nonPromise)
      delete obj.onready;
    }, 0)&&*/
  };
  this.Sync.__proto__ = {};
  this.Sync.__proto__.stable = function (id, db, then) {
    if (NimoDB.table) {
      attr.table.init(NimoDB.table).openTable(id).then(function (e) {
        if (e) {
          then(e)
        } else {
          attr.table.init(NimoDB.table).createTable(id).then(then)
        }
      })
    } else {
      _this.openDatabase(SynNAME).then(function (e) {
        if (e) {
          // console.log(e)
          NimoDB.table = e
          e.openTable(id).then(function (e) {
            if (e) {
              then(e)
            } else {
              NimoDB.table.createTable(id).then(function (e) {
                // console.log(33);
                then(e)
              })
            }
          })
        } else {
          _this.createDatabase(SynNAME).then(function (e) {
            NimoDB.table = e
            e.createTable(id).then(function (_e) {
              if (_e) {
                then(_e)
              } else {
                e.openTable(id).then(then)
              }
            })
          })
        }
      })
    }
  }

  this.Sync.__proto__.unstable = function (id, db, then) {
    function frh(name, version, tables, e) {
      version += 1;
      if (tables.contains(id)) {
        //console.log('1');
        if (e) {
          e = e.transaction(id, 'readwrite');
          e = e.objectStore(id)
          new frh.init(e)
          return
        }
        attr.indexedDB.open(nimoName(SynNAME)).onsuccess = function (e) {
          e = e.target.result
          e = e.transaction(id, 'readwrite');
          e = e.objectStore(id)
          new frh.init(e)
        }
      } else {
        attr.indexedDB.open(nimoName(SynNAME), version).onupgradeneeded = function (e) {
          e = e.target.result;
          for (var i = 0; _this.Sync.STORE_MODE.length > i; i++) {
            if (i + 1 === _this.Sync.STORE_MODE.length) {
              e = e.createObjectStore(_this.Sync.STORE_MODE[i], {
                keyPath: keyPath
              })
            } else {
              e.createObjectStore(_this.Sync.STORE_MODE[i], {
                keyPath: keyPath
              })
            }
          }
          //  e= e.createObjectStore(id, { keyPath: keyPath })

          // console.log('2',e);
          //  e.createObjectStore(id, { keyPath: keyPath })
          //  e.createObjectStore('Sync storage(2)', { keyPath: keyPath })
          //  console.log('2',e);
          new frh.init(e)
        }
      }
    }

    frh.init = function (e) {
      if (e.transaction.db) {
        var _e = e;
        e = {
          transaction: function () {
            return {
              objectStore: function () {
                return _e;
              }
            }
          }
        };
      }
      // e.xclose = e.close
      e.close = new Function()
      //console.log(e.transaction());
      //NimoDB.e=e;
      then(new attr.row(e, id));
    }

    attr.indexedDB.open(nimoName(SynNAME)).onsuccess = function (_e) {
      _e = _e.target.result
      attr.version = _e.version;
      if (_e.version <= 1) {
        //created
        attr.indexedDB.open(nimoName(_name)).onsuccess = function (e) {
          e = e.target.result;
          e = e.transaction(def, 'readwrite');
          e.oncomplete = function () {
            _e.close()
            frh(_e.name, _e.version, _e.objectStoreNames)
          }
          var obj = {}
          obj[keyPath] = SynNAME;
          obj['value'] = {
            name: SynNAME,
            info: time()
          };
          e.objectStore(def).add(obj).onsuccess = function () {
            try {
              e.db.close();
            } catch (e) {
              e.db.transaction.db.close();
            }
          }
        }
      } else {
        frh(_e.name, _e.version, _e.objectStoreNames, _e)
      }
    }
  }

  this.Sync.STORE_MODE = [new String('Sync storage'), new String('Sync storage(2)')]


  this.createDatabase = function () {
    var name = arguments[0];
    var name = nimoName(name)
    var f = null;

    var rst = new Promise(function (r) {
      _this.getAllCreatedDatabase().then(function (e) {
        if (has(e, name)) {
          NimoDB.__proto__.console.error(`can not create database:\n "${decode(name)}" already exist`)
          r(null)
        } else {
          var fx = attr.indexedDB.open(name);
          fx.onsuccess = function () {
            fx = fx.result;
            fx.close();
            _this.open(_name, def).then(function (e) {
              e.setItem(decode(fx.name), {
                name: decode(fx.name),
                info: time()
              }).then(function (e) {
                r(new attr.table(fx.name, fx.version, fx.objectStoreNames));
              })
            })
            // })
          }
        }
      });
    })
    return rst;
  }

  this.openDatabase = function () {
    var name = arguments[0];
    var $t = arguments[2];
    var name = nimoName(name)
    var rst = new Promise(function (r) {
      var dnm = decode(name)

      if (false) {
        NimoDB.__proto__.console.error(`"${dnm}" can not be open for it does not exist`)
        r(null)
      }
      var fx = attr.indexedDB.open(name);
      fx.onsuccess = function () {
        fx = fx.result;
        fx.close();
        r(new attr.table(fx.name, fx.version, fx.objectStoreNames));
      }
    })
    return rst;
  }

  this.getAllCreatedDatabase = function () {
    var prm = new Promise(function (r) {
      var db = _this || new attr(_name);
      //  db = db.openDatabase(_name)
      //  db.then(function(e) {
      db.open(_name, def).then(function (e) {
        if (e) {
          e.getAllItem().then(function (e) {
            r(e)
          });
        } else {
          r({})
        }
      })
      //});   
    });
    return prm;
  }

  this.deleteAllCreatedDatabase = function () {
    var prm = new Promise(function (r) {
      _this.getAllCreatedDatabase().then(function (e) {
        var done = 'no database';
        for (var prop in e) {
          var name = e[prop].name
          name = nimoName(name)
          done = 'done';
          attr.indexedDB.deleteDatabase(name)
        }
        _this.open(_name, def).then(function (e) {
          e.clear().then(function (e) {
            r(done)
          })
        })
      })
    })

    return prm;
  }

  this.deleteDatabase = function () {
    var name = arguments[0];

    var prm = new Promise(function (r) {
      name = nimoName(name);

      var d = attr.indexedDB.deleteDatabase(name)
      d.onsuccess = function (e) {
        _this.open(_name, def).then(function (e) {
          e.removeItem(decode(name)).then(function (e) {
            r('done')
          })
        })
      }


    });

    return prm;
  }

  this.open = function (db, tb) {
    db = db
    tb = tb
    return new Promise(function (r) {
      _this.openDatabase(db).then(function (e) {
        if (e) {
          r(e.openTable(tb));
        } else {
          r(e)
        }
      })
    });
  }

  this.create = function (db, tb) {
    db = db
    tb = tb
    return new Promise(function (r) {
      _this.createDatabase(db).then(function (e) {
        if (e) {
          r(e.createTable(tb))
        } else {
          r(e)
        }
      })
    });
  }






  attr.table = function () {
    var name = arguments[0];
    var vs = arguments[1];
    var tb = arguments[2];
    vs += 1;
    //var t_this=this
    this.createTable = function (tb_name, tb_config) {
      //    t_this.createTable.time = t_this.createTable.time||2500
      //    t_this.createTable.time = t_this.createTable.time * 3
      var obj = {
        keyPath: keyPath
      };
      return new Promise(function (r) {
        if (tb.contains(tb_name) && false) {
          NimoDB.__proto__.console.error(`A table with the name "${tb_name}" already exist. `)
          r(null)
        } else {
          //    setTimeout(() => {
          // var d = attr.indexedDB.open(name, vs)
          attr.indexedDB.open(name, vs).onupgradeneeded = function (e) {
            // e.preventDefault()
            //  e.stopPropagation()
            //  e.stopImmediatePropagation();
            //     console.log(tb_name, e);
            e = e.target.result;
            if (e.objectStoreNames.contains(tb_name)) {
              NimoDB.__proto__.console.error(`A table with the name "${tb_name}" already exist. `)
              r(null)
              e.close();
              return
            } else {
              $e = e.createObjectStore(tb_name, obj);
            }
            r(new attr.row(name, tb_name, attr))
            e.close();
          };
          vs += 1;
          //  }, t_this.createTable.time);
        }
      });
    }



    this.openTable = function (tb_name) {
      return new Promise(function (r) {
        if (!tb.contains(tb_name) && false) {
          NimoDB.__proto__.console.error(`A table with the name "${tb_name}" does not exist. `)
          r(null)
        } else {
          attr.indexedDB.open(name).onsuccess = function (e) {
            e = e.target.result;
            if (!e.objectStoreNames.contains(tb_name)) {
              NimoDB.__proto__.console.error(`A table with the name "${tb_name}" does not exist. `)
              r(null)
              e.close();
              return;
            }
            e.close();
            r(new attr.row(name, tb_name, attr))
          };
        }
      });
    }



    this.deleteTable = function (tb_name) {
      return new Promise(function (r) {
        if (!tb.contains(tb_name) && false) {
          NimoDB.__proto__.console.error(`A table with the name "${tb_name}" does not exist. `)
          r(null)
        } else {
          attr.indexedDB.open(name, vs).onupgradeneeded = function (e) {
            e = e.target.result;
            if (!e.objectStoreNames.contains(tb_name)) {
              NimoDB.__proto__.console.error(`A table with the name "${tb_name}" does not exist. `)
              r(null)
            } else {
              e.deleteObjectStore(tb_name)
              e.close();
              r('done')
            }
          };
        }
      });
    }


    this.getAllTable = function () {
      return new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          e = e.target.result;
          e.close();
          e = e.objectStoreNames;
          r(e);
        };
      })
    }


    this.deleteAllTable = function () {
      return new Promise(function (r) {
        attr.indexedDB.open(name, vs).onupgradeneeded = function (e) {
          e = e.target.result;
          var objN = e.objectStoreNames;
          for (var i = 0; i < objN.length; i++) {
            e.deleteObjectStore(objN[i])
          }
          e.close();
          r('done')
        };
      });
    }
  }




  attr.row = function () {
    var name = arguments[0];
    var tb_name = arguments[1]
    var $this = this;
    var attr;
    // var t = 'object' === typeof name&&name.close?name:null;
    //resolveDB(attr.indexedDB.open(name).onsuccess)
    if ('object' === typeof name && name.close) {
      attr = {
        indexedDB: {}
      }
      attr.indexedDB.open = function () {
        var obj = {}
        new Promise(function (r) {
          r()
        }).then(function () {
          // console.log(name.close);
          obj.onsuccess({
            target: {
              result: name
            }
          })
        })
        return obj
      }
    } else {
      attr = arguments[2]
    }

    this.setItem = function (key, value) {
      //  key = String(key)
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readwrite')

          e.oncomplete = function () {
            // r('done')
          }

          var obj = {}
          obj[keyPath] = key;
          obj['value'] = value;

          e = e.objectStore(tb_name)
          var val = e.put(obj)
          val.onsuccess = function () {
            try {
              $e.close();
            } catch (e) {
              $e.transaction.db.close();
            }
            r('done')
          }
        }
      })

      return prm;
    }

    this.removeItem = function () {
      var $name = arguments[0]
      //var $name = String($name)
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readwrite')

          e.oncomplete = function () {
            // r('done')
          }

          e = e.objectStore(tb_name)
          var val = e.delete($name)
          // console.log($name);
          val.onsuccess = function () {

            //e.put(rst).onsuccess = function(e) {

            try {
              $e.close();
              // r('done')
            } catch (e) {
              $e.transaction.db.close();
              //  r('done')
            }
            r('done')
            //  }


          }
        }
      });
      return prm;
    };

    this.clear = function () {
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readwrite')

          e.oncomplete = function () {
            // r('done')
          }

          e = e.objectStore(tb_name)

          e.clear().onsuccess = function () {
            try {
              $e.close();
              // r('done')
            } catch (e) {
              $e.transaction.db.close();
              // r('done')
            }
            r('done')
          }
        }
      });
      return prm;
    }


    this.has = function ($val) {
      //$val = String($val)
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          var val = e.openCursor()
          val.onsuccess = function (e) {
            var rst = e.target.result;
            if (rst) {
              if ($val === rst.key) {
                $e.close();
                r(true)
              } else {
                rst.continue();
              }
            } else {
              $e.close();
              r(false)
            }
          }

        }
      })
      return prm;
    }

    this.keys = function () {
      var f = arguments[0]
      f = 'function' === typeof f ? f : new Function();

      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          e.getAllKeys().onsuccess = function (e) {
            r(e.target.result);
            $e.close()
          }
        }
      })
      return prm;
    }

    this.getAllItemAsArray = function (f) {
      var f = arguments[0]
      f = 'function' === typeof f ? f : new Function();
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          e.getAll().onsuccess = function (e) {
            r(e.target.result);
            $e.close()
          }
        }
      })
      return prm;
    }

    this.getAllItem = function (f) {
      f = 'function' === typeof f ? f : new Function();
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          //     console.log(e);
          var val = e.openCursor()
          //  var len = e.count();

          var array = {};

          val.onsuccess = function (e) {
            var rst = e.target.result;

            if (rst) {
              var key = rst.key;
              //  key =parsekey(key);
              f(key, rst.value);
              var val = nimoOBJ(rst.value);
              array[key] = val
              rst.continue();
            } else {
              // array.__proto__['length'] = len.result
              try {
                $e.close();
                r(array)
              } catch (e) {
                $e.transaction.db.close();
                r(array);
              }
            }

          }

        }
      })
      return prm;
    }

    this.getItem = function () {
      var $name = arguments[0]
      //var $name = String($name)
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          var $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          var val = e.get($name)

          val.onsuccess = function () {
            var rst = val.result;
            rst = nimoOBJ(rst)
            try {
              $e.close();
              r(rst)
            } catch (e) {
              $e.transaction.db.close();
              r(rst);
            }
          }
        }
      })

      return prm
    }
  }

  attr.table.init = function (e) {
    return e
  }
  attr.row.init = function (e) {
    return e
  }



  attr.database = [];
  attr.indexedDB = indexedDB;
  this.devMode = true;

  /**support**/
  if (!attr.indexedDB) {
    attr.indexedDB = {
      open: function () {
        return {};
      }
    }
  }

  /**end zone **/
  var nimoName = function (x, y) {
    if (!y && !x) {
      NimoDB.__proto__.console.error('invalid name');
    }
    var name = x + tmp
    name = 'NIMO:' + encode(name);
    return name;
  }

  var encode = function (x, y) {
    if (!y) {
      x = parseString(x);
    }
    x = x[1]
    x = btoa(x)
    return x;
  }
  var decode = function (x, y) {
    if (!y) {
      x = parseString(x);
    }
    x = x[1]
    x = atob(x);
    x = x.substring(0, x.length - tmp.length);
    return x;
  }
  var parseString = function (x) {
    x = String(x);
    var idx = x.indexOf(':');
    var sub_1 = x.substring(0, idx),
      sub_2 = x.substring(idx + 1, x.length)
    return [sub_1, sub_2]
  }

  var nimoOBJ = function (e) {
    if ('object' == typeof e) {
      e = e.value;
    }
    return e;
  }
  var time = function () {
    var obj = {};
    obj.date = [
      new Date().toDateString(),
      new Date().toLocaleDateString()
    ];
    obj.exactDate = Date.now();
    return obj;
  }

  var has = function (e, name) {
    return decode(name) in e;
  }

  attr.indexedDB.open(nimoName(_name)).onupgradeneeded = function (e) {
    e = e.target.result;
    if (e.version === 1) {
      e.createObjectStore(def, {
        keyPath: keyPath
      })
    }
    e.close();
    //  var NimoDB.__proto__.console =

  }
  // this.openDatabase(SynNAME);

  NimoDB.__proto__.console = {
    error: function (x) {
      if (!_this.devMode) {
        return;
      }
      console.error(x)
    }
  };

  attr.loaded = true;
}
//var NimoDB_syn = {store:{}} || NimoDB_syn
//var f = function (e) {
//  e.preventDefault();
// e.returnValue = '333';
//  alert(9)
// window.d = 9
// NimoDB_syn.syn = NimoDB_syn.syn || new NimoDB();
// NimoDB_syn.syn.devMode = false;

NimoDB.__proto__ = {}
NimoDB.__proto__.store = {}
NimoDB.__proto__.Sync = new NimoDB().Sync;
NimoDB.__proto__.Sync = NimoDB.Sync(NimoDB.Sync.STORE_MODE[0], {
  cache: true,
  typeSensitive: false,
  filter: function (argument) {
    argument[0] = String(argument[0]).toUpperCase().trim().replace(/\s| /img, '_');
    this.setItem = function () {
      if (argument[1] instanceof Blob || argument[1] instanceof File) {
        NimoDB.__proto__.console.error('Blob and File type are not supported')
        return false
      }
      return true
    }

  }
});

//}
//onbeforeunload =f
//addEventListener('beforeunload',f)