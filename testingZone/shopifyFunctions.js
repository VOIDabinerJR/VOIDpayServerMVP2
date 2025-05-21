console.log(req.body.rid)


const orderData = {
  order: {
    line_items: [
      {
        variant_id: req.body.rid, // ID da variante do produto (obtido da resposta anterior)
        quantity: 1 // Quantidade a ser adicionada ao pedido
      }
    ],
    customer: {
      email: 'cliente@example.com' // Email do cliente (substitua pelo real)
    },
    financial_status: 'paid', // Definindo o status financeiro como pago
    transactions: [
      {
        kind: 'sale',
        status: 'success',
        amount: 100.00 // Valor total do pedido
      }
    ],
    shipping_address: {
      first_name: "John",
      last_name: "Doe",
      address1: "123 Main Street",
      phone: "555-555-5555",
      city: "Anytown",
      province: "ON",
      country: "Canada",
      zip: "A1A 1A1"
    },
    billing_address: {
      first_name: "John",
      last_name: "Doe",
      address1: "123 Main Street",
      phone: "555-555-5555",
      city: "Anytown",
      province: "ON",
      country: "Canada",
      zip: "A1A 1A1"
    }
  }
};
