import { useState } from "react";
import { checkSignIn, createUser } from "../supabase/user.js";
import { useAuth } from "./authContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = ({isOpen,role,isClose}) => {
    const [isSign , setSign] = useState(true);
    const [usernameIn, setUsernameIn] = useState('');
    const [passwordIn, setPasswordIn] = useState('');
    const [usernameUp, setUsernameUp] = useState('');
    const [passwordUp, setPasswordUp] = useState('');
    const [nameUp, setNameUp] = useState('');
    const [emailUp, setEmailUp] = useState('');
    const [error, setError] = useState("")

    const { setUser, showLoginModal,setShowLoginModal,redirect,setRedirect} = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const user = await checkSignIn(usernameIn, passwordIn);
            if (user) {
                setUser(user);
                setShowLoginModal(false);
                resetForm();
                isClose();
                if(redirect){
                    navigate(redirect)
                    setRedirect(null)
                }
            } else {
                setError("Invalid username or password.");
            }
        } catch (error) {
            console.error("Sign in error:", error?.message || error || "Unknown error");
            setError("Sign in failed: " + (error?.message || "Unknown error"));
        }
    };

    if (!showLoginModal) return null;

    const resetForm = () => {
        setUsernameIn('');
        setPasswordIn('');
        setPasswordUp('');
        setUsernameUp('');
        setNameUp('');
        setEmailUp('');
    }

    const handleSingUp = async () => {
        const formData = {
            name: nameUp,
            email: emailUp,
            username: usernameUp,
            password: passwordUp,
            role: role 
        };
        try {
            const newuser = await createUser(formData);
            if(newuser){
                console.log("success");
                resetForm();
                isClose();
            } else {
                setError("Do you have account before");
            }
        } catch (err) {
            console.log(err);
            setError(err);
        }
    }

    return(
        <>
        <dialog id="my_modal_3" className="modal " open={isOpen}>
            <div className="modal-box w-[400px] bg-[#FEF9F2]">
                <div className="modal-header text-2xl pb-[20px]">
                    <span className={`cursor-pointer px-2 pb-1 transition ${isSign
                    ? "font-bold text-[#1d3557] border-gray-500"
                    : "text-gray-400 hover:text-[#1d3557]"}`} onClick={() => setSign(true)}>
                        Sign In
                    </span>
                    <span className="text-[#1d3557]">|</span>
                    <span className={`cursor-pointer px-2 pb-1 transition ${!isSign
                    ? "font-bold text-[#1d3557] border-gray-500"
                    : "text-gray-400 hover:text-[#1d3557]"}`}onClick={() => setSign(false)}>
                        Sign Up
                    </span>
                </div>
                
                {isSign ? (
                    <form method="dialog">
                        <legend className="fieldset-legend text-[#1d3557]">username or email</legend>
                        <input type="text" className="input bg-[#789DBC]" value={usernameIn} onChange={(e) => setUsernameIn(e.target.value)} placeholder="" />

                        <legend className="fieldset-legend text-[#1d3557]">password</legend>
                        <input type="text" className="input bg-[#789DBC]" value={passwordIn} onChange={(e) => setPasswordIn(e.target.value)} placeholder="" />
                    </form>
                ) : (
                    <form method="dialog">
                        <legend className="fieldset-legend text-[#1d3557]">name</legend>
                        <input type="text" className="input bg-[#789DBC]" value={nameUp} onChange={(e) => setNameUp(e.target.value)} placeholder="" />

                        <legend className="fieldset-legend text-[#1d3557]">email</legend>
                        <input type="text" className="input bg-[#789DBC]" value={emailUp} onChange={(e) => setEmailUp(e.target.value)} placeholder="" />

                        <legend className="fieldset-legend text-[#1d3557]">username</legend>
                        <input type="text" className="input bg-[#789DBC]" value={usernameUp} onChange={(e) => setUsernameUp(e.target.value)} placeholder="" />

                        <legend className="fieldset-legend text-[#1d3557]">password</legend>
                        <input type="text" className="input bg-[#789DBC]" value={passwordUp} onChange={(e) => setPasswordUp(e.target.value)} placeholder="" />
                    </form>
                )}

                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={isClose}>✕</button>
                { error !=='' ? (<h6>{error}</h6>):(<h6></h6>)}
                {isSign ? (
                    <div className="flex justify-center">
                        <button type="submit" className="btn mt-[20px] bg-[#C9E9D2]" onClick={handleSignIn}>Sing In</button>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button type="submit" className="btn mt-[20px] bg-[#C9E9D2]" onClick={handleSingUp}>Sing Up</button>
                    </div>
                )}
                
            </div>
        </dialog>
        </>
    )
}

export default Login;