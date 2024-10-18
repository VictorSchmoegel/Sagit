import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { colabs } = useSelector((state) => state.colabs);
  const [project, setProject] = useState(null);
  const [newColab, setNewColab] = useState({ name: '', cpf: '', rg: '', location: id });
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
    dispatch(createColabStart());

    try {
      const res = await fetch(`/api/projects/${id}/createColab`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newColab), // Envia os dados do novo colaborador
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const data = await res.json();
      dispatch(createColabSuccess(data));
      setNewColab({ name: '', cpf: '', rg: '', location: id }); // Limpa o formulário após o sucesso
    } catch (error) {
      dispatch(createColabFailure(error));
    }
  };

  const handleViewCollaborator = (collaboratorId) => {
    console.log('Viewing collaborator:', collaboratorId);
    // Redirecionar para a página de visualização ou executar uma ação
  };

  const handleDemobilizeCollaborator = (collaboratorId) => {
    console.log('Demobilizing collaborator:', collaboratorId);
    // Lógica para desmobilizar o colaborador
  };

  return (
    <main className='min-h-screen flex p-5 flex-col'>
      <div className="max-w-lg w-full mx-auto">
        {project ? (
          <>
            <h1 className="text-3xl font-bold mb-20 text-center">{project.name}</h1>
            {/* Formulário para cadastrar colaborador */}
            <form onSubmit={handleCreateColab} className="mb-5 flex">
              <div>
                <h2 className=" text-start text-2xl font-bold mb-2 p-3 pr-48">Cadastrar Colaborador</h2>
                <p className='text-start font-semibold'>Projeto <strong>{project.name}</strong> conta com um total de <strong>{colabs.length}</strong> ativos</p>
              </div>
              <div className='flex flex-col gap-2'>
                <div className=''>
                  <input
                    className="border px-2 py-1"
                    required
                    placeholder='Nome'
                    type="text"
                    value={newColab.name}
                    onChange={(e) => setNewColab({ ...newColab, name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    className="border px-2 py-1"
                    required
                    placeholder='CPF'
                    type="text"
                    value={newColab.cpf}
                    onChange={(e) => setNewColab({ ...newColab, cpf: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    className="border px-2 py-1"
                    required
                    placeholder='RG'
                    type="text"
                    value={newColab.rg}
                    onChange={(e) => setNewColab({ ...newColab, rg: e.target.value })}
                  />
                </div>
                <button
                type="submit"
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              >
                Cadastrar Colaborador
              </button>
              </div>
            </form>

            {/* Tabela de colaboradores */}
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
                {colabs.map((collaborator) => (
                  <tr key={collaborator._id}>
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
          </>
        ) : (
          <p>Loading project...</p>
        )}
      </div>
    </main>
  );
};

export default ProjectPage;
