import { body } from "express-validator"

export const productValidation = [
    body('title', 'Введите название товара').isLength({ min: 1, max: 50}).isString(),
    body('category', 'Выберите категорию').isLength({ min: 1 }).isString(),
    body('description', 'Введите описание товара').isLength({ min: 1 }).isString(),
    body('price', 'Введите цену на товар').isNumeric().custom(value => value >= 0),
    body('pictureUrl', 'Неверная ссылка на изображение').isLength({ min: 1 }).isString(),
    body('amount', 'Введите количество продуктов на складе (число)').isNumeric().custom(value => value >= 0)
]