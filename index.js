// для кнопок
function AddButtons(arr) {
    let buttons = {
        submit: AddSubmit,
        clear: AddReset,
    };

    for (let i in arr) buttons[arr[i]](arr[i]);
}

function AddReset(text) {
    let reset = document.createElement("input");
    reset.setAttribute("type", "reset");
    reset.setAttribute("value", `${text}`);
    document.getElementById("form").appendChild(reset);
    //<input type="reset" value="Clear"> - стоит ли делать через innerHTML?

    // стоит ли делать проверку на наличие этой формы? И в других функциях проверку на наличие attrs, например?
}

function AddSubmit(text) {
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", `${text}`);
    document.getElementById("form").appendChild(submit);
}

// для заголовка
function AddTitle(text) {
    let h1 = document.createElement("h1");
    let t = document.createTextNode(text);
    h1.appendChild(t);
    document.body.appendChild(h1);
}

// для описания
function AddDescription(text) {
    let p = document.createElement("p");
    let t = document.createTextNode(text);
    p.appendChild(t);
    document.body.appendChild(p);
}

// для полей
function AddFields(data) {
    let form = document.createElement("form");
    form.setAttribute("id", "form");
    document.body.appendChild(form);

    let fields = {
        text: AddText,
        textarea: AddTextarea,
        radio: AddBoxes,
        checkbox: AddBoxes,
        select: AddSelect,
    };

    for (let x in data) {
        fields[data[x].attrs.type](data[x]);
    }
}

function AddText(data) {
    // или лучше так?
    // let l = document.createElement("label");
    // l.setAttribute("for", `${data.attrs.name}`);
    // let t = document.createTextNode(data.label);
    // l.appendChild(t);
    //
    // let inp = document.createElement("input");
    // inp.setAttribute('type', `${data.attrs.type}`);
    // inp.setAttribute('type', `${data.attrs.name}`);
    //
    // document.getElementById('form').appendChild(l).appendChild(inp);
    // document.getElementById("form").innerHTML += "<br>";

    document.getElementById("form").innerHTML +=
        `<label for="${data.attrs.name}">${data.label}</label><br>` +
        `<input type="${data.attrs.type}" name="${data.attrs.name}""><br><br>`;
}

function AddTextarea(data) {
    document.getElementById("form").innerHTML +=
        `<label for="${data.attrs.name}">${data.label}</label><br>` +
        `<textarea form = 'form'" name="${data.attrs.name}"></textarea><br><br>`;
}

function AddBoxes(data) {
    document.getElementById("form").innerHTML +=
        `<label for="${data.attrs.name}">${data.label}</label><br>`;

    for (let v in data.attrs.variants) {
        document.getElementById("form").innerHTML +=
            `<input type="${data.attrs.type}" id="${data.attrs.variants[v].value}" value="${data.attrs.variants[v].value}">` +
            `<label for="${data.attrs.variants[v].value}">${data.attrs.variants[v].label}</label><br>`;
    }
    document.getElementById("form").innerHTML += "<br>";
}

function AddSelect(data) {
    let l = document.createElement("label");
    l.setAttribute("for", `${data.attrs.name}`);
    let t = document.createTextNode(data.label);
    l.appendChild(t);
    document.getElementById("form").appendChild(l);
    document.getElementById("form").innerHTML += "<br>";

    let select = document.createElement("select");
    select.setAttribute("id", `${data.attrs.name}`);
    select.setAttribute("form", "form");

    for (let v in data.attrs.variants) {
        let variant = document.createElement("option");
        t = document.createTextNode(data.attrs.variants[v].label);
        variant.setAttribute("value", `${data.attrs.variants[v].value}`);
        variant.appendChild(t);
        select.appendChild(variant);
    }

    document.getElementById("form").appendChild(select);
    document.getElementById("form").innerHTML += "<br><br>";
}

// основная функция которая перенаправляет уже на другие функции
function genHTML(data) {
    let fun = {
        title: AddTitle,
        description: AddDescription,
        fields: AddFields,
        buttons: AddButtons,
    };

    for (let i in data) fun[i](data[i]);
}

// чтение JSON
fetch("./data/form-test-2.json")
    .then((res) => res.json())
    .then((data) => genHTML(data));
