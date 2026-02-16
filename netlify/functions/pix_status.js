exports.handler = async (event) => {

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método não permitido" })
    };
  }

  try {

    const { id } = event.queryStringParameters;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "ID não informado" })
      };
    }

    const API_KEY = process.env.EVOPAY_API_KEY;

    const response = await fetch(`https://api.evopay.com.br/v1/pix/status/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: data.status
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
