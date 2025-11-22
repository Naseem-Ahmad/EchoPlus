import { useState } from "react";
import api from "../../api/axios";

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
    <div className="col-md-6">
      <h3>Add Product</h3>

      <div className="card p-3 mt-2">
        <form onSubmit={handleSubmit}>

          <input className="form-control mb-2" placeholder="Product Name"
            value={name} onChange={(e) => setName(e.target.value)} />

          <input className="form-control mb-2" placeholder="Description"
            value={description} onChange={(e) => setDescription(e.target.value)} />

          <input type="number" className="form-control mb-2" placeholder="Price"
            value={price} onChange={(e) => setPrice(e.target.value)} />

          <input type="number" className="form-control mb-3" placeholder="Quantity"
            value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <button className="btn btn-primary w-100">Add Product</button>

        </form>
      </div>
    </div>
  );
}
