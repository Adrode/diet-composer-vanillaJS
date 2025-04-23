import { products } from "./products.js";

const form = document.querySelector(".js-productsNumber");
const productsInputValue = document.querySelector(".js-productsNumberRange");
const productPickers = document.querySelector(".js-productPickers");

const actualKcal = document.querySelector(".js-actualPerMealKcal");
const actualWhey = document.querySelector(".js-actualPerMealWhey");
const actualFat = document.querySelector(".js-actualPerMealFat");
const actualCarbs = document.querySelector(".js-actualPerMealCarbs");

const productsToOptions = products.map((product) => {
    if (product.id === 0) return `<option selected value="${product.name}">${product.name}</option>`;
    return `<option value="${product.name}">${product.name}</option>`;
});

const generateProductPickers = () => {
    return Array.from({ length: Number(productsInputValue.value) }).map((_, index) => `
        <div class="product">
            <div class="product__weight"><span class="js-productWeight${index + 1}">100</span>g</div>
            <form class="product__options js-productForm${index + 1}">
                <button class="product__sign js-minusButton${index + 1}">-</button>
                <select class="js-productSelect${index + 1}"></select>
                <button class="product__sign js-plusButton${index + 1}">+</button>
            </form>
            <div class="product__macros">
                <div><span class="js-productKcal${index + 1}">0</span> kcal</div>
                <div><span class="js-productWhey${index + 1}">0</span>g whey</div>
                <div><span class="js-productFat${index + 1}">0</span>g fat</div>
                <div><span class="js-productCarbs${index + 1}">0</span>g carbs</div>
            </div>
        </div>`
    ).join("")
};

let sumOfKcal = [];
let sumOfWhey = [];
let sumOfFat = [];
let sumOfCarbs = [];

const productsToMacros = (productsWeightRef, productsSelectRef, productsKcalRef, productsWheyRef, productsFatRef, productsCarbsRef) => {
    let productMacros = products.find((product) => product.name === productsSelectRef.value);

    sumOfKcal = [];
    sumOfWhey = [];
    sumOfFat = [];
    sumOfCarbs = [];

    if (productMacros) {
        let weight = Number(productsWeightRef.innerText);
        productsKcalRef.innerText = Math.ceil(productMacros.kcal * (weight / 100));
        productsWheyRef.innerText = Math.ceil(productMacros.whey * (weight / 100));
        productsFatRef.innerText = Math.ceil(productMacros.fat * (weight / 100));
        productsCarbsRef.innerText = Math.ceil(productMacros.carbs * (weight / 100));
    }

    // -------------------------------------------------------
    productsKcal.forEach((product) => {
        sumOfKcal.push(Number(document.querySelector("." + product).innerText));
    })
    let sumKcal = sumOfKcal.reduce((accumulator, value) => accumulator + value, 0);
    actualKcal.innerText = sumKcal;

    productsWhey.forEach((product) => {
        sumOfWhey.push(Number(document.querySelector("." + product).innerText));
    })
    let sumWhey = sumOfWhey.reduce((accumulator, value) => accumulator + value, 0);
    actualWhey.innerText = sumWhey;

    productsFat.forEach((product) => {
        sumOfFat.push(Number(document.querySelector("." + product).innerText));
    })
    let sumFat = sumOfFat.reduce((accumulator, value) => accumulator + value, 0);
    actualFat.innerText = sumFat;

    productsCarbs.forEach((product) => {
        sumOfCarbs.push(Number(document.querySelector("." + product).innerText));
    })
    let sumCarbs = sumOfCarbs.reduce((accumulator, value) => accumulator + value, 0);
    actualCarbs.innerText = sumCarbs;
    // -------------------------------------------------------
    // above code to be reduced to more generic code
}

let productsWeight = [];
let productsForm = [];
let minusButtons = [];
let productsSelect = [];
let plusButtons = [];
let productsKcal = [];
let productsWhey = [];
let productsFat = [];
let productsCarbs = [];

// -----------------------------

const pickersProducts = [];

for (let i = 1; i <= Number(productsInputValue.value); i++) {
    pickersProducts.push({
        form: "js-productForm" + i,
        minusButtons: "js-minusButtons" + i,
        select: "js-productSelect" + i,
        plusButtons: "js-plusButtons" + i,
        weight: "js-productWeight" + i,
        kcal: "js-productKcal" + i,
        whey: "js-productWhey" + i,
        fat: "js-productFat" + i,
        carbs: "js-productCarbs" + i,
    });
}

// -----------------------------
// ABOVE LOOP FOR ARRAY WITH OBJECTS, INSTEAD OD SEPARATE ARRAYS

form.addEventListener("submit", (event) => {
    event.preventDefault();
    productPickers.innerHTML = generateProductPickers();

    productsWeight = [];
    productsForm = [];
    minusButtons = [];
    productsSelect = [];
    plusButtons = [];
    productsKcal = [];
    productsWhey = [];
    productsFat = [];
    productsCarbs = [];

    for (let i = 1; i <= productsInputValue.value; i++) {
        if (!productsInputValue.value) {
            return;
        }

        productsWeight.push("js-productWeight" + i);
        productsForm.push("js-productForm" + i);
        minusButtons.push("js-minusButton" + i);
        productsSelect.push("js-productSelect" + i);
        plusButtons.push("js-plusButton" + i);
        productsKcal.push("js-productKcal" + i);
        productsWhey.push("js-productWhey" + i);
        productsFat.push("js-productFat" + i);
        productsCarbs.push("js-productCarbs" + i);
        // above to reduce to one array with objects - more generic option

        let productsFormRef = document.querySelector("." + productsForm[i - 1]);
        let productsWeightRef = document.querySelector("." + productsWeight[i - 1]);
        let minusButtonsRef = document.querySelector("." + minusButtons[i - 1]);
        let productsSelectRef = document.querySelector("." + productsSelect[i - 1]);
        let plusButtonsRef = document.querySelector("." + plusButtons[i - 1]);
        let productsKcalRef = document.querySelector("." + productsKcal[i - 1]);
        let productsWheyRef = document.querySelector("." + productsWhey[i - 1]);
        let productsFatRef = document.querySelector("." + productsFat[i - 1]);
        let productsCarbsRef = document.querySelector("." + productsCarbs[i - 1]);

        productsFormRef.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        productsSelectRef.innerHTML = productsToOptions;

        productsSelectRef.addEventListener("input", () => {
            productsToMacros(productsWeightRef, productsSelectRef, productsKcalRef, productsWheyRef, productsFatRef, productsCarbsRef);
        });

        minusButtonsRef.addEventListener("click", () => {
            if (productsWeightRef.innerText <= 0) return;
            productsWeightRef.innerText = Number(productsWeightRef.innerText) - 10;
            productsToMacros(productsWeightRef, productsSelectRef, productsKcalRef, productsWheyRef, productsFatRef, productsCarbsRef);
        });

        plusButtonsRef.addEventListener("click", () => {
            productsWeightRef.innerText = Number(productsWeightRef.innerText) + 10;
            productsToMacros(productsWeightRef, productsSelectRef, productsKcalRef, productsWheyRef, productsFatRef, productsCarbsRef);
        });
    }
});
