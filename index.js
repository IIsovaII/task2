// чтение JSON
fetch("./data/form-test-3.json")
    .then((res) => res.json())
    .then((data) => genHTML(data));

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
    reset.className = "btn btn-default";
    document.getElementById("form").appendChild(reset);
}

function AddSubmit(text) {
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", `${text}`);
    submit.className = "btn btn-default";
    document.getElementById("form").appendChild(submit);
}

// для заголовка
function AddTitle(text) {
    let h1 = document.createElement("h1");
    let t = document.createTextNode(text);
    h1.className = "jumbotron text-center";
    h1.appendChild(t);
    document.getElementById("container").appendChild(h1);
}

// для описания
function AddDescription(text) {
    let p = document.createElement("p");
    let t = document.createTextNode(text);
    p.className = "jumbotron text-center";
    p.appendChild(t);
    document.getElementById("container").appendChild(p);
}

// для полей
function AddFields(data) {
    let form = document.createElement("form");
    form.id = "form";
    form.className = " form-group ";
    document.getElementById("container").appendChild(form);

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
    document.getElementById("form").innerHTML +=
        `<label for="${data.attrs.name}" >${data.label}</label>` +
        `<input type = "${data.attrs.type}" form = 'form' class="form-control" name="${data.attrs.name}">`;
}

function AddTextarea(data) {
    document.getElementById("form").innerHTML +=
        `<label for="${data.attrs.name}">${data.label}</label>` +
        `<textarea form = 'form' class="form-control" name="${data.attrs.name}"></textarea>`;
}

function AddBoxes(data) {
    document.getElementById("form").innerHTML +=
        `<label for="${data.attrs.name}" class = 'form-check-label'>${data.label}</label>`;

    let variants = document.createElement("div");

    for (let v in data.attrs.variants) {
        variants.innerHTML +=
            `<input type="${data.attrs.type}" class = 'form-check-input' id="${data.attrs.variants[v].value}" value="${data.attrs.variants[v].value}">` +
            `<label for="${data.attrs.variants[v].value}">${data.attrs.variants[v].label}</label><br>`;
    }

    document.getElementById("form").appendChild(variants);
}

function AddSelect(data) {
    let l = document.createElement("label");
    l.htmlFor = data.attrs.name;
    l.textContent = data.label;
    document.getElementById("form").appendChild(l);

    let select = document.createElement("select");
    select.id = data.attrs.name;
    select.form = 'form';
    select.className = "form-select";

    for (let v in data.attrs.variants) {
        let variant = document.createElement("option");
        variant.textContent = data.attrs.variants[v].label;
        variant.value = data.attrs.variants[v].value;
        select.appendChild(variant);
    }

    document.getElementById("form").appendChild(select);
}

// основная функция которая перенаправляет уже на другие функции
function genHTML(data) {
    let fun = {
        title: AddTitle,
        description: AddDescription,
        fields: AddFields,
        buttons: AddButtons,
    };

    let container = document.createElement("div");
    container.className = "container";
    container.id = "container";
    document.body.appendChild(container);

    for (let i in data) fun[i](data[i]);
}
