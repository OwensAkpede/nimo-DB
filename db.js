const nw = Date.now()
log=function (e) {
    console.log(e)
}
NimoDB.Sync = new NimoDB().Sync('iii',{cache:0})
d = NimoDB.Sync
NimoDB.Sync.ready.then(function (db) {
    console.log(Date.now()-nw);
    window.db=db;
})