let cart = [];

function addToCart(id, name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    renderCart();
    toggleCart(true);
}


function updateQuantity(name, amount) {

    const item = cart.find(item => item.name === name);

    if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }

    renderCart();
}


function renderCart() {

    const container = document.getElementById('cart-items-container');
    const checkoutBtn = document.getElementById('checkout-btn');
    const countBadge = document.getElementById('cart-count');


    let totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    if(countBadge){
        countBadge.innerText = totalItems;
    }


    if(cart.length === 0){

        container.innerHTML =
        `<div class="text-center text-sm text-gray-400 py-20">
        Your shopping bag is completely empty.
        </div>`;

        checkoutBtn.disabled = true;
        updateTotalCosts();
        return;
    }


    checkoutBtn.disabled = false;
    container.innerHTML = "";


    cart.forEach(item => {

        container.innerHTML += `

        <div class="flex items-center justify-between border-b py-4 text-xs">

            <div>
                <h4 class="font-medium">${item.name}</h4>
                <p>৳ ${item.price} BDT</p>
            </div>

            <div>
                <button onclick="updateQuantity('${item.name}',-1)">
                -
                </button>

                <span>${item.quantity}</span>

                <button onclick="updateQuantity('${item.name}',1)">
                +
                </button>
            </div>

        </div>

        `;

    });


    updateTotalCosts();

}