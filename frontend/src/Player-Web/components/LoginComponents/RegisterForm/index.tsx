// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { checkValidPassword } from "../../../utils/LoginUtils/password.utils";
// import { useState } from "react"
// import PasswordHelpHover from "../PasswordHelpHover";
// import { clientApiFetch } from "../../../utils/LoginUtils/api.utils";
// import { useNavigate } from "react-router-dom";
// import EgButton from "../EgButton";
// import { storeInCookie, storeTokenInCookie } from "../../../utils/LoginUtils/user.utils";

// function RegisterForm() {

//   const navigate = useNavigate();

//   const [password, setPassword] = useState<string>('');
//   const [username, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [passwordValid, setPasswordValid] = useState(true);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [apiError, setApiError] = useState<string | undefined>(undefined);

//   async function formSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//     e.preventDefault();
//     setApiError(undefined);
//     if (username && username.length > 0 && email && email.length > 0 && password && checkValidPassword(password)) {
//       setIsLoading(true);
//       const res = await clientApiFetch("http://localhost:3000/api/signup", {
//         method: 'POST',
//         body: {
//           username: username,
//           email: email,
//           password: btoa(password)
//         }
//       })
//       if (!res.error) {
//         storeTokenInCookie(res.data.access_token);
//         storeInCookie('username', res.data.username);
//         navigate('/app');
//       }
//       else {
//         setApiError(res.message);
//       }
//       setIsLoading(false);
//     }
//     if (!checkValidPassword(password)) {
//       setPasswordValid(false)
//     }
//   }

//   return (
//     <form className='mt-10 grid grid-cols-1 gap-y-8'>
//       <div className="grid w-full max-w-sm items-center gap-1.5">
//         <Label htmlFor="name">Name</Label>
//         <Input type="text" id="name" required onChange={(e) => setName(e.target.value)} />
//       </div>

//       <div className="grid w-full max-w-sm items-center gap-1.5">
//         <Label htmlFor="email">Email</Label>
//         <Input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
//       </div>

//       <div className="grid w-full max-w-sm items-center gap-1.5">
//         <Label htmlFor="password">
//           Password
//           <PasswordHelpHover />
//         </Label>
//         <Input type="password" id="password" onChange={(e) => {
//           setPasswordValid(true);
//           setPassword(e.target.value)
//         }} required />
//         {
//           !passwordValid && <p className="text-red-500 text-sm">Incorrect Password format.<br />Please enter the password in the proper format</p>
//         }
//       </div>

//       <EgButton onClick={formSubmit} isLoading={isLoading} type="submit">Register</EgButton>

//       <p className="text-red-500 text-sm">{apiError}</p>

//     </form>
//   )
// }

// export default RegisterForm;



import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { checkValidPassword } from "../../../utils/LoginUtils/password.utils";
import { useState } from "react";
import PasswordHelpHover from "../PasswordHelpHover";
import { clientApiFetch } from "../../../utils/LoginUtils/api.utils";
import { useNavigate } from "react-router-dom";
import EgButton from "../EgButton";
import { storeInCookie, storeTokenInCookie } from "../../../utils/LoginUtils/user.utils";

function RegisterForm() {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>('');
  const [username, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>(''); // Added phone_no
  const [discord, setDiscord] = useState<string>(''); // Added discord
  const [teamId, setTeamId] = useState<string>(''); // Added team_id
  const [passwordValid, setPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | undefined>(undefined);

  async function formSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setApiError(undefined);

    if (username && email && password && phoneNo && discord && teamId && checkValidPassword(password)) {
      setIsLoading(true);
      const res = await clientApiFetch("http://localhost:3000/api/signup", {
        method: 'POST',
        body: {
          username: username,
          email: email,
          password: btoa(password),
          phone_no: parseInt(phoneNo), // Send phone number
          discord: discord, // Send discord
          team_id: parseInt(teamId), // Send team_id
        },
      });
      if (!res.error) {
        storeTokenInCookie(res.data.access_token);
        storeInCookie('username', res.data.username);
        navigate('/app');
      } else {
        setApiError(res.message);
      }
      setIsLoading(false);
    }

    if (!checkValidPassword(password)) {
      setPasswordValid(false);
    }
  }

  return (
    <form className='mt-10 grid grid-cols-1 gap-y-8'>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" required onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="phone_no">Phone Number</Label>
        <Input type="text" id="phone_no" required onChange={(e) => setPhoneNo(e.target.value)} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="discord">Discord ID</Label>
        <Input type="text" id="discord" required onChange={(e) => setDiscord(e.target.value)} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="team_id">Team ID</Label>
        <Input type="text" id="team_id" required onChange={(e) => setTeamId(e.target.value)} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">
          Password
          <PasswordHelpHover />
        </Label>
        <Input type="password" id="password" onChange={(e) => {
          setPasswordValid(true);
          setPassword(e.target.value);
        }} required />
        {
          !passwordValid && <p className="text-red-500 text-sm">Incorrect Password format.<br />Please enter the password in the proper format</p>
        }
      </div>

      <EgButton onClick={formSubmit} isLoading={isLoading} type="submit">Register</EgButton>

      {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
    </form>
  );
}

export default RegisterForm;
