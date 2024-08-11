import express from "express";
import {
  getFeedProducts,
  getUserProducts,
  getProductDetails,
  deleteProduct,
  updateProduct,
} from "../controllers/products.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", getFeedProducts);
router.get("/:userId/products", getUserProducts);
router.get("/:productId/product", getProductDetails);

/*UPDATE*/
// router.patch("/:id/like", verifyToken, likeProduct);
router.patch("/:productId/update", verifyToken, updateProduct); // Define the update route

/* DELETE */
router.delete("/:userId/:productId/delete", verifyToken, deleteProduct);

export default router;
