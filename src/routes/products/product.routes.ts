import { Router } from "express";
import * as controllers from '../../controllers/products/productsController'
import * as middlewares from '../../utilities/middlewares/productsMiddlewares'
const router = Router()

router.get('/', controllers.getProducts)
router.get('/:id', controllers.getOneProduct)
router.get('/gender/:gender', controllers.getProductsByGender)
router.post('/', middlewares.verifyExists, controllers.createProduct)
router.put('/price/:id', controllers.updatePrice)
router.put('/popular/:id', controllers.togglePopular)
router.put('/sale/:id', controllers.toggleSale)
router.delete('/:id', controllers.deleteOne)

export default router;