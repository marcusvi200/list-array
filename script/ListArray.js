class ListArray {

    /**
     * @author Marcus Vinicius Oliveira Silva
     * @version 0.2.0
     * @description Added the possibility to link ListArray with other ListArray, with bond, added forEach, added find, added runtime, added copyTo, now you can give a name to the ListArray, among other possible errors.
     * @version 0.1.3
     * @description Changed the push to do also through assignment
     * @version 0.1.2
     * @description Treat concatenation to avoid adding non-class elements
     * @version 0.1.1
     * @description Changed in deleteUID to return the value that was deleted
     * @description This class is to group many objects inside of array
     * @param {String} nameListArray
     */
    constructor(nameListArray = undefined) {
        this._array = '';
        this._nameListArray = nameListArray;
        this.showTimeConsole = false;
        this._timeStart = undefined;
        this._timeEnd = undefined;
        this._runtime = "";

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
        this._consoleInfoTime("getSize");
        this._consoleInfoTime("getSize");
        return this._array.length;
    }

    /**
     * @description Displays the runtime on the console
     * @param {String} action 
     */
    _consoleInfoTime(action) {
        if (this._timeStart === undefined && this._timeEnd === undefined) {
            this._timeStart = new Date();
            this._runtime = "";
        } else if (this._timeStart !== undefined && this._timeEnd === undefined) {
            this._timeEnd = new Date();

            let message = `Runtime: ${this._calcTime(this._timeStart, this._timeEnd)} ms`;

            this._runtime = `${this._calcTime(this._timeStart, this._timeEnd)} ms`;

            if (this.showTimeConsole) {
                console.info(message, `==> ${this._nameListArray}.${action}`);
            }

        } else if (this._timeStart !== undefined && this._timeEnd !== undefined) {
            this._timeStart = new Date();
            this._timeEnd = undefined;
            this._runtime = "";
        }
    }

    /**
     * @description Calculates the difference between times
     * @param {Date} time1 
     * @param {Date} time2 
     */
    _calcTime(time1, time2) {
        const diff = time2 - time1
        const SEC = 1000,
            MIN = 60 * SEC,
            HRS = 60 * MIN
        const humanDiff = `${Math.floor(diff/HRS)}:${Math.floor((diff%HRS)/MIN).toLocaleString('en-US', {minimumIntegerDigits: 2})}:${Math.floor((diff%MIN)/SEC).toLocaleString('en-US', {minimumIntegerDigits: 2})}.${Math.floor(diff % SEC).toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping: false})}`

        return humanDiff;
    }

    /**
     * @description Link to another ListArray
     * @param {ListArray} listArray 
     * @param {Function} fn 
     * @param {String} nameBond 
     */
    bond(listArray, fn = undefined, nameBond = undefined) {
        this._consoleInfoTime("bond");
        if (listArray instanceof ListArray && (typeof(fn) === "function" || fn === undefined)) {
            /**
             * Validate that the name entered exists in the object itself
             */
            if (this.nameListArray === undefined) {
                console.error("You must define the name of the ListArray first!", this.nameListArray);
                this._consoleInfoTime("bond");
                return;
            }

            /**
             * Validate that the name entered in the connection object exists
             */
            if (listArray.nameListArray === undefined) {
                console.error("ListArray informed has no name!", listArray.nameListArray);
                this._consoleInfoTime("bond");
                return;
            }

            let name = (nameBond === undefined ? this.nameListArray + '_' + listArray.nameListArray : nameBond);
            nameBond = (nameBond === undefined ? listArray.nameListArray : nameBond);

            var newListArray = new ListArray(name);

            this.array.forEach((elementPrimary) => {
                var newElement = {};

                newElement[this.nameListArray] = { value: elementPrimary.value };
                newElement[nameBond] = [];

                listArray.array.forEach((elementSecundary) => {
                    if (fn === undefined) {
                        if (elementPrimary.uid === elementSecundary.uid) {
                            newElement[nameBond].push({ uid: elementSecundary.uid, name: elementSecundary.name, value: elementSecundary.value });
                        }
                    } else {
                        let fnExtern = fn(elementPrimary, elementSecundary);
                        if (typeof(fnExtern) === "boolean") {
                            if (fnExtern) {
                                newElement[nameBond].push({ uid: elementSecundary.uid, name: elementSecundary.name, value: elementSecundary.value });
                            }
                        } else {
                            console.error("For bond function it must return Boolean value.", fnExtern);
                        }
                    }
                });

                newListArray._pushUID(elementPrimary.uid, newElement, elementPrimary.name);

            });

            this._consoleInfoTime("bond");
            return newListArray;

        } else {
            if (typeof(fn) !== "function") {
                console.error("The second parameter must be a function!", typeof(fn));
                this._consoleInfoTime("bond");
            } else {
                console.error("It is only allowed to connect with ListArray!");
                this._consoleInfoTime("bond");
            }
        }
    }

    /**
     * @description Finding values
     * @param {Function} fn 
     */
    find(fn) {
        this._consoleInfoTime("find");
        if (typeof(fn) !== "function") {
            console.error("The parameter must be a function! ", typeof(fn));
            this._consoleInfoTime("find");
        } else {
            let find = this._array.find(element => {
                return fn(element.value);
            });

            this._consoleInfoTime("find");
            return find;
        }
    }

    /**
     * @description Joins two or more ListArray, and returns a copy of the joined arrays
     * @param {ListArray} listArray
     */
    concat(...listArray) {
        this._consoleInfoTime("concat");
        listArray.forEach(lstArray => {
            if (lstArray instanceof ListArray) {
                lstArray.array.forEach(element => {
                    if (element.name !== element.uid) {
                        this.push(element.value, element.name);
                    } else {
                        this.push(element.value);
                    }
                });

                this._consoleInfoTime("concat");
                return this.array;
            } else {
                console.error("It is only allowed to concatenate with objects from the same ListArray instance!");
                this._consoleInfoTime("concat");
            }
        });
    }

    /**
     * Calls a function for each element of the array, the function can follow: value, name, uid, index
     * @param {Function} fn 
     */
    forEach(fn) {
        this._consoleInfoTime("forEach");
        if (typeof(fn) !== "function") {
            console.error("The parameter must be a function! ", typeof(fn));
            this._consoleInfoTime("forEach");
        } else {
            let forEach = this._array.forEach((element, index) => {
                fn(element.value, element.name, element.uid, index);
            });

            this._consoleInfoTime("forEach");
            return forEach;
        }
    }

    /**
     * @description Get an element by name
     * @param {String} name 
     */
    getByName(name) {
        this._consoleInfoTime("getByName");
        let el = [];

        this._array.filter((value) => {
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

        this._consoleInfoTime("getByName");
        return el;
    }

    /**
     * @description Get an element by UID
     * @param {Integer} uid 
     */
    getByUID(uid) {
        this._consoleInfoTime("getByUID");

        let getByUID = this._array.filter((element) => {
            if (element.uid === uid) {
                return true;
            } else {
                return false;
            }
        });

        this._consoleInfoTime("getByUID");
        return getByUID;
    }

    /**
     * @description Parse array to String, when uid is defined the value is parsed to String
     * @param {Integer} uid 
     */
    toString(uid = undefined) {
        this._consoleInfoTime("toString");
        if (uid === undefined) {
            this._consoleInfoTime("toString");
            return JSON.stringify(this._array);
        } else {
            if (typeof this.getByUID(uid)[0].value == "object") {
                this._consoleInfoTime("toString");
                return JSON.stringify(this.getByUID(uid)[0].value);
            } else {
                this._consoleInfoTime("toString");
                return this.getByUID(uid)[0].value.toString();
            }
        }
    }

    /**
     * @description Parse array to Json Format, when uid is defined the value is parsed to Json Format
     * @param {Integer} uid 
     */
    toJSON(uid = undefined) {
        this._consoleInfoTime("toJSON");
        if (uid === undefined) {
            this._consoleInfoTime("toJSON");
            return JSON.parse(JSON.stringify(this._array));
        } else {
            this._consoleInfoTime("toJSON");
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
        this._consoleInfoTime("push");
        var uid = this._nextUID();
        var el = {
            'uid': uid,
            'name': (name === undefined ? uid : name),
            'value': value
        };

        this._array.push(el);

        this._consoleInfoTime("push");
        return this.getByUID(uid)[0];
    }

    /**
     * @description Add an element to the array no controller the sequence
     * @param {Number} uid
     * @param {Object} value 
     * @param {String} name
     */
    _pushUID(uid, value, name = undefined) {
        var el = {
            'uid': uid,
            'name': (name === undefined ? uid : name),
            'value': value
        };

        this._array.push(el);
    }

    /**
     * @description Duplicate an object within the list
     * @param {Number} uid 
     * @param {String} newName 
     */
    duplicate(uid, newName = undefined) {
        this._consoleInfoTime("duplicate");
        if (newName == undefined) {
            if (this.getByUID(uid)[0].name !== this.getByUID(uid)[0].uid) {
                this._consoleInfoTime("duplicate");
                return this.push(this.getByUID(uid)[0].value, this.getByUID(uid)[0].name);
            } else {
                this._consoleInfoTime("duplicate");
                return this.push(this.getByUID(uid)[0].value);
            }
        } else {
            this._consoleInfoTime("duplicate");
            return this.push(this.getByUID(uid)[0].value, newName);
        }
    }

    /**
     * @description Copy the value and name of the current ListArray into the ListArray entered
     * @param {Number} uid 
     * @param {ListArray} listArray 
     */
    copyTo(uid, listArray) {
        this._consoleInfoTime("copyTo");
        if (listArray instanceof ListArray) {
            let elCopy = this.getByUID(uid);
            listArray.push(elCopy.value, (elCopy.uid === elCopy.name ? undefined : elCopy.name));
            this._consoleInfoTime("copyTo");
        } else {
            console.error("Copying is only allowed between ListArray objects!");
            this._consoleInfoTime("copyTo");
        }
    }

    /**
     * @description Replace some value in array
     * @param {Integer} uid 
     * @param {Object} newValue 
     */
    replace(uid, newValue) {
        this._consoleInfoTime("replace");

        this._array.find((element) => {
            if (element.uid == uid) {
                element.value = newValue;
                return true;
            } else {
                return false;
            }
        });

        this._consoleInfoTime("replace");
    }

    /**
     * @description Replace name and value in array
     * @param {Integer} uid 
     * @param {String} newName 
     * @param {Object} newValue 
     */
    replaceNameValue(uid, newName, newValue) {
        this._consoleInfoTime("replaceNameValue");

        this._array.find((element) => {
            if (element.uid == uid) {
                element.name = newName;
                element.value = newValue;
                return true;
            } else {
                return false;
            }
        });

        this._consoleInfoTime("replaceNameValue");
        return this.array;
    }

    /**
     * @description Delete an uid specify in array
     * @param {Integer} uid 
     */
    deleteUID(uid) {
        this._consoleInfoTime("deleteUID");
        let oldElement = this.getByUID(uid);
        this._array.find((element, index, array) => {
            if (element.uid == uid) {
                array.splice(index, 1);
                return true;
            } else {
                return false;
            }
        });

        this._consoleInfoTime("deleteUID");
        return oldElement;
    }

    /**
     * @description Clean all array
     */
    clearAll() {
        this._consoleInfoTime("clearAll");
        this._array.splice(0);

        this._consoleInfoTime("clearAll");
        return this.array;
    }

    /**
     * @description Order by uid
     * @param {listArrayOrder} order 
     */
    orderByUID(order) {
        this._consoleInfoTime("orderByUID");
        let orderByUID = this._array.sort((elA, elB) => {
            if (order == "asc") {
                return parseInt(elA.uid) > parseInt(elB.uid);
            } else {
                return parseInt(elA.uid) < parseInt(elB.uid);
            }
        });

        this._consoleInfoTime("orderByUID");
        return orderByUID;
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

    /**
     * @description ListArray name, required only when using bond
     */
    get nameListArray() {
        return this._nameListArray;
    }

    /**
     * Get the runtime
     */
    get runtime() {
        return this._runtime;
    }

}

const listArrayOrder = {
    'asc': 'asc',
    'desc': 'desc'
};