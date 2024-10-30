import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchColabsStart,
  fetchColabsSuccess,
  fetchColabsFailure,
  createColabStart,
  createColabFailure,
  createColabSuccess,
} from '../redux/colabSlice';

const ProjectPage = () => {
  const { id } = useParams();
  const { colabs, error } = useSelector((state) => state.colabs);
  const [project, setProject] = useState(null);
  const [newColab, setNewColab] = useState({ name: '', cpf: '', rg: '', location: id });
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchColabs = async () => {
      dispatch(fetchColabsStart());
      try {
        const res = await fetch(`/api/projects/${id}/colabs`);
        const data = await res.json();
        dispatch(fetchColabsSuccess(data));
      } catch (error) {
        dispatch(fetchColabsFailure(error));
      }
    };
    fetchColabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colabs]);

  // Função para lidar com o cadastro de colaborador
  const handleCreateColab = async (e) => {
    e.preventDefault();
    try {
      dispatch(createColabStart());
      const res = await fetch(`/api/projects/${id}/createColab`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newColab),
      });
      const data = await res.json();
      dispatch(createColabSuccess(data.message));
      setSuccessMessage(data.message);
      if (data.success === false) {
        dispatch(createColabFailure(data.message));
        return;
      }
      dispatch(createColabSuccess(data.message));
      dispatch(createColabFailure(null));
      setNewColab({ name: '', cpf: '', rg: '', location: id });
    } catch (error) {
      dispatch(createColabFailure(error));

    }
  };

  const handleViewCollaborator = (collaboratorId) => {
    navigate(`/colabs/${collaboratorId}`);
  };

  const handleDemobilizeCollaborator = async (collaboratorId) => {
    if (window.confirm('Tem certeza que deseja desmobilizar o colaborador?')) {
      try {
        const res = await fetch(`/api/projects/${id}/deleteColab/${collaboratorId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
  
        if (res.ok) {
          setSuccessMessage(data.message);
          // Remove o colaborador do estado após a exclusão
          dispatch(fetchColabsSuccess(colabs.filter(colab => colab._id !== collaboratorId)));
        } else {
          setSuccessMessage(null);
          console.error('Falha ao desmobilizar colaborador:', data.message);
        }
      } catch (error) {
        console.error('Erro ao desmobilizar colaborador:', error);
      }
    }
  };

  return (
    <main className='min-h-screen flex p-5 flex-col'>
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {project ? (
          <>
            <h1 className="text-3xl font-bold mb-10 text-center">{project.name}</h1>

            {/* Formulário para cadastrar colaborador */}
            <form onSubmit={handleCreateColab} className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-start text-2xl font-bold mb-2">Cadastrar Colaborador</h2>
                <p className='text-start font-semibold'>
                  Projeto <strong>{project.name}</strong> conta com o total de <strong>{colabs.length}</strong> colaboradores ativos
                </p>
              </div>

              <div className='flex flex-col gap-4'>
                <input
                  className="border px-2 py-1"
                  required
                  placeholder='Nome'
                  type="text"
                  value={newColab.name}
                  onChange={(e) => setNewColab({ ...newColab, name: e.target.value })}
                />

                <input
                  className="border px-2 py-1"
                  required
                  placeholder='CPF'
                  type="text"
                  value={newColab.cpf}
                  onChange={(e) => setNewColab({ ...newColab, cpf: e.target.value })}
                />

                <input
                  className="border px-2 py-1"
                  required
                  placeholder='RG'
                  type="text"
                  value={newColab.rg}
                  onChange={(e) => setNewColab({ ...newColab, rg: e.target.value })}
                />

                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-2 rounded mt-2 w-full md:w-auto"
                >
                  Cadastrar
                </button>
                {error && <p className='text-red-500'>{error}</p>}
                {successMessage && <p className='text-green-500'>{successMessage}</p>}
              </div>
            </form>

            {/* Tabela de colaboradores */}
            <div className="overflow-x-auto">
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
                  {colabs.map((collaborator, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{collaborator.name}</td>
                      <td className="px-4 py-2 border">{collaborator.cpf}</td>
                      <td className="px-4 py-2 border">{collaborator.rg}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleViewCollaborator(collaborator._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Visualizar
                        </button>
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleDemobilizeCollaborator(collaborator._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Desmobilizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </main>

  );
};

export default ProjectPage;