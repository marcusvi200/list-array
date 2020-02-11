# ListArray - Version 0.1.0

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
let element = {'name': 'Edy', 'age': 27, 'country': 'Brazil'};
let result = listArray.push(element);
```
> _result_ __returns__ {uid: 1, name: 1, value: {name: "Edy", age: 27, country: "Brazil"}}

### Duplicate an object
```js
let result = listArray.duplicate(1);
```
> _result_ __returns__ {uid: 2, name: 2, value: {name: "Edy", age: 27, country: "Brazil"}}

### Replace an object already inserted in the list
```js
let newElement = {'name': 'Marcus', 'age': 28, 'country': 'Brazil'};
listArray.replace(2, newElement);
```
> **NO** **returns**

### Get the list size
```js
let result = listArray.getSize();
```
> _result_ __returns__ 2

### Get an object by UID
```js
let result = listArray.getByUID(1);
```
> _result_ __returns__ [{uid: 1, name: 1, value: {name: "Edy", age: 27, country: "Brazil"}}]

### Get all elements in String
```js
let result = listArray.toString();
```
> _result_ __returns__ "[{"uid":1,"name":1,"value":{"name":"Edy","age":27,"country":"Brazil"}},{"uid":2,"name":2,"value":{"name":"Marcus","age":28,"country":"Brazil"}}]"

### Get a String object by UID
```js
let result = listArray.toString(1);
```
> _result_ __returns__ "{"name":"Edy","age":27,"country":"Brazil"}"

### Get all elements in JSON
```js
let result = listArray.toJSON();
```
> _result_ __returns__ [{uid: 1, name: 1, value: {name: "Edy", age: 27, country: "Brazil"}},{uid: 2, name: 2, value: {name: "Marcus", age: 28, country: "Brazil"}]

### Get a JSON object by UID
```js
let result = listArray.toJSON(1);
```
> _result_ __returns__ {name: "Edy", age: 27, country: "Brazil"}

### Replace the name and value of a list object
```js
let newElement = {'name': 'Marcus', 'age': 28, 'country': 'Brazil'};
listArray.replaceNameValue(1, 'Register-1', newElement);
```
> _result_ __returns__ [{uid: 1, name: "Register-1", value: {name: "Marcus", age: 28, country: "Brazil"}},{uid: 2, name: 2, value: {name: "Marcus", age: 28, country: "Brazil"}}]

### Get an object by Name
```js
let result = listArray.getByName('Register-1');
```
> _result_ __returns__ [{uid: 1, name: "Register-1", value: {name: "Marcus", age: 28, country: "Brazil"}}]

### Delete an object from the list with the UID
```js
let result = listArray.deleteUID(1);
```
> _result_ __returns__ [{uid: 2, name: 2, value: {name: "Marcus", age: 28, country: "Brazil"}}]

### Delete all ListArray content
```js
let result = listArray.clearAll();
```
> _result_ __returns__ []
