

function NimoDB() {
  
  var attr = this.constructor;
  attr.database = [];
  attr.indexedDB = indexedDB
  var keyPath = "NIMO_DB_ID"
  var def = 'records';
  var _name = keyPath;
  var tmp = '[hyper database 2003]'
  
   var _this = this
  this.devMode = true
   this.createDatabase = function() {
    var name = arguments[0];
    var name = nimoName(name)
    var f = null;
    
   var rst = new Promise(function(r){
    _this.getAllCreatedDatabase().then(function(e) {
   if (decode(name) in e) {
      $console.error(`can not create database:\n "${decode(name)}" already exist`)
      r(null)
    }else{
     var fx = attr.indexedDB.open(name);
     fx.onsuccess = function() {
       fx = fx.result;
      fx.close();
        _this.openDatabase(_name).then(function(e) {
        e.openTable(def).then(function(e) {
          e.setItem(decode(fx.name),{
            name:decode(fx.name),
            date:`${new Date().toDateString()} - ${new Date().toTimeString()}`
          })
        r(new attr.table(fx.name,fx.version));
        })
      })
    }
    }
    });
   })
    return rst;
  }
  
  this.openDatabase = function() {
    var name = arguments[0];
    var $t= arguments[2];
    var name = nimoName(name)
     var rst = new Promise(function(r){
     var dnm= decode(name)
     
      // console.log(new NimoDB().getAllCreatedDatabase());
    // _this.getAllCreatedDatabase().then(function(e) {
     
       if (false) {
         $console.error(`"${dnm}" can not be open for it does not exist`)
         r(null)
       }
    var fx = attr.indexedDB.open(name);
     fx.onsuccess = function() {
       fx = fx.result;
      fx.close();
      r(new attr.table(fx.name,fx.version));
    }
       
   // })
    
     })
    return rst;
  }
  
  this.getAllCreatedDatabase = function() {
   var prm = new Promise(function(r) {
     var db = _this||new attr(_name);
       db = db.openDatabase(_name)
     db.then(function(e) {
       e.openTable(def).then(function(e) {
         e.getAllItem().then(function(e) {
           r(e)
         });
       })
     });
                     
   });
    return prm;
  }
  
  this.deleteAllCreatedDatabase = function() {
   var prm = new Promise(function(r) {
    _this.getAllCreatedDatabase().then(function(e) {
      for (var prop in e) {
        attr.indexedDB.deleteDatabase(nimoName(prop))
      }

      _this.open(_name,def).then(function(e) {
        e.clear();
        r('done')
      })
    })
   })
    
    return prm;
  }
  
  this.deleteDatabase = function() {
     var prm = new Promise(function(r) {
    var name = arguments[0];
    var rst = attr.indexedDB.deleteDatabase(nimoName(name))
     _this.open(_name,def).then(function(e) {
        e.removeItem(name);
        r('done')
      })
     });
     return prm;
  }
  
    this.open = function(db,tb) {
    db = db
    tb = tb
    return new Promise(function(r){
        _this.openDatabase(db).then(function(e) {
        if (e) {
        e.openTable(tb).then(function(e) {
          r(e);
        })
        }else{
          r(e)
        }
      })
    });
  }
  
    this.create = function(db,tb) {
    db = db
    tb = tb
    return new Promise(function(r){
        _this.createDatabase(db).then(function(e) {
        if (e) {
         e.createTable(tb).then(function(e) {
          r(e);
        })
        }else{
          r(e)
        }
      })
    });
  }
  
   attr.table = function() {
    var name = arguments[0];
    var vs = arguments[1];
    vs++
    
    this.createTable = function(tb_name,tb_config) {
    var obj = {
      keyPath:keyPath
    };
    return new Promise(function(r) {
      attr.indexedDB.open(name,vs).onupgradeneeded = function(e) {
      e = e.target.result;
      if (e.objectStoreNames.contains(tb_name)) {
        $console.error(`A table with the name "${tb_name}" already exist. `)
        r(null)
      }else{
      $e = e.createObjectStore(tb_name,obj);
      obj = {}
      obj[keyPath] = tb_name;
      $e.put(obj)
      }
      e.close();
      r(new attr.row(name,tb_name))
    };});
    }
    
    this.openTable = function(tb_name,mode) {
      return new Promise(function(r) {
        attr.indexedDB.open(name).onsuccess = function(e) {
          e = e.target.result;
        if (!e.objectStoreNames.contains(tb_name)) {
        $console.error(`A table with the name "${tb_name}" does not exist. `)
        r(null)
      }
      e.close();
       r(new attr.row(name,tb_name))
        };
      });
    }
    
    this.deleteTable = function(tb_name) {
       return new Promise(function(r) {
        attr.indexedDB.open(name,vs).onupgradeneeded = function(e) {
          e = e.target.result;
        if (!e.objectStoreNames.contains(tb_name)) {
        $console.error(`A table with the name "${tb_name}" does not exist. `)
        r(null)
      }
      e.deleteObjectStore(tb_name)
      e.close();
       r('done')
        };
      });
    }
    
    this.getAllTable = function() {
      return new Promise(function(r) {
        attr.indexedDB.open(name).onsuccess = function(e) {
          e = e.target.result;
          e.close();
         r(e.objectStoreNames);
        };
      });
     // indexedDB > databases>promise>[name,version] ||
      //WebKit>result>[name]
    }
   
   this.deleteAllTable = function() {
       return new Promise(function(r) {
        attr.indexedDB.open(name,vs).onupgradeneeded = function(e) {
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
   
  attr.row = function() {
        var name = arguments[0];
        var tb_name = arguments[1]
        var $this = this;
    
        
        this.setItem = function(key, value) {
        var prm = new Promise(function(r) {
            attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readwrite')
             e = e.objectStore(tb_name)
             var val = e.get(tb_name)
            val.onsuccess = function() {
             var rst = val.result;
             rst[key]=value;
             
            e.put(rst).onsuccess = function(){
             if ($e.close) {
             $e.close();
             }else{
             $e.transaction.db.close();
             }
             e.get(tb_name).onsuccess = function(e) {
             rst = e.target.result[key]
        try {
          $e.close();
        } catch (e) {}
             r(rst);
             }
            }
            
            }
            }
          })
             return prm;
        }
        
        this.removeItem = function() {
         var $name = arguments[0]
        var prm = new Promise(function(r) {
             attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readwrite')
             e = e.objectStore(tb_name)
             var val = e.get(tb_name)
            val.onsuccess = function() {
              var rst = val.result;
              delete(rst[$name])
              e.put(rst).onsuccess = function(e) {
               $e.close();
               r('done');
              }
             
             
            }
            }
        });
        return prm;
        };
        
        this.clear = function() {
              var prm = new Promise(function(r) {
             attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readwrite')
             e = e.objectStore(tb_name)
             var obj = {}
             obj[keyPath] = tb_name;
             e.put(obj).onsuccess = function() {
               $e.close();
               r('done')
             }
            }
        });
        return prm;
        }
        
        this.getAllItem = function() {
         var prm = new Promise(function(r) {
            attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readonly')
             e = e.objectStore(tb_name)
             var val = e.getAll()
       
            val.onsuccess = function() {
             var rst = val.result;
            //  delete(rst[keyPath]);
             $e.close();
             r(rst);
            }
            }
          })
             return prm;
        }
        this.getItem = function() {
          var name = arguments[0]
          var prm = new Promise(function(r) {
            $this.getAllItem().then(function(e) {
              r(e[name]);
            })
          })
          
          return prm
        }
  }
  

  
   var nimoName = function(x,y) {
     if (!y&&!x) {
       $console.error('invalid name');
     }
     var name = x+tmp
     name = 'NIMO:'+encode(name);
     return name;
   }
   
   var encode = function(x,y) {
    if (!y) {
       x = parseString(x);
    }
     x = x[1]
     x = btoa(x)
     return x;
   }
   var decode = function(x,y) {
    if (!y) {
       x = parseString(x);
    }
     x = x[1]
     x = atob(x);
     x = x.substring(0,x.length-tmp.length);
     return x;
   }
   var parseString = function(x) {
     x = String(x);
     var idx = x.indexOf(':');
     var sub_1 = x.substring(0, idx)
      , sub_2 = x.substring(idx + 1, x.length)
   return [sub_1,sub_2]
   }
   try {
     
   } catch (e) {
     
   }
   

   attr.indexedDB.open(nimoName(_name)).onupgradeneeded = function(e) {
     e = e.target.result;
     if (e.version === 1) {
     var st = e.createObjectStore(def,{keyPath:keyPath})
     var obj = {}
     obj[keyPath] = def;
     st.put(obj)
     }
     e.close();
   }
   
   var $console = {
     error: function(x) {
       if(!_this.devMode){
         return;
       }
       console.error(x)
     }
   }
}
