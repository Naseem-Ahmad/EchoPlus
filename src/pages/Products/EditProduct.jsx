import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/editProduct.css"; // <-- IMPORT CSS

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/product/${id}`);
      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setQuantity(res.data.quantity);
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/product/${id}`, {
      id,
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
    });

    alert("Product updated!");
    navigate("/products");
  };

  return (
    <div className="edit-wrapper">
      <div className="edit-card">

        <h3 className="edit-title">Edit Product</h3>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Product Name</label>
          <input className="form-control mb-3" value={name}
            onChange={(e) => setName(e.target.value)} />

          <label className="form-label">Description</label>
          <input className="form-control mb-3" value={description}
            onChange={(e) => setDescription(e.target.value)} />

          <label className="form-label">Price</label>
          <input type="number" className="form-control mb-3" value={price}
            onChange={(e) => setPrice(e.target.value)} />

          <label className="form-label">Quantity</label>
          <input type="number" className="form-control mb-4" value={quantity}
            onChange={(e) => setQuantity(e.target.value)} />

          <button className="update-btn">Update Product</button>
        </form>

      </div>
    </div>
  );
}
