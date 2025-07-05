const Navbar = ({onAdmin, onUser}) => {

    return(
        <div className="navbar bg-[#789DBC] shadow-sm px-4">
            <div className="flex-1">
                <a className="text-2xl text-bold text-[#1d3557]">Give me Space</a>
            </div>
            <div className="flex-none ">
                <button className="btn btn-link mx-4 font-bold text-[#1d3557]" onClick={onAdmin}>For bussiness</button>
                <button className="btn bg-[#FFE3E3] text-[#1d3557]" onClick={onUser}>Login</button>
            </div>
        </div>
    )
}

export default Navbar;