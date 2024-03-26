import { useLoaderData } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function AccountPage() {
  const navigate = useNavigate();

  const { signStatus } = useOutletContext();
  //console.log(`account page status ${signStatus}`);
  //const {posts, favorites} = useLoaderData();
  useEffect(() => {
    if (!signStatus) {
      navigate('/signIn')
    }
  }, [])

  const { setSignStatus } = useOutletContext();
  const handleSignOut = async () => {
    await setSignStatus(false);
    //console.log("logged out", signStatus);
    navigate('/');
  }

  const handleDelete = () => {
    setSignStatus(false);
    const res = axios.delete(`/api/user/${userId}`).then(() => {
      console.log("account deleted")
      navigate('/')
    })

  }

  return (
    <>
      <div className="justify-center items-center h-screen gap-3 items-center text-center">
        <div>
          <h1>User Information</h1>
        </div>
        <div>
          <h1>My Listings</h1>
        </div>
        <button className="btn btn-primary flex justify-center my-4" onClick={handleSignOut}>Sign Out</button>
        <button className="btn btn-neutral flex justify-center my-4">Delete Account</button>
      </div>
    </>
  )
}