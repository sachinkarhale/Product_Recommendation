// Without Ai Recommendation
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "iPhone 15", category: "phone", price: 48000 },
  { id: 2, name: "Samsung S24 Ultra", category: "phone", price: 120000 },
  { id: 3, name: "Redmi Note 13", category: "phone", price: 25000 },
  { id: 4, name: "OnePlus 12", category: "phone", price: 60000 },
  { id: 5, name: "MacBook Pro", category: "laptop", price: 200000 },
  { id: 6, name: "Dell Inspiron", category: "laptop", price: 70000 },
];

function Product({ item }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        margin: "8px",
        borderRadius: "6px",
        width: "200px",
      }}
    >
      <h3>{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>Price: ₹{item.price}</p>
    </div>
  );
}

export default function App() {
  const [pref, setPref] = useState("");
  const [recommended, setRecommended] = useState([]);

  const getRecommendation = () => {
    if (!pref) return alert("Please enter your preference");

    const input = pref.toLowerCase();
    let maxPrice = Infinity;

    const priceMatch = input.match(/\d+/);
    if (priceMatch) maxPrice = parseInt(priceMatch[0]);

    const categories = ["phone", "laptop", "tablet", "audio"];
    let category = "";
    for (let c of categories) {
      if (input.includes(c)) {
        category = c;
        break;
      }
    }

    const filtered = PRODUCTS.filter((p) => {
      const categoryMatch = category ? p.category === category : true;
      const priceMatch = p.price <= maxPrice;
      return categoryMatch && priceMatch;
    });

    setRecommended(filtered);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Recommendation</h1>

      <input
        type="text"
        placeholder="e.g. phone under 50000"
        value={pref}
        onChange={(e) => setPref(e.target.value)}
        style={{ width: "400px", padding: "8px" }}
      />

      <button
        onClick={getRecommendation}
        style={{ marginLeft: 10, padding: "8px 12px" }}
      >
        Recommend
      </button>

      <h2>Recommended Products:</h2>
      {recommended.length === 0 && <p>No recommendations yet</p>}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {recommended.map((p) => (
          <Product key={p.id} item={p} />
        ))}
      </div>
    </div>
  );
}


// With Ai Recommendation
// import { useState } from "react";

// const PRODUCTS = [
//   { id: 1, name: "iPhone 15", category: "phone", price: 48000 },
//   { id: 2, name: "Samsung S24 Ultra", category: "phone", price: 120000 },
//   { id: 3, name: "Redmi Note 13", category: "phone", price: 25000 },
//   { id: 4, name: "OnePlus 12", category: "phone", price: 60000 },
//   { id: 5, name: "MacBook Pro", category: "laptop", price: 200000 },
//   { id: 6, name: "Dell Inspiron", category: "laptop", price: 70000 },
// ];

// export default function App() {
//   const [pref, setPref] = useState("");
//   const [recommended, setRecommended] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;//use your own api key instead of this in teh seperate.env file and name that API key as VITE_OPENAI_API_KEY=your own API key

//   const getRecommendation = async () => {
//     if (!pref) return alert("Please enter your preference");

//     setLoading(true);
//     setRecommended([]);

//     const prompt = `
// Given this product list: ${JSON.stringify(PRODUCTS)}.
// User preference: "${pref}".
// Return ONLY a JSON array of product IDs from the list that best match the preference.
// Example: ["1","3"]
// `;

//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${OPENAI_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0,
//         }),
//       });

//       const data = await response.json();
//       const text = data.choices?.[0]?.message?.content || "";

//       let ids = [];
//       try {
//         const match = text.match(/\[.*?\]/s);
//         if (match) ids = JSON.parse(match[0]);
//       } catch (err) {
//         console.error("JSON parse error:", err);
//       }

//       const filtered = PRODUCTS.filter((p) => ids.includes(p.id.toString()));
//       setRecommended(filtered);

//     } catch (err) {
//       console.error("AI request failed:", err);
//       alert("AI request failed. Check your API key or internet connection.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>AI Product Recommendation</h1>

//       <input
//         type="text"
//         placeholder="e.g. phones under 50000"
//         value={pref}
//         onChange={(e) => setPref(e.target.value)}
//         style={{ width: "400px", padding: "8px" }}
//       />
//       <button onClick={getRecommendation} style={{ marginLeft: 10, padding: "8px 12px" }}>
//         {loading ? "Loading..." : "Recommend"}
//       </button>

//       <h2>Recommended Products:</h2>
//       {recommended.length === 0 && <p>No recommendation yet</p>}
//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {recommended.map((p) => (
//           <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, margin: 8, borderRadius: 6 }}>
//             <h3>{p.name}</h3>
//             <p>Category: {p.category}</p>
//             <p>Price: ${p.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
