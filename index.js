const fs = require("fs")
const crypto = require('crypto');
let encKey = null;
    async function updateEncryptedDB(filejson) {
		let newJson;
		try {
			JSON.parse(filejson)
			newJson = JSON.parse(filejson)
		} catch(e) {
			newJson = filejson
		}
	  const asalt = crypto.randomBytes(16);
  const akeysalt = crypto.pbkdf2Sync(encKey, asalt, 100000, 32, 'sha256');
  const aiv = crypto.randomBytes(16);
  const acipher = crypto.createCipheriv('aes-256-cbc', akeysalt, aiv);
  let aencrypted = acipher.update(JSON.stringify(newJson));
  aencrypted = Buffer.concat([aencrypted, acipher.final()]);
  fs.writeFileSync('./cheffydb.json', `${asalt.toString('hex')}:${aiv.toString('hex')}:${aencrypted.toString('hex')}`)
  }
   function decryptedDB(cdbfile) {
const parts = cdbfile.split(':');
  const salt = Buffer.from(parts[0], 'hex');
  const iv = Buffer.from(parts[1], 'hex');
  const encrypted = Buffer.from(parts[2], 'hex');
  const keysalt = crypto.pbkdf2Sync(encKey, salt, 100000, 32, 'sha256');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keysalt, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]); 
  }
module.exports = {
	
	  encryption(modes, key) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
if (!key) throw new TypeError("Please specify a encryption key. Store the encryption key where no one can access it (like .env file).");
if (key == null || key == undefined) throw new TypeError("Encryption key cannot be null or undefined.");
if (modes == true) {
	let currentcheffydb = fs.readFileSync('./cheffydb.json', "utf8")
	if (!currentcheffydb.includes("{")) return encKey = key;
	console.log("[CheffyDB] Encrypting database file...")
	try {
	
	let encrypteddb;
	const salt = crypto.randomBytes(16);
  const keysalt = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', keysalt, iv);
  let encrypted = cipher.update(currentcheffydb);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  encrypteddb = `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted.toString('hex')}`
  fs.writeFileSync('./cheffydb.json', encrypteddb)
  encKey = key
  console.log("[CheffyDB] Encryption done.")
	} catch(e) {
		console.error(`[CheffyDB] Encryption failed: ${e}`)
	}
} else if (modes == false) {
	let currentcheffydb = fs.readFileSync('./cheffydb.json', "utf8")
	if (currentcheffydb.includes("{")) return encKey = null;
	console.log("[CheffyDB] Decrypting database file...")
	try {
	const parts = currentcheffydb.split(':');
  const salt = Buffer.from(parts[0], 'hex');
  const iv = Buffer.from(parts[1], 'hex');
  const encrypted = Buffer.from(parts[2], 'hex');
  const keysalt = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keysalt, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  if (decrypted.toString().includes("=")) return console.error(`[CheffyDB] Decryption failed. Your encryption key may be invalid.`);
  fs.writeFileSync('./cheffydb.json', decrypted.toString())
  console.log("[CheffyDB] Decryption done.")
  encKey = null
	} catch(e) {
		console.error(`[CheffyDB] Decryption failed. Your encryption key may be invalid. Error: ${e}`)
	}
} else {
	throw new TypeError("Encryption mode only can be true or false.");
}
  },
 

	  
  set(id, value) {
	   if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
  	if(!id) throw new TypeError("Please specify a data ID.");
    if(!value && value !== 0) throw new TypeError("Please specify a data value."); 
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
 var s = JSON.parse(dbfile);
 s[id] = value
 const asdkey = await encKey ? updateEncryptedDB(true) : fs.readFildeSync('./cheffydb.json', "UTF-8");
 if (asdkey == null) {
  fs.writeLineSync("./cheffydb.json", {})
 }
 encKey ? updateEncryptedDB(s) : fs.writeFileSync('./cheffydb.json', JSON.stringify(s));
 return value
  },


  has(id) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!id) throw new TypeError("Please specify a data ID.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
    try {
    var parsedjson = JSON.parse(dbfile);
	return parsedjson[id] ? true : false
    } catch(err) {
      return false;
    }
  },
  
   check(id) {
	   if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!id) throw new TypeError("Please specify a data ID.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
    try {
    var parsedjson = JSON.parse(dbfile);
	return parsedjson[id] ? true : false
    } catch(err) {
      return false;
    }
  },

 remove(id) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!id) throw new TypeError("Please specify a data ID.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
    try {
       var obj = JSON.parse(dbfile);
	   if(!obj[id]) return false;
	   delete obj[id]
	   encKey ? updateEncryptedDB(JSON.stringify(obj)) : fs.writeFileSync('./cheffydb.json', JSON.stringify(obj));
	   return true;
    } catch (err) {
      return false;
    }
  },
  
  erase(id) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!id) throw new TypeError("Please specify a data ID.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
    try {
       var obj = JSON.parse(dbfile);
	   if(!obj[id]) return false;
	   delete obj[id]
	   encKey ? updateEncryptedDB(JSON.stringify(obj)) : fs.writeFileSync('./cheffydb.json', JSON.stringify(obj));
	   return true;
    } catch (err) {
      return false;
    }
  },
  
  delete(id) {
	 if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!id) throw new TypeError("Please specify a data ID.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
    try {
       var obj = JSON.parse(dbfile);
	   if(!obj[id]) return false;
	   delete obj[id]
	   encKey ? updateEncryptedDB(JSON.stringify(obj)) : fs.writeFileSync('./cheffydb.json', JSON.stringify(obj));
	   return true;
    } catch (err) {
      return false;
    }
  },

 get(id) {
	   if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!id) throw new TypeError("Please specify a data ID.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
    try {
      var parsedjson = JSON.parse(dbfile);
	return parsedjson[id] ? parsedjson[id] : undefined
    } catch(err) {
      return undefined;
    }
  },
  
  fetch(id) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!id) throw new TypeError("Please specify a data ID.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
    try {
      var parsedjson = JSON.parse(dbfile);
	return parsedjson[id] ? parsedjson[id] : undefined
    } catch(err) {
      return undefined;
    }
  },
  
 increase(did, number) {
	 if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!did) throw new TypeError("Please specify a data ID.");
    if(!number) throw new TypeError("Please specify a number.");

    if(!Number(number)) throw new TypeError("Specified number is not a number!");
	if(this.has(did) == true && !Number(this.get(did))) throw new TypeError("Database value is not a number.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	 var s = JSON.parse(dbfile);
	 var id;
	if (this.has(did) == false) id = Number(number)
    else id = Number(this.get(did)) + Number(number)
    s[did] = id
    encKey ? updateEncryptedDB(s) : fs.writeFileSync('./cheffydb.json', JSON.stringify(s));
    return this.get(id);
  },
  
  add(did, number) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!did) throw new TypeError("Please specify a data ID.");
    if(!number) throw new TypeError("Please specify a number.");

    if(!Number(number)) throw new TypeError("Specified number is not a number!");
	if(this.has(did) == true && !Number(this.get(did))) throw new TypeError("Database value is not a number.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	 var s = JSON.parse(dbfile);
	 var id;
	if (this.has(did) == false) id = Number(number)
    else id = Number(this.get(did)) + Number(number)
    s[did] = id
    encKey ? updateEncryptedDB(s) : fs.writeFileSync('./cheffydb.json', JSON.stringify(s));
    return this.get(id);
  },

  decrease(did, number) {
	if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!did) throw new TypeError("Please specify a data ID.");
    if(!number) throw new TypeError("Please specify a number.");

    if(!Number(number)) throw new TypeError("Specified number is not a number!");
	if(this.has(did) == true && !Number(this.get(did))) throw new TypeError("Database value is not a number.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	 var s = JSON.parse(dbfile);
	 var id;
	if (this.has(did) == false) id = 0 - Number(number)
    else id = Number(this.get(did)) - Number(number)
    s[did] = id
    encKey ? updateEncryptedDB(s) : fs.writeFileSync('./cheffydb.json', JSON.stringify(s));
    return this.get(id);
  },
  
  sub(did, number) {
	 if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!did) throw new TypeError("Please specify a data ID.");
    if(!number) throw new TypeError("Please specify a number.");

    if(!Number(number)) throw new TypeError("Specified number is not a number!");
	if(this.has(did) == true && !Number(this.get(did))) throw new TypeError("Database value is not a number.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	 var s = JSON.parse(dbfile);
	 var id;
	if (this.has(did) == false) id = 0 - Number(number)
    else id = Number(this.get(did)) - Number(number)
    s[did] = id
    encKey ? updateEncryptedDB(s) : fs.writeFileSync('./cheffydb.json', JSON.stringify(s));
    return this.get(id);
  },

  subtract(did, number) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
    if(!did) throw new TypeError("Please specify a data ID.");
    if(!number) throw new TypeError("Please specify a number.");

    if(!Number(number)) throw new TypeError("Specified number is not a number!");
	if(this.has(did) == true && !Number(this.get(did))) throw new TypeError("Database value is not a number.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	 var s = JSON.parse(dbfile);
	 var id;
	if (this.has(did) == false) id = 0 - Number(number)
    else id = Number(this.get(did)) - Number(number)
    s[did] = id
    encKey ? updateEncryptedDB(s) : fs.writeFileSync('./cheffydb.json', JSON.stringify(s));
    return this.get(id);
  },
  
  push(id, value) {
  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
  	if(!id) throw new TypeError("Please specify a data ID.");
    if(!value) throw new TypeError("Please specify a data value.");
	let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
 var pusharray = [];
    if(this.get(id)) {if(!Array.isArray(this.get(id))) {pusharray = []} else {pusharray = this.get(id)}}
	pusharray.push(value);
 var s = JSON.parse(dbfile);
  s[id] = pusharray
      encKey ? updateEncryptedDB(s) : fs.writeFileSync('./cheffydb.json', JSON.stringify(s));
    return this.get(id);
  },

  all() {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	  var ValuesAndIDS = JSON.parse(dbfile);
try {
        ValuesAndIDS = Object.entries(ValuesAndIDS).map((val) => ({
          ID: val[0],
          data: val[1],
        }));
      } catch (err) {
        ValuesAndIDS = [];
		//Return empty if no data
      }

      return ValuesAndIDS;
  },
  
  fetchAll() {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	  var ValuesAndIDS = JSON.parse(dbfile);
try {
        ValuesAndIDS = Object.entries(ValuesAndIDS).map((val) => ({
          ID: val[0],
          data: val[1],
        }));
      } catch (err) {
        ValuesAndIDS = [];
      }
      return ValuesAndIDS;
  },
  

  deleteAll() {
	  encKey ? updateEncryptedDB("{}") : fs.writeFileSync('./cheffydb.json', "{}");
	  return true;
  },


importFromDB(from) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
	  if (!from) throw new TypeError("Please specify database at <db>.importFromDB()\nconst test = require(\"database package\")\n<db>.importFromDB(test)");
	  if (!from.all()) throw new TypeError("This is not a database or this database is not supported.");
	  let backupEncKey;
	  if (encKey) backupEncKey = encKey;
	  let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	  if (encKey) this.encryption(false, encKey);
	  console.log("[CheffyDB] Importing started...")
	  if (!Array.isArray(from.all())) {
		  let pa = Object.entries(from.all()).map((dbvaluec) => ({
          ID: dbvaluec[0],
          data: dbvaluec[1],
        }));
		pa.map((dbvalues) => {
			if (this.get(dbvalues.ID) == dbvalues.data) {
			} else {
       var parsed = JSON.parse(fs.readFileSync('./cheffydb.json', "utf8"));
 parsed[dbvalues.ID] = dbvalues.data
 fs.writeFileSync('./cheffydb.json', JSON.stringify(parsed));
			}
    })
	  } else {
	  from.all().map((dbvalues) => {
		  if (this.get(dbvalues.ID) == dbvalues.data) {
			} else {
       var parsed = JSON.parse(fs.readFileSync('./cheffydb.json', "utf8"));
 parsed[dbvalues.ID] = dbvalues.data
 fs.writeFileSync('./cheffydb.json', JSON.stringify(parsed));
			}
    })
	  }
	  console.log("[CheffyDB] Importing finished.")
	   if (backupEncKey) this.encryption(true, backupEncKey);
	  return true;
  },

importFromJSONFile(from) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");
	  if (!from) throw new TypeError("Please specify JSON file at <db>.importFromJSONFile(\"./test.json\")");
	  let backupEncKey;
	  if (encKey) backupEncKey = encKey;
	  let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	  if (encKey) this.encryption(false, encKey);
          var obj = JSON.parse(fs.readFileSync(from, "utf8"));
	  if (!Array.isArray(obj)) {
		  let pa = Object.entries(obj).map((dbvaluec) => ({
          ID: dbvaluec[0],
          data: dbvaluec[1],
        }));
		pa.map((dbvalues) => {
			if (this.get(dbvalues.ID) == dbvalues.data) {
			} else {
       var parsed = JSON.parse(fs.readFileSync('./cheffydb.json', "utf8"));
 parsed[dbvalues.ID] = dbvalues.data
 fs.writeFileSync('./cheffydb.json', JSON.stringify(parsed));
			}
    })
	  } else {
	  obj.map((dbvalues) => {
		  if (this.get(dbvalues.ID) == dbvalues.data) {
			} else {
       var parsed = JSON.parse(fs.readFileSync('./cheffydb.json', "utf8"));
 parsed[dbvalues.ID] = dbvalues.data
 fs.writeFileSync('./cheffydb.json', JSON.stringify(parsed));
			}
    })
	  }
	  if (backupEncKey) this.encryption(true, backupEncKey);
	  return true;
  },
 

  createBackup(filelocation) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");

var backupfileloc = filelocation || "./backup_cheffydb.json"
if(fs.existsSync(backupfileloc) === false) {
            fs.writeFileSync(backupfileloc, '{}');
        } else {
			fs.writeFileSync(backupfileloc, '{}');
		}
		
		this.all().map((dbvalues) => {
       var parsed = JSON.parse(fs.readFileSync(backupfileloc, "utf8"));
 parsed[dbvalues.ID] = dbvalues.data
 fs.writeFileSync(backupfileloc, JSON.stringify(parsed));
    });
   return true;
  },
  
  loadBackup(filelocation, deletedb) {
	  if(fs.existsSync('./cheffydb.json') === false) {
            fs.writeFileSync('./cheffydb.json', '{}');
        }
var fixDB = fs.statSync('./cheffydb.json');
if (fixDB.size === 0) fs.writeFileSync('./cheffydb.json', "{}");

var backupfileloc = filelocation || "./backup_cheffydb.json"
 let backupEncKey;
	  if (encKey) backupEncKey = encKey;
	  let dbfile = encKey ? decryptedDB(fs.readFileSync('./cheffydb.json', "utf8")) : fs.readFileSync('./cheffydb.json', "utf8")
	  
if(fs.existsSync(backupfileloc) === false) {
	return false;
	console.error("[CheffyDB] Cannot find backup file.")
        };
		if (encKey) this.encryption(false, encKey);
		if (deletedb && deletedb == true) fs.writeFileSync('./cheffydb.json', "{}");
		var obj = JSON.parse(fs.readFileSync(backupfileloc, "utf8"));
	  if (!Array.isArray(obj)) {
		  let pa = Object.entries(obj).map((dbvaluec) => ({
          ID: dbvaluec[0],
          data: dbvaluec[1],
        }));
		pa.map((dbvalues) => {
			if (this.get(dbvalues.ID) == dbvalues.data) {
			} else {
       var parsed = JSON.parse(fs.readFileSync('./cheffydb.json', "utf8"));
 parsed[dbvalues.ID] = dbvalues.data
 fs.writeFileSync('./cheffydb.json', JSON.stringify(parsed));
			}
    })
	  } else {
	  obj.map((dbvalues) => {
		  if (this.get(dbvalues.ID) == dbvalues.data) {
			} else {
       var parsed = JSON.parse(fs.readFileSync('./cheffydb.json', "utf8"));
 parsed[dbvalues.ID] = dbvalues.data
 fs.writeFileSync('./cheffydb.json', JSON.stringify(parsed));
			}
    })
	  }
	  if (backupEncKey) this.encryption(true, backupEncKey);
   return true;
  },
  
}