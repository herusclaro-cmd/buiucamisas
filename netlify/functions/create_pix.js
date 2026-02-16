exports.handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método não permitido" })
    };
  }

  try {

    const { amount } = JSON.parse(event.body);

    if (!amount || isNaN(amount)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Valor inválido" })
      };
    }

    // 🔐 Pega chave da Evopay das variáveis do Netlify
    const API_KEY = process.env.EVOPAY_API_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "EVOPAY_API_KEY não configurada" })
      };
    }

    // 🔥 CHAMADA REAL PARA EVOPAY
    const response = await fetch("https://api.evopay.com.br/v1/pix/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        description: "Pedido Lirou Jerseys",
        expires_in: 3600
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        pix_code: data.pix_copy_paste,
        qr_code: data.qr_code_image,
        transaction_id: data.id
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
-