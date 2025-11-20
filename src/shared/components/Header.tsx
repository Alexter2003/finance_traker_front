import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`bg-gray-800 dark:bg-gray-800 shadow-sm border-b border-gray-700 dark:border-gray-700 ${className}`}>
      <div className="flex items-center h-16">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-white dark:text-white pl-4">
            Finance Tracker v6
          </h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;

