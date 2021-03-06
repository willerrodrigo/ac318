import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

import Modal from '../../components/Modal';

export default function Products() {
    const [modalProduct, setModalProduct] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        var config = { headers: {'market': localStorage.getItem('user-id')} };

        var response = await api.get('products', config);
        setProducts(response.data);
    }

    const handleModal = async (id) => {
        var response = await api.get(`products/${id}`);
        setModalProduct(response.data);

        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    return (
        <div className="container">
            <Modal value={modalProduct} update={fetchData}/>
            <ul>
                {products.map((product) =>
                    <li key={product._id.toString()} onClick={() => handleModal(product._id)}>
                        <p>{product.name}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}