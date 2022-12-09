
"use strict"

const defaultSelect = document.getElementById("defaultSelect");
const categorySelect = document.getElementById("categorySelect");
const divForResults = document.getElementById("divForResults");

window.onload = function () {
    hideCategorySelect();
    defaultSelect.onchange = displayResults;
    categorySelect.onchange = getApiInfoByCategory;
}

function displayResults() {
    if (defaultSelect.value == "category") {
        clearResults();
        showCategorySelect();
        addOptToCategorySelect();
    }
    else if (defaultSelect.value == "viewAll") {
        clearResults();
        hideCategorySelect();
        getApiInfoForAllProducts();
    }
    else {
        clearResults();
        hideCategorySelect();
    }
}

function getApiInfoForAllProducts() {
    fetch("http://localhost:8081/api/products")
        .then(response => response.json())
        .then(x => {
            x.sort((a, b) => {
                let fa = a.productName.toLowerCase(),
                    fb = b.productName.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            for (let i = 0; i < x.length; i++) {
                createCard(x[i])
            }
        });
}

function getApiInfoByCategory() {
    clearResults();
    fetch("http://localhost:8081/api/categories")
        .then(res => res.json())
        .then(y2 => {
            for (let num of y2) {
                if (num.categoryId == categorySelect.value) {
                    fetch(`http://localhost:8081/api/categories/${categorySelect.value}`)
                        .then(r => r.json())
                        .then(cateProduct => {
                            for (let i = 0; i < cateProduct.length; i++) {
                                createCard(cateProduct[i]);
                            }
                        });
                }
            }
        });
}

function addOptToCategorySelect() {
    categorySelect.length = 0;

    let defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = "Please select a category";
    categorySelect.appendChild(defaultOpt);

    fetch("http://localhost:8081/api/categories")
        .then(resp => resp.json())
        .then(y => {
            for (let cate of y) {
                let opt = document.createElement("option");
                opt.value = cate.categoryId;
                opt.textContent = cate.name;
                categorySelect.appendChild(opt);
            }
        });
}

function getImage(product) {
    for (let imgArray of imageArray){
       if (imgArray.categoryId == product.categoryId){
        return imgArray.img;
       }
    }
}

function createCard(x) {
    divForResults.innerHTML += `
        <div class="col">
            <div class="card h-100">
                <a href="http://127.0.0.1:5500/details.html?productId=${x.productId}">
                    <img src="${getImage(x)}" class="card-img-top">
                </a>
                <div class="card-body">
                    <a href="http://127.0.0.1:5500/details.html?productId=${x.productId}" style='text-decoration: none; color: Black;'>
                        <h5 class="card-title">${x.productName}</h5>
                    </a>
                    <p class="card-text">${x.productId}</p>
                    <p class="card-text">$${Number(x.unitPrice).toFixed(2)}</p>
                </div>
            </div>
        </div>
    `
}

function hideCategorySelect() {
    document.getElementById("categorySelect").style.display = "none";
}
function showCategorySelect() {
    document.getElementById("categorySelect").style.display = "block";
}
function clearResults() {
    document.getElementById("divForResults").innerHTML = "";
}