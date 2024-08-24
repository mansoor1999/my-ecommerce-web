import { useState } from 'react';
import axios from 'axios';

const SearchProducts: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/products/search', {
        params: { name, category },
      });
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Error searching products. Please try again.');
      setProducts([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Search Products</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="w-full max-w-4xl">
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-700">{product.category}</p>
                <p>{product.description}</p>
                <p className="text-green-500">${product.price}</p>
                <p className="text-red-500">Discount: {product.discount}%</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
