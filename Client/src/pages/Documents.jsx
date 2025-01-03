import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import {
  fetchPdfStart,
  fetchPdfSuccess,
  fetchPdfFailure
} from "../redux/pdfSlice"

export default function Documents() {
  const [pdfs, setPdf] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        dispatch(fetchPdfStart())
        const res = await fetch('/api/pdfs')
        const data = await res.json()
        const sortedDocuments = data.pdfs.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate))
        setPdf(sortedDocuments)
        dispatch(fetchPdfSuccess(data))
      } catch (error) {
        console.error(error)
        dispatch(fetchPdfFailure(error))
      }
    }
    fetchDocuments()
  }, [dispatch])

  const handleViewCollaborator = (colabId) => {
    console.log('Visualizar colaborador:', colabId);
    navigate(`/colabs/${colabId}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center text-center py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Documentos</h1>
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
        {pdfs.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {pdfs.map((doc, index) => (
              <li key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex flex-col text-start">
                  <p className="font-bold text-lg">Nome: {doc.colabName}</p>
                  <p>Documento: {doc.pdfName}</p>
                  <p>Validade: {new Date(doc.expirationDate).toLocaleDateString()}</p>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => handleViewCollaborator(doc.colabId)}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Visualizar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum documento encontrado</p>
        )}
      </div>
    </main>
  )
}
