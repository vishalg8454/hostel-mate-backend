import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
} from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct,
  (req, res) => {}
);

router.delete("/product/:id", deleteProduct);
export default router;
