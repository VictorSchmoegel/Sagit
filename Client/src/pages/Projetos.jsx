import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProjectStart, createProjectSuccess, createProjectFailure } from '../redux/userSlice';

export default function Projetos() {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(createProjectStart());
      const res = await fetch('/api/createproject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      dispatch(createProjectSuccess(data));
      if (data.success === false) {
        dispatch(createProjectFailure(data.message));
        return
      }
      dispatch(createProjectSuccess(data));
      navigate('/home');
    } catch (error) {
      dispatch(createProjectFailure(error));
      console.log(error);
    }
  };

  return (
    <main className='min-h-screen flex items-center opacity-80'>
      <div className="max-w-lg w-full mx-auto p-3 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold my-7 text-black">Crie o novo projeto</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input
          className="border border-gray-300 p-2 rounded-lg hover:border-gray-500"
            type="text"
            id="name"
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Criar
          </button>
        </form>
      </div>
    </main>
  )
}
