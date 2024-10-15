import logo from '../assets/sagit_logo_red.png'

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <img src={logo} alt="Sagit" className="w-24" />
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <ul className="flex gap-4">
            <li className="hover:underline cursor-pointer">Contato</li>
            <li className="hover:underline cursor-pointer">Sobre Nós</li>
            <li className="hover:underline cursor-pointer">Usuários</li>
          </ul>
        </form>
      </div>
    </header>
  )
}
