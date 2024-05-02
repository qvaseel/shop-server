import { Router } from "express";
import * as ProductController from "../controllers/ProductController.js"
import { productValidation } from "../validations/product.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const router = Router()

router.get('/products', ProductController.getAllProducts); //получение всех продуктов
router.post('/products', productValidation, handleValidationErrors, ProductController.addProduct); //создание продукта
router.get('/products/:id', ProductController.getProductById); //получение продукта по id
router.delete('/products/:id', ProductController.deleteProduct); //удаление товара по id
router.put('/products', ProductController.updateProduct) //обновление товара

export default router;