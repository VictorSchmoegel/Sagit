import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useRef, } from "react";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/userSlice"

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
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
        console.log(data.message);
        return;
      }
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
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <p>Username: {currentUser.username}</p>
        <input
          onChange={handleFileUpload}
          type='file'
          ref={fileRef}
          accept='image/*'
          className='hidden'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover mx-auto cursor-pointer'
        />
        <p className='text-sm self-center'>

        </p>
        <button onClick={handleSignOut}>Sign Out</button>
      </form>
    </main>
  )
}
