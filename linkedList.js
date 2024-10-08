class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  // The first node in the list
  head = null;
  // The length of the list
  size = 0;

  // Return the final node in the list
  get tail() {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  // Adds a node to the end of the list
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.size++;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = newNode;
      this.size++;
    }
  }

  // Adds a node to the start of the list
  prepend(data) {
    const newNode = new Node(data, this.head);
    this.head = newNode;
    this.size++;
  }

  // Returns the node at a specified index, head = 0
  at(index) {
    if (index >= this.size) {
      return null;
    }

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  // Removes a node from the end of the list
  pop() {
    if (this.size <= 1) {
      this.head = null;
      this.size--;
      return;
    }

    let currentNode = this.head;
    while (currentNode.next.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;
    this.size--;
  }

  // Returns true if a node in the list contains value as it's data, false otherwise
  contains(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  // Returns of the index of the node of a specified value, null if node does not exist
  find(value) {
    let currentNode = this.head;
    let i = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return i;
      }
      currentNode = currentNode.next;
      i++;
    }
    return null;
  }

  // Returns a string showing the layout of the node
  // ( value1 ) -> ( value2 ) -> ( value3 ) -> ... -> ( valueN ) -> null
  toString() {
    let string = "";

    let currentNode = this.head;
    while (currentNode) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    string += "null";
    return string;
  }
}

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString());
