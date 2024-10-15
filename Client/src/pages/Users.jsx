import imagemFundo from '../assets/imagem1.png'

export default function Users() {
  return (
    <main
      style={{ backgroundImage: `url(${imagemFundo})` }}
      className='min-h-screen bg-no-repeat bg-cover bg-center flex items-center opacity-80'
    >
      <div className="max-w-lg w-full mx-auto p-3 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold my-7 text-black">Entrar</h1>
        <form className="flex flex-col gap-4">
          <input
            className="border border-gray-300 p-2 rounded-lg hover:border-gray-500"
            type="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            className="border border-gray-300 p-2 rounded-lg hover:border-gray-500"
            type="password"
            id="password"
            placeholder="Senha"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Entrar
          </button>
          <div className='flex justify-between'>
            <p>Para se cadastrar
              <a href="/contact" className="text-blue-500 hover:underline"> nos mande uma mensagem</a>
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}
