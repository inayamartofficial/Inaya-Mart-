function toggleCart(open){

    const sidebar =
    document.getElementById("cart-sidebar");


    if(!sidebar) return;


    if(open){

        sidebar.classList.remove("hidden");

    }else{

        sidebar.classList.add("hidden");

    }

}



function showOrderForm(){

    const form =
    document.getElementById("order-form");


    const btn =
    document.getElementById("checkout-btn");


    if(form){

        form.classList.remove("hidden");

        form.style.display="block";

    }


    if(btn){

        btn.style.display="none";

    }

}



function closeSuccessModal(){

    const modal =
    document.getElementById("success-modal");


    if(modal){

        modal.classList.add("hidden");

    }

}




function startAbandonedTimer(){

    clearTimeout(window.abandonedTimer);


    window.abandonedTimer =
    setTimeout(
        saveAbandonedCart,
        10000
    );

}





function updateTotalCosts(){

    const locationElement =
    document.getElementById('cust-location');


    let deliveryFee = 0;


    if(locationElement){

        deliveryFee =
        locationElement.value === "outside"
        ? 150
        : 80;

    }



    let subtotal = 0;


    if(typeof cart !== "undefined"){

        subtotal =
        cart.reduce(
            (sum,item)=>
            sum + item.price * item.quantity,
            0
        );

    }




    let total =
    subtotal > 0
    ? subtotal + deliveryFee
    : 0;



    const subtotalEl =
    document.getElementById('cart-subtotal');


    const deliveryEl =
    document.getElementById('cart-delivery_fee');


    const totalEl =
    document.getElementById('cart-total');



    if(subtotalEl){

        subtotalEl.innerText =
        `৳ ${subtotal} BDT`;

    }



    if(deliveryEl){

        deliveryEl.innerText =
        `৳ ${subtotal > 0 ? deliveryFee : 0} BDT`;

    }



    if(totalEl){

        totalEl.innerText =
        `৳ ${total} BDT`;

    }

}





document.addEventListener(
"DOMContentLoaded",
()=>{


    const name =
    document.getElementById("cust-name");


    const phone =
    document.getElementById("cust-phone");


    const address =
    document.getElementById("cust-address");



    if(name){

        name.addEventListener(
            "input",
            startAbandonedTimer
        );

    }



    if(phone){

        phone.addEventListener(
            "input",
            startAbandonedTimer
        );

    }



    if(address){

        address.addEventListener(
            "input",
            startAbandonedTimer
        );

    }




    if(typeof renderCart === "function"){

        renderCart();

    }


});