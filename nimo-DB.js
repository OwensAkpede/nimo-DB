(function () {
  function NimoDB() {
    //var attr = this.varructor;
    var _this = this;
    this[NIMO_DB_ID.SYNC_KEY] = function () {
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
      var Env = setEnv(SynNAME, id)
      var GCollector = Env.GC;
      var db = Env.DB
      // db.Event
      //NimoDB.store
      //   NimoDB.SynchronizedTable = NimoDB.SynchronizedTable || {};
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
      // ready: new Promise(function (r) {
      //   db.SyncResolver = r;
      // })
      db.obj = db.obj || {
        /*config:config*/
      }
      var obj = db.obj

      var p = function (exec, promise, parent, argument, foo) {
        if (db.config.filter && db.config.filter instanceof Function && 'function' === typeof db.config.filter) {
          var filter = new db.config.filter(argument)
          //  filter.value=false;
          for (var key in filter) {
            if (key.toLowerCase() === String(argument._name).toLowerCase() || key.toLowerCase() === 'all') {
              filter = filter[key](argument[0], argument[1], argument[2])
              break;
            }
          }
          if (!filter) {
            return
          }
          /****/
          if (filter instanceof Promise) {
            /***
             * This feature will be implimented someday
             *  ***/
          }
          /****/
        }
        if (foo) {
          // if () {
          //   argument[0] = ;
          // }
          exec = foo('string' === typeof argument[0] && db.config.typeSensitive ? parsekey(argument[0]) : argument[0], argument[1], argument[2])
          if (argument[1] && 'object' === typeof argument[1] && argument[1] instanceof Object) {
            /** weither to freeze object **/
            //Object.freeze(argument[1])
          }
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
          //  db.data.__proto__.length = db.keys.length;
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
          val.send = function (e) {
            val.r(e)
            // val.type = val.type.toLowerCase();
            // if (db.Events[val.type] instanceof Array) {
            //   for (var i = 0; i < db.Events[val.type].length; i++) {
            //     'use strict';
            //     try {
            //       db.Events[val.type][i](name, value)
            //     } catch (error) {

            //     }
            //   }
            // } else {
            //   db.Events[val.type] = []
            // }
            // val.r(e)
          }
          if (db.config.cache) {
            if (!val.type.includes('get') && !val.type.includes('key') || !val.readyMode) {
              db.items[val.type](name, value)
            }
            val.send(val.exec)
          } else {
            // console.log(val);
            db.items[val.type](name, value).then(val.send)
            //    val.r(db.items[val.type](name, value));
          }
        },
        then = function (e) {
          e = attr.Row.init(e)
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
            // db.length = db.keys.length;
            // db.data.__proto__.length = db.keys.length;
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
        // for (var i = db.Syncdata.length - 1; i > 0; i--) {
        //   push(db.Syncdata[i])
        // }
        for (var i = 0; db.Syncdata.length > i; i++) {
          push(db.Syncdata[i])
        }
        db.Syncdata = []

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

      obj.key = (function key() {
        var type = arguments.callee.name || 'key'
        arguments._name = type
        return p(null, null, this, arguments, function (index) {
          if ('number' === typeof Number(index)) {
            return db.keys[index]
          }
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

      /*
      on= function (name, foo) {
        name = String(name).toLowerCase();
        if (foo instanceof Function && 'function' === typeof foo) {
          if (db.Events[name]) {
            db.Events[name][db.Events[name].length] = foo
          } else {
            db.Events[name] = [foo]
          }
        }
      }

      on.emit = function (name,value) {
                  if (db.Events[val.type] instanceof Array) {
              for (var i = 0; i < db.Events[val.type].length; i++) {
                'use strict';
                try {
                  db.Events[val.type][i](name, value)
                } catch (error) {

                }
              }
            } else {
              db.Events[val.type] = []
            }
      }
      */

      obj.__proto__ = {
        ready: new Promise(function (r) {
          db.SyncResolver = r;
        }),
        parsekey: parsekey.decode,
        on: function (name, foo) {
          name = String(name).toLowerCase();
          if (foo instanceof Function && 'function' === typeof foo) {
            if (db.Events[name]) {
              db.Events[name][db.Events[name].length] = foo
            } else {
              db.Events[name] = [foo]
            }
          }
        },
        length: (function length() {
          var type = arguments.callee.name || 'length'
          arguments._name = type
          return p(null, null, this, arguments, function () {
            return db.keys.length
          });
        }),
        __proto__: {
          name: id
        }
      }
      // obj.__proto__.ready = new Promise(function (r) {
      //   db.SyncResolver = r;
      // })
      // obj.__proto__.parsekey = parsekey.decode;
      // obj.__proto__.on = function (name, foo) {
      //   name = String(name).toLowerCase();
      //   if (foo instanceof Function && 'function' === typeof foo) {
      //     if (db.Events[name]) {
      //       db.Events[name][db.Events[name].length] = foo
      //     } else {
      //       db.Events[name] = [foo]
      //     }
      //   }
      // }
      // obj.__proto__.length = (function length() {
      //   var type = arguments.callee.name || 'length'
      //   arguments._name = type
      //   return p(null, null, this, arguments, function () {
      //     return db.keys.length
      //   });
      // });

      // obj.__proto__.name = id;



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

      Object.freeze(nonPromise.__proto__);
      Object.freeze(obj);

      if (db.SyncResolving > 0 && config.settled) {
        NimoDB.__proto__.console.error(`${JSON.stringify(config)}\n-Above Object will be overwritten, for the returned values are instance of the previous initialized values for "${id}"`)
      }

      if (db.items) {
        push.resolve();
      } else if (db.SyncResolving < 1) {
        // Object.assign(db.config, config)
        // db.config =
        //Object.assign(db.config, config)
        arguments.callee['stable'](id, db, then, GCollector)
        db.SyncResolving += 1;
        db.Events = db.Events || {}
      }

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
    this[NIMO_DB_ID.SYNC_KEY].__proto__ = {};
    this[NIMO_DB_ID.SYNC_KEY].__proto__.stable = function (id, db, then, GCollector) {
      if (GCollector.SynchronizedTable) {
        attr.Table.init(GCollector.SynchronizedTable).openTable(id).then(function (e) {
          if (e) {
            then(e)
          } else {
            attr.Table.init(GCollector.SynchronizedTable).createTable(id).then(then)
          }
        })
      } else {
        _this.forceOpenDatabase(SynNAME).then(function (e) {
          if (e) {
            GCollector.__proto__.SynchronizedTable = GCollector.__proto__.SynchronizedTable || e
            GCollector.SynchronizedTable.openTable(id).then(function (e) {
              if (e) {
                then(e)
              } else {
                GCollector.SynchronizedTable.createTable(id).then(function (e) {
                  then(e)
                })
              }
            })
          } else {
            _this.createDatabase(SynNAME).then(function (e) {
              GCollector.__proto__.SynchronizedTable = GCollector.__proto__.SynchronizedTable || e
              GCollector.__proto__.SynchronizedTable.createTable(id).then(function (_e) {
                if (_e) {
                  then(_e)
                } else {
                  GCollector.__proto__.SynchronizedTable.openTable(id).then(then)
                }
              })
            })
          }
        })
      }
    }

    this[NIMO_DB_ID.SYNC_KEY].__proto__.unstable = function (id, db, then, GCollector) {
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
          attr.indexedDB.open(SynNAME).onsuccess = function (e) {
            e = e.target.result
            e = e.transaction(id, 'readwrite');
            e = e.objectStore(id)
            new frh.init(e)
          }
        } else {
          attr.indexedDB.open(SynNAME, version).onupgradeneeded = function (e, _r) {
            e = e.target.result;
            for (var i = 0; NIMO_DB_ID.STORE_MODE.length > i; i++) {
              if (i + 1 === NIMO_DB_ID.STORE_MODE.length) {
                e = e.createObjectStore(NIMO_DB_ID.STORE_MODE[i], {
                  keyPath: keyPath
                })
              } else {
                close(e.createObjectStore(NIMO_DB_ID.STORE_MODE[i], {
                  keyPath: keyPath
                }), true)
                if (_r) {
                  _r()
                }
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
        then(new attr.Row(e, id, attr));
      }

      attr.indexedDB.open(SynNAME).onsuccess = function (_e) {
        _e = _e.target.result
        attr.version = _e.version;
        if (_e.version <= 1) {
          //created
          attr.indexedDB.open(_name).onsuccess = function (e) {
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
              info: NIMO_DB_ID.time()
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

    this[NIMO_DB_ID.SYNC_KEY].STORE_MODE = NIMO_DB_ID.STORE_MODE


    this.createDatabase = function () {
      var name = arguments[0];

      var f = null;

      var rst = new Promise(function (r) {
        new NIMO_DB_ID().get(name).then(function (exist) {
          if (exist) {
            NimoDB.__proto__.console.error(`can not create database:\n "${name}" already exist`)
            r(null)
          } else {
            attr.indexedDB.open(name).onsuccess = function (e) {
              e.target.result.close();
              // new NIMO_DB_ID().init(e.target.result.realname||e.target.result.name).then(function () {
              r(new attr.Table(e.target.result));
              //  })
            }
          }
        });
      })
      return rst;
    }

    this.openDatabase = function () {
      var name = arguments[0];
      var $t = arguments[2];
      var rst = new Promise(function (r) {
        new NIMO_DB_ID().get(name).then(function (has) {
          if (!has) {
            NimoDB.__proto__.console.error(`"${name}" can not be open for it does not exist`)
            r(null)
          } else {
            attr.indexedDB.open(name).onsuccess = function (e) {
              // fx = e.target.result;
              e.target.result.close();
              // new NIMO_DB_ID().init(fx.name).then(function () {
              r(new attr.Table(e.target.result /*.realname||e.target.result.name, e.target.result.version, e.target.result.objectStoreNames*/));
              // })
            }
          }
        })
      })
      return rst;
    }

    this.forceOpenDatabase = function () {
      var name = arguments[0];
      var $t = arguments[2];
      var rst = new Promise(function (r) {
        //  new NIMO_DB_ID().init(name)
        // .then(function () {
        attr.indexedDB.open(name).onsuccess = function (e) {
          e.target.result.close();
          r(new attr.Table(e.target.result));
        }
        //   })
      })
      return rst;
    }

    this.getAllCreatedDatabase = function () {
      var prm = new Promise(function (r) {
        new NIMO_DB_ID().getAll().then(r)
      });
      return prm;
    }

    this.deleteAllCreatedDatabase = function () {
      var prm = new Promise(function (r) {
        new NIMO_DB_ID().getAll().then(function (e) {
          var done = 'no database';
          for (var prop in e) {
            var name = e[prop].name
            done = 'done';
            attr.indexedDB.deleteDatabase(name)
          }
        })
      })

      return prm;
    }

    this.deleteDatabase = function () {
      var name = arguments[0];
      var prm = new Promise(function (r) {
        attr.indexedDB.deleteDatabase(name).onsuccess = function (e) {
          new NIMO_DB_ID().remove(name).then(r)
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
            e.openTable(tb).then(r);
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
            e.createTable(tb).then(r)
          } else {
            r(e)
          }
        })
      });
    }






    attr.Table = function () {

      var name = arguments[0];
      if (name instanceof IDBDatabase) {
        name.close()
        var vs = name.version
        var tb = name.objectStoreNames
        name = name.realname || name.name
      } else {
        return NimoDB.__proto__.console.error('argument[0] should be an instance of "IDBDatabase"  - <Table>')
      }

      // var attr = NIMO_DB_ID.short(name);
      //  var t_this=this
      // this.__proto__={vs:vs}
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
            vs = vs + 1;
            /** */
            // console.timeEnd(vs);
            attr.indexedDB.open(name, vs).onupgradeneeded = function (e, _r) {
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
                close(e.createObjectStore(tb_name, obj), true)
                if (_r) {
                  _r()
                }
              }
              e.close();
              r(new attr.Row(e, tb_name, attr))
            };
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
                e.close();
                r(null)
                return;
              }
              e.close();
              r(new attr.Row(e, tb_name, attr))
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
            vs = vs + 1;
            attr.indexedDB.open(name, vs).onupgradeneeded = function (e, _r) {
              e = e.target.result;
              if (!e.objectStoreNames.contains(tb_name)) {
                NimoDB.__proto__.console.error(`A table with the name "${tb_name}" does not exist. `)
                r(null)
              } else {
                e.deleteObjectStore(tb_name)
                e.close();
                if (_r) {
                  _r()
                }
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
          vs = vs + 1;
          attr.indexedDB.open(name, vs).onupgradeneeded = function (e, _r) {
            e = e.target.result;
            var objN = e.objectStoreNames;
            for (var i = 0; i < objN.length; i++) {
              e.deleteObjectStore(objN[i])
            }
            e.close();
            if (_r) {
              _r()
            }
            r('done')
          };
        });
      }
    }




    attr.Row = function () {
      var name = arguments[0];
      var tb_name = arguments[1]
      var _this = this;

      // window.db=name
      // window.tb=tb_name
      // db.onclose =function () {
      //   console.log(db)
      // }

      //transaction(tb_name, 'readwrite')
      // console.log(name)


      if (name instanceof IDBDatabase) {
        if (!tb_name) {
          NimoDB.__proto__.console.error('incorrect table name - <Row>')
        }
        var attr = NIMO_DB_ID.short(name);
        if (!attr.cloned) {
          name.close()
        }
        name = name.realname || name.name
      } else {
        return NimoDB.__proto__.console.error('argument[0] should be an instance of "IDBDatabase"  - <Row>')
      }

      var Env = setEnv(name, tb_name)
      var db = Env.DB;

      // var t = 'object' === typeof name&&name.close?name:null;
      //resolveDB(attr.indexedDB.open(name).onsuccess)
      // if ('object' === typeof name && name.close) {
      //   attr = {
      //     indexedDB: {}
      //   }
      //   attr.indexedDB.open = function () {
      //     var obj = {}
      //     new Promise(function (r) {
      //       r()
      //     }).then(function () {
      //       // console.log(name.close);
      //       obj.onsuccess({
      //         target: {
      //           result: name
      //         }
      //       })
      //     })
      //     return obj
      //   }
      // } else {
      //   if(!attr){
      //     attr = arguments[2]
      //   }
      // }



      this.setItem = function (key, value) {
        //  key = String(key)
        var argument = arguments
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            var obj = {}
            obj[keyPath] = key;
            obj['value'] = value;

            // var $e = e.target.result;
            // e = $e.transaction(tb_name, 'readwrite')
            // e.oncomplete = function () {
            //   // r('done')
            // }

            e.target.result.transaction(tb_name, 'readwrite').objectStore(tb_name).put(obj).onsuccess = function (e) {
              // try {
              close(e)
              // e.target.transaction.db.close();
              // } catch (e) {
              //   $e.transaction.db.close();
              // }
              _this.on.emit('setItem', argument)
              r('done')
            }
          }
        })

        return prm;
      }


      this.addItem = function (key, value) {
        //  key = String(key)
        var argument = arguments
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            var obj = {}
            obj[keyPath] = key;
            obj['value'] = value;

            // var $e = e.target.result;
            // e = $e.transaction(tb_name, 'readwrite')
            // e.oncomplete = function () {
            //   // r('done')
            // }
            e = e.target.result.transaction(tb_name, 'readwrite').objectStore(tb_name).add(obj)
            e.onerror = function (e) {
              close(e)
              // e.target.transaction.db.close();
              r(null)
            }
            e.onsuccess = function (e) {
              // try {
              close(e)
              // e.target.transaction.db.close();
              // } catch (e) {
              //   $e.transaction.db.close();
              // }
              _this.on.emit('addItem', argument)
              r('done')
            }
          }
        })

        return prm;
      }


      this.removeItem = function () {
        var argument = arguments
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
            val.onsuccess = function (e) {

              //e.put(rst).onsuccess = function(e) {

              // try {
              close(e)
              // e.target.transaction.db.close();
              // r('done')
              // } catch (e) {
              //   $e.transaction.db.close();
              //   //  r('done')
              // }
              _this.on.emit('removeItem', argument)
              r('done')
              //  }


            }
          }
        });
        return prm;
      };

      this.clear = function () {
        var argument = arguments
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            var $e = e.target.result;
            e = $e.transaction(tb_name, 'readwrite')

            e.oncomplete = function () {
              // r('done')
            }

            e = e.objectStore(tb_name)

            e.clear().onsuccess = function (e) {
              // try {
              close(e)
              // e.target.transaction.db.close();
              // r('done')
              // } catch (e) {
              //   $e.transaction.db.close();
              //   // r('done')
              // }
              _this.on.emit('clear', argument)
              r('done')
            }
          }
        });
        return prm;
      }


      this.has = function ($val) {
        //$val = String($val)
        var argument = arguments
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
                  close(e)
                  //e.target.transaction.db.close();
                  // _this.on.emit('has',argument)
                  r(true)
                } else {
                  rst.continue();
                }
              } else {
                close(e)
                // e.target.transaction.db.close();
                // _this.on.emit('has',argument)
                r(false)
              }
            }

          }
        })
        return prm;
      }

      this.key = function () {
        var argument = arguments
        var index = Number(arguments[0])
        //  f = 'function' === typeof f ? f : new Function();
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            e.target.result.transaction(tb_name, 'readonly').objectStore(tb_name).getAllKeys().onsuccess = function (e) {
              close(e)
              // e.target.transaction.db.close()
              // _this.on.emit('key',argument)
              r(e.target.result[index]);
            }
          }
        })
        return prm;
      }

      this.keys = function () {
        var argument = arguments
        var f = arguments[0]
        f = 'function' === typeof f ? f : new Function();

        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            e.target.result.transaction(tb_name, 'readonly').objectStore(tb_name).getAllKeys().onsuccess = function (e) {
              close(e)
              // e.target.transaction.db.close()
              // _this.on.emit('keys',argument)
              r(e.target.result);
            }
          }
        })
        return prm;
      }

      this.length = function () {
        var argument = arguments
        var f = arguments[0]
        f = 'function' === typeof f ? f : new Function();
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            e.target.result.transaction(tb_name, 'readonly').objectStore(tb_name).count().onsuccess = function (e) {
              close(e)
              // e.target.transaction.db.close()
              // _this.on.emit('length',argument)
              r(e.target.result);
            }
          }
        })
        return prm;
      }

      this.getAllItemAsArray = function (f) {
        var argument = arguments
        var f = arguments[0]
        f = 'function' === typeof f ? f : new Function();
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            e.target.result.transaction(tb_name, 'readonly').objectStore(tb_name).getAll().onsuccess = function (e) {
              close(e)
              // e.target.transaction.db.close()
              _this.on.emit('getAllItemAsArray', argument)
              r(e.target.result);
            }
          }
        })
        return prm;
      }

      this.getAllItem = function (f) {
        var argument = arguments
        f = 'function' === typeof f ? f : new Function();
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            var array = {};
            e.target.result.transaction(tb_name, 'readonly').objectStore(tb_name).openCursor().onsuccess = function (e) {
              var rst = e.target.result;
              if (rst) {
                var key = rst.key;
                //  key =parsekey(key);
                f(key, rst.value);
                // var val = nimoOBJ(rst.value);
                array[key] = nimoOBJ(rst.value)
                rst.continue();
              } else {
                // array.__proto__['length'] = len.result
                // try {
                close(e)
                // e.target.transaction.db.close();
                _this.on.emit('getAllItem', argument)
                r(array)
                // } catch (e) {
                //   $e.transaction.db.close();
                //   r(array);
                // }
              }

            }

          }
        })
        return prm;
      }

      this.getItem = function () {
        var argument = arguments
        var $name = arguments[0]
        //var $name = String($name)
        var prm = new Promise(function (r) {
          attr.indexedDB.open(name).onsuccess = function (e) {
            e.target.result.transaction(tb_name, 'readonly').objectStore(tb_name).get($name).onsuccess = function (e) {
              close(e)
              //e.target.transaction.db.close();
              // var rst = val.result;
              e = nimoOBJ(e.target.result)
              _this.on.emit('getItem', argument)
              // try {
              r(e)

              // } catch (e) {
              //   $e.transaction.db.close();
              //   r(rst);
              // }
            }
          }
        })

        return prm
      }

      this.on = function (name, foo) {
        name = String(name).toLowerCase();
        if (foo instanceof Function && 'function' === typeof foo) {
          if (db.Events[name]) {
            db.Events[name][db.Events[name].length] = foo
          } else {
            db.Events[name] = [foo]
          }
        }
      }

      this.on.emit = function (type, argument) {
        argument = argument || []
        type = String(type).toLowerCase();
        if (db.Events[type] instanceof Array) {
          for (var i = 0; i < db.Events[type].length; i++) {
            'use strict';
            try {
              db.Events[type][i](argument[0], argument[1])
            } catch (error) {

            }
          }
        } else {
          db.Events[type] = []
        }
        if (db.Events['all']) {
          for (var i = 0; i < db.Events['all'].length; i++) {
            'use strict';
            try {
              db.Events['all'][i](type, argument[0], argument[1])
            } catch (error) {

            }
          }
        }
      }

      if (!db.Events) {
        db.Events = {}
      }
    }

    attr.Table.init = function (e) {
      return e
    }
    attr.Row.init = function (e) {
      return e
    }



    attr.DB = window.indexedDB;
    this.devMode = true;

    /**support**/
    if (!attr.DB) {
      attr.DB = {
        open: function () {
          return {};
        }
      }
    }

    attr.indexedDB = {
      open: function () {
        var qu = arguments.callee.queue

        var init = function (argument) {
          var obj = {};
          var r;

          if (arguments[1]) {
            obj = arguments[1]
          } else {
            obj.__proto__ = {
              error: null,
              onblocked: null,
              onerror: null,
              onsuccess: null,
              onupgradeneeded: null,
              readyState: "pending",
              result: null,
              source: null,
              transaction: null
            }
          }

          if (qu[0]) {
            qu[qu.length - 1].then(function () {
              qu.pop();
              init(argument, obj)
            })
            return obj
          }

          var e = attr.DB.open(toNimoName(argument[0]), argument[1]);
          (e.ready = new Promise(function (resolve) {
            r = function (e) {
              if (e.readyState === 'done' && e.result) {
                e.result.realname = argument[0];
                // e.result.realname = argument[0];
                obj.__proto__.result = e.result
                // console.log(e.result)
              }
              obj.__proto__.readyState = e.readyState
              resolve(e)
            }
          })).then(function (e) {
            if (e.readyState === 'pending') { } else {
              obj.__proto__.result = e.result
            }
            obj.__proto__.readyState = e.readyState
            // obj.__proto__ = e.__proto__;
            // qu.pop()
          })

          qu.push(e.ready)
          var foo = function (e) {
            e.result.onerror = function () {
              e = arguments[0].target
            }
            r(e)
          }

          e.onsuccess = function (e) {
            if (!r.success) {
              foo(e.target)
            } else {
              delete r.success
            }
            if (obj.onsuccess) {
              obj.onsuccess(e)
            }
          }

          e.onupgradeneeded = function (e) {
            // console.log(NIMO_DB_ID.row)
            if (NIMO_DB_ID.row && false) {
              new NIMO_DB_ID().init(e.target.result.realname || e.target.result.name).then(function () {
                console.log(2)
                foo(e.target)
                if (obj.onupgradeneeded) {
                  obj.onupgradeneeded(e)
                }
              })
            } else {
              new NIMO_DB_ID().init(e.target.result.realname || e.target.result.name).then(function () {/** **/ })
              foo(e.target)
              if (obj.onupgradeneeded) {
                obj.onupgradeneeded(e)
              }
            }
            r.success = true;
          }

          e.onerror = function (e) {
            r(e.target)
            if (obj.onerror) {
              obj.onerror(e)
            }
          }

          e.onblocked = function (e) {
            r(e.target)
            if (obj.onblocked) {
              obj.onblocked(e)
            }
          }
          return obj
        }


        return init(arguments)
      },
      deleteDatabase: function () {
        return attr.DB.deleteDatabase(arguments[0], arguments[1])
      },
      databases: function () {
        return attr.DB.databases(arguments[0], arguments[1])
      },
      cmp: function () {
        return attr.DB.cmp(arguments[0], arguments[1])
      },
    }

    //attr.indexedDB.__proto__ = attr.DB

    attr.indexedDB.open.queue = []
    /**end zone **/
    var toNimoName = function (x, y) {
      if (!y && !x) {
        NimoDB.__proto__.console.error('invalid name');
      }
      var name = x + tmp
      name = 'NIMO:' + encode(name);
      return name;
    }
    var setEnv = function (SynNAME, id) {
      NimoDB.database.databases.Items[SynNAME] = NimoDB.database.databases.Items[SynNAME] || {};
      NimoDB.database.databases.Items[SynNAME]['items'] = NimoDB.database.databases.Items[SynNAME]['items'] || {}
      NimoDB.database.databases.Items[SynNAME]['GCollectors'] = NimoDB.database.databases.Items[SynNAME]['GCollectors'] || {}
      NimoDB.database.databases.Items[SynNAME]['items'][id] = NimoDB.database.databases.Items[SynNAME]['items'][id] || {}
      NimoDB.database.databases.Items[SynNAME]['GCollectors'].__proto__ = {}
      NimoDB.database.databases.Items[SynNAME]['items'][id].__proto__ = {}
      return {
        GC: NimoDB.database.databases.Items[SynNAME]['GCollectors'],
        DB: NimoDB.database.databases.Items[SynNAME]['items'][id]
      }
    }


    // var decode = NIMO_DB_ID.decode
    // var parseString = NIMO_DB_ID.parseString
    // var time = NIMO_DB_ID.time

    // new NIMO_DB_ID().init(fx.name)
    // new NIMO_DB_ID().remove()
    // init(fx.name)


    if (!NIMO_DB_ID.store) {
      NIMO_DB_ID.store = attr.indexedDB.open(_name)
      NIMO_DB_ID.store.onsuccess = function (e) {
        // console.log(e)
        if (NIMO_DB_ID.store.init) {
          return
        }
        NIMO_DB_ID.push.resolve(e, def, attr)
      }

      NIMO_DB_ID.store.onupgradeneeded = function (e, _r) {
        // console.log([])
        if (e.target.result.version === 1) {
          close(
            e.target.result.createObjectStore(def, {
              keyPath: keyPath
            })
            , true)
          if (_r) {
            _r()
          }
          // NIMO_DB_ID.push.resolve(e,def,attr)
        }

      }
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

    //attr.loaded = true;
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
  var NIMO_DB_ID = /*NIMO_DB_ID ||*/ function (name) {
    var arg = arguments;
    var add = NIMO_DB_ID.set
    this.init = function (name) {
      return new Promise(function (r, j) {
        // if(!NIMO_DB_ID.row){
        //  r('done')
        //  r=new Function();
        // }
        add.push(['addItem', [name, {
          name: name,
          info: NIMO_DB_ID.time()
        }], r]);
      })
    }
    this.get = function (name) {
      return new Promise(function (r, j) {
        add.push(['getItem', [name], r]);
      })
    }

    this.getAll = function () {
      return new Promise(function (r, j) {
        add.push(['getAllItem', [], r]);
      })
    }
    this.clear = function () {
      return new Promise(function (r, j) {
        add.push(['clear', [], r]);
      })
    }
    this.remove = function (name) {
      return new Promise(function (r, j) {
        add.push(['removeItem', [name], r]);
      })
    }
  }

  NIMO_DB_ID.push = function (e) {
    NIMO_DB_ID.row[e[0]](e[1][0], e[1][1], e[1][2]).then(e[2])
  }

  NIMO_DB_ID.push.resolve = function (e, def, attr) {
    attr = attr || NimoDB.database;
    NIMO_DB_ID.store.init = true
    e.target.result.ice = {}
    //e.target.result.close()
    //e.target.result


    NIMO_DB_ID.row = NIMO_DB_ID.row || new attr.Row(e.target.result, def, attr)
    // for (var i = NIMO_DB_ID.set.length - 1; i > 0; i--) {
    //   NIMO_DB_ID.push(NIMO_DB_ID.set[i]);
    // }
    for (var i = 0; NIMO_DB_ID.set.length > i; i++) {
      NIMO_DB_ID.push(NIMO_DB_ID.set[i]);
    }
    NIMO_DB_ID.set = []
    NIMO_DB_ID.set.push = NIMO_DB_ID.push;
  }



  NIMO_DB_ID.short = function (name, o) {
    // o=o||{}
    var _attr;
    if (name instanceof IDBDatabase && name.ice instanceof Object) {
      _attr = {
        indexedDB: {},
        cloned: true,
        name: name.realname || name.name
      }
      _attr.indexedDB.open = function () {
        var obj = {}
        new Promise(function (r) {
          r()
        }).then(function () {
          obj.onsuccess({
            target: {
              result: name
            }
          })
        })
        return obj
      }
    } else {
      // o.name = name
    }
    return _attr || NimoDB.__proto__.database
  }

  NIMO_DB_ID.parseString = function (x) {
    x = String(x);
    var idx = x.indexOf(':');
    var sub_1 = x.substring(0, idx),
      sub_2 = x.substring(idx + 1, x.length)
    return [sub_1, sub_2]
  }

  NIMO_DB_ID.decode = function (x, y) {
    if (!y) {
      x = NIMO_DB_ID.parseString(x);
    }
    x = x[1]
    x = atob(x);
    x = x.substring(0, x.length - NIMO_DB_ID.tmp.length);
    return x;
  }

  NIMO_DB_ID.time = function () {
    var obj = {};
    obj.date = [
      new Date().toDateString(),
      new Date().toLocaleDateString()
    ];
    obj.exactDate = Date.now();
    return obj;
  }
  // var NIMO_DB_ID = NIMO_DB_ID

  Object.observe = Object.observe || function (obj, f) {


  }
  Object.assign = Object.assign || function (p, c) {
    c.__proto__ = p
    // for (var d in c) {
    //   p[d] = c[d]
    // }
    return c
  }

  var parsekey = function (key) {
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
  var close = function (e, d) {
    //  var _e =e
    // if (e instanceof IDBRequest === false && e instanceof IDBObjectStore === false && e instanceof Object) {
    if (e instanceof Event) {
      e = e.target
    }

    if (e.transaction.commit) {
      e.transaction.commit();
    } else {
      // the following code should not be uncommented
      /*e.transaction.abort()*/
    }
    if (d) {
      return
    }
    if ('object' === typeof e.transaction.db.ice) {
    } else {
      e.transaction.db.close();
    }
  }

  var encode = function (x, y) {
    if (!y) {
      x = NIMO_DB_ID.parseString(x);
    }
    x = x[1]
    x = btoa(x)
    return x;
  }

  var nimoOBJ = function (e) {
    if ('object' == typeof e) {
      e = e.value;
    }
    return e;
  }
  var has = function (e, name) {
    return name in e;
  }

  NIMO_DB_ID.set = []
  NIMO_DB_ID.tmp = '[hyper database 2003]';
  NIMO_DB_ID.keyPath = "NIMO_DB_ID"
  NIMO_DB_ID.SYNC_KEY = "Sync"
  NIMO_DB_ID.STORE_MODE = [new String('Sync storage'), new String('Sync storage(2)')]

  // deprecated!!
  //NimoDB.__proto__.store = {}
  // use this instead => NimoDB.__proto__.database.databases.Items
  NimoDB.__proto__.database = {
    __proto__: {
      databases: {
        Items: {},
        GCollectors: {}
      }
    }
  };


  var attr = NimoDB.__proto__.database,
    SynID = /*'Sync storage'*/ String(NIMO_DB_ID.STORE_MODE[0]),
    done = "done",
    SynNAME = location.href, // 
    keyPath = NIMO_DB_ID.keyPath,
    def = 'records',
    _name = keyPath,
    tmp = NIMO_DB_ID.tmp
  // NIMO_DB_ID.store = attr.indexedDB.open(NIMO_DB_ID.keyPath)
  // NimoDB.SynchronizedTable


  // NimoDB.__proto__[NIMO_DB_ID.SYNC_KEY] = new NimoDB()[NIMO_DB_ID.SYNC_KEY];
  NimoDB.__proto__[NIMO_DB_ID.SYNC_KEY] = new NimoDB()[NIMO_DB_ID.SYNC_KEY](NIMO_DB_ID.STORE_MODE[0], {
    cache: true,
    typeSensitive: false,
    filter: function (argument) {
      argument[0] = String(argument[0]).toUpperCase().trim().replace(/\s| /img, '_');
      this.setItem = function (name, value) {
        if (value instanceof Blob || value instanceof File) {
          NimoDB.__proto__.console.error('Blob and File type are not supported on sync mode, please convert them to buffers and try again')
          return false
        }
        return true
      }
    }
  });

  window.NimoDB = NimoDB
  //}
  //onbeforeunload =f
  //addEventListener('beforeunload',f)
})()