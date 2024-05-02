import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import router from "./router/router.js";
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db ok"))
  .catch((err) => console.log("db ne ok", err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('src/uploads')) {
      fs.mkdirSync('src/uploads')
    }
    cb(null, "src/uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use('/src/uploads', express.static('src/uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/src/uploads/${req.file?.originalname}`,
    });
});

app.listen(process.env.PORT || 45455, (err) => {
    if (err) {
        return console.error(err);
    }
});

// app.get('/products', ProductController.getAllProducts); //получение всех продуктов
// app.post('/products', productValidation, handleValidationErrors, ProductController.addProduct); //создание продукта
// app.get('/products/:id', ProductController.getProductById); //получение продукта по id
// app.delete('/products/:id', ProductController.deleteProduct); //удаление товара по id
// app.put('/products', ProductController.updateProduct) //обновление товара
