import { Link, useLocation } from 'react-router-dom';
import type { IconType } from 'react-icons';

interface SidebarItem {
  path: string;
  label: string;
  icon?: IconType;
}

interface SidebarProps {
  items: ReadonlyArray<SidebarItem>;
  className?: string;
}

function Sidebar({ items, className = '' }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={`bg-gray-800 dark:bg-gray-800 border-r border-gray-700 dark:border-gray-700 ${className}`}>
      <nav className="p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className="mr-3 text-lg" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

