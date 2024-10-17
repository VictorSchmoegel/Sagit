import imagemFundo from '../assets/imagem1.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice';

export default function Users() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(signInStart());
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return
      }
      dispatch(signInSuccess(data));
      navigate('/home');
    } catch (error) {
      dispatch(signInFailure(error));
      console.log(error);
    }
  }
  return (
    <main
      style={{ backgroundImage: `url(${imagemFundo})` }}
      className='min-h-screen bg-no-repeat bg-cover bg-center flex items-center opacity-80'
    >
      <div className="max-w-lg w-full mx-auto p-3 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold my-7 text-black">Entrar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 p-2 rounded-lg hover:border-gray-500"
            type="text"
            id="username"
            placeholder="Usuário"
            onChange={handleChange}
          />
          <input
            className="border border-gray-300 p-2 rounded-lg hover:border-gray-500"
            type="password"
            id="password"
            placeholder="Senha"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
          <div className='flex justify-between'>
            <p>Para se cadastrar
              <a href="/contact" className="text-blue-500 hover:underline"> nos mande uma mensagem</a>
            </p>
          </div>
        </form>
        {error && <p className="text-black bg-red-700 font-bold border text-center">{error}</p>}
      </div>
    </main>
  )
}
