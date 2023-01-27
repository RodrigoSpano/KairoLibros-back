import { Router } from "express";
import * as controllers from '../../controllers/products/productsController'
import { isAdmin } from "../../utilities/middlewares/authMiddlewares";
import * as middlewares from '../../utilities/middlewares/productsMiddlewares'
const router = Router()

router.get('/', controllers.getProducts)
router.get('/:id', middlewares.verifyExists,controllers.getOneProduct)
router.get('/gender/:gender', controllers.getProductsByGender)
router.post('/', isAdmin,controllers.createProduct)
router.put('/price/:id', isAdmin, controllers.updatePrice)
router.put('/stock/:id', isAdmin, controllers.updateStock)
router.put('/popular/:id', isAdmin, controllers.togglePopular)
router.put('/sale/:id', isAdmin, controllers.toggleSale)
router.delete('/:id', isAdmin, controllers.deleteOne)


export default router;