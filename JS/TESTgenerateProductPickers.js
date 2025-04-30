import { products } from "./products.js";

const form = document.querySelector(".js-productsNumber");
const productsInputValue = document.querySelector(".js-productsNumberRange");
const productPickers = document.querySelector(".js-productPickers");

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

const sumOfMacros = (productElementsPicker) => {
    let sumKcal = 0;
    productElementsPicker.forEach((product) => {
        sumKcal += Number(product.kcal.innerText);
    })
    actualKcal.innerText = sumKcal;

    let sumProtein = 0;
    productElementsPicker.forEach((product) => {
        sumProtein += Number(product.protein.innerText);
    })
    actualProtein.innerText = sumProtein;

    let sumFat = 0;
    productElementsPicker.forEach((product) => {
        sumFat += Number(product.fat.innerText);
    })
    actualFat.innerText = sumFat;

    let sumCarbs = 0;
    productElementsPicker.forEach((product) => {
        sumCarbs += Number(product.carbs.innerText);
    })
    actualCarbs.innerText = sumCarbs;

    let sumPrice = 0;
    productElementsPicker.forEach((product) => {
        sumPrice += Number(product.price.innerText);
    })
    actualPrice.innerText = sumPrice;
}

const productsToMacros = (productElementsPicker, id) => {
    let productMacros = products.find((product) => product.name === (productElementsPicker[id].select).value);

    if (productMacros) {
        let weight = Number((productElementsPicker[id].weight).innerText);
        (productElementsPicker[id].kcal).innerText = Math.ceil(productMacros.kcal * (weight / 100));
        (productElementsPicker[id].protein).innerText = Math.ceil(productMacros.protein * (weight / 100));
        (productElementsPicker[id].fat).innerText = Math.ceil(productMacros.fat * (weight / 100));
        (productElementsPicker[id].carbs).innerText = Math.ceil(productMacros.carbs * (weight / 100));
        (productElementsPicker[id].price).innerText = Math.ceil(productMacros.price * (weight / 100));
    }

    sumOfMacros(productElementsPicker);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    productPickers.innerHTML = generateProductPickers();

    const productElementsPicker = [];

    for (let i = 1; i <= Number(productsInputValue.value); i++) {
        productElementsPicker.push({
            form: document.querySelector(".js-productForm" + i),
            minusButtons: document.querySelector(".js-minusButton" + i),
            select: document.querySelector(".js-productSelect" + i),
            plusButtons: document.querySelector(".js-plusButton" + i),
            weight: document.querySelector(".js-productWeight" + i),
            kcal: document.querySelector(".js-productKcal" + i),
            protein: document.querySelector(".js-productProtein" + i),
            fat: document.querySelector(".js-productFat" + i),
            carbs: document.querySelector(".js-productCarbs" + i),
            price: document.querySelector(".js-productPrice" + i),
        });

        (productElementsPicker[i - 1].form).addEventListener("submit", (event) => {
            event.preventDefault();
        });

        (productElementsPicker[i - 1].select).innerHTML = productsToOptions;

        (productElementsPicker[i - 1].select).addEventListener("input", () => {
            productsToMacros(productElementsPicker, i - 1);
        });

        (productElementsPicker[i - 1].minusButtons).addEventListener("click", () => {
            if ((productElementsPicker[i - 1].weight).innerText <= 0) return;
            (productElementsPicker[i - 1].weight).innerText = Number((productElementsPicker[i - 1].weight).innerText) - 10;
            productsToMacros(productElementsPicker, i - 1);
        });

        (productElementsPicker[i - 1].plusButtons).addEventListener("click", () => {
            (productElementsPicker[i - 1].weight).innerText = Number((productElementsPicker[i - 1].weight).innerText) + 10;
            productsToMacros(productElementsPicker, i - 1);
        });
    }
});
