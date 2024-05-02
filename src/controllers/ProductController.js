import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
    try {
        const doc = new Product({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            pictureUrl: req.body.pictureUrl,
            amount: req.body.amount,
        });

        const product = await doc.save();

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось добавить товар"
        });
    };
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Товар не найден",
            });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа"
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;
        
        const products = await Product.find().limit(limit);

        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить товары"
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Товар не найден",
            });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа"
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.body._id, req.body, {new: true})

        if (!product) {
            return res.status(404).json({
                message: "Товар не найден",
            });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа"
        });
    }
}