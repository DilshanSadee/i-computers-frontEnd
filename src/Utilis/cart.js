// const simpleCart = [
//      {
//         productID: 1,
//         name: 'Product 1',
//         price: 25.00,
//         quantity: 1,
//         image: 'https://example.com/product1.jpg'
//       },
//       {
//         productID: 2,
//         name: 'Product 2',
//         price: 40.00,
//         quantity: 2,
//         image: 'https://example.com/product2.jpg'
//       }
//     ]

import toast from "react-hot-toast";




export function getCart(){
    const cartString = localStorage.getItem("cart");

    if(cartString == null){
        localStorage.setItem("cart","[]" )
        
        return[]
    }else{
        const cart = JSON.parse(cartString)
        return cart;
    }
}


export function addToCart(product, quantity){

    const cart = getCart();

    const index = cart.findIndex(
        (item)=>{
            return item.productID === product.productID
        }
    )
    if(index == -1){
        cart.push(
            {
                
                productID: product.productID,
                name: product.name,
                price: product.price,
                labeledPrice : product.labeledPrice,
                quantity: quantity,
                image: product.images[0]
      
            }
        )
        toast.success(`${product.name}"added to cart"`)
    }else{
        const newqty = cart[index].quantity + quantity

        if(newqty <=0){
            cart.splice(index, 1)
            toast.success(`${product.name}"removed from cart"`)
        }else{
            cart[index].quantity = newqty
            toast.success(`updated${product.name}"quantity to ${newqty}"`)
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString)
}

export function emptyCart(){

    localStorage.setItem("cart", "[]")
}

export function getCartTotal (){
    let total = 0;
    const cart = getCart();

    cart.forEach(item => {
        total += item.price * item.quantity
        
    })
    return total;

}