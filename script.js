const form = document.getElementById("choice-form");
const input = document.getElementById("choice-input");
const list = document.getElementById("choice-list");
const result = document.getElementById("result");
const randomBtn = document.getElementById("random-btn");
const errorMsg = document.getElementById("error-msg");


let choices = [];

const savedChoices = localStorage.getItem("choices");
if (savedChoices) {
    choices = JSON.parse(savedChoices);
    renderList();
}



form.addEventListener("submit", function (event) {
    event.preventDefault();

    const value = input.value;
    console.log("Ведено", value);

    if (value.trim() === "") {
        errorMsg.classList.remove("hidden");
    } else {
        errorMsg.classList.add("hidden");
        choices.push(value.trim());
        input.value = "";
        saveChoices();
        renderList();
    }
});

randomBtn.addEventListener("click", function () {
    if (choices.length == 0) {
        result.textContent = "Сначала добавьте варианты!";
    } else {
        const rand = Math.floor(Math.random() * choices.length);
        const selected = choices[rand];
        result.textContent = " Выбор: " + selected;
    }
});

function renderList() {
    list.innerHTML = "";

    choices.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-100 px-3 py-2 rounded";
        const span = document.createElement("span");
        span.textContent = item;
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.className = "text-red-500 hover:text-red-700 text-sm ml-4";
        delBtn.addEventListener("click", function () {
        removeChoices(index);
        });

        li.appendChild(span);
        li.appendChild(delBtn);  
        li.appendChild(li); 
    }); 
}


function saveChoices() {
    localStorage.setItem("choices", JSON.stringify(choices));
}

function removeChoices(index) {
    choices.splice(index, 1);
    saveChoices();
    renderList();
}