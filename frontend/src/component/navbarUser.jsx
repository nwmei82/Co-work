import { useAuth } from "./authContext";
const NavbarUser = () => {
    const {user} = useAuth();
    return(
        <div className="navbar bg-[#789DBC] shadow-sm px-4">
            <div className="flex-1">
                <a className="text-2xl font-bold text-[#1d3557]">Give me Space</a>
            </div>
            <div className="flex-none">
                <div className="flex">
                    <button className="btn btn-ghost mx-2 cursor-pointer"><img src="/bookmark.png"/></button>
                    <p className="text-xl font-bold text-[#1d3557]">{user.name}</p>
                </div>
            </div>
        </div>
    )
}

export default NavbarUser;