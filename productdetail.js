
"use strict"

window.onload = function() {
    const urlParams = new URLSearchParams(location.search);

    let productId = -1;
    if (urlParams.has("productId") === true) {
        productId = urlParams.get("productId");
        fetch("http://localhost:8081/api/products/" + productId)
            .then(response => response.json())
            .then(data => {
                createCard(data);
            });
    }
}

function createCard(x) {
    document.getElementById("divForResults").innerHTML = `
        <div class="col">
            <div class="card h-100">
                <a href="http://127.0.0.1:5500/productsdetails.html?productId=${x.productId}">
                    <img src="" class="card-img-top" alt="">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${x.productName}</h5>
                    <p class="card-text">${x.productId}</p>
                    <p class="card-text">$${Number(x.unitPrice).toFixed(2)}</p>
                </div>
            </div>
        </div>
    `
}