import { useEffect, useState } from 'react';
import {getAllUsers} from '../supabase/testUser.js'

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try{
        const data = await getAllUsers();
        console.log(data)
        setUsers(data)
        
      } catch(err){
        console.log(err);
      }
      setLoading(false)
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>👥 Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <strong>{user.name}</strong> ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
