function Timer({ timeLeft, isClosed }) {
  return (
    <div className={`timer ${isClosed ? 'closed' : ''}`}>
      <span className="timer-label">Cutoff in</span>
      <span className="timer-value">{timeLeft}</span>
    </div>
  )
}

export default Timer
