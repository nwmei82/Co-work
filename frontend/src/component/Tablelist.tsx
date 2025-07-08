import React from 'react'

const Tablelist = ({handleOpen}) => {
   const Clients = [
    {id:1, name:"Baby1" ,email:"Baby1@gmail.com",job:"Dev1",rate:"100" ,isactive: true},
    {id:2, name:"Baby2" ,email:"Baby2@gmail.com",job:"Dev2",rate:"101" ,isactive: true},
    {id:3, name:"Baby3" ,email:"Baby3@gmail.com",job:"Dev3",rate:"102" ,isactive: false}
    ]

    return (
    <div className="overflow-x-auto mt-10">
    <table className="table">
        {/* head */}
        <thead>
        <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>rate</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody className="hover">
            {Clients.map((client) => ( 
                <tr key={client.id}>
                    <th>{client.id}</th>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.job}</td>
                    <td>{client.rate}</td>
                    <td>
                        <button className={`btn rounded-full w-24 ${client.isactive ? 'btn-primary' : 'btn-outline'}`}>
                            {client.isactive ? 'Active' : 'Inactive'}
                        </button>
                    </td>
                    <td>
                        <button onClick={() => handleOpen('edit')} className='btn btn-secondary'>Update</button>
                    </td>
                    <td>
                        <button className='btn btn-accent'>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>

    </table>
    </div>
  )
}

export default Tablelist