class ListArray {

    /**
     * @author Marcus Vinicius Oliveira Silva
     * @version 0.1.3
     * @description Changed the push to do also through assignment
     * @version 0.1.2
     * @description Treat concatenation to avoid adding non-class elements
     * @version 0.1.1
     * @description Changed in deleteUID to return the value that was deleted
     * @description This class is to group many objects inside of array
     */
    constructor() {
        this._array = '';

        this.initialize();
    }

    initialize() {
        if (this._array == undefined || this._array == '') {
            this._array = [];
        }

        return this;
    }

    /**
     * @description Get size of array
     */
    getSize() {
        return this._array.length;
    }

    /**
     * @description Joins two or more ListArray, and returns a copy of the joined arrays
     * @param {ListArray} listArray
     */
    concat(...listArray) {
        listArray.forEach(lstArray => {
            if (lstArray instanceof ListArray) {
                lstArray.array.forEach(element => {
                    if (element.name !== element.uid) {
                        this.push(element.value, element.name);
                    } else {
                        this.push(element.value);
                    }
                });

                return this.array;
            } else {
                console.error("It is only allowed to concatenate with objects from the same ListArray instance!");
            }
        });
    }

    /**
     * @description Get an element by name
     * @param {String} name 
     */
    getByName(name) {
        let el = [];

        this._array.filter(function(value) {
            let element = {
                'uid': value.uid,
                'name': value.name,
                'value': value.value
            };

            if (value.name == name) {
                el.push(element);
            }

            return false;
        });

        return el;
    }

    /**
     * @description Get an element by UID
     * @param {Integer} uid 
     */
    getByUID(uid) {
        return this._array.filter(function(element) {
            if (element.uid === uid) {
                return true;
            } else {
                return false;
            }
        });
    }

    /**
     * @description Parse array to String, when uid is defined the value is parsed to String
     * @param {Integer} uid 
     */
    toString(uid = undefined) {
        if (uid === undefined) {
            return JSON.stringify(this._array);
        } else {
            if (typeof this.getByUID(uid)[0].value == "object") {
                return JSON.stringify(this.getByUID(uid)[0].value);
            } else {
                return this.getByUID(uid)[0].value.toString();
            }
        }
    }

    /**
     * @description Parse array to Json Format, when uid is defined the value is parsed to Json Format
     * @param {Integer} uid 
     */
    toJSON(uid = undefined) {
        if (uid === undefined) {
            return JSON.parse(JSON.stringify(this._array));
        } else {
            return JSON.parse(JSON.stringify(this.getByUID(uid)[0].value));
        }
    }

    /**
     * @description Get next uid
     */
    _nextUID() {
        if (this.getSize() == 0) {
            return 1;
        } else {
            return this._array[this.getSize() - 1].uid + 1;
        }
    }

    /**
     * @description Add an element to the array
     * @param {Object} value 
     * @param {String} name 
     */
    push(value, name = undefined) {
        var uid = this._nextUID();
        var el = {
            'uid': uid,
            'name': (name === undefined ? uid : name),
            'value': value
        };

        this._array.push(el);

        return this.getByUID(uid)[0];
    }

    /**
     * @description Duplicate an object within the list
     * @param {Number} uid 
     * @param {String} newName 
     */
    duplicate(uid, newName = undefined) {
        if (newName == undefined) {
            if (this.getByUID(uid)[0].name !== this.getByUID(uid)[0].uid) {
                return this.push(this.getByUID(uid)[0].value, this.getByUID(uid)[0].name);
            } else {
                return this.push(this.getByUID(uid)[0].value);
            }
        } else {
            return this.push(this.getByUID(uid)[0].value, newName);
        }
    }

    /**
     * @description Replace some value in array
     * @param {Integer} uid 
     * @param {Object} newValue 
     */
    replace(uid, newValue) {
        this._array.find(function(element) {
            if (element.uid == uid) {
                element.value = newValue;
                return true;
            } else {
                return false;
            }
        });
    }

    /**
     * @description Replace name and value in array
     * @param {Integer} uid 
     * @param {String} newName 
     * @param {Object} newValue 
     */
    replaceNameValue(uid, newName, newValue) {
        this._array.find(function(element) {
            if (element.uid == uid) {
                element.name = newName;
                element.value = newValue;
                return true;
            } else {
                return false;
            }
        });

        return this.array;
    }

    /**
     * @description Delete an uid specify in array
     * @param {Integer} uid 
     */
    deleteUID(uid) {
        let oldElement = this.getByUID(uid);
        this._array.find(function(element, index, array) {
            if (element.uid == uid) {
                array.splice(index, 1);
                return true;
            } else {
                return false;
            }
        });

        return oldElement;
    }

    /**
     * @description Clean all array
     */
    clearAll() {
        this._array.splice(0);

        return this.array;
    }

    /**
     * @description Order by uid
     * @param {listArrayOrder} order 
     */
    orderByUID(order) {
        return this._array.sort((elA, elB) => {
            if (order == "asc") {
                return parseInt(elA.uid) > parseInt(elB.uid);
            } else {
                return parseInt(elA.uid) < parseInt(elB.uid);
            }
        });
    }


    /**
     * @description Push only value
     * @param {Object} value
     */
    set array(value) {
        this.push(value);
    }

    /**
     * @description Get the array
     */
    get array() {
        return this._array;
    }

}

const listArrayOrder = {
    'asc': 'asc',
    'desc': 'desc'
};