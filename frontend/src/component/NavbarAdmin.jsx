import React from 'react'

const NavbarAdmin = ({onOpen}) => {
  return (
  <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center">
    <div className = "form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-48 md:w-auto" />
    </div>
  </div>
  <div className="navbar-end">
    <a className="btn btn-primary"onClick={onOpen}>Add Space</a>
  </div>
</div>

  )
}

export default NavbarAdmin