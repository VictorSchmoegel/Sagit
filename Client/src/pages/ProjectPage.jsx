import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [collaborators, setCollaborators] = useState([
    {
      _id: '1',
      name: 'João Silva',
      cpf: '123.456.789-00',
      rg: 'MG-12.345.678',
    },
    {
      _id: '2',
      name: 'Maria Oliveira',
      cpf: '987.654.321-00',
      rg: 'SP-98.765.432',
    },
    {
      _id: '3',
      name: 'Pedro Santos',
      cpf: '111.222.333-44',
      rg: 'RJ-11.222.333',
    },
    {
      _id: '4',
      name: 'Ana Costa',
      cpf: '555.666.777-88',
      rg: 'PR-55.666.777',
    },
    {
      _id: '5',
      name: 'Lucas Pereira',
      cpf: '999.888.777-66',
      rg: 'RS-99.888.777',
    },
  ]);

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

  const handleViewCollaborator = (collaboratorId) => {
    console.log('Viewing collaborator:', collaboratorId);
    // Redirecionar para a página de visualização ou executar uma ação
  };

  const handleDemobilizeCollaborator = (collaboratorId) => {
    console.log('Demobilizing collaborator:', collaboratorId);
    // Lógica para desmobilizar o colaborador
  };

  return (
    <div className="p-5">
      {project ? (
        <>
          <h1 className="text-3xl font-bold mb-5">{project.name}</h1>
          
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
              {collaborators.map((collaborator) => (
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
  );
};

export default ProjectPage;
