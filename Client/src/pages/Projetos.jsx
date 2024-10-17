import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  createProjectStart,
  createProjectSuccess,
  createProjectFailure,
  fetchProjectsStart, 
  fetchProjectsSuccess, 
  fetchProjectsFailure,
} from '../redux/projectsSlice';

export default function Projetos() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    const fetchProjects = async () => {
      dispatch(fetchProjectsStart());
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        dispatch(fetchProjectsSuccess(data));
      } catch (error) {
        dispatch(fetchProjectsFailure(error));
      }
    };
    fetchProjects();
  }, [dispatch]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      if (data.success === false) {
        dispatch(createProjectFailure(data));
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
          <h1 className="text-3xl text-center font-semibold my-7 text-black">Gerencie Seus Projetos</h1>
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
          <div>
            {projects.map((project) => (
              <div key={project._id} className="flex justify-between p-2 border-b border-gray-300">
                <p>{project.name}</p>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </div>
    </main>
  )
}
