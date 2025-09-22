import { useState, useEffect } from "react";
import ExpenseForm from "../components/PocketsForm";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  // Récupérer les dépenses depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/api/expense")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const handleAdd = (expense) => setExpenses([...expenses, expense]);

  // Préparer les données pour le graphique
  const chartData = expenses.reduce((acc, curr) => {
    const cat = acc.find((c) => c.category === curr.category);
    if (cat) cat.amount += curr.amount;
    else acc.push({ category: curr.category, amount: curr.amount });
    return acc;
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard des dépenses</h1>
      <ExpenseForm onAdd={handleAdd} />

      <h2>Répartition par catégorie</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Liste des dépenses</h2>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.description} - ${e.amount} ({e.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
