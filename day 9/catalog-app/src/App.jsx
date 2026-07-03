import { useState } from "react";
import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Tablet",
      price: 25,
      stock: "Available",
      image: "https://d1ymz67w5raq8g.cloudfront.net/Pictures/2000xAny/1/2/0/532120_paracetamolbackgroundinformationcoverimage_807319_crop.jpg",
    },
    {
      id: 2,
      name: "Vitamin C",
      category: "Supplement",
      price: 180,
      stock: "Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoEW5-oPXqH1DxO2uQkyXzTUgqA3RDRv0jN1MsXXLkg&s=10",
    },
    {
      id: 3,
      name: "Cough Syrup",
      category: "Syrup",
      price: 120,
      stock: "Out of Stock",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1RBdiyrkdmgX8zDVUZbCvYKlnYmBI1XU0dLnHWQzqQ&s=10",
    },
    {
      id: 4,
      name: "Insulin Injection",
      category: "Injection",
      price: 850,
      stock: "Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCo80hUlGFUfkyvHxftgMi9ItsC4NzYFhce3PL3O5mA&s=10",
    },
    {
      id: 5,
      name: "Pain Relief Gel",
      category: "Gel",
      price: 140,
      stock: "Available",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSULPJtI2wfYLHsROUdUjLujdd0EZzHi5h8eIOJPa9-rQ&s=10",
    },
    {
      id: 6,
      name: "Face Mask",
      category: "Medical Equipment",
      price: 15,
      stock: "Available",
      image: "https://i0.wp.com/www.medtecs.com/wp-content/uploads/Adult-Medical-Face-Mask.jpg",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🏥 LAYA PHARMACY PRODUCT</h1>

      <input
        type="text"
        placeholder="Search medicine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="catalog">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h2>{product.name}</h2>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>

            <p
              className={
                product.stock === "Available"
                  ? "available"
                  : "outofstock"
              }
            >
              {product.stock}
            </p>

            <button
              disabled={product.stock === "Out of Stock"}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;  