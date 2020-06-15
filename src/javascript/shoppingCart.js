import { elements } from "./elements.js";
import { products } from "./products.js";

let itemsNumber = 0;
let totalCost = 0;

[
	elements.shoppingCartCloseButton,
	elements.shoppingCartDisplayButton,
	elements.shoppingCartOverlay,
].forEach((element) => {
	element.addEventListener("click", function () {
		elements.shoppingCart.classList.toggle("show");
		elements.shoppingCartOverlay.classList.toggle("over-shade");
	});
});

elements.gallery.addEventListener("click", (event) => {
	if (event.target.classList.contains("add-to-cart-button")) {
		let item = event.target.parentNode.parentNode;

		if (!item.classList.contains("added")) {
			addItemToCart(item);

			updateStatus(item, "added");
		}
	}
});

let addItemToCart = function (item) {
	let targetedProduct;

	products.forEach((product) => {
		if (product.id == item.id) {
			targetedProduct = product;
			elements.shoppingCartItemsList.innerHTML += `
                <li class="cart-item">
                    <div class="cart-item-image">
                        <img src="${product.imageURL}" alt="" />
                    </div>
                    <div class="cart-item-info">
                        <span class="cart-item-name capitalize"
                            >${product.name}</span
                        >
                        <span class="cart-item-price">$${product.price}</span>
                        <button
                            class="button cart-item-remove-button capitalize"
                        >
                            remove
                        </button>
                    </div>
                    <div class="cart-item-quantity">
                        <i class="fas fa-chevron-up quantity-increase"></i>
                        <span class="quantity">1</span>
                        <i class="fas fa-chevron-down quantity-decrease"></i>
                    </div>
                </li>
            `;
		}
	});

	showAlert("added to the shopping cart");

	updateItemsNumber("add");

	updateTotalCost("add", targetedProduct.price);
};

let showAlert = function (message) {
	elements.alert.classList.add("slide-up");
	elements.alert.innerText = message;

	setTimeout(function () {
		elements.alert.classList.remove("slide-up");
	}, 1400);
};

let updateItemsNumber = function (option, event) {
	// let quantityContainer = event.target.parentNode.querySelector(".quantity");
	// let quantity = Number(quantityContainer.innerText);

	if (option === "add") {
		itemsNumber++;
	} else if (option === "remove") {
		let quantity = Number(
			event.target.parentNode.parentNode.querySelector(".quantity")
				.innerText
		);
		itemsNumber -= quantity;
	} else if (option === "remove all") {
		itemsNumber = 0;
	}
	elements.totalCartItems.innerText = itemsNumber;
};

export let removeCartItem = function (event) {
	let cartItem = event.target.parentNode.parentNode;

	let name = cartItem.querySelector(".cart-item-name").innerText;

	let price = event.target.parentNode.querySelector(".cart-item-price")
		.innerText;

	updateItemsNumber("remove", event);

	price = price.slice(1, price.length);
	price = Number(
		price *
			Number(
				event.target.parentNode.parentNode.querySelector(".quantity")
					.innerText
			)
	);

	updateTotalCost("remove", price);

	cartItem.remove();

	showAlert("item removed from the cart");

	let imageCards = elements.gallery.querySelectorAll(".product-image-card");

	imageCards.forEach((imageCard) => {
		if (
			imageCard
				.querySelector(".product-info")
				.querySelector(".product-name")
				.innerText.toLowerCase() == name.toLowerCase()
		) {
			updateStatus(imageCard, "removed");
		}
	});
};

export let clearCart = function () {
	elements.shoppingCartItemsList.innerHTML = "";

	updateItemsNumber("remove all");

	updateTotalCost("remove all");

	showAlert("shopping cart cleared");
};

let updateTotalCost = function (option, price) {
	if (option === "add") {
		totalCost += price;
		totalCost = Number(totalCost.toFixed(2));
	} else if (option === "remove") {
		totalCost -= price;
		totalCost = Number(totalCost.toFixed(2));
	} else if (option === "remove all") {
		totalCost = 0;
	}

	elements.totalCost.innerText = `$ ${totalCost}`;
};

let updateStatus = function (item, message) {
	item.classList.toggle("added");

	if (message === "added") {
		item.querySelector(".add-to-cart-button").innerText =
			"already in the shopping cart";
	} else {
		item.querySelector(
			".add-to-cart-button"
		).innerHTML = `add to cart <i class = "fas fa-shopping-cart"></i>`;
	}
};

export let increaseQuantity = function (quantity, quantityContainer, price) {
	quantity++;

	quantityContainer.innerText = quantity;

	updateItemsNumber("add");

	updateTotalCost("add", price);
};

export let decreaseQuantity = function (quantity, quantityContainer, price) {
	if (quantity > 0) {
		quantity--;

		quantityContainer.innerText = quantity;

		updateItemsNumber("remove");

		updateTotalCost("remove", price);
	}
};
