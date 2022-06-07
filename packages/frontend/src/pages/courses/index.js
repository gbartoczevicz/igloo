import { useCallback, useEffect, useRef, useState } from 'react';
import PageLayout from '../../components/page-layout';
import api from '../../services/api';
import { Form } from "@unform/web";
import { Select, Input } from "../../components/form";
import * as fireToast from '../../utils/fire-toast';

const Courses = () => {
  /* TODO
    - entender porque o valor do reactselect nao vai junto com o 
    form no submit */

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminInstitutions, setAdminInstitutions] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedListingInstitution, setSelectedListingInstitution] = useState(null);
  const [listingSelectValue, setListingSelectValue] = useState(null);
  const [val, setVal] = useState(null);

  const selectInstitution = useRef(null);

  useEffect(() => {
    getInstitutions();
  }, []);

  useEffect(() => console.log("Ronaldo", selectedListingInstitution), [selectedListingInstitution])

  const getCourses = (institutionId) => {
    api.get(`/institutions/${institutionId}/courses`)
      .then(response => {
        renderCourses(response.data);
        setCourses(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const getInstitutions = () => {
    api.get('/institutions')
      .then(response => {
        let filteredAdminIntitutions = response.data.filter(ist => ist.userRole === 'manager');
        let institutionsOptions = response.data.map((ist) => {
          return {
            value: ist.id,
            label: ist.name
          }
        })
        let adminInstitutionsOptions = filteredAdminIntitutions.map((ist) => {
          return {
            value: ist.id,
            label: ist.name
          }
        });
        setInstitutions(institutionsOptions);
        setAdminInstitutions(adminInstitutionsOptions);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleInstitutionCreationForm = (data) => {
    console.log(data, selectedInstitution)
    api.post(`/institutions/${selectedInstitution.value}/courses`, data)
      .then(response => {
        getCourses(response.data.institutionId);
        let egg = institutions.find(ist => ist.value === response.data.institutionId);
        console.log("EGG: ", egg, response.data.institutionId)
        setSelectedListingInstitution(egg);
        fireToast.success("Curso criado com sucesso!");
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleListingSelectOnChange = (data) => {
    setSelectedListingInstitution(data);
    getCourses(data.value);
    setVal(data);
  }

  const renderCourses = (coursesList) => {
    if (coursesList?.length > 0) {
      let renderedCourses = coursesList?.map((course) => {
        const { id, name } = course;
        return (
          <div className='bg-gray-400 h-24 rounded-md' key={id}>
            <div id="institution-info" className="p-3 h-full">
              <ul>
                <li>{name}</li>
              </ul>
            </div>
          </div>
        )
      });

      return (
        <div className='p-5 grid grid-cols-4 gap-4'>
          {renderedCourses}
        </div>
      )
    }
    return selectedListingInstitution ? <span className='p-5'>Nenhum curso encontrado. </span> : <></>
  }

  return (
    <PageLayout>
      {
        !loading && (
          <div className="pt-10">
            <div className="flex space-x-3 mx-3">
              <div className="w-80 mx-auto flex-1">
                <Form className="shadow-md bg-white rounded px-8 pt-6 pb-3 mb-4"
                  onSubmit={handleInstitutionCreationForm} ref={selectInstitution}>
                  <div className='mb-4'>
                    <Input
                      name="name"
                      label="Curso"
                      placeholder="Nome">
                    </Input>
                  </div>
                  <div className='mb-4'>
                    <Select
                      label="Instituição"
                      name="institutionSelection"
                      onChange={(data) => { setSelectedInstitution(data) }}
                      options={adminInstitutions}
                      placeholder="Selecionar instituição"
                    ></Select>
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                      Criar novo curso
                    </button>
                  </div>
                </Form>
              </div>
              <div className="w-80 mx-auto flex-1">
                <Form className="shadow-md bg-white rounded px-8 py-6" ref={selectInstitution}>
                  <Select
                    label="Listar cursos da instituição"
                    name="institutionSelection"
                    onChange={(data) => { handleListingSelectOnChange(data) }}
                    options={institutions}
                    value={selectedListingInstitution}
                    placeholder="Selecionar instituição"
                  ></Select>
                </Form>
              </div>
            </div>
            <div>
              {renderCourses(courses)}
            </div>
          </div>
        )
      }
    </PageLayout>
  );
}

export default Courses;
