const NavbarUser = () => {

    return(
        <div className="navbar bg-[#789DBC] shadow-sm px-4">
            <div className="flex-1">
                <a className="text-2xl font-bold text-[#1d3557]">Give me Space</a>
            </div>
            <div className="flex-none ">
                <i className="fi fi-sr-bookmark"></i>
                <p>usename</p>
            </div>
        </div>
    )
}

export default NavbarUser;