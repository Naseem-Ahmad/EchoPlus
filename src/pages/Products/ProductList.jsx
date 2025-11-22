import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

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
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3>Product List</h3>
        <Link className="btn btn-primary" to="/products/add">
          Add Product
        </Link>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: "80px" }}>Price</th>
            <th style={{ width: "80px" }}>Qty</th>
            <th style={{ width: "150px" }}>Actions</th>
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
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
