import { products } from "./products.js";

const form = document.querySelector(".js-productsNumber");
let productsInputValue = document.querySelector(".js-productsNumberRange");
let productPickers = document.querySelector(".js-productPickers");

const actualKcal = document.querySelector(".js-actualPerMealKcal");
const actualProtein = document.querySelector(".js-actualPerMealProtein");
const actualFat = document.querySelector(".js-actualPerMealFat");
const actualCarbs = document.querySelector(".js-actualPerMealCarbs");
const actualPrice = document.querySelector(".js-actualPerMealPrice");

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
                <div><span class="js-productProtein${index + 1}">0</span>g protein</div>
                <div><span class="js-productFat${index + 1}">0</span>g fat</div>
                <div><span class="js-productCarbs${index + 1}">0</span>g carbs</div>
                <div><span class="js-productPrice${index + 1}">0</span>zł</div>
            </div>
        </div>`
    ).join("")
};

let productsWeight = [];
let productsForm = [];
let minusButtons = [];
let productsSelect = [];
let plusButtons = [];
let productsKcal = [];
let productsProtein = [];
let productsFat = [];
let productsCarbs = [];
let productsPrice = [];
let sumOfKcal = [];
let sumOfProtein = [];
let sumOfFat = [];
let sumOfCarbs = [];
let sumOfPrice = [];

const productsToMacros = (productsWeightRef, productsSelectRef, productsKcalRef, productsProteinRef, productsFatRef, productsCarbsRef, productsPriceRef) => {
    let productMacros = products.find((product) => product.name === productsSelectRef.value);

    sumOfKcal = [];
    sumOfProtein = [];
    sumOfFat = [];
    sumOfCarbs = [];
    sumOfPrice = [];

    if (productMacros) {
        let weight = Number(productsWeightRef.innerText);
        productsKcalRef.innerText = Math.ceil(productMacros.kcal * (weight / 100));
        productsProteinRef.innerText = Math.ceil(productMacros.protein * (weight / 100));
        productsFatRef.innerText = Math.ceil(productMacros.fat * (weight / 100));
        productsCarbsRef.innerText = Math.ceil(productMacros.carbs * (weight / 100));
        productsPriceRef.innerText = (productMacros.price * (weight / 100)).toFixed(2);
    }

    productsKcal.forEach((product) => {
        sumOfKcal.push(Number(document.querySelector("." + product).innerText));
    })
    let sumKcal = sumOfKcal.reduce((accumulator, value) => accumulator + value, 0);
    actualKcal.innerText = sumKcal;

    productsProtein.forEach((product) => {
        sumOfProtein.push(Number(document.querySelector("." + product).innerText));
    })
    let sumProtein = sumOfProtein.reduce((accumulator, value) => accumulator + value, 0);
    actualProtein.innerText = sumProtein;

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

    productsPrice.forEach((product) => {
        sumOfPrice.push(Number(document.querySelector("." + product).innerText));
    })
    let sumPrice = sumOfPrice.reduce((accumulator, value) => accumulator + value, 0);
    actualPrice.innerText = sumPrice.toFixed(2);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    productPickers.innerHTML = generateProductPickers();

    productsWeight = [];
    productsForm = [];
    minusButtons = [];
    productsSelect = [];
    plusButtons = [];
    productsKcal = [];
    productsProtein = [];
    productsFat = [];
    productsCarbs = [];
    productsPrice = [];

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
        productsProtein.push("js-productProtein" + i);
        productsFat.push("js-productFat" + i);
        productsCarbs.push("js-productCarbs" + i);
        productsPrice.push("js-productPrice" + i);

        let productsFormRef = document.querySelector("." + productsForm[i - 1]);
        let productsWeightRef = document.querySelector("." + productsWeight[i - 1]);
        let minusButtonsRef = document.querySelector("." + minusButtons[i - 1]);
        let productsSelectRef = document.querySelector("." + productsSelect[i - 1]);
        let plusButtonsRef = document.querySelector("." + plusButtons[i - 1]);
        let productsKcalRef = document.querySelector("." + productsKcal[i - 1]);
        let productsProteinRef = document.querySelector("." + productsProtein[i - 1]);
        let productsFatRef = document.querySelector("." + productsFat[i - 1]);
        let productsCarbsRef = document.querySelector("." + productsCarbs[i - 1]);
        let productsPriceRef = document.querySelector("." + productsPrice[i - 1]);

        productsFormRef.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        productsSelectRef.innerHTML = productsToOptions;

        productsSelectRef.addEventListener("input", () => {
            productsToMacros(productsWeightRef, productsSelectRef, productsKcalRef, productsProteinRef, productsFatRef, productsCarbsRef, productsPriceRef);
        });

        minusButtonsRef.addEventListener("click", () => {
            if (productsWeightRef.innerText <= 0) return;
            productsWeightRef.innerText = Number(productsWeightRef.innerText) - 10;
            productsToMacros(productsWeightRef, productsSelectRef, productsKcalRef, productsProteinRef, productsFatRef, productsCarbsRef, productsPriceRef);
        });

        plusButtonsRef.addEventListener("click", () => {
            productsWeightRef.innerText = Number(productsWeightRef.innerText) + 10;
            productsToMacros(productsWeightRef, productsSelectRef, productsKcalRef, productsProteinRef, productsFatRef, productsCarbsRef, productsPriceRef);
        });
    }
});
