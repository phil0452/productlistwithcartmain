let content = [
    {
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
];

var obj= {};
const confirmOrderButton = document.querySelector("#confirm_order");
const modaldialog = document.querySelector('.modal');

let cartItems = [];

   // Create a NumberFormat instance for US dollars
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function startOrder(){
    window.location.reload()
}

document.addEventListener("DOMContentLoaded", ()=>{
    saveItemToLocalStorage(cartItems)
    
})

window.onload = function () {    
    try {
        obj  = JSON.parse(JSON.stringify(content));
    } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the payload
        // So just return that
        alert("Error reading json data." + e.log);
    }

    FillDessertItemContent(obj);   
    document.getElementById("item_count").innerHTML = 0;
}

window.addEventListener('resize', () => {
    console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
    FillDessertItemContent(obj);   
},true);

function FillDessertItemContent(obj) {  
    debugger;
    let content = document.getElementById("desset_menu").innerHTML.trim();
     if(document.getElementById("desset_menu").innerHTML.trim() != "") { return;}

    //loop through each item on the dessert menu     
    obj.forEach(function(element) {
        console.log(element.name);
        
        let dessertImage = MenuDessertImage(element.name, element.image);
        let addToCartContainer = AddToCartContainer(element.name);
    
        //create the dessert item container for each dessert on the menu
        let dessertItemDIV = document.createElement("div");
        dessertItemDIV.classList.add("dessert_item");
        dessertItemDIV.appendChild(dessertImage);
        dessertItemDIV.appendChild(addToCartContainer);        

        let qtyContainer = QtyContainer(element.name);
        dessertItemDIV.appendChild(qtyContainer);        

        let itemInfo = ItemInfo(element.category, element.name, element.price);
        dessertItemDIV.appendChild(itemInfo);

        document.getElementById("desset_menu").appendChild(dessertItemDIV);
    })

    const menuItems= document.querySelectorAll('.add_to_cart_button')

    menuItems.forEach((item)=>{
        item.addEventListener('click', () => {
            //get the price, dessert category name and other information
            // for a dessert's div containers
            const counter = item.nextElementSibling;
            let category = counter.nextElementSibling.children[1].textContent;
            let price = counter.nextElementSibling.children[2].textContent;
            let desserImage = item.previousElementSibling
            let imageThumbnail = desserImage.dataset.thumbnailImg
            debugger;
            price = parseFloat(price.replace('$', ''))

            item.classList.remove("active");
            counter.classList.remove("inactive");
            counter.classList.add("active");

            let count = 1
            if(counter){
                if (!desserImage.classList.contains("selected")) {desserImage.classList.add("selected"); }
                counter.children[1].textContent = count;
                //add qty event listener
                counter.children[2].addEventListener('click', function(){
                    count++                    
                    AddCartItem(category, price, count, imageThumbnail)
                    counter.children[1].textContent = count

                })
                //substract qty event listener
                counter.children[0].addEventListener('click', function(){
                    if(count > 1){                        
                        count--
                        AddCartItem(category, price, count, imageThumbnail)
                        counter.children[1].textContent = count
                    }else{
                        counter.children[1].textContent = 1
                    }
                })
                
            }
            
            AddCartItem(category, price, count, imageThumbnail)
        })
    })

}

function MenuDessertImage (name, image) {
    //create the image element for the dessert image
    let dessertImage = document.createElement('img');
    dessertImage.classList.add("dessert_image");

    if (window.screen.width > 720){
        dessertImage.src = image.desktop;
    }
    else if (window.screen.width > 475){
        dessertImage.src = image.tablet;
    }
    else {            
        dessertImage.src = image.mobile;
    }

    dessertImage.setAttribute("alt", name);
    dessertImage.setAttribute("data-thumbnail-img", image.thumbnail);

    return dessertImage;
}

function AddToCartContainer(name) {
    //create the elements for the "add to cart" button
    let addToCartIcon = document.createElement('img');
    addToCartIcon.src = "./assets/images/icon-add-to-cart.svg";
    addToCartIcon.setAttribute("alt", "add to cart");

    let addToCartSpan = document.createElement('span');
    addToCartSpan.textContent = "Add to Cart";

    let addToCartDIV = document.createElement("div");
    addToCartDIV.classList.add("button", "add_to_cart_button", "bg_color_white", "text_color_rose_900", "font_weight_600", "active");
    addToCartDIV.appendChild(addToCartIcon);
    addToCartDIV.appendChild(addToCartSpan);
    addToCartDIV.setAttribute("data-product-name", name);

    return addToCartDIV;
}

function QtyContainer(name) {
    //create the elements for the qty container button (- and +)
    let subtractButton = document.createElement("button");
    subtractButton.classList.add("qty_button", "qty_subtract_button","bg_color_red");

    let subtractImage = document.createElement("img");
    subtractImage.src = "./assets/images/icon-decrement-quantity.svg";
    subtractButton.appendChild(subtractImage);

    let qtySpan = document.createElement('span');
    qtySpan.classList.add("item_qty");
    qtySpan.setAttribute("data-product-name", name);

    let addButton = document.createElement("button");
    addButton.classList.add("qty_button", "qty_add_button","bg_color_red");

    let addImage = document.createElement("img");
    addImage.src = "./assets/images/icon-increment-quantity.svg";
    addButton.appendChild(addImage);

    //create the cotainer that holds the add button, subtract button
    // and the qty span
    let qtyContainerDIV = document.createElement("div");
    qtyContainerDIV.classList.add("button", "qty_container","bg_color_red", "text_color_white", "font_weight_600", "inactive");
    qtyContainerDIV.appendChild(subtractButton);
    qtyContainerDIV.appendChild(qtySpan);
    qtyContainerDIV.appendChild(addButton);
    qtyContainerDIV.setAttribute("data-product-name", name);

    return qtyContainerDIV;
}

function ItemInfo(category, dessertName, dessertPrice) {
    //create the elements and container for each items information
    let name = document.createElement("p");
    name.classList.add("name", "text_color_rose_300", "font_weight_400");
    name.textContent = category;

    let fullName = document.createElement("p");
    fullName.classList.add("full_name", "text_color_rose_900", "font_weight_600");
    fullName.textContent = dessertName;
    
    let price = document.createElement("p");
    price.classList.add("price", "text_color_red", "font_weight_600");
    price.textContent = USDollar.format(dessertPrice);

    let itemInfo = document.createElement("div");
    itemInfo.classList.add("item_info");
    itemInfo.appendChild(name);
    itemInfo.appendChild(fullName);
    itemInfo.appendChild(price);

    return itemInfo;
}

function AddCartItem(name, price, qty, image) {
    document.querySelector('#cart_empty').style.display = 'none';
    cartItems = getItemFromLocalStorage()
       
    if(cartItems ){
        //there is a cart to add items too
        let item = cartItems.find(item => item.name === name);

        if (item){
            //the dessert item was found, update the qty
            item.quantity = qty;
        }
        else {
            //new item added
            cartItems.push({
                name: name,
                price: price,
                quantity: 1,
                image: image
            })
        }
        
        saveItemToLocalStorage(cartItems);
        
        ShowCartItem({name: name, price: price, quantity: item? item.quantity : qty});
        UpdateCartNumber();
        DisplayItemsTotal("cart_total_container", '#cart_total');
    }
  
}

function UpdateCartNumber(){
    const products = getItemFromLocalStorage()
    //use the reduce array function to get the total qty
  const totalQuantity = products.reduce( function(total, products){
    return total + products.quantity;
  }, 0);

    const cartNumber = document.querySelector('#item_count')
    if(cartNumber){ cartNumber.textContent = totalQuantity; }
}

function DisplayItemsTotal(totalType, totalID){
    const products = getItemFromLocalStorage()
    //use the reduce array function to get the total price for each item
    const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0)
    
    const total = document.querySelector(totalID)
    if(total){ total.textContent = USDollar.format(totalAmount); }

    if (totalType == "cart_total_container") {
        const itemTotalContainer = document.querySelector('#cart_total_container')
        itemTotalContainer.classList.remove("inactive");
        itemTotalContainer.classList.add("item_flex");

        const delivery_message = document.querySelector('#delivery_message')
        delivery_message.classList.remove("inactive");
        delivery_message.classList.add("active");  
    }
}

function RemoveCartItem(name) {
    const products = getItemFromLocalStorage();
    //use filter function to keep dessert items whose name isn't the one selected
    const updatedcartItems = products.filter(product => product.name !== name);
    
    saveItemToLocalStorage(updatedcartItems);
    //search the html for the dessert item to remove
    const item = document.querySelector(`.item_container[data-product-name="${name}"]`);
    if (item) {
        item.remove();
        DisplayItemsTotal("cart_total_container", '#cart_total');
        //the qty in the menu section needs to be reset
        const qtySpan = document.querySelector(`span[data-product-name="${name}"]`);

        if(qtySpan){
            qtySpan.textContent = 1;
            document.querySelector(`.qty_container[data-product-name="${name}"]`).classList.remove("active");
            document.querySelector(`.qty_container[data-product-name="${name}"]`).classList.add("inactive");

            document.querySelector(`.add_to_cart_button[data-product-name="${name}"]`).classList.remove("inactive");
            document.querySelector(`.add_to_cart_button[data-product-name="${name}"]`).classList.add("active");
        }
    }
    
    if (updatedcartItems.length === 0) {
        const emptyCart = document.querySelector('#cart_empty')
        emptyCart.style.display = 'block'
        startOrder()

    }
     UpdateCartNumber()

     const cartTotal = updatedcartItems.reduce(function (total, product) {
        return total + (product.price * product.quantity)
     }, 0)
     debugger;
     document.querySelector('#checkout_total').textContent = USDollar.format(cartTotal);
}

function ShowCartItem(product){
    
    const cartProduct = document.querySelector('#cart')
    cartProduct.style.display = 'block'
    let item = document.querySelector(`.item_container[data-product-name = "${product.name}"]`)
    debugger;
    if(item){
        item.querySelector('.item_qty').textContent = `${product.quantity}x`
        item.querySelector('.item_total').textContent = (product.price * product.quantity).toFixed(2)
    }else{
        //create header for the name
        let header4 = document.createElement('h4');
    
        header4.innerHTML = product.name;
        header4.classList.add("item_name","text_color_rose_900","font_weight_600");

        //create span and p elements for qty and prices       
        let qtySpan = document.createElement('span');
        qtySpan.textContent = `${product.quantity}x`;
        qtySpan.classList.add("item_qty","text_color_red","font_weight_600");

        let itemPriceSpan = document.createElement('span');
        itemPriceSpan.textContent = `@${USDollar.format(product.price)}`;
        itemPriceSpan.classList.add("move_left","text_color_rose_300","font_weight_400");

        let totalPriceSpan = document.createElement('span');
        totalPriceSpan.textContent = USDollar.format(product.quantity * product.price);
        totalPriceSpan.classList.add("move_left", "item_total","text_color_rose_300","font_weight_700");

         let qtyandPriceParagraph = document.createElement('p');
         qtyandPriceParagraph.appendChild(qtySpan);
        qtyandPriceParagraph.appendChild(itemPriceSpan);
        qtyandPriceParagraph.appendChild(totalPriceSpan);

        //create the content div
        let item_content = document.createElement('div');
        item_content.classList.add("item_content")
        item_content.appendChild(header4);
        item_content.appendChild(qtyandPriceParagraph);

        //add the remove icon
        let img = document.createElement('img');
        img.src = "./assets/images/icon-remove-item.svg";

        let remove_button = document.createElement('button');
        remove_button.classList.add("remove_button");
        remove_button.appendChild(img);
        remove_button.addEventListener('click', () => {
            RemoveCartItem(product.name);
        });

        const item = document.createElement('div');
        item.classList.add('cart_item', "item_flex");        
        item.appendChild(item_content);
        item.appendChild(remove_button);

        let hr = document.createElement("hr");
        hr.classList.add("divider");

        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item_container');
        itemContainer.setAttribute("data-product-name", product.name);
        itemContainer.appendChild(item);        
        itemContainer.appendChild(hr)
        
        cartProduct.appendChild(itemContainer);        
    }    
}


function saveItemToLocalStorage(items){
    localStorage.setItem('cartItems', JSON.stringify(items));
}

function getItemFromLocalStorage(){
    const items = JSON.parse(localStorage.getItem('cartItems'));
    return items
}

confirmOrderButton.addEventListener('click', function(e){
    const products = getItemFromLocalStorage();
    const carItemsContainer = document.querySelector("#cartitems");

    carItemsContainer.innerHTML = "";

    products.forEach(function(product){       
        let imageContainer = CreateThumbnailImageContainer(product.name, product.image);
        let nameandPriceContainer = ItemNameandPriceContainer(product.name, product.quantity, product.price);
        let totalPrice = document.createElement("p");
       totalPrice.classList.add("item_total","font_weight_600","align_item_center");
       totalPrice.textContent = `${USDollar.format(product.quantity * product.price)}`;

       let container = document.createElement("div");
       container.appendChild(imageContainer);
       container.appendChild(nameandPriceContainer);

        let itemContentContainer = document.createElement("div");
        itemContentContainer.classList.add("checkout_Item_Content", "item_flex");
        itemContentContainer.appendChild(container);
        itemContentContainer.appendChild(totalPrice);

        let hr = document.createElement("hr");
        hr.classList.add("divider");

        let itemContainer = document.createElement("div");
        itemContainer.classList.add("checkout_Item");
        itemContainer.appendChild(itemContentContainer);
        itemContainer.appendChild(hr);

        carItemsContainer.appendChild(itemContainer);
    })
debugger;
    //let toggleValue = e.target.getAttribute("data-toggle");
    DisplayItemsTotal("confirm_order_total", '#checkout_total');
        modaldialog.classList.remove("hidden");
        modaldialog.classList.add("visible");
    
})

window.onclick = function(event) {
  if (event.target == modaldialog) {
    modaldialog.classList.remove("visible");
        modaldialog.classList.add("hidden");
  }
}

function CreateThumbnailImageContainer(name, thumbnail){
    let image = document.createElement("img");
    image.src = thumbnail;
    image.classList.add("checkout_Item_thumbnail");
    image.setAttribute("alt", name);

    let container = document.createElement("div");
    container.appendChild(image);

    return container;
}

function ItemNameandPriceContainer(name, qty, price) {
    let header = document.createElement("h4");
    header.classList.add("item_name","text_color_rose_900","font_weight_600","truncate");
    header.textContent = name;

    let qtySpan = document.createElement("span");
    qtySpan.classList.add("item_qty","text_color_red","font_weight_600");
    qtySpan.textContent = `${qty}x`;

    let priceSpan = document.createElement("span");
    priceSpan.classList.add("item_price","text_color_rose_300","font_weight_400");
    priceSpan.textContent = `@${USDollar.format(price)}`;

    let priceandQty = document.createElement("p");
    priceandQty.appendChild(qtySpan);
    priceandQty.appendChild(priceSpan);

    let container = document.createElement("div");
    container.classList.add("move_left");
    container.appendChild(header);
    container.appendChild(priceandQty);

    return container;
}