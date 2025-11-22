import { useState } from "react";
import api from "../../api/axios";
import "../../styles/addProduct.css"; // <-- NEW CSS FILE

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/product", {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
    });

    alert("Product added!");
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
  };

  return (
    <div className="add-wrapper">
      <div className="add-card">

        <h3 className="add-title">Add Product</h3>

        <form onSubmit={handleSubmit}>

          <label className="form-label">Product Name</label>
          <input
            className="form-control mb-3"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="form-label">Description</label>
          <input
            className="form-control mb-3"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control mb-4"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button className="add-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
}
