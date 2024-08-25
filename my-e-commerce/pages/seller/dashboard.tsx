import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
}

const SellerDashboard: React.FC = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/prisma/productss', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length === 0) {
          setInfoMessage('New seller, please add your products.');
        } else {
          setProducts(response.data);
          setInfoMessage(null);
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [router]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post('/api/prisma/productss', {
        name,
        category,
        description,
        price: parseFloat(price),
        discount: parseFloat(discount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(prevProducts => [
        ...prevProducts,
        response.data,
      ]);
      setName('');
      setCategory('');
      setDescription('');
      setPrice('');
      setDiscount('');
      setEditingProductId(null);
      setInfoMessage('Product added successfully');
      setError(null);
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price.toString());
    setDiscount(product.discount.toString());
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProductId === null) return;

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.put(`/api/products/${editingProductId}`, {
        name,
        category,
        description,
        price: parseFloat(price),
        discount: parseFloat(discount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(prevProducts => prevProducts.map(product =>
        product.id === editingProductId
          ? { ...product, name, category, description, price: parseFloat(price), discount: parseFloat(discount) }
          : product
      ));
      setEditingProductId(null);
      setName('');
      setCategory('');
      setDescription('');
      setPrice('');
      setDiscount('');
      setInfoMessage('Product updated successfully');
      setError(null);
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      if (products.length === 1) {
        setInfoMessage('New seller, please add your products.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-stone-950">Seller Dashboard</h1>
        {error && <div className="p-4 bg-red-200 text-red-700 rounded">{error}</div>}
        {infoMessage && <div className="p-4 bg-blue-200 text-blue-700 rounded">{infoMessage}</div>}

        <form onSubmit={editingProductId ? handleUpdateProduct : handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full text-black"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full text-black"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full text-black"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full text-black"
          />
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
          {editingProductId && (
            <button
              type="button"
              onClick={() => {
                setEditingProductId(null);
                setName('');
                setCategory('');
                setDescription('');
                setPrice('');
                setDiscount('');
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-stone-950">Your Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="border p-4 mb-2">
                <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                <p className="text-black">Category: {product.category}</p>
                <p className="text-black">Description: {product.description}</p>
                <p className="text-black">Price: ${product.price}</p>
                <p className="text-black">Discount: {product.discount}%</p>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="min-h-screen bg-gray-600">
      <footer className="bg-stone-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">Logout</Link>
          </div>
          </footer>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
