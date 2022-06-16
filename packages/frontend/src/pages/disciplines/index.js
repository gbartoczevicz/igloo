import { useEffect, useRef, useState } from 'react';
import PageLayout from '../../components/page-layout';
import api from '../../services/api';
import { Form } from "@unform/web";
import { Select, Input } from "../../components/form";
import * as fireToast from '../../utils/fire-toast';

const Disciplines = () => {
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState([]);
  const [institutionSelected, setInstitutionSelected] = useState(null);
  const [adminInstitutions, setAdminInstitutions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseSelected, setCourseSelected] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  
  const selectInstitutionForm = useRef(null);

  useEffect(() => {
    getInstitutions();
  }, []);

  useEffect(() => {
    setCourseSelected(null);
    if(institutionSelected) {
      getCourses();
      getDisciplines();
    } else {
      setDisciplines([]);
    }
  }, [institutionSelected])

  useEffect(() => {
    if(courseSelected) {
      getDisciplines(courseSelected);
    }
  },[courseSelected])

  const getInstitutions = () => {
    api.get('/institutions')
      .then(response => {
        let institutionsOptions = response.data.map((ist) => {
          return {
            value: ist,
            label: ist.name
          }
        });
        setInstitutions(institutionsOptions);


        let filteredAdminIntitutions = response.data.filter(ist => ist.userRole === 'manager');
        let adminInstitutionsOptions = filteredAdminIntitutions.map((ist) => {
          return {
            value: ist,
            label: ist.name
          }
        });
        setAdminInstitutions(adminInstitutionsOptions);

        setLoading(false);
      })
      .catch(error => {
        console.log("ERROR (getInstitutions): ", error);
      })
  }

  const getCourses = () => {
    let institutionId = institutionSelected.value.id;

    api.get(`/institutions/${institutionId}/courses`)
      .then(response => {
        let coursesOptions = response.data.map((course) => {
          return {
            value: course,
            label: course.name
          }
        });
        setCourses(coursesOptions);
      })
      .catch(error => {
        console.log("ERROR (getCourses): ", error);
      })
  }

  const getDisciplines = (course) => {
    let institutionId = institutionSelected?.value.id;
    let courseId = course?.value.id;

    api.get(`/institutions/${institutionId}/disciplines`)
      .then(response => {
        if(courseId) {
          let filteredDisciplines = response.data.filter(disc => {
            return disc.courseId === courseId;
          });

          let disciplinesFilteredByCourse = filteredDisciplines.map((disc) => {
            return {
              value: disc, 
              label: disc.name
            }
          });
          return setDisciplines(disciplinesFilteredByCourse);
        }
        
        let disciplinesFilteredByInstitution = response.data.map((disc) => {
          return {
            value: disc, 
            label: disc.name
          }
        })
        return setDisciplines(disciplinesFilteredByInstitution);
      })
      .catch(error => {
        console.log("ERROR (getDisciplines): ", error);
      })
  }

  const renderDisciplines = (disciplines) => {
    if(disciplines.length <= 0) {
      return <p>Nenhuma disciplina.</p>
    }

    return disciplines.map((dis) => {
      return <li key={dis.value.id}>{dis.value.name}</li>
    })
  }

  return (
    <PageLayout>
      {
        !loading && (
          <div className="pt-10">
            <div className="flex space-x-3 mx-3"></div>
            <div className="w-80 mx-auto flex-1">
              <Form className="shadow-md bg-white rounded px-8 py-6" ref={selectInstitutionForm}>
                <div>
                  <Select
                    label="Instituição"
                    name="institutionSelection"
                    onChange={(data) => setInstitutionSelected(data)}
                    options={institutions}
                    value={institutionSelected}
                    placeholder="Selecionar instituição"
                  ></Select>
                </div>
                <div className="mt-3">
                  <Select
                    label="Curso"
                    name="courseSelection"
                    onChange={(data) => setCourseSelected(data)}
                    options={courses}
                    value={courseSelected}
                    placeholder="Selecionar curso"
                    isDisabled={!institutionSelected}
                  ></Select>
                </div>                
              </Form>
            </div>
            {renderDisciplines(disciplines)}
          </div>
        )
      }
    </PageLayout>
  );
}

export default Disciplines;
