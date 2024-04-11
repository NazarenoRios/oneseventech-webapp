import './styles/TittleCard.css'

const TittleCard = () => {
  return (
    <div className='card'>
      <div className='card-content-wrapper'>
        <div className='card-title'>One Seven Prime</div>
        <div className='card-price'>
          <span>$</span>3,99<span>/month</span>
        </div>
        <div className='card-subtitle'>+ Benefits</div>
        <ul className='card-benefits'></ul>
      </div>
      <button className='card-btn'>More info</button>
    </div>
  )
}

export default TittleCard
