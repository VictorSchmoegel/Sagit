import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useRef, useState, } from "react";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/userSlice"

import avatar from '../../../uploads/1730230254365-371864670.jpg'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const [successMessage, setSuccessMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileRef = useRef(null)



  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await fetch(`/api/uploadavatar/${currentUser._id}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success === false) {
        setSuccessMessage(data.message);
        return;
      }
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error uploading avatar", error);
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/signout/${currentUser._id}`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate('/');
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }

  return (
    <main className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">{currentUser.username}</h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={handleFileUpload}
          type='file'
          ref={fileRef}
          accept='image/*'
          className='hidden'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={`/uploads/${currentUser.avatar.url}`}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover mx-auto cursor-pointer border-2 border-gray-300'
        />
        {successMessage && <p className='text-green-500 text-center'>{successMessage}</p>}
        <p className='text-sm self-center'>
          Configurações de perfil
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignOut}
        >
          Desconectar
        </button>
      </form>
    </main>
  )
}
