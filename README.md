# Nimo-DB.js

Quick Example
---------------
```js
var db = new NimoDB() || NimoDB();
console.log(db);

// Sync method
let localStorage = db.Sync('my localStorage');
localStorage.setItem('hello','js') // Promise (promisified)
localStorage.getItem('hello') // returns a promise (promisified)
console.log(localStorage);

// Synchronized mode 
//Has similar functionality/methods just like the window.localStorage API.
localStorage.ready.then(function (e) {
    localStorage = e;
    localStorage.setItem('hello','js') // Synchronized (not promisified)
    localStorage.getItem('hello') // returns "js" (not promisified)
    console.log(localStorage);
}) 
```


Managing Databases
--------------------
>Create New Database

`use the "createDatabase" method to create a new database`
```js
var db = new NimoDB() || NimoDB();

db.createDatabase('my new Database').then(function (table) {
    if (table) {
        // manage table
    } else {
        // Database already exist
    }
})

```

>Open Existing Database

`use the "openCreatedDatabase" method to open an existing database`
```js
var db = new NimoDB() || NimoDB();

db.openCreatedDatabase('my new Database').then(function (table) {
    if (table) {
        // manage table
    } else {
        // Database does not exist
    }
})

```

>Delete Existing Database

`use the "deleteCreatedDatabase" method to open an existing database`
```js
var db = new NimoDB() || NimoDB();

db.deleteCreatedDatabase('my new Database').then(function (done) {
    if (done) {
        // database successfully deleted
    } else {
       // database not successfully deleted
    }
})

```
>`console.log(db)`


Managing Tables
-----------------
>Create New Table

`use the "createTable" method to create a new table`
```js
table.createTable('my new table').then(function (items) {
    if (items) {
        //manage items
    } else {
        // table already exist
    }
})
```

>Open Existing Table

`use the "openTable" method to open an existing table`
```js
table.openTable('my new table').then(function (items) {
    if (items) {
        //manage items
    } else {
        // table does not exist
    }
})
```

>Delete Existing Table

`use the "deleteTable" method to delete an existing table`
```js
table.deleteTable('my new table').then(function (done) {
    if (done) {
        //table successfully deleted
    } else {
       //table not successfully deleted
    }
})
```
>`console.log(table)`


Managing Items
----------------
>Set Items

`use the "setItem" method to set items`
```js
items.setItem('hello','js').then(function (done) {
    console.log(done)
// item added successfully
})
```

>Get Items

`use the "getItem" method to get items`
```js
items.getItem('hello').then(function (value) {
    console.log(value) // "js"
})
```

>Get Length

`use the "length" method to get the total number of items`
```js
items.length().then(function (value) {
    console.log(value) // the total number of items
})
```

>Remove Items

`use the "removeItem" method to delete items`
```js
items.removeItem('hello').then(function (done) {
     console.log(done)
// item removed successfully
})
```

>Clear all Items

`use the "clear" method to delete all items`
```js
items.clear().then(function (done) {
     console.log(done)
// all items successfully removed
})
```

>Event Listener

`use the "on" method to listen for events`
```js

// fired everytime the setItem method is successful
items.on('setitem',function () {
    console.log('an item was added');
})

// fired everytime the getItem method is successful
items.on('getitem',function () {
    console.log('an item was reqeusted');
})

// fired everytime the removeItem method is successful
items.on('removeitem',function () {
    console.log('an item was removed');
})

// fired everytime the clear method is successful
items.on('clear',function () {
    console.log('all items was cleared');
})
```
>`console.log(items)`


