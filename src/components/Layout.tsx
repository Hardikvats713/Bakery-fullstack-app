import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, MenuIcon, ShoppingCartIcon, HeartIcon, UserIcon } from 'lucide-react';
import { useCartStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/items', label: 'Menu', icon: MenuIcon },
    { path: '/cart', label: 'Cart', icon: ShoppingCartIcon, badge: itemCount },
    { path: '/wishlist', label: 'Wishlist', icon: HeartIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center w-full">
      <div className="w-full max-w-[480px] bg-bgLight min-h-screen shadow-2xl relative flex flex-col overflow-x-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-24 no-scrollbar relative flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex-1 flex flex-col min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full bg-cardBg border-t border-borderSoft px-6 py-3 rounded-t-3xl shadow-[0_-4px_20px_rgba(180,120,100,0.08)] z-50">
          <div className="flex justify-between items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/items' && location.pathname.startsWith('/items'));
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center justify-center p-2 focus:outline-none"
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon 
                      className={`w-6 h-6 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-textLight'}`} 
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </motion.div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.div
                      key={item.badge}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {item.badge}
                    </motion.div>
                  )}
                  <span className={`text-[10px] mt-1 transition-colors duration-200 ${isActive ? 'text-primary font-medium' : 'text-textLight'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
