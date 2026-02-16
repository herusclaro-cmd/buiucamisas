let qty = 1;
let price = 199.00;

function changeQty(change) {
    qty += change;
    if(qty < 1) qty = 1;
    if(qty > 10) qty = 10;

    document.getElementById("qty").innerText = qty;
    updateTotal();
}

function updateTotal() {
    let subtotal = price * qty;
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("totalPix").innerText = (subtotal * 0.9).toFixed(2);
}

updateTotal();

// CEP ViaCEP
document.getElementById("cep").addEventListener("blur", async (e)=>{
    let cep = e.target.value.replace(/\D/g,'');
    let res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let data = await res.json();

    if(data.erro){
        alert("CEP inválido");
        return;
    }

    rua.value = data.logradouro;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;
});

async function confirmOrder(){
    document.getElementById("overlay").style.display="flex";

    let total = (price * qty * 0.9).toFixed(2);

    let response = await fetch('/.netlify/functions/create_pix', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({amount: total})
    });

    let data = await response.json();

    setTimeout(()=>{
        document.getElementById("overlay").style.display="none";
        document.getElementById("pixResult").style.display="block";
        document.getElementById("pixAmount").innerText = total;
        document.getElementById("qrCode").src = data.qr_code;
        document.getElementById("pixCode").value = data.pix_code;
    }, 2000);
}

function copyPix(){
    let textarea = document.getElementById("pixCode");
    textarea.select();
    document.execCommand("copy");
    alert("Copiado ✓");
}
