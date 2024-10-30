import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchColabsStart,
  fetchColabsSuccess,
  fetchColabsFailure,
} from '../redux/colabSlice';
import {
  deletePdfStart,
  deletePdfSuccess,
  deletePdfFailure,
  updatePdfStart,
  updatePdfSuccess,
  updatePdfFailure,
} from '../redux/pdfSlice';

export default function ColabPage() {
  const { colabs } = useSelector((state) => state.colabs);
  const { colabId } = useParams();
  const dispatch = useDispatch();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [pdfName, setPdfName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPdfId, setEditPdfId] = useState(null);
  const [newPdfName, setNewPdfName] = useState('');
  const [newExpirationDate, setNewExpirationDate] = useState('');

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
        console.log(data.pdfs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPdf();
  }, [colabId]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleNameChange = (e) => {
    setPdfName(e.target.value);
  };

  const handleRemovePdf = async (pdfID) => {
    if (window.confirm('Deseja remover este PDF?')) {
      dispatch(deletePdfStart());
      try {
        const res = await fetch(`/api/colabs/${colabId}/delete-pdf/${pdfID}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          dispatch(deletePdfSuccess(pdfID));
          setPdfs(pdfs.filter((pdf) => pdf._id !== pdfID));
          setSuccessMessage('PDF removido com sucesso!');
        } else {
          dispatch(deletePdfFailure('Falha ao remover o PDF'));
        }
      } catch (error) {
        dispatch(deletePdfFailure('Erro ao remover o PDF'));
        console.error(error);
      }
    }
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
      console.error(error);
      setUploadStatus('Erro ao enviar o arquivo.');
    }
  };

  const handleEditClick = (pdf) => {
    setEditPdfId(pdf._id);
    setNewPdfName(pdf.pdfName);
    setNewExpirationDate(pdf.expirationDate);
    setIsModalOpen(true);
  };

  const handleUpdatePdf = async () => {
    dispatch(updatePdfStart());
    try {
      const res = await fetch(`/api/colabs/${colabId}/update/${editPdfId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfName: newPdfName,
          expirationDate: newExpirationDate,
        }),
      });
      if (res.ok) {
        const updatedPdf = await res.json();
        setPdfs(pdfs.map((pdf) => (pdf._id === editPdfId ? updatedPdf : pdf)));
        dispatch(updatePdfSuccess(updatedPdf));
        setSuccessMessage('PDF atualizado com sucesso!');
      } else {
        dispatch(updatePdfFailure('Falha ao atualizar o PDF'));
      }
    } catch (error) {
      dispatch(updatePdfFailure('Erro ao atualizar o PDF'));
      console.error(error);
    } finally {
      setIsModalOpen(false);
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
              {/* Informações do colaborador */}
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

              {/* Upload de PDF */}
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

              {/*Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-md shadow-lg w-96">
                    <h2 className="text-xl font-semibold mb-4">
                      Editar PDF
                    </h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={newPdfName}
                        onChange={(e) => setNewPdfName(e.target.value)}
                        placeholder="Novo nome do PDF"
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <input
                        type="date"
                        value={newExpirationDate}
                        onChange={(e) => setNewExpirationDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleUpdatePdf}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                      >
                        Concluir
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
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
        {successMessage && (
          <p className="text-center text-green-600 mt-4">{successMessage}</p>
        )}
        <div>
          {pdfs && pdfs.length > 0 ? ( 
            pdfs.map((pdf, index) => (
              <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div>
                <p className="text-gray-800">Doc: {pdf.pdfName}</p>
                <p className="text-gray-600 text-sm">
                  Vencimento: {
                    new Date(pdf.expirationDate).toLocaleDateString('pt-BR')
                  }
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleEditClick(pdf)}
                  className="text-blue-600 hover:text-blue-700 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleRemovePdf(pdf._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum PDF encontrado.</p>
          )}

        </div>
      </div>
    </main>
  );
}
