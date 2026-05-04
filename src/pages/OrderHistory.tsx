import { useOrderStore, useCartStore } from '../store';
import type { Order } from '../store';
import { useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, RefreshCwIcon } from 'lucide-react';

export default function OrderHistory() {
  const { orders } = useOrderStore();
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      // Add items back to cart one by one
      // For a real app, maybe we'd add quantity too, but addItem just adds 1 or increments
      for(let i=0; i<item.quantity; i++) {
        addItem(item.product);
      }
    });
    navigate('/cart');
  };

  if (orders.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center pt-24">
        <div className="w-24 h-24 bg-softPink/50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBagIcon className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-heading text-xl font-bold text-textDark mb-2">No orders yet</h2>
        <p className="text-textMid text-center mb-6">You haven't placed any orders. Start exploring our menu!</p>
        <button 
          onClick={() => navigate('/items')}
          className="bg-primary hover:bg-accent text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 pb-24">
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-2xl p-5 border border-borderSoft shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs text-textMid mb-0.5">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <h3 className="font-bold text-textDark">Order #{order.id}</h3>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
              order.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {order.status}
            </div>
          </div>
          
          <div className="border-t border-b border-borderSoft py-3 mb-3 my-3">
            <p className="text-sm text-textMid leading-relaxed line-clamp-2">
              {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="font-bold text-textDark">
              <span className="text-xs font-normal text-textMid mr-1">Total</span>
              ₹{order.total}
            </div>
            <button 
              onClick={() => handleReorder(order)}
              className="flex items-center space-x-1.5 text-primary text-sm font-medium hover:text-accent transition-colors bg-softPink px-3 py-1.5 rounded-lg"
            >
              <RefreshCwIcon className="w-4 h-4" />
              <span>Reorder</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
