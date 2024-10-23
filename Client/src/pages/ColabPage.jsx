import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [pdfName, setPdfName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchColabs = async () => {
      dispatch(fetchColabsStart());
      try {
        const res = await fetch(`/api/colabs/${colabId}`);
        const data = await res.json();
        dispatch(fetchColabsSuccess(data));
      } catch (error) {
        dispatch(fetchColabsFailure(error));
      }
    };
    fetchColabs();
  }, [dispatch, colabId]);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await fetch(`/api/colabs/${colabId}/pdf-files`);
        const data = await res.json();
        setPdfs(data.pdfs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPdf();
  }, [dispatch, colabId]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleNameChange = (e) => {
    setPdfName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile || !expirationDate) {
      setUploadStatus('Por favor, preencha todos os campos.');
      return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('pdfName', pdfName);
    formData.append('expirationDate', expirationDate);

    try {
      const res = await fetch(`/api/colabs/${colabId}/upload-pdf`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const newPdf = await res.json();
        setPdfs([...pdfs, newPdf]);
        setUploadStatus('Arquivo enviado com sucesso!');
        setPdfFile(null);
        setExpirationDate('');
      } else {
        setUploadStatus('Falha no envio do arquivo.');
      }
    } catch (error) {
      setUploadStatus('Erro ao enviar o arquivo.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Detalhes do Colaborador
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {colabs ? (
            <>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Nome:</span>
                  <span className="text-gray-800">{colabs.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">CPF:</span>
                  <span className="text-gray-800">{colabs.cpf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">RG:</span>
                  <span className="text-gray-800">{colabs.rg}</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Selecione o PDF:
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nome do documento:
                </label>
                <input
                  type="text"
                  value={pdfName} 
                  onChange={handleNameChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Data de Vencimento:
                </label>
                <input
                  type="date"
                  value={expirationDate}
                  onChange={handleDateChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Enviar PDF
              </button>

              {uploadStatus && (
                <p className="text-center text-gray-600 mt-4">{uploadStatus}</p>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Carregando...</p>
          )}
        </form>
        <div>
          {pdfs ? (
            <div className='mt-8'>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Documentos
              </h2>
              <ul className="space-y-4">
                {pdfs.map((pdf, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <p className="text-gray-800">Nome: {pdf.pdfName}</p>
                    <p className="text-gray-600">Validade: {new Date(pdf.expirationDate).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">Nenhum PDF enviado.</p>
          )}
        </div>
      </div>
    </main>
  );
}
