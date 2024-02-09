import { Response, Request } from "express";
import { cacheService } from "../services/cache-service";

class ProductsController {
    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await cacheService.products();
            res.status(200).json({
                products: products,
                status: 0,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default new ProductsController();
