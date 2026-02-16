import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/appSlice'
import { updateOrderStatus } from '../store/ordersSlice'

function RunnerDash() {
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.app)
  const allOrders = useSelector(state => state.orders.allOrders)
  const [view, setView] = useState('pickup')

  const readyOrders = allOrders.filter(o => o.status === 'Ready')
  const pickedUpOrders = allOrders.filter(o => o.status === 'Picked Up')

  const handlePickup = (orderId) => {
    dispatch(updateOrderStatus({ 
      id: orderId, 
      status: 'Picked Up',
      role: role
    }))
  }

  const handleDeliver = (orderId) => {
    dispatch(updateOrderStatus({ 
      id: orderId, 
      status: 'Delivered',
      role: role
    }))
  }

  return (
    <div className="dashboard runner-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Runner Dashboard</h1>
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
                    
                    {order.pickupCode && order.pickupCode !== 'N/A' && (
                      <div style={{ 
                        background: 'var(--gold)', 
                        color: '#000', 
                        padding: '0.75rem', 
                        borderRadius: '6px', 
                        textAlign: 'center',
                        margin: '0.75rem 0',
                        fontWeight: 'bold'
                      }}>
                        <div style={{ fontSize: '0.75rem' }}>PICKUP CODE</div>
                        <div style={{ fontSize: '1.5rem', letterSpacing: '0.2em' }}>{order.pickupCode}</div>
                      </div>
                    )}

                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <p key={idx}>{item.quantity}x {item.name}</p>
                      ))}
                    </div>
                    
                    {order.deliveryLocation && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px', fontSize: '0.9rem' }}>
                        <strong>Deliver to:</strong>
                        <p>{order.deliveryLocation.building}</p>
                        {(order.deliveryLocation.floor || order.deliveryLocation.room) && (
                          <p>Floor {order.deliveryLocation.floor}, Room {order.deliveryLocation.room}</p>
                        )}
                      </div>
                    )}

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

                    {order.pickupCode && order.pickupCode !== 'N/A' && (
                      <div style={{ 
                        background: '#e0e0e0', 
                        color: '#000', 
                        padding: '0.5rem', 
                        borderRadius: '4px', 
                        textAlign: 'center',
                        margin: '0.5rem 0',
                        fontSize: '0.9rem'
                      }}>
                        Code: {order.pickupCode}
                      </div>
                    )}

                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <p key={idx}>{item.quantity}x {item.name}</p>
                      ))}
                    </div>
                    
                    {order.deliveryLocation && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px', fontSize: '0.9rem' }}>
                        <strong>Deliver to:</strong>
                        <p>{order.deliveryLocation.building}</p>
                        {(order.deliveryLocation.floor || order.deliveryLocation.room) && (
                          <p>Floor {order.deliveryLocation.floor}, Room {order.deliveryLocation.room}</p>
                        )}
                        {order.deliveryNotes && <p style={{ fontStyle: 'italic', marginTop: '0.25rem' }}>Note: {order.deliveryNotes}</p>}
                      </div>
                    )}

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
