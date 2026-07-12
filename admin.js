async function loadOrders(){

    const {data, error} = await supabaseClient
    .from("orders")
    .select("*")
    .order("created_at", {ascending:false});


    if(error){

        console.log(error);
        return;

    }


    const table =
    document.getElementById("orders-table");


    if(!table) return;


    table.innerHTML = "";


    data.forEach(order => {


        table.innerHTML += `

        <tr>

            <td class="p-2">
            ${order.order_id}
            </td>

            <td class="p-2">
            ${order["Customer name"]}
            </td>

            <td class="p-2">
            ${order["Phone Number"]}
            </td>

            <td class="p-2">
            ${order["Product name"]}
            </td>

            <td class="p-2">
            ${order["Order status"]}
            </td>

            <td class="p-2">

            <button 
            onclick="updateOrderStatus('${order.order_id}')"
            class="bg-black text-white px-3 py-1">

            Update

            </button>

            </td>

        </tr>

        `;


    });


}



async function updateOrderStatus(id){


    const status = prompt(
        "New status লিখুন (Processing/Shipped/Delivered)"
    );


    if(!status) return;



    const {error} =
    await supabaseClient
    .from("orders")
    .update({

        "Order status": status

    })
    .eq("order_id", id);



    if(error){

        alert(error.message);

        return;

    }


    alert("Status Updated");


    loadOrders();


}



document.addEventListener(
"DOMContentLoaded",
loadOrders
);