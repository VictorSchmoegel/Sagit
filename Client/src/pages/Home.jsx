import { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure } from "../redux/projectsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { projects } = useSelector((state) => state.projects);
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

  const handleSelectChange = (event) => {
    const selectedProject = event.target.value;
    if (selectedProject !== 'PROJETOS') {
      navigate(`/${selectedProject}`);
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
                {projects.map((project, index) => (
                  <option key={index} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </li>
            <Link to='/projetos'>
              <li className="cursor-pointer text-white">
                CRIAR PROJETO
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  </main>
  )
}
