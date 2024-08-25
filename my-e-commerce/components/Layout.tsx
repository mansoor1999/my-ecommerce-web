import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = false; 

  return (
    <div className=" bg-gray-600">
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">Home</Link>
          <nav>
            <ul className="flex space-x-4">
              {!isAuthenticated ? (
                <>
                  {/* <li><Link href="/login">Login</Link></li>
                  <li><Link href="/signup">Sign Up</Link></li> */}
                </>
              ) : (
                <>
                  {/* <li><Link href="/cart">Cart</Link></li> */}
                  {/* <li><Link href="/seller/dashboard">Seller Dashboard</Link></li> */}
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 My E-commerce App website
      </footer>
    </div>
  );
};

export default Layout;
