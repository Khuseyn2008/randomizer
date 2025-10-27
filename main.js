const form = document.querySelector('.formOption');
const optionInput = document.querySelector('.optionInput');
const addOptionBtn = document.querySelector('.addOptionBtn');
const optionsList = document.querySelector('.optionsList');
const chooseBtn = document.querySelector('.chooseBtn');
const result = document.querySelector('.result');
const errorMsg = document.querySelector('.errorMsg');

let options = [];

if (localStorage.getItem('options')) {
    const optionsFromLS = JSON.parse(localStorage.getItem('options'))
    options.push(...optionsFromLS);
    options.forEach((task) => {
        renderTask(task);
    });
};


addOptionBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const optionInput = document.querySelector('.optionInput');
    // Получаем значение поля ввода названия задачи предварительно очистив его от пробелов
    const taskText = optionInput.value.trim();
    if (taskText.length === 0) {
        return;
    }

    const task = {
        id: crypto.randomUUID(),
        text: taskText,
    };

    renderTask(task);

    options.push(task);
    localStorage.setItem('options', JSON.stringify(options));

    optionInput.value = '';
    optionInput.focus();
});


function renderTask(task) {
    optionsList.insertAdjacentHTML(
        'beforeend',
        `
        <li data-id="${task.id}" class="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
        <span>${task.text}</span>
        <button class="text-red-500 hover:text-red-700 text-sm ml-4 cursor-pointer" data-action="delete">❌</button></li>
        `
    );
}


optionsList.addEventListener('click', (evt) => {
    if (evt.target.dataset.action !== 'delete') {
        return;
    }
    const parentLi = evt.target.closest('li');
    const id = parentLi.dataset.id;
    
    parentLi.remove();
    options.forEach((option, index) => {
        if (option.id === id) {
            options.splice(index, 1);
        };
    });

    localStorage.setItem('options', JSON.stringify(options));
});

chooseBtn.addEventListener('click', () => {
    if (options.length == 0) {
        result.textContent = "Сначала добавьте варианты!";
    }
    const randomString = Math.floor(Math.random() * options.length);
    console.log(randomString);
    result.innerHTML = " Резултать:  " + options[randomString].text;
});

    // Функция не работает и фиг с ним, как будто люди тупие и не поймут
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formValue = optionInput.value.trim();

    if (formValue === '') {
        errorMsg.classList.remove('hidden');       
    } else {
        errorMsg.classList.add('block');       
    };
});


function saveOptions() {
    localStorage.setItem('options', JSON.stringify(options));   
};