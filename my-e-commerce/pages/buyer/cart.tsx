import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
 
interface CartItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
}
 
const Cart: React.FC = (props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
 
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
 
      try {
        const response = await axios.get('/api/prisma/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Cart Items:', response.data);  // Debugging log
        setCartItems(response.data);  // Assuming response.data is directly the cart items array
      } catch (err) {
        setError('Failed to fetch cart items');
        console.error('Error fetching cart items:', err);
      }
    };
 
    fetchCartItems();
  }, [router]);
 
  const handleRemoveItem = async (productId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
 
    try {
      await axios.delete(`/api/prisma/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
 
      // Update cart state in BuyerDashboard by navigating back to it and triggering re-fetch
      router.push('/buyer/dashboard');
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing item from cart:', err);
    }
  };
 
  const handleEmptyCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
 
    try {
      await axios.delete('/api/prisma/cart/empty', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
 
      // Update cart state in BuyerDashboard by navigating back to it and triggering re-fetch
      //router.push('/buyer/dashboard');
    } catch (err) {
      setError('Failed to empty the cart');
      console.error('Error emptying the cart:', err);
    }
  };
 
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-stone-950">Your Cart</h1>
        {error && <div className="p-4 bg-red-200 text-red-700 rounded">{error}</div>}
       
        {cartItems.length === 0 ? (
          <p className="mt-4 text-black">Your cart is empty</p>
        ) : (
          <div className="mt-4">
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="border p-4 mb-2 rounded bg-gray-500">
                  <h3 className="text-lg font-semibold text-black">{item.name}</h3>
                  <p className="text-black">Category: {item.category}</p>
                  <p className="text-black">Description: {item.description}</p>
                  <p className="text-black">Price: ${item.price}</p>
                  <p className="text-black">Discount: {item.discount}%</p>
                  {/* <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Remove
                  </button> */}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleEmptyCart()}
              className="bg-red-700 text-white px-6 py-2 rounded mt-4"
            >
              Empty Cart
            </button>
          </div>
        )}
 
        <Link href="/buyer/dashboard">
          <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </Layout>
  );
};
 
export default Cart;