import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, toggleOrdering } from '../store/appSlice'
import { toggleShop } from '../store/shopsSlice'

function AdminDash() {
  const dispatch = useDispatch()
  const shops = useSelector(state => state.shops.shops)
  const orderingEnabled = useSelector(state => state.app.orderingEnabled)
  const [view, setView] = useState('shops')
  const [editingShop, setEditingShop] = useState(null)
  const [cutoff, setCutoff] = useState('')
  const [fee, setFee] = useState('')

  const handleSaveShop = (shopId) => {
    // In a real app, this would update the shop
    setEditingShop(null)
    setCutoff('')
    setFee('')
  }

  return (
    <div className="dashboard admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>⚙️ Admin Dashboard</h1>
          <p className="header-subtitle">System management</p>
        </div>
        <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
      </header>

      <div className="shop-controls">
        <button 
          className={`toggle-shop-btn ${orderingEnabled ? 'open' : 'closed'}`}
          onClick={() => dispatch(toggleOrdering())}
        >
          {orderingEnabled ? '🟢 Ordering Open - Click to Close' : '🔴 Ordering Closed - Click to Open'}
        </button>
      </div>

      <div className="view-tabs">
        <button 
          className={`tab ${view === 'shops' ? 'active' : ''}`}
          onClick={() => setView('shops')}
        >
          Manage Shops
        </button>
        <button 
          className={`tab ${view === 'settings' ? 'active' : ''}`}
          onClick={() => setView('settings')}
        >
          Settings
        </button>
      </div>

      <div className="content-section">
        {view === 'shops' && (
          <>
            <h2>Shops</h2>
            <div className="shops-grid">
              {shops.map(shop => (
                <div key={shop.id} className="admin-shop-card">
                  <h3>{shop.name}</h3>
                  <div className="shop-details">
                    <p><strong>Cutoff:</strong> {shop.cutoffTime}</p>
                    <p><strong>Service Fee:</strong> ${shop.serviceFee}</p>
                    <p><strong>Max Orders:</strong> {shop.maxOrders}</p>
                    <p><strong>Status:</strong> {shop.enabled ? '✓ Enabled' : '✗ Disabled'}</p>
                  </div>
                  <div className="admin-actions">
                    <button 
                      className="action-btn edit"
                      onClick={() => setEditingShop(shop.id)}
                    >
                      Edit
                    </button>
                    <button 
                      className={`action-btn ${shop.enabled ? 'disable' : 'enable'}`}
                      onClick={() => dispatch(toggleShop(shop.id))}
                    >
                      {shop.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>

                  {editingShop === shop.id && (
                    <div className="edit-form">
                      <input
                        type="time"
                        value={cutoff}
                        onChange={(e) => setCutoff(e.target.value)}
                        placeholder="Cutoff Time"
                      />
                      <input
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        placeholder="Service Fee"
                      />
                      <button 
                        className="action-btn save"
                        onClick={() => handleSaveShop(shop.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="action-btn cancel"
                        onClick={() => setEditingShop(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'settings' && (
          <>
            <h2>Global Settings</h2>
            <div className="settings-form">
              <div className="form-group">
                <label>Global Service Fee</label>
                <input type="number" placeholder="$" defaultValue="1" />
              </div>
              <div className="form-group">
                <label>Default Max Orders per Shop</label>
                <input type="number" placeholder="20" defaultValue="20" />
              </div>
              <button className="action-btn save">Save Settings</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDash
