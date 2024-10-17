import { LogOut } from "lucide-react";
import WelcomeImg from "../../../assets/welcome.svg";
import { deleteCookies, fetchCookieToken, fetchFromCookie } from "../../../utils/LoginUtils/user.utils";
import { useEffect } from "react";
import { clientApiFetch } from "../../../utils/LoginUtils/api.utils";
import { useNavigate } from "react-router-dom";
import TournamentRegistration from "@/Player-Web/components/TournamentRegistration";
import Navbar from "@/Player-Web/components/Navbar";

function AppPage() {
  const navigate = useNavigate();             
  useEffect(() => {
    async function init(){
      const res = await clientApiFetch("http://localhost:3000/api/profile", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${fetchCookieToken()}`
        }
      })
      if(res.error){
        deleteCookies();
        navigate('/login');
      }
    }

    init();
  })

  function logOut(){
    deleteCookies();
    navigate('/login');
  }

  return (
    <div>
      <div className="sticky top-0 z-40 w-full backdrop-blur shadow-md">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="relative flex items-center justify-between">
            <div className="font-medium">User</div>
            <div>
              <button onClick={() => {navigate('/team');}}>Teams</button>
            </div>
            <div className="flex">
              <p>{fetchFromCookie('username')}</p>
              <LogOut className="w-5 ml-4 cursor-pointer" onClick={logOut}/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-7 mt-64 lg:mt-32">
        <TournamentRegistration/>
      </div>
    </div>
  )
}

export default AppPage;