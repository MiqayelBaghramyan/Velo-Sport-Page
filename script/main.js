const navli = document.querySelectorAll('.nav-li');
let nav = [...navli];

nav.forEach((value) => {
    value.addEventListener('click', function (e) {
        for (let i = 0; i < nav.length; i++) {
            nav[i].classList.remove('active')
        }

        this.classList.add('active')
    })
})


const burger = document.querySelector('.burger');
const firstLine = document.querySelector('.line1');
const secondLine = document.querySelector('.line2');
const thirdLine = document.querySelector('.line3');
const burgerContent = document.querySelector('.burgerContent');


burger.addEventListener('click', function () {
    burger.classList.toggle('burgChange')
    firstLine.classList.toggle('burgerActiveFirst');
    secondLine.classList.toggle('burgerActiveSecond');
    thirdLine.classList.toggle('burgerActiveThird');
    burgerContent.classList.toggle('burgerContentActive')
})

const burgerLi = document.querySelectorAll('.burger-li');
const burgerLis = [...burgerLi];

burgerLis.forEach((value) => {
    value.addEventListener('click', function (e) {
        for (let i = 0; i < burgerLis.length; i++) {
            burgerLis[i].classList.remove('active')
        }

        this.classList.add('active')
    })
})

const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
    let x = window.scrollY;
    if (x >= 350) {
        header.classList.add('fixed')
    }
})




const global = document.querySelector('.glob');
const leftArrow = document.querySelector('.fa-arrow-left');
const rightArrow = document.querySelector('.fa-arrow-right');

let currentPageIndex = 0;

leftArrow?.addEventListener('click', function () {
    currentPageIndex = Math.max(0, currentPageIndex - 1);
    updateScroll();
});

rightArrow?.addEventListener('click', function () {
    currentPageIndex++;
    updateScroll();
});

function updateScroll() {
    const leftValue = currentPageIndex * 1600;
    global.scrollTo({
        left: leftValue,
        behavior: 'smooth',
    });
}



let basketItems = [];
let total = 0;

function addToCart(itemName, itemPrice) {
    basketItems.push({ name: itemName, price: itemPrice });
    updateBasket();
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
}

function updateBasket() {
    const basketContainer = document.querySelector('.basket-container');
    if (!basketContainer) return;

    const basketItemsList = basketContainer.querySelector('#basket-items-list');
    const totalPriceElement = basketContainer.querySelector('#total-price');

    basketItemsList.innerHTML = '';

    basketItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'basket-item';
        listItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} AMD</span>
        `;
        basketItemsList.appendChild(listItem);
    });

    total = basketItems.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = `Գին: ${total} AMD`;

    basketContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    const storedItems = JSON.parse(localStorage.getItem('basketItems')) || [];

    storedItems.forEach(item => {
        basketItems.push(item);
    });

    updateBasket();
});

function clearBasket() {
    basketItems = [];
    updateBasket();
    localStorage.removeItem("basketItems");

    const basketContainer = document.querySelector('.basket-container');
    if (basketContainer) {
        const basketItemsList = basketContainer.querySelector('#basket-items-list');
        const totalPriceElement = basketContainer.querySelector('#total-price');
        basketItemsList.innerHTML = '';
        totalPriceElement.textContent = `Գին: 0 AMD`;
    }
}

const buttons = document.querySelectorAll(".addtocart");

buttons.forEach(button => {
    const done = button.querySelector(".done");
    let added = false;

    button.addEventListener('click', () => {
        if (added) {
            done.style.transform = "translate(-110%) skew(-40deg)";
        } else {
            done.style.transform = "translate(0px) skew(0deg)";
            added = true;
        }

        added = !added;
    });
});





document.addEventListener('DOMContentLoaded', function () {
    const filterLinks = document.querySelectorAll('.filter-link');
    const bicycleCatalog = document.querySelector('.ourProducts-catalog');
    const generalTypeLink = document.querySelector('.ourProdcuts-title-title');

    generalTypeLink.addEventListener('click', function (event) {
        event.preventDefault();
        const randomBicycles = RandomBicycles();
        updateBicycleCatalog(randomBicycles);
    });

    filterLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedType = this.getAttribute('data-type');
            const filteredBicycles = BicyclesByType(selectedType);
            updateBicycleCatalog(filteredBicycles);
        });
    });

    function BicyclesByType(type) {
        const bicycles = [
            { name: 'Contend SL 2 (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 3, price: '639,000 AMD', imgClass: 'bicycle-img1' },
            { name: 'LIBRE (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 5, price: '1,050,000 AMD', imgClass: 'bicycle-img3' },
            { name: 'Escape 2 (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 4, price: '569,000 AMD', imgClass: 'bicycle-img6' },
            { name: 'Coco Urban Bike(Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 5, price: '406,000 AMD', imgClass: 'bicycle-img5' },
            { name: 'SUTRA LTD (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 5, price: '1,320,000 AMD', imgClass: 'bicycle-img8' },
            { name: 'Fire Mountain (Լեռնային հեծանիվ)', type: 'Լեռնային Հեծանիվ', star: 3, price: '411,000 AMD', imgClass: 'bicycle-img2' },
            { name: 'Adventure Neo (Էլեկտրական Հեծանիվ)', type: 'Էլեկտրական Հեծանիվ', star: 4, price: '681,000 AMD', imgClass: 'bicycle-img4' },
            { name: 'Specialized Jett 24 (Երեխաների Հեծանիվ)', type: 'Երեխաների Հեծանիվ', star: 4, price: '250,000 AMD', imgClass: 'bicycle-img7' },
        ];

        return bicycles.filter(bicycle => bicycle.type === type);
    }

    function RandomBicycles() {
        const bicycles = [
            { name: 'Contend SL 2 (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 3, price: '639,000 AMD', imgClass: 'bicycle-img1' },
            { name: 'LIBRE (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 5, price: '1,050,000 AMD', imgClass: 'bicycle-img3' },
            { name: 'Escape 2 (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 4, price: '569,000 AMD', imgClass: 'bicycle-img6' },
            { name: 'Coco Urban Bike(Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 5, price: '406,000 AMD', imgClass: 'bicycle-img5' },
            { name: 'SUTRA LTD (Ճանապարհային հեծանիվ)', type: 'Ճանապարհային Հեծանիվ', star: 5, price: '1,320,000 AMD', imgClass: 'bicycle-img8' },
            { name: 'Fire Mountain (Լեռնային հեծանիվ)', type: 'Լեռնային Հեծանիվ', star: 3, price: '411,000 AMD', imgClass: 'bicycle-img2' },
            { name: 'Adventure Neo (Էլեկտրական Հեծանիվ)', type: 'Էլեկտրական Հեծանիվ', star: 4, price: '681,000 AMD', imgClass: 'bicycle-img4' },
            { name: 'Specialized Jett 24 (Երեխաների Հեծանիվ)', type: 'Երեխաների Հեծանիվ', star: 4, price: '250,000 AMD', imgClass: 'bicycle-img7' },
        ];
        return bicycles;
    }

    function updateBicycleCatalog(bicycles) {
        bicycleCatalog.innerHTML = '';

        bicycles.forEach(function (bicycle) {
            const bicycleBox = document.createElement('div');
            bicycleBox.classList.add('bicycle-box');

            let starIcons = '';
            for (let i = 0; i < bicycle.star; i++) {
                starIcons += '<i class="fa-solid fa-star"></i>';
            }

            bicycleBox.innerHTML = `
                <div class="bicycle-img ${bicycle.imgClass}"></div>
                <div class="bicycle-boxer">
                    <p class="bicycle-name">${bicycle.name}</p>
                    <p class="bicycle-price">${bicycle.price}</p>
                    ${starIcons}
                </div>
                <div class="teqvox"></div>
            `;
            bicycleCatalog.appendChild(bicycleBox);
        });
    }

});





