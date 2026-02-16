fetch("/.netlify/functions/create_pix", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    amount: storedProduct.price,
    name: storedProduct.name
  })
})
