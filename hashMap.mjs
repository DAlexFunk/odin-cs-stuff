import { LinkedList } from "./linkedList.mjs";

class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.length = 0;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = [];
    for (let i = 0; i < capacity; i++) {
      this.buckets[i] = new LinkedList();
    }
  }

  // Creates a hash for a specified key
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  // Sets a key to a value
  // If key doesnt exist, a new entry is created
  // If key does exist, the old value is overwritten
  // Automatically expands the length of the map if the length > the capacity * loadfactor
  set(key, value) {
    const index = this.hash(key) % this.capacity;

    // Set value
    if (this.has(key)) {
      let currentNode = this.buckets[index].head;
      let finished = false;
      while (currentNode || !finished) {
        if (currentNode.value.key === key) {
          currentNode.value.value = value;
          finished = true;
        }
        currentNode = currentNode.next;
      }
    } else {
      this.buckets[index].prepend({ key, value });
      this.length++;
    }

    // Expand
    if (this.length > this.capacity * this.loadFactor) {
      this.capacity *= 2;
      const entries = this.entries;
      this.clear();
      for (let entry of entries) {
        this.set(...entry);
      }
    }
  }

  // Gets the value at a specified key
  get(key) {
    const index = this.hash(key) % this.capacity;
    let currentElement = this.buckets[index].head;
    while (currentElement) {
      if (currentElement.value.key === key) {
        return currentElement.value.value;
      }
      currentElement = currentElement.next;
    }

    return null;
  }

  // Returns true if the specified key exists
  has(key) {
    const index = this.hash(key) % this.capacity;
    let currentElement = this.buckets[index].head;
    while (currentElement) {
      if (currentElement.value.key === key) {
        return true;
      }
      currentElement = currentElement.next;
    }

    return false;
  }

  // Removes an entry if it exists
  remove(key) {
    const index = this.hash(key) % this.capacity;
    let currentElement = this.buckets[index].head;
    while (currentElement) {
      if (currentElement.value.key === key) {
        this.buckets[index].remove(currentElement.value);
        this.length--;
        return true;
      }
      currentElement = currentElement.next;
    }

    return false;
  }

  // Empties the map
  clear() {
    this.length = 0;
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new LinkedList();
    }
  }

  // Returns an array containing the keys in the map
  get keys() {
    const keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let currentElement = this.buckets[i].head;
      while (currentElement) {
        keys.push(currentElement.value.key);
        currentElement = currentElement.next;
      }
    }
    return keys;
  }

  // Returns an array containing the values in the map
  get values() {
    const values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let currentElement = this.buckets[i].head;
      while (currentElement) {
        values.push(currentElement.value.value);
        currentElement = currentElement.next;
      }
    }
    return values;
  }

  // Returns an array of arrays each containing a key and value in the map: [key, value]
  get entries() {
    const entries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let currentElement = this.buckets[i].head;
      while (currentElement) {
        entries.push([currentElement.value.key, currentElement.value.value]);
        currentElement = currentElement.next;
      }
    }
    return entries;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("bench", "brown");
test.set("laptop", "black");
