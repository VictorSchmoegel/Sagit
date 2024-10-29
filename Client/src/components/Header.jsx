import logo from '../assets/sagit_logo_red.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const { currentUser } = useSelector(state => state.user)

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
          <img src={logo} alt="Sagit" className="w-24" />
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <ul className="flex gap-4">
          <Link to='/home'>
              <li className="hover:underline cursor-pointer">Home</li>
            </Link>
            <Link to='/contact'>
              <li className="hover:underline cursor-pointer">Contato</li>
            </Link>
            <Link to='about'>
              <li className="hover:underline cursor-pointer">Sobre</li>
            </Link>
            <Link to='Users'>
              {currentUser ? (
                <li className="hidden">Usuários</li>
              ) : (
                <li className="hover:underline cursor-pointer"></li>
              )}
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='avatar'
                />
              ) : (
                <li className='hover:underline cursor-pointer'>Usuários</li>
              )}
            </Link>
          </ul>
        </form>
      </div>
    </header>
  )
}
