const Order = require("../models/orderModel");
const Button = require("../models/buttonModel");
const Notification = require("../models/notificationModel");
const Shopify = require("../models/shopifyModel");

module.exports.createOrder = async (req, res) => {
  const { buttonToken, amount, quantity, description } = req.body;
  const data = req.body;

  const validateProducts = (products) => {
    let errors = [];

    products.forEach((product, index) => {
      if (!product.name || product.name.trim() === "") {
        errors.push({
          index: index,
          field: "name",
          message: "Nome do produto não pode estar vazio.",
        });
      }

      if (
        !Number.isInteger(parseInt(product.quantity)) ||
        product.quantity <= 0
      ) {
        errors.push({
          index: index,
          field: "quantity",
          message: "Quantidade deve ser um número inteiro positivo.",
        });
      }

      if (isNaN(product.price) || product.price <= 0) {
        errors.push({
          index: index,
          field: "price",
          message: "Preço deve ser um número positivo.",
        });
      }
    });

    if (errors.length > 0) {
      return { errors: errors, there: true };
    } else {
      return {
        message: "Todos os produtos estão corretamente formatados.",
        there: false,
      };
    }
  };

  const result = validateProducts(data.orderItems);

  if (result.there) {
    return res.json({ status: false, error: result.errors });
  }

  const totalAmount = data.orderItems.reduce((total, item) => {
    return total + parseFloat(item.price) * parseFloat(item.quantity);
  }, 0);

  const totalItems = data.orderItems.reduce((total, item) => {
    return total + parseInt(item.quantity);
  }, 0);

  const [buttonInfo] = await Button.findByToken(buttonToken);

  const order = {
    buttonToken: data.buttonToken,
    products: totalItems,
    description: "None desc.",
    totalAmount,
    orderStatus: "pending",
    userId: buttonInfo[0].userId || null,
  };

  const orderItems = data.orderItems;

  if (buttonInfo[0].status != true) {
    return res.json({ err: "botton not valid" });
  } else {
    try {
      const [insertResult] = await Order.create(order);

      const [insertResulty] = await Order.saveOrderItems(
        orderItems,
        insertResult.insertId
      );
      if (insertResult.affectedRows === 1) {
        const maxAge = 3 * 24 * 60 * 60 * 1000;
        res.cookie("orderid", "13", { httpOnly: true, maxAge });

        //const [insertResultyy] =  await Notification.create(Notification.notifications(0),insertResult.insertId)

        return res.json({
          orderId: insertResult.insertId,
          buttonToken: buttonInfo[0].buttonToken,
          status: true,
        });
      } else {
        return res.status(500).json({ error: "Order creation failed" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports.updateOrder = async (req, res) => {
  const { orderid, status } = req.body;

  const buttonInfo = await Button.findByToken(bottontoken);

  if (buttonInfo.status != true) {
    return res.json({ err: "botton not valid" });
  }

  try {
    const [updateResult] = await Order.update(orderid, { status });

    if (updateResult.affectedRows === 1) {
      return res.status(200).json({ message: "Order updated" });
    } else {
      return res.status(500).json({ error: "Order update failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports.createShopifyOrder = async (req, res) => {
  const data = req.body;

  const { buttonToken } = req.body;
  try {
    const [buttonInfo] = await Button.findByToken(data.buttonToken);

    let [a] = await Shopify.findByUserId(buttonInfo[0].userId);
    const items = [];
    for (let i = 0; i < data.rid.length; i++) {
      let product = await Shopify.findVariantProductById(
        data.rid[i],
        a[0].urlShopify,
        a[0].accessTokenShopify
      );

      items.push({
        img: product.image,
        name: product.title,
        price: product.price,
        quantity: 1,
        productId: product.product_id,
        variantId: product.id,
      });
    }

    //  return res.json({items})
    const validateProducts = (products) => {
      let errors = [];

      products.forEach((product, index) => {
        if (!product.name || product.name.trim() === "") {
          errors.push({
            index: index,
            field: "name",
            message: "Nome do produto não pode estar vazio.",
          });
        }

        if (
          !Number.isInteger(parseInt(product.quantity)) ||
          product.quantity <= 0
        ) {
          errors.push({
            index: index,
            field: "quantity",
            message: "Quantidade deve ser um número inteiro positivo.",
          });
        }

        if (isNaN(product.price) || product.price <= 0) {
          errors.push({
            index: index,
            field: "price",
            message: "Preço deve ser um número positivo.",
          });
        }
      });

      if (errors.length > 0) {
        return { errors: errors, there: true };
      } else {
        return {
          message: "Todos os produtos estão corretamente formatados.",
          there: false,
        };
      }
    };

    const result = validateProducts(items);
    if (result.there) {
      return res.json({ status: false, error: result.errors });
    }

    const totalAmount = items.reduce((total, item) => {
      return total + parseFloat(item.price) * parseFloat(item.quantity);
    }, 0);

    const totalItems = items.reduce((total, item) => {
      return total + parseInt(item.quantity);
    }, 0);

    const order = {
      buttonToken: data.buttonToken,
      products: totalItems,
      description: "None desc.",
      totalAmount,
      orderStatus: "pending",
      userId: buttonInfo[0].userId || null,
    };

    if (buttonInfo[0].status != true) {
      return res.json({ err: "botton not valid" });
    } else {
      try {
        const [insertResult] = await Order.create(order);

        const [insertResulty] = await Order.saveOrderItems(
          items,
          insertResult.insertId
        );
        if (insertResult.affectedRows === 1) {
          const maxAge = 3 * 24 * 60 * 60 * 1000;
          res.cookie("orderid", "13", { httpOnly: true, maxAge });

          //const [insertResultyy] =  await Notification.create(Notification.notifications(0),insertResult.insertId)

          console.log(req.body.rid[0]);
          return res.json({
            orderId: insertResult.insertId,
            buttonToken: buttonInfo[0].buttonToken,
            rid: data.rid,
            status: true,
          });
        } else {
          console.log("erro1");
          return res.status(500).json({ error: "Order creation failed" });
        }
      } catch (error) {
        console.log("erro");
        console.error(error);
        return res.status(500).json({ error: "Server error" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports.createOrderbyLink = async (req, res) => {
  const { buttonToken, amount, quantity, description } = req.body;
  const data = req.body;

  const validateProducts = (products) => {
    let errors = [];

    products.forEach((product, index) => {
      if (!product.name || product.name.trim() === "") {
        errors.push({
          index: index,
          field: "name",
          message: "Nome do produto não pode estar vazio.",
        });
      }

      if (
        !Number.isInteger(parseInt(product.quantity)) ||
        product.quantity <= 0
      ) {
        errors.push({
          index: index,
          field: "quantity",
          message: "Quantidade deve ser um número inteiro positivo.",
        });
      }

      if (isNaN(product.price) || product.price <= 0) {
        errors.push({
          index: index,
          field: "price",
          message: "Preço deve ser um número positivo.",
        });
      }
    });

    if (errors.length > 0) {
      return { errors: errors, there: true };
    } else {
      return {
        message: "Todos os produtos estão corretamente formatados.",
        there: false,
      };
    }
  };

  const result = validateProducts(data.orderItems);

  if (result.there) {
    return res.json({ status: false, error: result.errors });
  }

  const totalAmount = data.orderItems.reduce((total, item) => {
    return total + parseFloat(item.price) * parseFloat(item.quantity);
  }, 0);

  const totalItems = data.orderItems.reduce((total, item) => {
    return total + parseInt(item.quantity);
  }, 0);

  const [buttonInfo] = await Button.findByToken(buttonToken);

  const order = {
    buttonToken: data.buttonToken,
    products: totalItems,
    description: "None desc.",
    totalAmount,
    orderStatus: "pending",
    userId: buttonInfo[0].userId || null,
  };

  const orderItems = data.orderItems;

  if (buttonInfo[0].status != true) {
    return res.json({ err: "botton not valid" });
  } else {
    try {
      const [insertResult] = await Order.create(order);

      const [insertResulty] = await Order.saveOrderItems(
        orderItems,
        insertResult.insertId
      );
      if (insertResult.affectedRows === 1) {
        const maxAge = 3 * 24 * 60 * 60 * 1000;
        res.cookie("orderid", "13", { httpOnly: true, maxAge });

        //const [insertResultyy] =  await Notification.create(Notification.notifications(0),insertResult.insertId)

        return res.json({
          orderId: insertResult.insertId,
          buttonToken: buttonInfo[0].buttonToken,
          status: true,
        });
      } else {
        return res.status(500).json({ error: "Order creation failed" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports.createWoocommerceOrder = async (req, res) => {};

module.exports.createWixOrder = async (req, res) => {};
