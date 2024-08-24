import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fetch product data when component mounts
      axios.get(`/api/products/edit/${id}`).then((response) => {
        const product = response.data;
        setName(product.name);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
      }).catch((error) => {
        console.error('Error fetching product:', error);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`/api/products/edit/${id}`, {
        name,
        category,
        description,
        price: parseFloat(price),
        discount: parseFloat(discount),
      });
      setSuccess('Product updated successfully!');
      setError(null);
    } catch (err) {
      setError('Error updating product. Please try again.');
      setSuccess(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/edit/${id}`);
      setSuccess('Product deleted successfully!');
      setError(null);
      router.push('/'); // Redirect after deletion
    } catch (err) {
      setError('Error deleting product. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Edit Product</h1>
      {success && <div className="text-green-500 mb-4">{success}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
        >
          Update Product
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600"
        >
          Delete Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
