const form = document.querySelector("form");
const lessonInput = document.getElementById("lessonInput");
const lessonNumberInput = document.getElementById("lessonNumberInput");
const addButton = document.getElementById("addLesson");
const gradeContainer = document.querySelector(".grade-container");
const tableInputs = document.querySelectorAll(".exam-input, .performance-input");
const clearButtons = document.querySelectorAll(".clear-button");
const removeButtons = document.querySelectorAll(".remove-button");
const resultCell = document.querySelector(".point-container");
const gpaContainer = document.querySelector(".gpa-container");
const gpaSpan = document.querySelector(".gpa");

// ADD ELEMENT

form.addEventListener("submit", event => {
    event.preventDefault();
    const newLesson = document.createElement("div");
    newLesson.classList.add("lessons");
    newLesson.innerHTML = `
            <h4>${lessonInput.value} (<span class="lesson-number">${lessonNumberInput.value}</span> Saat)</h4>
            <table class="grades">
                <tr>
                    <td></td>
                    <td class="table-number-container">1.</td>
                    <td class="table-number-container">2.</td>
                    <td class="table-number-container">3.</td>
                </tr>
                <tr>
                    <td class="table-text-container">Sınav</td>
                    <td class="exam-input-container"><input type="number" min="0" max="100" step="2" class="exam-input"></td>
                    <td class="exam-input-container"><input type="number" min="0" max="100" step="2" class="exam-input"></td>
                    <td class="exam-input-container"><input type="number" min="0" max="100" step="2" class="exam-input"></td>
                </tr>
                <tr>
                    <td class="table-text-container">Sözlü</td>
                    <td class="performance-input-container"><input type="number" min="0" max="100" step="2" class="performance-input"></td>
                    <td class="performance-input-container"><input type="number" min="0" max="100" step="2" class="performance-input"></td>
                    <td class="performance-input-container"><input type="number" min="0" max="100" step="2" class="performance-input"></td>
                </tr>
                <tr>
                    <td align="center" class="remove-button-container"><button class="remove-button">Kaldır</button></td>
                    <td align="center" class="clear-button-container"><button class="clear-button">Temizle</button></td>
                    <td class="table-text-container" align="right">Puanı</td>
                    <td class="point-container" align="center"></td>
                </tr>
            </table>
            <hr>
        `

    gradeContainer.insertBefore(newLesson, gpaContainer);

    lessonInput.value = "";
    lessonNumberInput.value = "";
});

// ADD ELEMENT

lessonNumberInput.addEventListener("keydown", event => {
    if(event.key == '+' || event.key == '-' || event.key == 'e' || event.key == 'E'){
        event.preventDefault();
    }
});

// TABLE INPUTS

gradeContainer.addEventListener("keydown", event => {
    if(event.target.matches(".exam-input, .performance-input")){
        if(event.key == '+' || event.key == '-' || event.key == 'e' || event.key == 'E'){
            event.preventDefault();
        }
    }
})

// TABLE INPUTS

// CLEAR & REMOVE BUTTON

function clearTable(button){
    const tableElement = button.closest("table");
    const inputs = tableElement.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = "";
    });

    const resultCell = tableElement.querySelector(".point-container");
    if(resultCell){
        resultCell.textContent = "";
        calculateGpa();
    }
}

function removeLesson(button){
    const divElement = button.closest("div.lessons");
    divElement.remove();
    calculateGpa();
}

document.addEventListener("click", event => {
    if(event.target.classList.contains("remove-button")){
        removeLesson(event.target);
    }
    if(event.target.classList.contains("clear-button")){
        clearTable(event.target);
    }
});



// CLEAR & REMOVE BUTTON


// CALCULATE LESSON POINT & CALCULATE THE AVERAGE OF POINTS

function validateAndCalculate(tableElement){
    let total = 0;
    let count = 0;
    // console.log("validateAndCalculate called");
    const tableInputs = tableElement.querySelectorAll(".exam-input, .performance-input");
    // console.dir(`Selected Inputs: ${tableInputs}`);

    tableInputs.forEach(input => {
        // console.log(`Input Value: ${input.value}`);

        let value = parseFloat(input.value.trim());
        // console.log(`Parsed Value: ${value}`);

        if(isNaN(value) || value < 0 || value > 100){
            input.value = "";
        } else {
            total += value
            count++;
        }
    });

    let average = count > 0 ? (total / count).toFixed(4) : ""; 

    average = average.replace(/0+$/, "").replace(/\.$/, "");

    const resultCell = tableElement.querySelector(".point-container");

    if(resultCell){
        resultCell.textContent = average;
    }

    // console.log(`Total: ${total}`);
    // console.log(`Count: ${count}`);
    // console.log(`Average: ${average}`);
}

function calculateGpa(){
    let total = 0;
    let count = 0;

    const resultCells = document.querySelectorAll(".point-container");

    resultCells.forEach(cell => {
        let value = parseFloat(cell.textContent.trim());

        const lessonNumber = cell.closest("div.lessons").querySelector(".lesson-number");
        let value2 = parseFloat(lessonNumber.textContent.trim());

        if(!isNaN(value) && !isNaN(value2)){
            total += value * value2;
            count += value2;
        }
    });

    let gpa = count > 0 ? (total / count).toFixed(4) : "0.0000";

    const gpaSpan = document.querySelector(".gpa");

    if(gpaSpan){
        gpaSpan.textContent = gpa;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    document.addEventListener("input", event => {
        if(event.target.classList.contains("exam-input") || event.target.classList.contains("performance-input")){
            const tableElement = event.target.closest("table");
            validateAndCalculate(tableElement);
            calculateGpa();
        }
    });
});

// CALCULATE LESSON POINT & CALCULATE THE AVERAGE OF POINTS
