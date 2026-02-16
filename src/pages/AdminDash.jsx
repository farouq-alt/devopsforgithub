import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, toggleOrdering, creditBalance } from '../store/appSlice'
import { toggleShop } from '../store/shopsSlice'
import { createSignupCode, getAllSignupCodes, deactivateSignupCode } from '../utils/codes'

function AdminDash() {
  const dispatch = useDispatch()
  const { role, user } = useSelector(state => state.app)
  const shops = useSelector(state => state.shops.shops)
  const orderingEnabled = useSelector(state => state.app.orderingEnabled)
  const allOrders = useSelector(state => state.orders.allOrders)
  const [view, setView] = useState('codes')
  const [editingShop, setEditingShop] = useState(null)
  const [cutoff, setCutoff] = useState('')
  const [fee, setFee] = useState('')
  const [signupCodes, setSignupCodes] = useState(getAllSignupCodes())
  const [creditAmount, setCreditAmount] = useState('')
  const [creditNote, setCreditNote] = useState('')

  const handleSaveShop = () => {
    // In a real app, this would update the shop
    setEditingShop(null)
    setCutoff('')
    setFee('')
  }

  const handleToggleShop = (shopId) => {
    dispatch(toggleShop({ 
      shopId,
      isAdmin: role === 'admin'
    }))
  }

  const handleGenerateCode = () => {
    const newCode = createSignupCode(user)
    setSignupCodes(getAllSignupCodes())
    alert(`New code generated: ${newCode}`)
  }

  const handleDeactivateCode = (code) => {
    if (window.confirm(`Deactivate code ${code}?`)) {
      deactivateSignupCode(code)
      setSignupCodes(getAllSignupCodes())
    }
  }

  const handleCreditBalance = () => {
    const amount = parseFloat(creditAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount')
      return
    }
    
    // In a real app, you'd select a specific student
    // For now, this is a placeholder
    dispatch(creditBalance({
      amount,
      note: creditNote || 'Manual credit by admin',
      adminId: user
    }))
    
    alert(`${amount} MAD credited successfully`)
    setCreditAmount('')
    setCreditNote('')
  }

  const stats = {
    totalOrders: allOrders.length,
    activeOrders: allOrders.filter(o => !['Delivered', 'Cancelled', 'No-show'].includes(o.status)).length,
    revenue: allOrders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.total, 0),
    noShows: allOrders.filter(o => o.status === 'No-show').length
  }

  return (
    <div className="dashboard admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="header-subtitle">System management</p>
        </div>
        <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
      </header>

      <div className="shop-controls">
        <button 
          className={`toggle-shop-btn ${orderingEnabled ? 'open' : 'closed'}`}
          onClick={() => dispatch(toggleOrdering())}
        >
          {orderingEnabled ? 'Ordering Open - Click to Close' : 'Ordering Closed - Click to Open'}
        </button>
      </div>

      <div className="shop-stats">
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">{stats.totalOrders}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Orders</span>
          <span className="stat-value">{stats.activeOrders}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Revenue</span>
          <span className="stat-value">{stats.revenue} MAD</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">No-shows</span>
          <span className="stat-value">{stats.noShows}</span>
        </div>
      </div>

      <div className="view-tabs">
        <button 
          className={`tab ${view === 'codes' ? 'active' : ''}`}
          onClick={() => setView('codes')}
        >
          Signup Codes
        </button>
        <button 
          className={`tab ${view === 'balance' ? 'active' : ''}`}
          onClick={() => setView('balance')}
        >
          Credit Balance
        </button>
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
        {view === 'codes' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Signup Codes</h2>
              <button className="action-btn" onClick={handleGenerateCode} style={{ background: 'var(--forest-green)' }}>
                Generate New Code
              </button>
            </div>
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Generate one-time signup codes and distribute them to students via WhatsApp, email, or printed cards.
                Each code can only be used once.
              </p>
            </div>
            <div className="codes-list">
              {signupCodes.length === 0 ? (
                <p className="empty-state">No codes generated yet</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Code</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Created</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Used By</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signupCodes.map(code => (
                      <tr key={code.code} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{code.code}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.85rem',
                            background: code.used ? '#ffebee' : '#e8f5e9',
                            color: code.used ? '#c62828' : '#2e7d32'
                          }}>
                            {code.used ? 'Used' : 'Available'}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                          {new Date(code.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
                          {code.usedBy || '-'}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          {!code.used && (
                            <button 
                              onClick={() => handleDeactivateCode(code.code)}
                              style={{ 
                                padding: '0.25rem 0.75rem', 
                                background: 'var(--burgundy)', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                              }}
                            >
                              Deactivate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {view === 'balance' && (
          <>
            <h2>Credit Student Balance</h2>
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Manually credit student accounts after receiving offline payment (cash/bank transfer).
                Monthly subscription: 150 MAD.
              </p>
            </div>
            <div className="settings-form">
              <div className="form-group">
                <label>Amount (MAD)</label>
                <input 
                  type="number" 
                  placeholder="150" 
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Note (optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g., Monthly subscription - January 2026"
                  value={creditNote}
                  onChange={(e) => setCreditNote(e.target.value)}
                />
              </div>
              <button 
                className="action-btn save"
                onClick={handleCreditBalance}
                disabled={!creditAmount || parseFloat(creditAmount) <= 0}
              >
                Credit Balance
              </button>
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
                Note: In production, you would select a specific student from a list. This demo credits the current logged-in user.
              </p>
            </div>
          </>
        )}

        {view === 'shops' && (
          <>
            <h2>Shops</h2>
            <div className="shops-grid">
              {shops.map(shop => (
                <div key={shop.id} className="admin-shop-card">
                  <h3>{shop.name}</h3>
                  <div className="shop-details">
                    <p><strong>Cutoff:</strong> {shop.cutoffTime}</p>
                    <p><strong>Service Fee:</strong> {shop.serviceFee} MAD</p>
                    <p><strong>Max Orders:</strong> {shop.maxOrders}</p>
                    <p><strong>Status:</strong> {shop.enabled ? 'Enabled' : 'Disabled'}</p>
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
                      onClick={() => handleToggleShop(shop.id)}
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
                        onClick={() => handleSaveShop()}
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
                <input type="number" placeholder="MAD" defaultValue="1" />
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
