/**
 * Created by apple on 2017/6/14.
 */

let SQLite = require('react-native-sqlite-storage')
import * as excuteSqls from './excuteSqls'

export default class FMDB {

  static initDatabase() {
    var db = SQLite.openDatabase({
      name: 'weguess.db',
      createFromLocation: "1"
    }, () => {
      db.transaction((tx) => {
        for (key in excuteSqls.initTables) {
          let sql = excuteSqls.initTables[key];
          tx.executeSql(sql, [], (tx, results) => {
            console.log('create success');
          }, errorDB);
        }
      });
    }, errorDB);

  }

  static queryDatabase(sql, params = [],callback) {

    var db = SQLite.openDatabase({
      name: 'weguess.db',
      createFromLocation: "1"
    }, () => {
      db.transaction((tx) => {

        tx.executeSql(sql, params, (tx, results) => {
          console.log('query success');
          callback(result);
        }, errorDB);

      });
    }, errorDB);
  }
}

function errorDB(err) {
  console.log("SQL Error: " + err);
}

function successDB() {
  console.log("open database");
}