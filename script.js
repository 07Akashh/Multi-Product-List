function fetchProducts(category) {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(apiData => {
            for (const categoryData of apiData.categories) {
                if (categoryData.category_name === category) {
                    displayProducts(categoryData.category_products);
                    return;
                }
            }
            console.error('Category not found:', category);
        })
        .catch(error => console.error('Error fetching products:', error));
}
function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    products.forEach(product => {

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        if (product.badge_text) {
        const badge= document.createElement('p')
        badge.classList.add('badge')
        badge.textContent=product.badge_text;
        productCard.appendChild(badge);
        }

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        image.classList.add('product-image');
        productCard.appendChild(image);

        const titleVendorDiv = document.createElement('div');
        titleVendorDiv.classList.add('titlevendorname');

        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = product.title;
        titleVendorDiv.appendChild(title);

        const vendor = document.createElement('p');
        vendor.classList.add('vendor');
        vendor.textContent = '• ' + product.vendor;
        titleVendorDiv.appendChild(vendor);

        productCard.appendChild(titleVendorDiv);

        const pricingDiv = document.createElement('div');
        pricingDiv.classList.add('pricing');

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = 'Rs ' + product.price+'.00';
        pricingDiv.appendChild(price);

        if (product.compare_at_price) {
            const comparePrice = document.createElement('p');
            comparePrice.classList.add('comparedPrice');
            comparePrice.textContent = product.compare_at_price+'.00';
            pricingDiv.appendChild(comparePrice);

            const discount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
            const discountPercentage = document.createElement('p');
            discountPercentage.classList.add('discount')
            discountPercentage.textContent =discount.toFixed(2)+ '% Off';
            pricingDiv.appendChild(discountPercentage);
        }

        productCard.appendChild(pricingDiv);

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('cartBtn')
        productCard.appendChild(addToCartBtn);
        productContainer.appendChild(productCard);
    });
}

const data=fetchProducts('Men')
document.getElementById('menButton').focus()

