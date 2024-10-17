import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

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

  return (
    <div>
      {project ? <h1>{project.name}</h1> : <p>Loading project...</p>}
    </div>
  );
};

export default ProjectPage;
