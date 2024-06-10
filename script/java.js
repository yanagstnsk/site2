document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart');

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function addToCart(product, quantity) {
        const cart = getCart();
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        saveCart(cart);
    }

    function updateCartDisplay() {
        if (!cartItemsContainer || !totalPriceContainer) return;

        const cart = getCart();
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (Артикул: ${item.art}) - ${item.price} грн (Кількість: ${item.quantity})`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Видалити';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });
            li.appendChild(removeButton);
            cartItemsContainer.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        totalPriceContainer.textContent = totalPrice;
    }

    function removeFromCart(productId) {
        const cart = getCart();
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
        updateCartDisplay();
    }

    function clearCart() {
        saveCart([]);
        updateCartDisplay();
    }

    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productElement = this.closest('.column');
                const product = {
                    id: productElement.dataset.id,
                    name: productElement.dataset.name,
                    price: Number(productElement.dataset.price),
                    art: productElement.dataset.art
                };
                const quantityInput = productElement.querySelector('.count');
                let quantity = parseInt(quantityInput.textContent); 
                addToCart(product, quantity);
                alert('Товар додано до кошика');
            });
        });
    }

    const incrementButtons = document.querySelectorAll('.increment');
    const decrementButtons = document.querySelectorAll('.decrement');

    incrementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const quantityElement = this.parentNode.querySelector('.count');
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity; 
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const quantityElement = this.parentNode.querySelector('.count');
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity; 
            }
        });
    });

    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    updateCartDisplay();
});
