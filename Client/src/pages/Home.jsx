import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <div>
        <div>
          <nav className="w-full bg-slate-600">
            <ul className="flex gap-4 justify-around border p-3">
              <li>
                <select className="cursor-pointer">
                  <option>PROJETOS</option>
                  <Link to=''>
                    <option>Araraquara</option>
                  </Link>
                  <option>Divinóplis</option>
                  <option>Entrega de Novos</option>
                  <option>Klabin</option>
                  <option>Imperatriz</option>
                  <option>Pedro Leopoldo</option>
                </select>
              </li>
              <li className="cursor-pointer text-white">
                CRIAR PROJETO
              </li>
              <input
                type='search'
                placeholder='Buscar colaborador'
                value={search}
                onChange={handleSearch}
              />
            </ul>
          </nav>
        </div>
        <section className="max-w-lg mx-auto p-30 mt-10">
          <h1 className="text-3xl font-semibold text-center p-2">Colaboradores</h1>
          <table className='min-w-full bg-white'>
            <thead className="border">
              <tr>
                <th className='p-2 border'>Nome</th>
                <th className='p-2 border'>CPF</th>
                <th className='p-2 border'>RG</th>
                <th className='p-2 border'>Visualizar</th>
                <th className='p-2 border'>Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className='py-2 px-4 border'>Carlos</td>
                <td className='py-2 px-4 border'>01234567891</td>
                <td className='py-2 px-4 border'>1594562</td>
                <td className='py-2 px-4 border'><FaEye /></td>
                <td className='py-2 px-4 border'>EXCLUIR</td>
              </tr>
              <tr>
                <td className='py-2 px-4 border'>Marcus</td>
                <td className='py-2 px-4 border'>123456789321</td>
                <td className='py-2 px-4 border'>9632587</td>
                <td className='py-2 px-4 border'><FaEye /></td>
                <td className='py-2 px-4 border'>EXCLUIR</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  )
}
