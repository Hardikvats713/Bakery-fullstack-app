import { useState } from 'react';
import { useAuthStore } from '../store';
import { ShoppingBagIcon, HeartIcon, MapPinIcon, TagIcon, SettingsIcon, LogOutIcon, ArrowLeftIcon } from 'lucide-react';
import OrderHistory from './OrderHistory';

export default function Profile() {
  const { user, isLoggedIn, login, signup, logout } = useAuthStore();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showOrders, setShowOrders] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isLoginView) {
      login(email);
    } else {
      if (!name) return;
      signup(email, name);
    }
  };

  if (showOrders && isLoggedIn) {
    return (
      <div className="h-full bg-bgLight">
        <header className="p-6 flex items-center border-b border-borderSoft bg-white">
          <button onClick={() => setShowOrders(false)} className="p-2 -ml-2 text-textDark hover:bg-softPink rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-xl font-bold text-textDark ml-2">My Orders</h1>
        </header>
        <OrderHistory />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col min-h-screen">
      {!isLoggedIn ? (
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-softPink rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🧁</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-textDark mb-2">Welcome Back</h1>
            <p className="text-textMid text-sm">Sign in to access your saved addresses, past orders, and wishlist.</p>
          </div>

          <form onSubmit={handleAuth} className="bg-white rounded-3xl p-6 border border-borderSoft shadow-sm space-y-4">
            <div className="flex bg-bgLight rounded-xl p-1 mb-6">
              <button 
                type="button"
                onClick={() => setIsLoginView(true)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${isLoginView ? 'bg-white shadow-sm text-textDark' : 'text-textMid'}`}
              >
                Login
              </button>
              <button 
                type="button"
                onClick={() => setIsLoginView(false)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${!isLoginView ? 'bg-white shadow-sm text-textDark' : 'text-textMid'}`}
              >
                Sign Up
              </button>
            </div>

            {!isLoginView && (
              <input 
                type="text" placeholder="Full Name" required
                value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            )}
            <input 
              type="email" placeholder="Email Address" required
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <input 
              type="password" placeholder="Password" required
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-accent text-white font-medium py-3.5 rounded-xl transition-colors shadow-warm mt-2"
            >
              {isLoginView ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-8 bg-white p-5 rounded-3xl border border-borderSoft shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl font-bold font-heading shadow-warm">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-textDark">{user?.name}</h2>
              <p className="text-textMid text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Menu Groups */}
          <div className="space-y-4 mb-8">
            <div className="bg-white rounded-3xl border border-borderSoft overflow-hidden shadow-sm">
              <button onClick={() => setShowOrders(true)} className="w-full flex items-center justify-between p-4 hover:bg-softPink/30 transition-colors border-b border-borderSoft">
                <div className="flex items-center space-x-3 text-textDark">
                  <div className="w-10 h-10 bg-softPink rounded-full flex items-center justify-center text-primary">
                    <ShoppingBagIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">My Orders</span>
                </div>
                <div className="flex items-center space-x-2">
                  {user?.orders && user.orders.length > 0 && (
                    <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">{user.orders.length}</span>
                  )}
                  <ChevronRightIcon className="w-5 h-5 text-textLight" />
                </div>
              </button>
              
              <button onClick={() => window.location.href = '/wishlist'} className="w-full flex items-center justify-between p-4 hover:bg-softPink/30 transition-colors border-b border-borderSoft">
                <div className="flex items-center space-x-3 text-textDark">
                  <div className="w-10 h-10 bg-softPink rounded-full flex items-center justify-center text-primary">
                    <HeartIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Wishlist</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-textLight" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-softPink/30 transition-colors">
                <div className="flex items-center space-x-3 text-textDark">
                  <div className="w-10 h-10 bg-softPink rounded-full flex items-center justify-center text-primary">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Saved Addresses</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-textLight" />
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-borderSoft overflow-hidden shadow-sm">
              <button className="w-full flex items-center justify-between p-4 hover:bg-softPink/30 transition-colors border-b border-borderSoft">
                <div className="flex items-center space-x-3 text-textDark">
                  <div className="w-10 h-10 bg-softPink rounded-full flex items-center justify-center text-primary">
                    <TagIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Offers & Coupons</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-textLight" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-softPink/30 transition-colors">
                <div className="flex items-center space-x-3 text-textDark">
                  <div className="w-10 h-10 bg-softPink rounded-full flex items-center justify-center text-primary">
                    <SettingsIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Settings</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-textLight" />
              </button>
            </div>
          </div>

          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 text-accent font-medium py-4 rounded-2xl bg-white border border-borderSoft hover:bg-softPink/30 transition-colors"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ChevronRightIcon component
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
