/**
 * 
 * 
 * Bug @{Sync.clear} > data ={}
 */
//n = 0;

function NimoDB() {

  //var attr = this.constructor;
  var attr = {};
  attr.database = [];
  attr.indexedDB = indexedDB
  var keyPath = "NIMO_DB_ID";
  var def = 'records';
  var _name = keyPath;
  var tmp = '[hyper database 2003]';
  var SyncId = 'Sync storage';
  const dbname = location.href;
  
  var _this = this
  this.devMode = true

  const Sync = function (id,foo,config) {
    if ('object' === typeof id) {
      config = id
    }
    if ('object' !== typeof config) {
      config = {cache:true}
    }
    if ('function'===typeof id) {
      foo=id
    }
    if ('string' === typeof foo) {
      id = foo
    }
    if (id === SyncId) {
      $console.error('Name already taken for our prototype')
  }

 if ('string' !== typeof id||!id.trim()) {
   id = SyncId
 }else{
   id=btoa(id)
 }

    foo = foo || new Function();
  //  console.log(config);
    const db = NimoDB_syn.syn;
    const global = {}
    // const chunck = {};
    // db.e = {}
    db.Syncdata[id] = db.Syncdata[id] || []
   // db.index = {}
    //db.data = db.data || {};
    db.data[id] = db.data[id]||{}
   // db.keys = db.keys || {};
    db.keys[id] = db.keys[id] || []

    db.dataAsArray = db.dataAsArray || [];
    //dataAsArray

   // db.obj = { ready: new Promise(function (r) { global.SyncResolver = r; }) }
    const obj = { ready: new Promise(function (r) { global.SyncResolver = r; }) }
    
    const p = function (exec, promise, parent, name, value) {
      if (parent.__proto__.__ready__) {
        //Object.unfreeze(db.data);
        exec = eval(exec)
        // db.data[id].__proto__
        db.data[id].__proto__.length = db.keys[id].length;
       // Object.freeze(db.data);
        return exec;
      }
      ///console.log(promise);
      return promise;
    },
      push = function (val) {
     //   console.log();
        const name = val.name;
        const value = val.value;

        if (obj.__proto__.__ready__) {
          val.r(eval(val.exec))
          if (!val.type.includes('get') && !val.type.includes('key')) {
            db.items[id][val.type](name, value);
          }
        }else{
        //  console.log(db.items);

          val.r(db.items[id][val.type](name, value));
        }
      },
      then = function (e) {

        db.items[id] = e;
        if (config.cache) {
          //console.log(config.cache);
          if ('object' === typeof db.data[id] && Object.keys(db.data[id]).length>0) {
            if (true) {
              push.resolve()
            }
           foo(nonPromise);
         } else {
        //   db.data = db.data || {}
           e.getAllItem(function (key, value) {
             db.data[id][key] = value.value;
             db.keys[id].push(key)
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
             // db.keys[id] = Object.keys(db.data);
             db.data[id].__proto__.length = db.keys[id].length;
             // Object.freeze(db.data);
             push.resolve()
             global.SyncResolver(nonPromise);
             // (obj.onready || new Function())(nonPromise)
             //delete obj.onready;
             foo(nonPromise);
             // db.Syncdata[id].push = push
           })
         }
        }else{
          push.resolve()
        }
      }

    obj.setItem = function (name, value) {
      const exec = `db.data[id][name]=value;db.keys[id].push(name);"done"`;
      return p(exec, new Promise(function (r) { db.Syncdata[id].push({ name: name, value: value, type: 'setItem', r: r, exec: exec }) }), this, name, value);
    }

    obj.getItem = function (name) {
      const exec = `db.data[id][name]`;
      return p(exec, new Promise(function (r) { db.Syncdata[id].push({ name: name, type: 'getItem', r: r, exec: exec }) }), this, name);
    }

    obj.removeItem = function (name) {
      const exec = `delete db.data[id][name];db.keys[id]=Object.keys(db.data[id]);"done"`;
      return p(exec, new Promise(function (r) { db.Syncdata[id].push({ name: name, type: 'removeItem', r: r, exec: exec }) }), this, name);
    }

    obj.clear = function () {
      const exec = `db.data[id]={};db.keys[id]=[];"done"`;
      return p(exec, new Promise(function (r) { db.Syncdata[id].push({ type: 'clear', r: r, exec: exec }) }), this);
    }

    obj.getAllItem = function () {
      const exec = `db.data[id]`;
      return p(exec, new Promise(function (r) { db.Syncdata[id].push({ type: 'getAllItem', r: r, exec: exec,t:Date.now() }) }), this);
    }

    obj.keys = function () {
      const exec = `db.keys[id]`;
      return p(exec, new Promise(function (r) { db.Syncdata[id].push({ type: 'keys', r: r, exec: exec }) }), this);
    }

  //  Object.observe(d,log)
    /* obj.getAllItemAsArray = function () {
       const exec = `db.dataAsArray`;
       return p(exec, new Promise(function (r) { db.Syncdata[id].push({ type: 'getAllItemAsArray', r: r, exec: exec }) }), this);
     } 
 
     obj.keys = function () {
       const exec = `db.keys[id]`;
       return p(exec, new Promise(function (r) { db.Syncdata[id].push({ type: 'keys', r: r, exec: exec }) }), this);
     } */

    //getAllItemAsArray
    // Object.freeze(obj);
    const nonPromise = { localStorage: db.data[id]}
    nonPromise.localStorage.__proto__ = Object.create(obj);
    nonPromise.localStorage.__proto__.__ready__ = true;
    Object.freeze(obj);
    Object.freeze(nonPromise.localStorage.__proto__);

    push.resolve = function () {
      for (var i = db.Syncdata[id].length - 1; i > -1; i--) {
        push(db.Syncdata[id][i])
        db.Syncdata[id].pop()
      }
      db.Syncdata[id].push = push
    }
    
    console.log(id);

    ////  new Promise(function (d) {
  //  new Promise(function (r) {
      // if (_wait.resolve.init(arguments, arguments.callee)) { return; }
    db.open(dbname, id).then(function (e) {
   //   n = n + 1
      if (!e) {
        db.create(dbname, id).then(function (e) {
//          console.log(e);
          then(e)
        })
      } else {
     //   console.log(e);
        then(e)
      }
    })
  //   })
    // })

    return obj;
    /*setTimeout(function () {
      (obj.onready || new Function())(nonPromise)
      delete obj.onready;
    }, 0)&&*/;
  };


  this.Sync = Sync
 
  this.createDatabase = function () {
    const argument = arguments;
    var name = arguments[0];
    var name = nimoName(name)
    var f = null;

    var rst = new Promise(function (r) {
   //   if (_wait.resolve.init(argument, r)) { return; }

      _this.getAllCreatedDatabase().then(function (e) {
        if (has(e, name)) {
      //    console.log(decode(parseString(name)[1]));

          $console.error(`can not create database:\n "${decode(name)}" already exist`)
          r(null)
        } else {
          var fx = attr.indexedDB.open(name);
          fx.onsuccess = function () {
            fx = fx.result;
            fx.close();
            _this.open(_name, def).then(function (e) {
              e.setItem(decode(fx.name), { name: decode(fx.name), info: time() }).then(function (e) {
                r(new attr.table(fx.name, fx.version));
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
    const argument = arguments;
    var name = arguments[0];
    var $t = arguments[2];
    NimoDB_syn.section;
    var name = nimoName(name)
    return new Promise(function (r) {
    //  if (_wait.resolve.init(argument,r)) {return;}
   //   if (_wait.resolve.init(argument, r)) { return; }

      var dnm = decode(name)

      if (false) {
        $console.error(`"${dnm}" can not be open for it does not exist`)
        r(null)
      }
      var fx = attr.indexedDB.open(name);
      fx.onsuccess = function () {
        fx = fx.result;
        fx.close();
        r(new attr.table(fx.name, fx.version));
      }
    });
  }

  this.getAllCreatedDatabase = function () {
    const argument = arguments;
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
    const argument = arguments;
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
    const argument = arguments;
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
    const argument = arguments;
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
    const argument = arguments;
    db = db
    tb = tb
   
    return new Promise(function (r) {
    //  if (_wait.resolve.init(argument, r)) {  return;}
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
    vs++

    this.createTable = function (tb_name, d) {
      const argument = arguments;
      var obj = {
        keyPath: keyPath
      };
      return new Promise(function (r) {
     //   if (_wait.resolve.init(argument, r)) { return; }
        if (/*tb.contains(tb_name) &&*/ false) {
          $console.error(`A table with the name "${tb_name}" already exist. `)
          r(null)
        } else {
          attr.indexedDB.open(name, vs).onupgradeneeded = function (e) {
            e = e.target.result;
            if (e.objectStoreNames.contains(tb_name)&&!d) {
              $console.error(`A table with the name "${tb_name}" already exist. `)
              r(null)
            } else {
              $e = e.createObjectStore(tb_name, obj);
            }

            r(new attr.row(name, tb_name))
            e.close();

          };
        }
      });
    }



    this.openTable = function (tb_name,d) {
      const argument = arguments;
      return new Promise(function (r) {
     //   if (_wait.resolve.init(argument, r)) { return; }
        if (/*!tb.contains(tb_name) &&*/ false) {
          $console.error(`A table with the name "${tb_name}" does not exist. `)
          r(null)
        } else {
          attr.indexedDB.open(name).onsuccess = function (e) {
            e = e.target.result;
            if (!e.objectStoreNames.contains(tb_name)&&!d) {
              $console.error(`A table with the name "${tb_name}" does not exist. `)
              r(null)
            }
            e.close();
            r(new attr.row(name, tb_name))
          };
        }
      });
    }



    this.deleteTable = function (tb_name) {
      const argument = arguments;
      return new Promise(function (r) {
        if (/*!tb.contains(tb_name) &&*/ false) {
          $console.error(`A table with the name "${tb_name}" does not exist. `)
          r(null)
        } else {
          attr.indexedDB.open(name, vs).onupgradeneeded = function (e) {
            e = e.target.result;
            if (!e.objectStoreNames.contains(tb_name)) {
              $console.error(`A table with the name "${tb_name}" does not exist. `)
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
      const argument = arguments;
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


    this.setItem = function (key, value) {
      const argument = arguments;
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
          e = $e.transaction(tb_name, 'readwrite')

          e.oncomplete = function () {
            r('done')
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

          }
        }
      })

      return prm;
    }

    this.removeItem = function () {
      const argument = arguments;
      var $name = arguments[0]

      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
          e = $e.transaction(tb_name, 'readwrite')

          e.oncomplete = function () {
            r('done')
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

            //  }


          }
        }
      });
      return prm;
    };

    this.clear = function () {
      const argument = arguments;
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
          e = $e.transaction(tb_name, 'readwrite')

          e.oncomplete = function () {
            r('done')
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

          }
        }
      });
      return prm;
    }


    this.has = function ($val) {
      const argument = arguments;
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
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
     // console.log(11);
      const argument = arguments;
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          e.getAllKeys().onsuccess = function (val) {
            r(val.target.result);
            try {
              $e.close();
              // r('done')
            } catch (e) {
              $e.transaction.db.close();
              // r('done')
            }
          }
        }
      })
      return prm;
    }

    this.getAllItemAsArray = function (f) {
      const argument = arguments;
      f='function'===typeof f?f:new Function();
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          e.getAll().onsuccess = function (e) {
            r(e.target.result);
            try {
              $e.close();
              // r('done')
            } catch (e) {
              $e.transaction.db.close();
              // r('done')
            }
          }
        }
      })
      return prm;
    }

    this.getAllItem = function (f) {
      const argument = arguments;
      f='function'===typeof f?f:new Function();
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
          e = $e.transaction(tb_name, 'readonly')
          e = e.objectStore(tb_name)
          //     console.log(e);
          var val = e.openCursor()
          //  var len = e.count();

          var array = {};

          val.onsuccess = function (e) {
            var rst = e.target.result;

            if (rst) {
              //  console.log(rst);
              f(rst.key,rst.value);
              var val = nimoOBJ(rst.value);
              array[rst.key] = val
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
      const argument = arguments;
      var $name = arguments[0]
      var prm = new Promise(function (r) {
        attr.indexedDB.open(name).onsuccess = function (e) {
          $e = e.target.result;
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



  var nimoName = function (x, y) {
    if (!y && !x) {
      $console.error('invalid name');
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
    var sub_1 = x.substring(0, idx)
      , sub_2 = x.substring(idx + 1, x.length)
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
      e.createObjectStore(def, { keyPath: keyPath })
    }
    e.close();
  }

  var $console = {
    error: function (x) {
      if (!_this.devMode) {
        return;
      }
      console.error(x)
    }
  }
  attr.loaded = true;
}



function _wait(a, obj) {
  NimoDB_syn.section.push({ name: a[0], value: a[1], obj: obj });
}
_wait.len = function () {
  return NimoDB_syn.section;
}

_wait.resolve = function () {
  // for (var i = NimoDB_syn.section.length - 1; i > -1; i--) {
  //  const v = NimoDB_syn.section.length > 0
  console.log(NimoDB_syn.section.length);
  if (NimoDB_syn.section.length > 0) {
    const val = NimoDB_syn.section[NimoDB_syn.section.length - 1];
    NimoDB_syn.section.pop();
    // val.obj.obj[val.obj.type](val.a, val.b)
    val.obj.f(val.name, val.value).then(function (e) {
      val.obj.r(e)
      _wait.resolve();
    })
    return true;
  }
  //  }
  // return v;
}

_wait.resolve.init = function (argument, r) {
  //if (_wait.resolve()) {
    _wait(argument, { f: argument.callee, r: r });
    _wait.resolve()
    //console.log(argument);
  //  return true;
 // }
  return true;
}



const NimoDB_syn = {} || NimoDB_syn
NimoDB_syn.section = []
//const f = function (e) {
//  e.preventDefault();
 // e.returnValue = '333';
//  alert(9)
 // window.d = 9
  NimoDB_syn.syn = NimoDB_syn.syn || new NimoDB();
NimoDB_syn.syn.data ={}
NimoDB_syn.syn.keys = {}
NimoDB_syn.syn.items = {}
NimoDB_syn.syn.Syncdata={}
  //NimoDB_syn.syn.devMode = false;
  NimoDB.Sync = new NimoDB().Sync();
//}
//onbeforeunload =f
//addEventListener('beforeunload',f)