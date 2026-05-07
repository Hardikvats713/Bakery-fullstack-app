import { useState } from 'react';
import { ArrowLeftIcon, MapPinIcon, CreditCardIcon, CheckCircle2Icon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useCartTotals, useOrderStore, useAuthStore } from '../store';
import type { Address } from '../store';

const PAYMENT_METHODS = [
  { id: 'UPI', title: 'UPI', desc: 'Pay via UPI ID or QR' },
  { id: 'Card', title: 'Card', desc: 'Debit / Credit card' },
  { id: 'COD', title: 'Cash on Delivery', desc: 'Pay when delivered' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { total } = useCartTotals();
  const { placeOrder } = useOrderStore();
  const { user, saveAddress } = useAuthStore();
  
  const [address, setAddress] = useState<Address>({
    fullName: user?.name || '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    pincode: '',
  });
  const [saveAddr, setSaveAddr] = useState(false);
  const [payment, setPayment] = useState<'UPI'|'Card'|'COD'>('UPI');
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = () => {
    // Validate inputs (basic)
    if (!address.fullName || !address.phone || !address.line1 || !address.city || !address.pincode) {
      alert("Please fill all required address fields.");
      return;
    }

    if (saveAddr) {
      saveAddress(address);
    }

    placeOrder({
      items,
      address,
      paymentMethod: payment,
      total,
    });

    // Mock success order ID
    const newOrderId = 'ORD' + Math.floor(Math.random() * 1000000);
    setOrderId(newOrderId);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    clearCart();
    navigate('/');
  };

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-screen">
        <p className="text-textMid">No items to checkout</p>
        <button onClick={() => navigate('/items')} className="mt-4 text-primary font-medium">Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col min-h-screen pb-32">
      <header className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-textDark hover:bg-softPink rounded-full transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="font-heading text-xl font-bold text-textDark ml-2">Checkout</h1>
      </header>

      {/* Section 1: Delivery Address */}
      <section className="mb-8">
        <div className="flex items-center space-x-2 mb-4 text-textDark">
          <MapPinIcon className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-lg">Delivery Address</h2>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-borderSoft shadow-sm space-y-4">
          <input 
            type="text" placeholder="Full Name *" 
            value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})}
            className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input 
            type="tel" placeholder="Phone Number *" 
            value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})}
            className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input 
            type="text" placeholder="Address Line 1 *" 
            value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})}
            className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <input 
            type="text" placeholder="Address Line 2 (Optional)" 
            value={address.line2} onChange={e => setAddress({...address, line2: e.target.value})}
            className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" placeholder="City *" 
              value={address.city} onChange={e => setAddress({...address, city: e.target.value})}
              className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <input 
              type="text" placeholder="Pincode *" 
              value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})}
              className="w-full bg-bgLight border border-borderSoft rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          {user && (
            <label className="flex items-center space-x-2 pt-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={saveAddr} onChange={(e) => setSaveAddr(e.target.checked)}
                className="w-4 h-4 rounded border-borderSoft text-primary focus:ring-primary accent-primary" 
              />
              <span className="text-sm text-textMid font-medium">Save this address for later</span>
            </label>
          )}
        </div>
      </section>

      {/* Section 2: Payment Method */}
      <section className="mb-8">
        <div className="flex items-center space-x-2 mb-4 text-textDark">
          <CreditCardIcon className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-lg">Payment Method</h2>
        </div>
        <div className="space-y-3">
          {PAYMENT_METHODS.map(method => (
            <div 
              key={method.id}
              onClick={() => setPayment(method.id as any)}
              className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                payment === method.id ? 'border-primary ring-1 ring-primary/20 bg-softPink/10' : 'border-borderSoft hover:border-primary/40'
              }`}
            >
              <div>
                <h3 className="font-bold text-textDark text-sm">{method.title}</h3>
                <p className="text-xs text-textMid mt-0.5">{method.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === method.id ? 'border-primary' : 'border-borderSoft'}`}>
                {payment === method.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Order Summary */}
      <section className="mb-8">
        <div 
          onClick={() => setShowSummary(!showSummary)}
          className="bg-white rounded-2xl p-4 border border-borderSoft shadow-sm flex items-center justify-between cursor-pointer"
        >
          <div>
            <h2 className="font-heading font-bold text-textDark text-lg">Order Summary</h2>
            <p className="text-xs text-textMid mt-0.5">{items.length} items • Total: <span className="font-bold text-textDark">₹{total}</span></p>
          </div>
          {showSummary ? <ChevronUpIcon className="w-5 h-5 text-textMid" /> : <ChevronDownIcon className="w-5 h-5 text-textMid" />}
        </div>
        
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-bgLight rounded-b-2xl border border-t-0 border-borderSoft p-4 -mt-2 pt-6 space-y-3">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-3">
                      {item.product.imageUrl ? (
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-6 h-6 object-cover rounded" />
                      ) : (
                        <span className="text-lg">{item.product.emoji}</span>
                      )}
                      <span className="text-textDark font-medium">{item.quantity} x {item.product.name}</span>
                    </div>
                    <span className="text-textDark font-bold">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-cardBg border-t border-borderSoft px-6 py-4 shadow-[0_-4px_20px_rgba(180,120,100,0.08)] z-40 pb-safe">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-textMid font-medium">Amount to Pay</span>
          <span className="font-heading font-bold text-2xl text-textDark">₹{total}</span>
        </div>
        <button 
          onClick={handlePlaceOrder}
          className="bg-gradient-to-r from-primary to-accent text-white font-medium py-4 rounded-2xl shadow-warm-lg w-full transition-transform active:scale-95 text-lg"
        >
          Place Order
        </button>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-textDark/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 relative">
                <CheckCircle2Icon className="w-10 h-10" />
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                  className="absolute -top-2 -right-2 text-2xl"
                >🎉</motion.div>
              </div>
              
              <h2 className="font-heading text-2xl font-bold text-textDark mb-2">Order Confirmed!</h2>
              <p className="text-textMid text-sm mb-6">
                Your order <span className="font-bold text-textDark">#{orderId}</span> has been placed successfully.
              </p>
              
              <div className="bg-bgLight w-full rounded-2xl p-4 mb-8 border border-borderSoft">
                <p className="text-xs text-textMid uppercase tracking-wider font-bold mb-1">Estimated Delivery</p>
                <p className="text-lg font-bold text-textDark">30 - 45 Minutes</p>
              </div>
              
              <button 
                onClick={handleCloseSuccess}
                className="w-full bg-textDark text-white font-medium py-4 rounded-2xl hover:bg-black transition-colors"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
