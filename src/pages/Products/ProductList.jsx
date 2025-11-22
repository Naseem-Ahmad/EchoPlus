import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/product.css";

export default function ProductList() {
  const [items, setItems] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await api.get("/product");
      setItems(res.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/product/${id}`);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-container">
      <div className="product-header">
        <h3 className="product-title">Products</h3>
        <Link className="btn add-product-btn" to="/products/add">
          + Add Product
        </Link>
      </div>

      <div className="product-table-wrapper">
        <table className="table product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>${p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  <Link
                    to={`/products/edit/${p.id}`}
                    className="btn btn-edit"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-message">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
