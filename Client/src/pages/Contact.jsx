import { useState } from "react"
import emailJs from "@emailjs/browser"

export default function Contato() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const templateParams = {
    name,
    email,
    message,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    if (!email || !name || !message) {
      setError('Preencha todos os campos');
      return;
    }
    emailJs.send('service_ry6j4zy', 'template_lfks8zi', templateParams, 'bXYly7Hsc3oMD7H2E')
    .then((res) => {
      console.log('SUCCESS!', res.status, res.text);
      setSuccess(true);
      setEmail('');
      setName('');
      setMessage('');
      setLoading(false);
    },(error) => {
      setError(error.text || 'Ocorreu um erro ao enviar a mensagem');
      setSuccess(false);
    });
  };

  return (
    <main className="flex bg-slate-100 h-screen">
      <div className="max-w-lg w-full mx-auto p-3">
        <h1 className="text-3xl p-3 text-center font-semibold">Deixe sua mensagem</h1>
        <form onSubmit={handleSubmit} className="flex flex-col border p-3 bg-white">
          <label className="font-bold" htmlFor="name">Nome</label>
          <input
            id="name"
            className="border border-gray-300 p-2 rounded-lg hover:border-gray-500 mb-5"
            type="text"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label className="font-bold" htmlFor="email">Email</label>
          <input
            id="email"
            className="border border-gray-300 p-2 rounded-lg hover:border-gray-500 mb-5"
            type="text"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className="font-bold" htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            className="border border-gray-300 p-2 rounded-lg hover:border-gray-500 mb-5"
            placeholder="Digite sua mensagem"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {loading && <p>Enviando...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Enviar
          </button>
          {success &&
            <div className="text-center p-3">
              <p className="text-green-500">Mensagem enviada com sucesso!</p>
              <p>Agradecemos o contato, nossa equipe retornará dentro de 48 horas!</p>
            </div>
          }
        </form>
      </div>
    </main>
  )
}
