import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeliveryLocation, setDeliveryNotes, setPaymentMethod } from '../store/ordersSlice'

function DeliveryForm() {
  const dispatch = useDispatch()
  const { deliveryLocation, deliveryNotes, paymentMethod } = useSelector(state => state.orders)
  
  const [location, setLocation] = useState(deliveryLocation || {
    building: '',
    floor: '',
    room: '',
    landmark: ''
  })

  const handleLocationChange = (field, value) => {
    const updated = { ...location, [field]: value }
    setLocation(updated)
    dispatch(setDeliveryLocation(updated))
  }

  const handleNotesChange = (e) => {
    dispatch(setDeliveryNotes(e.target.value))
  }

  const handlePaymentChange = (e) => {
    dispatch(setPaymentMethod(e.target.value))
  }

  return (
    <div className="delivery-form">
      <h3>Delivery Details</h3>
      
      <div className="form-section">
        <label htmlFor="building">Building / Dorm</label>
        <input
          id="building"
          type="text"
          value={location.building}
          onChange={(e) => handleLocationChange('building', e.target.value)}
          placeholder="e.g., Building A, Main Dorm"
          maxLength={50}
        />
      </div>

      <div className="form-row">
        <div className="form-section">
          <label htmlFor="floor">Floor</label>
          <input
            id="floor"
            type="text"
            value={location.floor}
            onChange={(e) => handleLocationChange('floor', e.target.value)}
            placeholder="e.g., 3rd"
            maxLength={10}
          />
        </div>

        <div className="form-section">
          <label htmlFor="room">Room</label>
          <input
            id="room"
            type="text"
            value={location.room}
            onChange={(e) => handleLocationChange('room', e.target.value)}
            placeholder="e.g., 305"
            maxLength={10}
          />
        </div>
      </div>

      <div className="form-section">
        <label htmlFor="landmark">Landmark (Optional)</label>
        <input
          id="landmark"
          type="text"
          value={location.landmark}
          onChange={(e) => handleLocationChange('landmark', e.target.value)}
          placeholder="e.g., Near library entrance"
          maxLength={50}
        />
      </div>

      <div className="form-section">
        <label htmlFor="notes">Delivery Notes (Optional)</label>
        <textarea
          id="notes"
          value={deliveryNotes}
          onChange={handleNotesChange}
          placeholder="Special instructions for delivery..."
          maxLength={200}
          rows={3}
        />
        <span className="char-count">{deliveryNotes.length}/200</span>
      </div>

      <div className="form-section">
        <label htmlFor="payment">Payment Method</label>
        <select
          id="payment"
          value={paymentMethod}
          onChange={handlePaymentChange}
        >
          <option value="cash">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
          <option value="mobile">Mobile Payment</option>
        </select>
      </div>
    </div>
  )
}

export default DeliveryForm
