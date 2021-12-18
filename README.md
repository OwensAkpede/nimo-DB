# nimo-DB.js
`Aimed to ease JavaScript indexedDB API`

```js
var db = new NimoDB();
console.log(db);

// Sync method
db = db.Sync('localStorage');
console.log(db);

// Synchronized mode
let localStorage = await db.ready
console.log(localStorage);

```
