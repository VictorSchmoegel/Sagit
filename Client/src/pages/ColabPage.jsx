import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchColabsStart,
  fetchColabsSuccess,
  fetchColabsFailure,
} from '../redux/colabSlice';

export default function ColabPage() {
  const { colabs } = useSelector((state) => state.colabs);
  const { colabId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchColabs = async () => {
      dispatch(fetchColabsStart());
      try {
        const res = await fetch(`/api/colabs/${colabId}`);
        const data = await res.json();
        dispatch(fetchColabsSuccess(data));
        console.log(data)
      } catch (error) {
        dispatch(fetchColabsFailure(error));
      }
    };
    fetchColabs();
  }, [dispatch]);

  return (
    <main>
      <div>
        {colabs ? (
          <>
            <h1>Detalhes do Colaborador</h1>
            <p>Nome: {colabs.name}</p>
            <p>CPF: {colabs.cpf}</p>
            <p>RG: {colabs.rg}</p>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </main>
  )
}
