import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure } from "../redux/projectsSlice";
import { fetchColabsStart, fetchColabsSuccess, fetchColabsFailure } from "../redux/colabSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { projects } = useSelector((state) => state.projects);
  const { colabs } = useSelector((state) => state.colabs);
  const navigate = useNavigate();
  const dispatch = useDispatch();


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

  useEffect(() => {
    const fetchColabs = async () => {
      dispatch(fetchColabsStart());
      try {
        const res = await fetch('/api/colabs');
        const data = await res.json();
        dispatch(fetchColabsSuccess(data));
        console.log(data)
      } catch (error) {
        dispatch(fetchColabsFailure(error));
      }
    };
    fetchColabs();
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const selectedProjectId = event.target.value;
    if (selectedProjectId !== 'PROJETOS') {
      navigate(`/projects/${selectedProjectId}`);
    }
  };

  return (
    <main className='flex flex-col bg-slate-100 min-h-screen'>
      <div>
        <div>
          <nav className="w-full bg-slate-600">
            <ul className="flex gap-4 justify-around border p-3">
              <li>
                <select className="cursor-pointer" onChange={handleSelectChange}>
                  <option value="PROJETOS">PROJETOS</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </li>
              <Link to='/projetos'>
                <li className="cursor-pointer text-white">
                  GERENCIAR PROJETOS
                </li>
              </Link>
            </ul>
          </nav>
          <section>
            <div className="border p-4 my-2">
            <h1 className="text-3xl text-center p-2">Colaboradores</h1>
              <table className="min-w-full bg-white shadow-md rounded-lg mt-5">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">NOME</th>
                    <th className="px-4 py-2 border">CPF</th>
                    <th className="px-4 py-2 border">RG</th>
                    <th className="px-4 py-2 border">VISUALIZAR</th>
                    <th className="px-4 py-2 border">DESMOBILIZAR</th>
                  </tr>
                </thead>
                <tbody>
                  {colabs.map((colab) => (
                    <tr key={colab._id}>
                      <td className="px-4 py-2 border">{colab.name}</td>
                      <td className="px-4 py-2 border">{colab.cpf}</td>
                      <td className="px-4 py-2 border">{colab.rg}</td>
                      <td className="px-4 py-2 border">
                        <Link to={`/colabs/${colab._id}`}>
                          <button className="bg-blue-500 text-white px-3 py-2 rounded">
                            Visualizar
                          </button>
                        </Link>
                      </td>
                      <td className="px-4 py-2 border">
                        <button className="bg-red-500 text-white px-3 py-2 rounded">
                          Desmobilizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
