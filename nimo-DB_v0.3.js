
function NimoDB() {
  
  var attr = this.constructor;
  attr.database = [];
  attr.indexedDB = indexedDB
  var keyPath = "NIMO_DB_ID";
  var def = 'records';
  var _name = keyPath;
  var tmp = '[hyper database 2003]';
  
  
    var _this = this
    this.devMode = true


    this.createDatabase = function() {
    var name = arguments[0];
    var name = nimoName(name)
    var f = null;
    
   var rst = new Promise(function(r){
    _this.getAllCreatedDatabase().then(function(e) {
     if (has(e,name)) {
      $console.error(`can not create database:\n "${decode(name)}" already exist`)
      r(null)
    }else{
     var fx = attr.indexedDB.open(name);
     fx.onsuccess = function() {
       fx = fx.result;
      fx.close();
      _this.open(_name,def).then(function(e) {
          e.setItem(decode(fx.name), {name: decode(fx.name),info: time()}).then(function (e) {
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
  
  this.openDatabase = function() {
    var name = arguments[0];
    var $t= arguments[2];
    var name = nimoName(name)
     var rst = new Promise(function(r){
     var dnm= decode(name)
     
       if (false) {
         $console.error(`"${dnm}" can not be open for it does not exist`)
         r(null)
       }
    var fx = attr.indexedDB.open(name);
     fx.onsuccess = function() {
       fx = fx.result;
      fx.close();
       r(new attr.table(fx.name, fx.version, fx.objectStoreNames));
    }
     })
    return rst;
  }
  
  this.getAllCreatedDatabase = function() {
   var prm = new Promise(function(r) {
     var db = _this||new attr(_name);
     //  db = db.openDatabase(_name)
   //  db.then(function(e) {
       db.open(_name,def).then(function(e) {
         if (e) {
           e.getAllItem().then(function (e) {
             r(e)
           });
         }else{
r([])
         }
       })
     //});   
   });
    return prm;
  }
  
  this.deleteAllCreatedDatabase = function() {
   var prm = new Promise(function(r) {
    _this.getAllCreatedDatabase().then(function(e) {
     var done = 'no database';
      for (var prop in e) {
        var name = e[prop].name
        name = nimoName(name)
        done = 'done';
       attr.indexedDB.deleteDatabase(name)
      }
      _this.open(_name,def).then(function(e) {
        e.clear().then(function(e) {
         r(done)
        })
      })
    })
   })
    
    return prm;
  }
  
  this.deleteDatabase = function() {
    var name = arguments[0];

     var prm = new Promise(function(r) {
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
     var tb = arguments[2];
    vs++
    
    this.createTable = function(tb_name,tb_config) {
    var obj = {
      keyPath:keyPath
    };
    return new Promise(function(r) {
      if(tb.contains(tb_name)&&false){
        $console.error(`A table with the name "${tb_name}" already exist. `)
       r(null)
      }else{
      attr.indexedDB.open(name,vs).onupgradeneeded = function(e) {
      e = e.target.result;
      if (e.objectStoreNames.contains(tb_name)) {
        $console.error(`A table with the name "${tb_name}" already exist. `)
        r(null)
      }else{
      $e = e.createObjectStore(tb_name,obj);
      }

      e.close();
      r(new attr.row(name,tb_name))
    };
  }
  });
    }


    
    this.openTable = function(tb_name) {
      return new Promise(function(r) {
        if (!tb.contains(tb_name) && false){
          $console.error(`A table with the name "${tb_name}" does not exist. `)
          r(null)
        }else{
        attr.indexedDB.open(name).onsuccess = function(e) {
          e = e.target.result;
       if (!e.objectStoreNames.contains(tb_name)) {
        $console.error(`A table with the name "${tb_name}" does not exist. `)
        r(null)
     }
      e.close();
       r(new attr.row(name,tb_name))
        };
      }
      });
    }
    


    this.deleteTable = function(tb_name) {
       return new Promise(function(r) {
         if (!tb.contains(tb_name) && false) {
           $console.error(`A table with the name "${tb_name}" does not exist. `)
           r(null)
         }else{
        attr.indexedDB.open(name,vs).onupgradeneeded = function(e) {
          e = e.target.result;
        if (!e.objectStoreNames.contains(tb_name)) {
        $console.error(`A table with the name "${tb_name}" does not exist. `)
        r(null)
      }else{
      e.deleteObjectStore(tb_name)
      e.close();
       r('done')
      }
        };
      }
      });
    }
    

    this.getAllTable = function() {
      return new Promise(function(r) {
        attr.indexedDB.open(name).onsuccess = function(e) {
          e = e.target.result;
          e.close();
          e = e.objectStoreNames;
         r(e);
        };
      })
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
            
             e.oncomplete = function(){
             r('done')
             }
             var obj = {}
             obj[keyPath] = key;
             obj['value'] = value;
             
             e = e.objectStore(tb_name)
             var val = e.put(obj)
            val.onsuccess = function() {
       
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
        
        this.removeItem = function() {
         var $name = arguments[0]

        var prm = new Promise(function(r) {
             attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readwrite')
                         
             e.oncomplete = function(){
             r('done')
             }
             
             e = e.objectStore(tb_name)
             var val = e.delete($name)
              // console.log($name);
            val.onsuccess = function() {
           
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
        
        this.clear = function() {
              var prm = new Promise(function(r) {
             attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readwrite')
                         
             e.oncomplete = function(){
             r('done')
             }
             
             e = e.objectStore(tb_name)
      
             e.clear().onsuccess = function() {
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
                  }else{
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


        this.getAllItem = function() {
         var prm = new Promise(function(r) {
            attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readonly')
             e = e.objectStore(tb_name)
             var val = e.openCursor()
              //var len =e.count();

             var array = {};

            val.onsuccess = function(e) {
             var rst = e.target.result;

             if(rst) {
             //  console.log(rst);
             var val = nimoOBJ(rst.value);
               array[rst.key] = val
               rst.continue();
             }else{
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
        
        this.getItem = function() {
          var $name = arguments[0]
        var prm = new Promise(function(r) {
            attr.indexedDB.open(name).onsuccess = function(e) {
             $e = e.target.result;
             e = $e.transaction(tb_name,'readonly')
             e = e.objectStore(tb_name)
             var val = e.get($name)
       
            val.onsuccess = function() {
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
   
  var nimoOBJ = function(e) {
    if ('object'== typeof e) {
     e = e.value;
    }
    return e;
  }
  var time = function() {
    var obj = {};
    obj.date = [
      new Date().toDateString(),
      new Date().toLocaleDateString()
      ];
    obj.exactDate = Date.now();
    return obj;
  }

  var has = function (e,name) {
return decode(name) in e;
 }

   attr.indexedDB.open(nimoName(_name)).onupgradeneeded = function(e) {
     e = e.target.result;
     if (e.version === 1) {
    e.createObjectStore(def,{keyPath:keyPath})
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
   attr.loaded = true;
}



  ////   var db = new NimoDB
 

