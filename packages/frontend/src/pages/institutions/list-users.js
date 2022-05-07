import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../../components';
import { useParams } from "react-router-dom";
import api from '../../services/api';
import * as fireToast from '../../utils/fire-toast';
import messages from '../../misc/messages';

const ListUsers = () => {
  const [users, setUsers] = useState(null);
  const [usersNotInInstitution, setUsersNotInInstitution] = useState(null);
  const [students, setStudents] = useState(null);
  const [professors, setProfessors] = useState(null);
  const [loading, setLoading] = useState(true);

  let params = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterUsersAvaibleToBeAdmittedToInstitution();
  }, [users, students, professors])

  const getData = () => {
    getUsers();
    getStudentsInInstitution();
    getProfessorsInInstitution();
  }

  const getUsers = () => {
    api.get('/users')
      .then(response => {
        return setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const getStudentsInInstitution = () => {
    api.get(`/institutions/${params.id}/students`)
      .then(response => {
        return setStudents(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const getProfessorsInInstitution = () => {
    api.get(`/institutions/${params.id}/professors`)
      .then(response => {
        return setProfessors(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const filterUsersAvaibleToBeAdmittedToInstitution = () => {
    if(users && students && professors) {
      let usersCopy = [...users];

      if(professors.length > 0) {
        professors.forEach(professor => {
          usersCopy.splice(usersCopy.findIndex((user) => {
            return user.id === professor.user.id;
          }), 1);
        });
      }

      if(students.length > 0) {
        students.forEach(student => {
          usersCopy.splice(usersCopy.findIndex((user) => {
            return user.id === student.user.id;
          }), 1);
        });
      }

      setLoading(false);
      return setUsersNotInInstitution(usersCopy);
    }
    return;
  }

  const addProfessorToInstitution = (userId) => {
    api.post(`/institutions/${params.id}/professors`, {
      "professorUserId": userId
    }).then(result => {
      getData();
      fireToast.success(messages.api.institutions.add_professor);
    }).catch(error => {
      console.log(error);
    })
  } 

  const addStudentToInstitution = (userId) => {
    api.post(`/institutions/${params.id}/students`, {
      "studentUserId": userId
    }).then(result => {
      getData();
      fireToast.success(messages.api.institutions.add_student);
    }).catch(error => {
      console.log(error);
    })
  } 

  const usersTable = () => {
    let usersTableRows = usersNotInInstitution?.map((user) => {
      return (
        <tr key={user.id}>
          <th>{`${user.name} ${user.surname ?? ''}`}</th>
          <th>{user.email}</th>
          <th>{user.phone}</th>
          <th>
            <button onClick={() => addStudentToInstitution(user.id)}>Aluno</button>
            <button onClick={() => addProfessorToInstitution(user.id)}>Professor</button>
          </th>
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
            <th>Adicionar</th>
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
  