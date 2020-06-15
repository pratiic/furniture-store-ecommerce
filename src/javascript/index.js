import { products } from "./products.js";
import { elements } from "./elements.js";
import {
	removeCartItem,
	clearCart,
	increaseQuantity,
	decreaseQuantity,
} from "./shoppingCart.js";
import "./shoppingCart.js";

products.forEach((product) => {
	elements.gallery.innerHTML += `
        <div class="product-image-card" id = "${product.id}">
            <div class="product-image">
                <img src = "${product.imageURL}" />
                <button class = "button add-to-cart-button capitalize">add to cart <i class = "fas fa-shopping-cart"></i></button>
            </div>
            <div class="product-info">
                <h3 class="product-name capitalize">${product.name}</h3>
                <span class="product-price">$${product.price}</span>
            </div>
        </>
    `;
});

elements.shoppingCartItemsList.addEventListener("click", (event) => {
	if (event.target.classList.contains("cart-item-remove-button")) {
		removeCartItem(event);
	} else if (
		event.target.classList.contains("quantity-increase") ||
		event.target.classList.contains("quantity-decrease")
	) {
		let quantityContainer = event.target.parentNode.querySelector(
			".quantity"
		);
		let quantity = Number(quantityContainer.innerText);

		let price = event.target.parentNode.parentNode.querySelector(
			".cart-item-price"
		).innerText;
		price = Number(price.slice(1));

		if (event.target.classList.contains("quantity-increase")) {
			increaseQuantity(quantity, quantityContainer, price);
		} else if (event.target.classList.contains("quantity-decrease")) {
			decreaseQuantity(quantity, quantityContainer, price);
		}
	}
});

elements.cartClearButton.addEventListener("click", () => {
	clearCart();
});
