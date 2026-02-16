import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/appSlice'
import { updateOrderStatus } from '../store/ordersSlice'

function RunnerDash() {
  const dispatch = useDispatch()
  const allOrders = useSelector(state => state.orders.allOrders)
  const [view, setView] = useState('pickup')

  const readyOrders = allOrders.filter(o => o.status === 'Ready')
  const pickedUpOrders = allOrders.filter(o => o.status === 'Picked Up')

  const handlePickup = (orderId) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'Picked Up' }))
  }

  const handleDeliver = (orderId) => {
    dispatch(updateOrderStatus({ id: orderId, status: 'Delivered' }))
  }

  return (
    <div className="dashboard runner-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>🚴 Runner Dashboard</h1>
          <p className="header-subtitle">Manage deliveries</p>
        </div>
        <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
      </header>

      <div className="view-tabs">
        <button 
          className={`tab ${view === 'pickup' ? 'active' : ''}`}
          onClick={() => setView('pickup')}
        >
          Ready for Pickup ({readyOrders.length})
        </button>
        <button 
          className={`tab ${view === 'delivery' ? 'active' : ''}`}
          onClick={() => setView('delivery')}
        >
          In Delivery ({pickedUpOrders.length})
        </button>
      </div>

      <div className="content-section">
        {view === 'pickup' && (
          <>
            <h2>Ready for Pickup</h2>
            {readyOrders.length === 0 ? (
              <p className="empty-state">No orders ready</p>
            ) : (
              <div className="orders-list">
                {readyOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h4>{order.shopName}</h4>
                      <span className="status-badge ready">Ready</span>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <p key={idx}>{item.quantity}x {item.name}</p>
                      ))}
                    </div>
                    <p className="order-total">Total: ${order.total}</p>
                    <button 
                      className="action-btn pickup"
                      onClick={() => handlePickup(order.id)}
                    >
                      Mark as Picked Up
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'delivery' && (
          <>
            <h2>In Delivery</h2>
            {pickedUpOrders.length === 0 ? (
              <p className="empty-state">No orders in delivery</p>
            ) : (
              <div className="orders-list">
                {pickedUpOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h4>{order.shopName}</h4>
                      <span className="status-badge picked-up">In Transit</span>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <p key={idx}>{item.quantity}x {item.name}</p>
                      ))}
                    </div>
                    <p className="order-total">Total: ${order.total}</p>
                    <button 
                      className="action-btn deliver"
                      onClick={() => handleDeliver(order.id)}
                    >
                      Mark as Delivered
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default RunnerDash
