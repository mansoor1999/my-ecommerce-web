import { useState } from 'react';
import axios from 'axios';

const AddToCart: React.FC = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddToCart = async () => {
    if (productId === null) {
      setError('Please select a product.');
      return;
    }

    try {
      await axios.post('/api/cart/add', {
        productId,
        userId: 1, // replace with actual userId
        quantity,
      });
      setSuccess('Product added to cart!');
      setError(null);
    } catch (err) {
      setError('Error adding to cart. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Add to Cart</h1>
      {success && <div className="text-green-500 mb-4">{success}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="number"
          value={productId || ''}
          onChange={(e) => setProductId(parseInt(e.target.value))}
          placeholder="Product ID"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          placeholder="Quantity"
          min="1"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
        />
        <button
          onClick={handleAddToCart}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
