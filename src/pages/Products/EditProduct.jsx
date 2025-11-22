import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

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
    <div className="col-md-6">
      <h3>Edit Product</h3>
      <div className="card p-3 mt-2">

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" value={name}
            onChange={(e) => setName(e.target.value)} />

          <input className="form-control mb-2" value={description}
            onChange={(e) => setDescription(e.target.value)} />

          <input type="number" className="form-control mb-2" value={price}
            onChange={(e) => setPrice(e.target.value)} />

          <input type="number" className="form-control mb-3" value={quantity}
            onChange={(e) => setQuantity(e.target.value)} />

          <button className="btn btn-warning w-100">Update Product</button>
        </form>

      </div>
    </div>
  );
}
