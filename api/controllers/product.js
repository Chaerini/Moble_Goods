import pool from '../db.js';

// 상품등록
export const createProduct = async ( req, res ) => {
    const { name, quantity, subCategory_id, discount_rate, price } = req.body;
    console.log(req.body);
    //discounted_price를 계산
    let discounted_price;
    if (discount_rate === 0) {
        discounted_price = price;
    } else {
        discounted_price = Math.round(price * (1 - discount_rate / 100));
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO product (name, quantity, subCategory_id, discount_rate, price, discounted_price, date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [name, quantity, subCategory_id, discount_rate, price, discounted_price]
        );
        
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId, name, quantity, subCategory_id, discount_rate, price, discounted_price });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// 상품수정
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, subCategory_id, discount_rate, price } = req.body;

    try {
        // 현재 값 조회
        const [rows] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingProduct = rows[0];

        // 동적 필드 업데이트
        const fieldsToUpdate = {};
        if (name !== undefined) fieldsToUpdate.name = name;
        if (quantity !== undefined) fieldsToUpdate.quantity = quantity;
        if (subCategory_id !== undefined) fieldsToUpdate.subCategory_id = subCategory_id;
        if (discount_rate !== undefined) fieldsToUpdate.discount_rate = discount_rate;
        if (price !== undefined) fieldsToUpdate.price = price;

        // discounted_price 계산
        const updatedDiscountRate = fieldsToUpdate.discount_rate !== undefined ? fieldsToUpdate.discount_rate : existingProduct.discount_rate;
        const updatedPrice = fieldsToUpdate.price !== undefined ? fieldsToUpdate.price : existingProduct.price;
        fieldsToUpdate.discounted_price = updatedDiscountRate === 0 ? updatedPrice : Math.round(updatedPrice * (1 - updatedDiscountRate / 100));

        // SQL 쿼리 생성
        const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
        const values = [...Object.values(fieldsToUpdate), id];

        const [result] = await pool.query(
            `UPDATE product SET ${setClause} WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ 
            message: 'Product updated successfully', 
            id, 
            name: name || existingProduct.name, 
            quantity: quantity || existingProduct.quantity, 
            subCategory_id: subCategory_id || existingProduct.subCategory_id, 
            discount_rate: updatedDiscountRate, 
            price: updatedPrice, 
            discounted_price: fieldsToUpdate.discounted_price
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// 상품삭제
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM product WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Product deleted successfully' }); 
        } else {
            res.status(404).json({ message: 'Product not found' }); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message }); 
    }
};

// 상품 전체 조회 또는 카테고리별 조회(서브카테고리 아이디 순으로 정렬)
export const getAllProducts = async (req, res) => {
    const { category, subcategory } = req.query;

    let query = `
        SELECT 
            p.id AS id,
            p.name AS name, 
            p.quantity AS quantity, 
            p.discount_rate AS discount_rate, 
            p.price AS price, 
            p.discounted_price AS discounted_price, 
            p.date AS date,
            sc.name AS subCategoryName, 
            sc.id AS subCategoryId,
            mc.name AS mainCategoryName,
            mc.id AS mainCategoryId,
            COALESCE(pi.url, '') AS productImageUrl
        FROM product p
        LEFT JOIN subcategory sc ON p.subcategory_id = sc.id
        LEFT JOIN maincategory mc ON sc.maincategory_id = mc.id
        LEFT JOIN product_image pi ON p.id = pi.product_id
    `;

    const params = [];
    if (subcategory) {
        query += ` WHERE sc.id = ?`;
        params.push(subcategory);
    } else if (category) {
        query += ` WHERE mc.id = ?`;
        params.push(category);
    }
    
    query += ` ORDER BY sc.id, p.id`;  // 서브카테고리 아이디 순으로 정렬

    try {
        const [rows] = await pool.query(query, params);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};


// 특정 id 상품 조회
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.id AS id,
                p.name AS name, 
                p.quantity AS quantity, 
                p.discount_rate AS discount_rate, 
                p.price AS price, 
                p.discounted_price AS discounted_price, 
                p.date AS date,
                sc.name AS subCategoryName, 
                mc.name AS mainCategoryName, 
                pi.url AS productImageUrl
            FROM product p
            LEFT JOIN subcategory sc ON p.subcategory_id = sc.id
            LEFT JOIN maincategory mc ON sc.maincategory_id = mc.id
            LEFT JOIN product_image pi ON p.id = pi.product_id
            WHERE p.id = ?
        `, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

// 상품 특정 메인 카테고리 조회
export const getProductsByMainCategory = async (req, res) => {
    const { mainCategoryId } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT 
                p.id AS id, 
                p.name AS name, 
                p.quantity AS quantity, 
                p.discount_rate AS discount_rate, 
                p.price AS price, 
                p.discounted_price AS discounted_price, 
                p.date AS date,
                sc.name AS subCategoryName, 
                mc.name AS mainCategoryName
            FROM product p
            JOIN subcategory sc ON p.subcategory_id = sc.id
            JOIN maincategory mc ON sc.maincategory_id = mc.id
            WHERE mc.id = ?
            ORDER BY sc.id, p.id;
        `, [mainCategoryId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No products found for this main category' });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// 상품 특정 서브 카테고리 조회
export const getProductsBySubCategory = async (req, res) => {
    const { subCategoryId } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT 
                p.id AS id, 
                p.name AS name, 
                p.quantity AS quantity, 
                p.discount_rate AS discount_rate, 
                p.price AS price, 
                p.discounted_price AS discounted_price, 
                p.date AS date,
                sc.name AS subCategoryName, 
                mc.name AS mainCategoryName
            FROM product p
            JOIN subcategory sc ON p.subcategory_id = sc.id
            JOIN maincategory mc ON sc.maincategory_id = mc.id
            WHERE sc.id = ?
            ORDER BY sc.id, p.id;
        `, [subCategoryId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No products found for this sub category' });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// 낮은 가격순 또는 높은 가격순으로 조회
export const getProductsByPrice = async (req, res) => {
    // 쿼리 파라미터로 정렬 순서를 지정, 기본값은 'asc'
    const { order = 'asc' } = req.query; 
    // 'desc'가 아닌 경우 'asc'로 설정
    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'; 

    try {
        const [rows] = await pool.query(
            `SELECT 
                p.id AS id, 
                p.name AS name, 
                p.quantity AS quantity, 
                p.discount_rate AS discount_rate, 
                p.price AS price, 
                p.discounted_price AS discounted_price, 
                p.date AS date,
                sc.name AS subCategoryName, 
                mc.name AS mainCategoryName, 
                pi.url AS productImageUrl
            FROM product p
            LEFT JOIN subcategory sc ON p.subcategory_id = sc.id
            LEFT JOIN maincategory mc ON sc.maincategory_id = mc.id
            LEFT JOIN product_image pi ON p.id = pi.product_id
            ORDER BY p.discounted_price ${sortOrder};
        `);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// 상품 인기순 조회(많이 팔린 제품: product와 order_item 테이블을 조인)
export const getPopularProducts = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                p.id AS id, 
                p.name AS name, 
                p.quantity AS quantity, 
                p.subcategory_id AS subCategoryId, 
                p.discount_rate AS discountRate, 
                p.price AS price, 
                p.date AS date, 
                ROUND(p.price * (1 - p.discount_rate / 100)) AS discountedPrice, 
                SUM(oi.quantity) AS totalSales
            FROM product p
            LEFT JOIN order_item oi ON p.id = oi.product_id
            GROUP BY p.id
            ORDER BY totalSales DESC;
        `);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// 특정상품 이미지 등록
export const createProductImage = async (req, res) => {
    // URL 파라미터로 상품 ID를 지정
    const { id } = req.params; 
    const { url } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO product_image (product_id, url) VALUES (?, ?)',
            [id, url]
        );
        
        res.status(201).json({ message: 'Product image added successfully', imageId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product image', error: error.message });
    }
};

// 특정상품 이미지 수정
export const updateProductImage = async(req, res) => {
    // URL 파라미터로 상품 ID와 이미지 ID를 지정
    const { id, imageId } = req.params; 
    const { url } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE product_image SET url = ? WHERE product_id = ? AND id = ?',
            [url, id, imageId]
        );
    if (result.affectedRows > 0) {
        res.status(200).json({ id: imageId, product_id: id, url });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
};

// 특정상품 이미지 삭제
export const deleteProductImage = async(req, res) => {
    // URL 파라미터로 상품 ID와 이미지 ID를 지정
    const { id, imageId } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM product_image WHERE product_id = ? AND id = ?', [id, imageId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product image not found' });
        }

        res.status(200).json({ message: 'Product image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product image', error: error.message });
    }
};

// 특정상품 이미지 조회
export const getProductImagesById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT
                 pi.id AS imageId,
                 pi.product_id AS productId,
                 pi.url AS ImageUrl
            FROM product_image pi
            WHERE pi.product_id = ?
            `,[id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No images found for the specified product' });
        } 
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product images', error: error.message });
    }
};
