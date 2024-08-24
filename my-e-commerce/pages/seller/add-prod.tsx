import { useState } from 'react';
import axios from 'axios';

const AddProduct: React.FC = (props) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/products/add', {
        name,
        category,
        description,
        price,
        discount,
      });
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for product details */}
    </form>
  );
};

export default AddProduct;
