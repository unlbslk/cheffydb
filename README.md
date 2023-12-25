<div align="center">
	<br />
	<p>
	<img src="https://cdn.discordapp.com/attachments/874221810751795200/1020666083138605157/cheffydb.png" width="500" alt="CheffyDB" /></a>
	</p>
	<br />
	<p>
	<a href="https://www.npmjs.com/package/cheffydb"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=flat-square&logo=npm&logoColor=white" alt="NPM" /></a>
	<a href="https://github.com/cfy8001/cheffydb"><img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
	<img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=flat-square&logo=discord&logoColor=white" alt="Discord"/>
	<img src="https://img.shields.io/npm/dt/cheffydb.svg?style=flat-square" alt="Downloads" />
	</p>
</div>

# CheffyDB
**CheffyDB** is a fast, tiny, simple JSON database package with backup system.

## 🧭 How To Use
```
npm install cheffydb
```
A database file named `cheffydb.json` will be created automatically (when used).

## ⛳ Examples

```js
const db = require("cheffydb");

db.set("test", "123"); //Output: 123
db.push("test123", "a"); //Output: ["a"]
db.push("test123",  "b"); //Output: ["a","b"]
db.add("number", 3); //Output: 3
db.add("number", 50); //Output: 53
db.subtract("number", 10); //Output: 43
db.all(); //Output: [{ ID:'test',data:'123'},{ID:'test123',data:['a','b']},{ID:'number',data:43}]
db.delete("number"); //Output: true
db.deleteAll(); //Output: true

db.get("test"); //Output: ["a","b"]
db.get("test123"); //Output: 123
db.fetch("test"); //Output: 123
db.check("test"); //Output: true
db.has("test"); //Output: true
```
### Import from Another Database Package/JSON File

```js
//from package
const db = require("cheffydb");
const otherdb = require("exampledb");
db.importFromDB(otherdb); //Output: true

//from JSON file
const db = require("cheffydb");
db.importFromJSONFile("./database.json"); //Output: true
```
### Backing Up the Database File

```js
const db = require("cheffydb");
db.createBackup("./backup.json"); //Automatically creates the backup file

db.loadBackup("./backup.json");
db.loadBackup("./backup.json", true); //true means the database file will be cleaned before the backup is loaded
```

### Database Encryption
To use this, put this code at the top of your main file:
```js
require("cheffydb").encryption(true, "encryption key"); //⚠️⚠️⚠️ Do not type your key at here if you have public project.
```
Store your encryption key where no one can access it (you can use .env if you have in your project).
Replace the `"encryption key"` string with `process.env.encKey` to use environment variables.
```js
const db = require("cheffydb");
//db.encryption(mode,key);
db.encryption(true,process.env.encKey);
db.set("test", "123");
db.encryption(false,process.env.encKey);
```

### ⚠️ **__WARNING__**: Store your encryption key where no one can access it (like .env in your projects). If you lose your encryption key, you may lose access to the database. __We are not responsible if your data is stolen/lost.__ This feature is experimental. It is not recommended to use this.