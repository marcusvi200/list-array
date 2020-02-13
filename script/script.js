let listArray = new ListArray();

let fields = document.querySelectorAll('#form-account [name]');
let submitButton = document.querySelector('button[type=submit]');
let changeButton = document.querySelector('button[type=button]');
let resetButton = document.querySelector('button[type=reset]');
var uidField = document.querySelector('input[name=uid]');

clearForm = () => {
    fields.forEach((field) => {
        switch (field.type) {
            case 'radio':
                field.checked = false;
                break;
            case 'checkbox':
                field.checked = false;
                break;
            case 'file':
                field.value = '';
                break;
            case 'color':
                field.value = '#000000';
                break;
            default:
                field.value = "";
                break;
        }
    });
}

renderForm = () => {
    let form = {};

    return new Promise((resolve, reject) => {
        fields.forEach((field) => {
            switch (field.type) {
                case 'radio':
                    if (field.checked) form[field.name] = field.value;
                    break;
                case 'checkbox':
                    if (field.checked) form[field.name] = true;
                    else form[field.name] = false;
                    break;
                case 'file':
                    form[field.name] = field.files[0];
                    break;
                default:
                    form[field.name] = field.value;
                    break;
            }

        });

        resolve(form);

        if (form === undefined) {
            reject("Not completed");
        }

    });
}

populateForm = (data, value) => {
    if (data) {
        switch (data.type) {
            case 'radio':
                data.checked = value;
                break;
            case 'checkbox':
                data.checked = value;
                break;
            case 'file':
                continue;
                break;
            default:
                data.value = value;
                break;
        }
    }
}

addLine = (data, uid) => {

    return new Promise((resolve, reject) => {

        let createTr = document.createElement("tr");

        getPhoto(data.photo).then((content) => {

            let tr = `<td>${uid}</td>
                      <td><img src="${content}" class="rounded mx-auto d-block" style="max-width: 35px; max-height: 35px;"></img></td>
                      <td>${data.lastName}</td>
                      <td>${data.firstName}</td>
                      <td>${data.country}</td>
                      <td>${data.city}</td>
                      <td>${data.zipcode}</td>
                      <td><span class="img_round" style="background-color: ${data.color};"></span></td>
                      <td>
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <div class="btn-group" role="group">
                                    <button id="btnGroupDrop1" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</button>
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <a class="dropdown-item" onclick="duplicateAccount(${uid})"><i class="fas fa-plus-square"></i> Add again</a>
                                        <a class="dropdown-item" onclick="editAccount(${uid})"><i class="fas fa-user-edit"></i> Edit info</a>
                                        <a class="dropdown-item" onclick="removeAccount(${uid})"><i class="fas fa-trash-alt"></i> Remove</a>
                                    </div>
                                </div>
                            </div>
                      </td>`;

            createTr.innerHTML = tr;

            resolve(createTr);

        }, (e) => {
            reject(e);
        });

    });

}

getPhoto = (photo) => {

    return new Promise((resolve, reject) => {

        let fileReader = new FileReader();

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (e) => {
            reject(e);
        }

        if (photo) {
            fileReader.readAsDataURL(photo);
        } else {
            resolve("user.png");
        }
    });

}

/**
 * Working with ListArray
 */
renderList = () => {
    document.getElementById("list-accounts").innerHTML = "";

    listArray.forEach((value, name, uid) => {
        addLine(value, uid).then((tr) => {
            document.getElementById('list-accounts').appendChild(tr);
        });
    });

}

addNewTr = (data) => {
    let nLine = listArray.push(data)
    addLine(nLine.value, nLine.uid).then((tr) => {
        document.getElementById('list-accounts').appendChild(tr);
    });
}

document.getElementById("form-account").addEventListener("submit", (event) => {
    event.preventDefault();
    eventButton.adding();
    renderForm().then((render) => {
        addNewTr(render);
    });
    clearForm();
});

changeButton.addEventListener("click", (event) => {

    event.preventDefault();
    eventButton.adding();
    renderForm().then((obj) => {
        if (obj.photo === undefined) {
            let photo = listArray.getByUID(parseInt(uidField.value))[0].value.photo;
            obj.photo = photo;
            listArray.replace(uidField.value, obj);
        } else {
            listArray.replace(uidField.value, obj);
        }
        renderList();
        clearForm();
    });

});

resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    eventButton.adding();
    clearForm();
});

eventButton = {
    'editing': () => {
        changeButton.disabled = false;
        changeButton.style.display = "";
        submitButton.disabled = true;
        submitButton.style.display = "none";
    },
    'adding': () => {
        changeButton.disabled = true;
        changeButton.style.display = "none";
        submitButton.disabled = false;
        submitButton.style.display = "";
    }
}

eventButton.adding();

/***
 * Basics Functions
 */
function duplicateAccount(uid) {
    addLine(listArray.duplicate(uid)).then((tr) => {
        document.getElementById('list-accounts').appendChild(tr);
    });
}

function editAccount(uid) {
    eventButton.editing();
    let result = listArray.toJSON(uid);

    for (let name in result) {
        let field = document.querySelector(`input[name=${name}]`);

        if (field.type != "file") {
            field.value = result[name];
        }

    }

    uidField.value = uid;
}

function removeAccount(uid) {
    eventButton.adding();
    uidField.value = "";
    listArray.deleteUID(uid);
    renderList();
}