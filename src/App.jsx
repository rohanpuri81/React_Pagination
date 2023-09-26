import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandle = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectPageHandle != page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span className="product__single" key={product.id}>
                <img src={product.thumbnail} alt="product-title" />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandle(page - 1)}
          >
            👈
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => selectPageHandle(i + 1)}
                className={page === i + 1 ? "pagination__selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectPageHandle(page + 1)}
          >
            👉
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
