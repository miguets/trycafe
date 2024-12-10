const express = require("express");
const router = express.Router();

const products = [
    { "id": 1, "name": "Café Espresso", "price": 27 },
    { "id": 2, "name": "Café Americano", "price": 29 },
    { "id": 3, "name": "Café Latte", "price": 32 },
    { "id": 4, "name": "Café Capuccino", "price": 33 },
    { "id": 5, "name": "Café Mocha", "price": 34 },
    { "id": 6, "name": "Café Cortado", "price": 28 },
    { "id": 7, "name": "Café Macchiato", "price": 30 },
    { "id": 8, "name": "Café Con Leche", "price": 31 },
    { "id": 9, "name": "Café Caramelizado", "price": 35 },
    { "id": 10, "name": "Café de Olla", "price": 27 },
    { "id": 11, "name": "Café Frappé", "price": 36 },
    { "id": 12, "name": "Café Vienés", "price": 37 },
    { "id": 13, "name": "Café de Nuez", "price": 39 },
    { "id": 14, "name": "Café Hazelnut", "price": 40 },
    { "id": 15, "name": "Café Chocolate", "price": 42 },
    { "id": 16, "name": "Café Latte Vainilla", "price": 44 },
    { "id": 17, "name": "Café Cold Brew", "price": 45 },
    { "id": 18, "name": "Café Tiramisu", "price": 48 },
    { "id": 19, "name": "Café Espresso Con Leche", "price": 50 },
    { "id": 20, "name": "Café Affogato", "price": 56 }
];

// Ruta para mostrar los productos
router.get("/", (req, res) => {
    res.render("home", { products });
});

// Ruta para agregar un producto al carrito
router.post("/add-to-cart", (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id == productId);

    if (!product) {
        return res.status(400).send("Producto no encontrado");
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(product);
    res.redirect("/cart");
});

// Ruta para ver el carrito
router.get("/cart", (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    res.render("cart", { cart, total });
});

// Ruta para eliminar un producto del carrito
router.post("/remove-from-cart", (req, res) => {
    const { productId } = req.body;

    console.log("Eliminar producto con ID:", productId); // Verifica que el ID sea recibido correctamente

    if (!req.session.cart) {
        return res.redirect("/cart");
    }

    // Eliminar el producto con el ID recibido del carrito
    req.session.cart = req.session.cart.filter(p => p.id != productId);

    // Redirigir al carrito actualizado
    res.redirect("/cart");
});



module.exports = router;
