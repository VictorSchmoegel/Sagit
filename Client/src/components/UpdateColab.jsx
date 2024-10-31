import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateColabStart, updateColabSuccess, updateColabFailure } from "../redux/colabSlice";

export default function UpdateColab({ colabId, currentData }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(currentData.name);
  const [updatedCpf, setUpdatedCpf] = useState(currentData.cpf);
  const [updatedRg, setUpdatedRg] = useState(currentData.rg);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateColab = async () => {
    dispatch(updateColabStart());
    try {
      const res = await fetch(`/api/colabs/update/${colabId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedName,
          cpf: updatedCpf,
          rg: updatedRg,
        }),
      });
      if (res.ok) {
        const updatedColab = await res.json();
        dispatch(updateColabSuccess(updatedColab));
        setSuccessMessage('Colaborador atualizado com sucesso');
        setIsModalOpen(false);
      } else {
        dispatch(updateColabFailure('Falha ao atualizar o colaborador'));
      }
    } catch (error) {
      dispatch(updateColabFailure('Erro ao atualizar o colaborador'));
      setErrorMessage('Erro ao atualizar o colaborador');
      console.error(error);
    }
  }

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        Atualizar Colaborador
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Editar Colaborador</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Nome"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                value={updatedCpf}
                onChange={(e) => setUpdatedCpf(e.target.value)}
                placeholder="CPF"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                value={updatedRg}
                onChange={(e) => setUpdatedRg(e.target.value)}
                placeholder="RG"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleUpdateColab}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </div>
      )}
    </>
  )
}
