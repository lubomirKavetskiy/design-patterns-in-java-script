const fs = require('fs');

class Jornal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Jornal.count;
    let entry = `${c}: ${text}`;

    this.entries[c] = entry;
    return c;
  }

  removeEntry(idx) {
    delete this.entries[idx];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  //BAD idea, because
  //it's the second responsibility added to the Class
  save(fileName) {
    fs.writeFileSync(fileName, this.toString());
  }

  load(fileName) {
    //
  }

  loadFromUrl(url) {
    //
  }
  //
}

Jornal.count = 0;

let j = new Jornal();
j.addEntry('I cried today');
j.addEntry('I ate a bug');

console.log(j.toString());

//If you need additional responsibilities. just make other class
//It doesn't really cost you anything
class PersitsenceManager {
  preprocess(j) {}

  saveToFile(journal, fileName) {
    fs.writeFileSync(journal.toString(), fileName);
  }
}

let p = new PersitsenceManager();
let fileName = '/Users/work/Documents/intro/test.rtf';

p.saveToFile(j.toString(), fileName);
