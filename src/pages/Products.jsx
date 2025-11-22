import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  // form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // load existing products
  const loadProducts = async () => {
    const res = await api.get("/product");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/product", {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
      });

      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      loadProducts();
    } catch (err) {
      alert("Unauthorized or invalid data.");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Add Product</h3>

      <div className="card p-3 mt-3">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <button className="btn btn-primary w-full">Add Product</button>
        </form>
      </div>

      <h3 className="mt-4">Product List</h3>

      <ul className="list-group mt-3">
        {products.map((p) => (
          <li key={p.id} className="list-group-item">
            <b>{p.name}</b> — ${p.price} | Qty: {p.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
