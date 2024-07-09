import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/maincategory');
                setCategories(response.data);

                const subcategoryResponse = await axios.get('http://localhost:8080/api/maincategory/subcategory');
                const subcategoryData = subcategoryResponse.data;

                const groupedSubcategories = subcategoryData.reduce((acc, subcategory) => {
                    const { maincategory_id } = subcategory;
                    if (!acc[maincategory_id]) {
                        acc[maincategory_id] = [];
                    }
                    acc[maincategory_id].push(subcategory);
                    return acc;
                }, {});

                setSubcategories(groupedSubcategories);
            } catch (error) {
                console.error("Error fetching categories or subcategories", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav>
            <Link to="/" className="logo"><img src='/images/로고네비바.png' className='navbar-image' /></Link>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                        <ul>
                            {(subcategories[category.id] || []).map(subcategory => (
                                <li key={subcategory.id}>
                                    <Link to={`/category/${category.id}/subcategory/${subcategory.id}`}>{subcategory.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <Link to="/cart" className="cart">
                <img src="/cart.png" alt="장바구니" />
            </Link>
        </nav>
    );
};

export default Navbar;
