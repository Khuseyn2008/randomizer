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
    }
});

randomBtn.addEventListener("click", function () {
    if (choices.length == 0) {
        result.textContent = "Сначала добавьте варианты!";
    } else {
        const rand = Math.floor(Math.random() * choices.length);
        const selected = choices[rand];
        result.textContent = " Выбор: " + selected
    }
});