import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/appSlice'
import { updateOrderStatus } from '../store/ordersSlice'
import { toggleShopStatus } from '../store/shopsSlice'

function ShopDash() {
  const dispatch = useDispatch()
  const allOrders = useSelector(state => state.orders.allOrders)
  const shops = useSelector(state => state.shops.shops)
  const [cutoffTime, setCutoffTime] = useState('12:30')
  const [timeLeft, setTimeLeft] = useState(null)
  const [batchReady, setBatchReady] = useState(false)

  // Assuming first shop for demo - in real app, would match to logged in shop owner
  const myShop = shops[0]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const [hours, minutes] = cutoffTime.split(':')
      const cutoff = new Date()
      cutoff.setHours(parseInt(hours), parseInt(minutes), 0)
      
      const diff = cutoff - now
      if (diff <= 0) {
        setTimeLeft('Closed')
      } else {
        const mins = Math.floor(diff / 60000)
        const secs = Math.floor((diff % 60000) / 1000)
        setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [cutoffTime])

  const queuedOrders = allOrders.filter(o => o.status === 'Queued' && o.shopId === myShop.id)
  const itemSummary = {}
  queuedOrders.forEach(order => {
    order.items.forEach(item => {
      itemSummary[item.name] = (itemSummary[item.name] || 0) + item.quantity
    })
  })

  const handleMarkReady = () => {
    queuedOrders.forEach(order => {
      dispatch(updateOrderStatus({ id: order.id, status: 'Ready' }))
    })
    setBatchReady(true)
  }

  const handleToggleShop = () => {
    dispatch(toggleShopStatus(myShop.id))
  }

  return (
    <div className="dashboard shop-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>🏪 {myShop.name}</h1>
          <p className="header-subtitle">Manage your orders</p>
        </div>
        <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
      </header>

      <div className="shop-controls">
        <button 
          className={`toggle-shop-btn ${myShop.status === 'open' ? 'open' : 'closed'}`}
          onClick={handleToggleShop}
        >
          {myShop.status === 'open' ? '🟢 Shop Open - Click to Close' : '🔴 Shop Closed - Click to Open'}
        </button>
      </div>

      <div className="shop-stats">
        <div className="stat-card">
          <span className="stat-label">Status</span>
          <span className={`stat-value ${myShop.status}`}>
            {myShop.status === 'open' ? 'Open' : 'Closed'}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Cutoff in</span>
          <span className="stat-value">{timeLeft || '...'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Queued Orders</span>
          <span className="stat-value">{queuedOrders.length}</span>
        </div>
      </div>

      <div className="content-section">
        <h2>Order Summary</h2>
        {queuedOrders.length === 0 ? (
          <p className="empty-state">No orders yet</p>
        ) : (
          <>
            <div className="item-summary">
              {Object.entries(itemSummary).map(([name, qty]) => (
                <div key={name} className="summary-item">
                  <span>{qty}x</span>
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <button 
              className="mark-ready-btn"
              onClick={handleMarkReady}
              disabled={batchReady}
            >
              {batchReady ? '✓ Batch Ready' : 'Mark Batch as Ready'}
            </button>
          </>
        )}
      </div>

      <div className="content-section">
        <h2>Detailed Orders</h2>
        <div className="orders-list">
          {queuedOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h4>Order #{order.id}</h4>
                <span className="status-badge queued">Queued</span>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <p key={idx}>{item.quantity}x {item.name}</p>
                ))}
              </div>
              <p className="order-total">Total: ${order.total}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopDash
