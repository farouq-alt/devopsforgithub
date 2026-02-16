function BottomNav({ view, setView, cartCount }) {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${view === 'shops' ? 'active' : ''}`}
        onClick={() => setView('shops')}
      >
        <span className="icon">🏪</span>
        <span>Shops</span>
      </button>
      <button 
        className={`nav-item ${view === 'cart' ? 'active' : ''}`}
        onClick={() => setView('cart')}
      >
        <span className="icon">🛒</span>
        <span>Cart</span>
        {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </button>
      <button 
        className={`nav-item ${view === 'orders' ? 'active' : ''}`}
        onClick={() => setView('orders')}
      >
        <span className="icon">📋</span>
        <span>Orders</span>
      </button>
    </nav>
  )
}

export default BottomNav
