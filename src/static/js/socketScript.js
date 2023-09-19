var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

socket.emit('create_charge', true);

socket.on("charge_response", (chargeData) => {
    const qrContainer = document.getElementById("qr-container")
    const codeCopyContainer = document.getElementById("code-copy-container")
   

    qrContainer.innerHTML = `
    <div><img height="300px"  width="100%" src="data:image/jpeg;base64, ${chargeData.QR_BASE64}"/></div>
            
    `

    codeCopyContainer.innerHTML = `
    <div class="pix-code-container"><span class="pix-code"> ${chargeData.code}...</span> </div>
    `
})

socket.on("charge_status", (charge_status) => {
    console.log(charge_status)
})

socket.on("confirm-paid", (comfirm) => {
    console.log(comfirm)
    window.location.replace("/paid")
})



