import axios from 'axios';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
}

interface ProductListProps {
  products: Product[];
  onProductUpdated: (product: Product) => void;
  onProductDeleted: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductUpdated, onProductDeleted }) => {
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axios.delete(`/api/prisma/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      onProductDeleted(id);
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const handleUpdate = async (product: Product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const updatedProduct = { ...product, name: `${product.name} (Updated)` }; // Modify as needed

      await axios.put(`/api/prisma/products/${product.id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onProductUpdated(updatedProduct);
    } catch (err) {
      console.error('Failed to update product', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border p-4 mb-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discount}%</p>
            <button
              onClick={() => handleUpdate(product)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
