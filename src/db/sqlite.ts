// @ts-nocheck
import sqlite3 from 'sqlite3';
import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

/** DB Setup */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname,"my.db");
const DB_SQL_PATH = path.join(__dirname,"mydb.sql");

var myDB = new sqlite3.Database(DB_PATH);
var SQL3 = {
    run(...args) {
		return new Promise(function c(resolve,reject){
			myDB.run(...args,function onResult(err){
				if (err) reject(err);
				else resolve(this);
			});
		});
	},
	get: util.promisify(myDB.get.bind(myDB)),
	all: util.promisify(myDB.all.bind(myDB)),
	exec: util.promisify(myDB.exec.bind(myDB)),
};

var initSQL = fs.readFileSync(DB_SQL_PATH,"utf-8");
await SQL3.exec(initSQL);

export default SQL3;