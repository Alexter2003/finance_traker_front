import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`bg-gray-800 dark:bg-gray-800 shadow-sm border-b border-gray-700 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-white dark:text-white">
              Finance Tracker
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

