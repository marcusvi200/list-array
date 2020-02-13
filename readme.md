# ListArray - Version 0.2.0

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## How to use

### Instantiating a ListArray

```js
var listArray = new ListArray();
```
### Add an object to the list

```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};

let result = listArray.push(element);
```
> _result_ __returns__ {uid: 1, name: 1, value: {name: "Edy", age: 27, country: "Brazil"}}

### Add an object by assignment
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};

listArray.array = element;
```
> _result_ __returns__ [{uid: 1, name: 1, value: {name: "Edy", age: 27, country: "Brazil"}}]

### Duplicate an object
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element); 

let result = listArray.duplicate(1);
```
> _result_ __returns__ {uid: 2, name: 2, value: {name: "Edy", age: 27, country: "Brazil"}}

### Calls a function for each ListArray element
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element); 

listArray.forEach((value, name, uid){
    alert(`Value: ${value} | Name: ${name} | UID: ${uid}`);
});
```
> **NO** **returns**

### Returns the value of the first element in a ListArray that pass a test
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element); 

let result = listArray.find((value) =>{
    return value.name === "Edy";
});
```
> _result_ __returns__ {'name': 'Edy', 'age': 27, 'country': 'Brazil'}

### Link to another ListArray
```js
var listArrayBought = new ListArray("bought");
let elementBought = {'idBought': 1, 'idUser': 25};
listArrayBought.push(elementBought);

var listArrayUser = new ListArray("user");
let elementUser = {'id': 25, 'name': 'Marcus Vinicius', 'country': 'Brazil'};
listArrayUser.push(elementUser);

let bondBOUGHT_USER = listArrayBought.bond(listArrayUser, (bought, user) => {
    return bought.idUser === user.id;
});

let result = bondBOUGHT_USER.array;
```
> _result_ __returns__ [{uid: 1, name: 1, value: {bought: {value: {'idBought': 1, 'idUser': 25}}, user: [uid: 1, name: 1, value: {'id': 25, 'name': 'Marcus Vinicius', 'country': 'Brazil'}]}]

### Copy the value and name of the current ListArray into the ListArray entered
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element); 

var listArrayCopy = new ListArray();
listArray.copyTo(1, listArrayCopy);

let result = listArrayCopy.array;
```
> _result_ __returns__ [{'name': 'Edy', 'age': 27, 'country': 'Brazil'}]

### Concatenate two or more ListArray
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

var listArray2 = new ListArray();
let element2 = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray2.push(element2);

var listArray3 = new ListArray();
let element3 = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray3.push(element3);

let result = listArray.concat(listArray2,listArray3);
```
> _result_ __returns__ [{uid: 1, name: 1, value: {'name': 'Edy', 'age': 27, 'country': 'Brazil'}},{uid: 2, name: 2, value: {'name': 'Edy', 'age': 27, 'country': 'Brazil'}},{uid: 3, name: 3, value: {'name': 'Edy', 'age': 27, 'country': 'Brazil'}}]

### Replace an object already inserted in the list
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);
let newElement = {'name': 'Marcus', 'age': 28, 'country': 'Brazil'};

listArray.replace(1, newElement);
```
> **NO** **returns**

### Get the list size
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.getSize();
```
> _result_ __returns__ 1

### Get an object by UID
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.getByUID(1);
```
> _result_ __returns__ [{uid: 1, name: 1, value: {name: "Edy", age: 27, country: "Brazil"}}]

### Get all elements in String
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.toString();
```
> _result_ __returns__ "[{"uid":1,"name":1,"value":{"name":"Edy","age":27,"country":"Brazil"}}]"

### Get a String object by UID
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.toString(1);
```
> _result_ __returns__ "{"name":"Edy","age":27,"country":"Brazil"}"

### Get all elements in JSON
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.toJSON();
```
> _result_ __returns__ [{uid: 1, name: 1, value: {name: "Edy", age: 27, country: "Brazil"}}]

### Get a JSON object by UID
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.toJSON(1);
```
> _result_ __returns__ {name: "Edy", age: 27, country: "Brazil"}

### Replace the name and value of a list object
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

listArray.replaceNameValue(1, 'Register-1', newElement);
```
> _result_ __returns__ [{uid: 1, name: "Register-1", value: {name: "Marcus", age: 28, country: "Brazil"}}]

### Get an object by Name
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element, "Register-1");

let result = listArray.getByName('Register-1');
```
> _result_ __returns__ [{uid: 1, name: "Register-1", value: {'name': 'Edy', 'age': 27, 'country': 'Brazil'}}]

### Delete an object from the list with the UID
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.deleteUID(1);
```
> _result_ __returns__ []

### Delete all ListArray content
```js
var listArray = new ListArray();
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
listArray.push(element);

let result = listArray.clearAll();
```
> _result_ __returns__ []
