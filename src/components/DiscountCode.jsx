import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyDiscountCode, setAppliedDiscount } from '../store/ordersSlice'
import { applyDiscount } from '../utils/businessLogic'

function DiscountCode({ orderTotal }) {
  const dispatch = useDispatch()
  const { discountCode, appliedDiscount } = useSelector(state => state.orders)
  const [code, setCode] = useState(discountCode || '')
  const [message, setMessage] = useState('')

  const handleApply = () => {
    if (!code.trim()) {
      setMessage('Please enter a discount code')
      return
    }

    const result = applyDiscount(orderTotal, code)
    
    if (result.valid) {
      dispatch(applyDiscountCode(code))
      dispatch(setAppliedDiscount(result))
      setMessage(result.message)
    } else {
      dispatch(setAppliedDiscount(null))
      setMessage(result.message)
    }
  }

  const handleRemove = () => {
    setCode('')
    dispatch(applyDiscountCode(''))
    dispatch(setAppliedDiscount(null))
    setMessage('')
  }

  return (
    <div className="discount-code">
      <div className="discount-input-group">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter discount code"
          maxLength={20}
          disabled={appliedDiscount?.valid}
        />
        {appliedDiscount?.valid ? (
          <button onClick={handleRemove} className="remove-btn">
            Remove
          </button>
        ) : (
          <button onClick={handleApply} className="apply-btn">
            Apply
          </button>
        )}
      </div>
      {message && (
        <p className={`discount-message ${appliedDiscount?.valid ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
      {appliedDiscount?.valid && (
        <p className="discount-savings">
          You saved {appliedDiscount.amount} MAD!
        </p>
      )}
    </div>
  )
}

export default DiscountCode
