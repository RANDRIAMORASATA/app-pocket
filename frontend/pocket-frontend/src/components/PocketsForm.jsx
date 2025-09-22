import { useState } from "react";

export default function PcketsForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: parseFloat(amount),
        category,
        date: new Date(),
      }),
    });

    const data = await res.json();
    onAdd(data);

    setDescription("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Alimentation">Alimentation</option>
        <option value="Transport">Transport</option>
        <option value="Loisirs">Loisirs</option>
        <option value="Santé">Santé</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}
