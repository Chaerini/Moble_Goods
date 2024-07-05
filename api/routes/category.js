import express from 'express';
import { getAllMainCategories, getAllSubcategories, getSubcategoriesByMainCategory } from '../controllers/category.js';

const router = express.Router();

router.get('/', getAllMainCategories);
router.get('/subcategory', getAllSubcategories);
router.get('/subcategory-by-main', getSubcategoriesByMainCategory);

export default router;
