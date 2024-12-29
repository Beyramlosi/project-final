let cart = [];
let cartVisible = false;

document.addEventListener('DOMContentLoaded', function() {
    // Add click event to cart icon
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const cartDropdown = document.getElementById('cart-dropdown');
    
    // Add data attributes to cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.setAttribute('data-id', index + 1);
        card.setAttribute('data-price', card.querySelector('.text-title').textContent.replace('$', ''));
    });

    // Add click event to cart buttons
    document.querySelectorAll('.card-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.card');
            addToCart({
                id: card.dataset.id,
                title: card.querySelector('.text-title').textContent,
                price: parseFloat(card.dataset.price),
                quantity: 1
            });
        });
    });

    // Toggle cart dropdown
    cartIcon.parentElement.addEventListener('click', function(e) {
        e.preventDefault();
        cartVisible = !cartVisible;
        cartDropdown.style.display = cartVisible ? 'block' : 'none';
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.cart-dropdown') && !e.target.closest('.fa-shopping-cart')) {
            cartDropdown.style.display = 'none';
            cartVisible = false;
        }
    });
});

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    
    // Update cart items
    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.quantity} x ${item.price.toFixed(2)}€</div>
                </div>
                <span class="remove-item" onclick="removeFromCart('${item.id}')">×</span>
            </div>
        `;
    }).join('');
    
    // Update total
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart badge
    updateCartBadge();
}

function updateCartBadge() {
    let cartIcon = document.querySelector('.fa-shopping-cart');
    let existingBadge = cartIcon.querySelector('.cart-badge');
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        if (!existingBadge) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartIcon.appendChild(badge);
            existingBadge = badge;
        }
        existingBadge.textContent = totalItems;
    } else if (existingBadge) {
        existingBadge.remove();
    }
}




