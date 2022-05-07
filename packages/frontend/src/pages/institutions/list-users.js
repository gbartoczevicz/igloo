import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../../components';
import api from '../../services/api';

const ListUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    api.get('/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const usersTable = () => {
    let usersTableRows = users?.map((user) => {
      return (
        <tr key={user.id}>
          <th>{`${user.name} ${user.surname ?? ''}`}</th>
          <th>{user.email}</th>
          <th>{user.phone}</th>
        </tr>
      )
    })

    let usersTableHead = () => {
      return (
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
      )
    };

    return (
      <table className='table-auto'>
        {usersTableHead()}
        <tbody>
          {usersTableRows}
        </tbody>
      </table>      
    )
  }

  return (
    <div>
      <Header/>
      <Sidebar/>
      {
        !loading && (
          <div id="page" className='ml-52 mt-10 h-screen flex justify-center items-center'>
            <div id='table' className='h-4/6'>
              {usersTable()}
            </div>
          </div>
        )
      }
    </div>
  );
  }
  
  export default ListUsers;
  