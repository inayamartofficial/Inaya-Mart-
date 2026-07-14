async function trackOrder(){

    const orderId = document
        .getElementById("tracking-id")
        .value
        .trim();


    if(!orderId){

        alert("Order ID দিন");

        return;
    }


    const {data, error} =
    await supabaseClient
    .from("orders")
    .select("*")
    .eq("order_id", orderId);


    if(error){

        console.log(error);

        alert("Tracking error");

        return;
    }


    if(!data || data.length === 0){

        document.getElementById("tracking-result")
        .innerHTML =
        `
        <p class="text-red-500">
        Order পাওয়া যায়নি
        </p>
        `;

        return;
    }


    const order = data[0];


    document.getElementById("tracking-result")
    .innerHTML =
    `
    <div class="border p-4">

        <h3 class="font-bold">
        Order ID: ${order.order_id}
        </h3>

        <p>
        Status:
        <strong>
        ${order["Order status"]}
        </strong>
        </p>

        <p>
        Product:
        ${order["Product name"]}
        </p>

    </div>
    `;

}