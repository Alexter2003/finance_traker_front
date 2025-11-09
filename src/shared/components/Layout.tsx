import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    sidebarItems?: ReadonlyArray<{ path: string; label: string; icon?: IconType }>;
    showSidebar?: boolean;
    className?: string;
}

function Layout({
    children,
    sidebarItems = [],
    showSidebar = false,
    className = '',
}: LayoutProps) {
    return (
        <div className={`min-h-screen bg-gray-900 dark:bg-gray-900 ${className}`}>
            <Header />
            <div className="flex">
                {showSidebar && sidebarItems.length > 0 && (
                    <Sidebar items={sidebarItems} className="w-64 min-h-[calc(100vh-4rem)]" />
                )}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}

export default Layout;

