import Link from 'next/link';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
          Welcome to Our E-Commerce App
        </h1>
        <div className="space-y-4">
          <Link href="/login">
            <button className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
