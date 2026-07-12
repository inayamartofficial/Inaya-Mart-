let isSubmitting = false;


async function submitOrder() {

    if (isSubmitting) return;

    isSubmitting = true;


    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const address = document.getElementById('cust-address').value.trim();


    const location =
    document.getElementById('cust-location').value;


    const deliveryFee =
    location === "outside" ? 150 : 80;


    if(!name || !phone || !address){

        alert("⚠️ নাম, ফোন এবং ঠিকানা পূরণ করুন");

        isSubmitting = false;
        return;
    }


    if(cart.length === 0){

        alert("⚠️ Cart empty");

        isSubmitting = false;
        return;
    }



    const orderId =
    "IM-" + Math.floor(10000 + Math.random()*90000);



    const ordersData = cart.map(item => ({

        order_id: orderId,

        "Customer name": name,

        "Phone Number": phone,

        "Address": address,

        "Product name": item.name,

        "Product id": item.id,

        Quantity: item.quantity,

        "Unit price": item.price,

        "Total price":
        (item.price * item.quantity) + deliveryFee,

        delivery_fee: deliveryFee,

        "Order status": "Pending"

    }));



    const {error} =
    await supabaseClient
    .from("orders")
    .insert(ordersData);



    if(error){

        alert(error.message);

        isSubmitting = false;
        return;
    }



    document.getElementById('display-order-id')
    .innerText = "#" + orderId;


    document
    .getElementById('success-modal')
    .classList.remove('hidden');



    cart = [];

    renderCart();


    isSubmitting = false;

}




async function saveAbandonedCart(){

    if(cart.length === 0) return;


    const totalPrice =
    cart.reduce(
        (sum,item)=>
        sum + item.price*item.quantity,
        0
    );


    const {error} =
    await supabaseClient
    .from("abandoned_carts")
    .insert({

        "Cart data": cart,

        "Total price": totalPrice,

        "Status": "Pending"

    });


    if(error){

        console.log(error);

    }

}