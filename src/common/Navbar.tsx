import logo from 'assets/logo.svg'
import { useCart } from 'context/cartContext'

const Navbar: React.FC = () => {
  const { totalItems, setCartOpen } = useCart()

  return (
    <div className='navbar bg-[#191e51]'>
      <div className='navbar-start '>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <a href='/'>Products</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center hidden sm:inline'>
        <a href='/'>
          <img src={logo} alt='' />
        </a>
      </div>
      <div className='navbar-end'>
        <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
          <button onClick={() => setCartOpen(true)}>
            <div className='indicator text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='badge badge-sm indicator-item'>{totalItems}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
