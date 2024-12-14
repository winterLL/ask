var cart = [];

function addToCard(productName, price){

    if(cart.find(item => item.name === productName)){
        cart.find(item => item.name === productName).quantity++;
    } else {
        cart.push({name: productName, price: price, quantity: 1});
    }

    updateCartView();
};

function updateCartView() {
    var cartElement = document.getElementById('cart');

    cartElement.innerHTML = cart.map(item =>
    `<div>
        <p class='grid-1'> ${item.name}: ${item.quantity} x ${item.price} 
        <button class='grid-2' onclick="addToCard('${item.name}', ${item.price})" >+</button>
        <button class='grid-3' onclick="removeFromCart('${item.name}', ${item.price})">-</button></p>
    </div>`).join('<br>');

    updateTotalView();
}

function removeFromCart(productName, price) {
    var productIndex = cart.findIndex(item => item.name===productName);
    if(cart[productIndex].quantity>1){
        cart[productIndex].quantity--;
    }else{
        cart.splice(productIndex,1)
    }
    updateCartView();
}

function updateTotalView() {
    var totalElement = document.getElementById('total');
    var total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    
    totalElement.innerHTML = 
        `<button onclick="readyForDelivery()">Ετοιμοι για αποστολή <br> <span>Το συνολο ειναι: ${total}</span> </button>`;
};


const overlay = document.getElementById('overlay');
const total = document.getElementById('total');

function readyForDelivery() {
    overlay.classList.remove('hidden');
}

total.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'readyButton') {
        readyForDelivery();
    }
});

const readyButton = document.getElementById('readyButton');
setTimeout(() => {
    readyButton.textContent = "Το καλαθι σου ειναι ετοιμο";
}, 3000);


document.querySelector('.categorySelect').addEventListener('change', function () {
    const selectedCategory = this.value;

// Κρύψε όλα τα προϊόντα
    document.querySelectorAll('.products > div').forEach(category => {
        category.style.display = 'none';
    });

// Εμφάνισε μόνο την επιλεγμένη κατηγορία
    if (selectedCategory === 'all') {
        document.querySelectorAll('.products > div').forEach(category => {
        category.style.display = 'block';
        });
    } else {
        document.querySelector(`.${selectedCategory}`).style.display = 'block';
    }
});