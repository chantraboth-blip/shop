// ================= CART =================

let cart = [];


// Add product to cart
function addToCart(name, price) {

    // Check if product already exists
    let existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    displayCart();
}


// Display cart
function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const totalPrice =
        document.getElementById("totalPrice");

    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        totalPrice.textContent = "0.00";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    // Create cart items
    cart.forEach((product, index) => {

        let productTotal =
            product.price * product.quantity;

        total += productTotal;


        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <div class="cart-info">

                <h3>${product.name}</h3>

                <p>$${product.price.toFixed(2)}</p>

            </div>


            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>${product.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <div>
                $${productTotal.toFixed(2)}
            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(item);

    });


    totalPrice.textContent =
        total.toFixed(2);
}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();
}


// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    displayCart();
}


// Remove product
function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();
}


// Clear cart
function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty!");

        return;
    }


    cart = [];

    displayCart();
}


// Checkout
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total = 0;

    cart.forEach(product => {

        total +=
            product.price * product.quantity;

    });


    alert(
        "Thank you for shopping!\n\n" +
        "Total: $" + total.toFixed(2)
    );


    cart = [];

    displayCart();
}


// ================= SEARCH =================

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("input", filterProducts);


// ================= CATEGORY FILTER =================

const categoryFilter =
    document.getElementById("categoryFilter");

categoryFilter.addEventListener(
    "change",
    filterProducts
);


// Filter products
function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product
                .querySelector("h3")
                .textContent
                .toLowerCase();


        const category =
            product.dataset.category;


        const matchesSearch =
            productName.includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}