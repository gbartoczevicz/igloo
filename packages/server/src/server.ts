import * as E from "express";
import cors from "cors";

import * as SetupRoutes from "~/setup/routes";
import * as SetupMiddlewares from "~/setup/middlewares";

import { SystemSetup } from "~/contracts/setup/system";
import * as HttpContracts from "~/contracts/http";
import * as HttpAdapters from "~/adapters/http";

export function createServer(systemSetup: SystemSetup) {
  const express = E.default();

  const commonLogger = SetupMiddlewares.commonRequest();
  const userAuthenticated = SetupMiddlewares.userAuthenticated(systemSetup);
  const managerAuthenticated = SetupMiddlewares.managerAuthenticated(
    systemSetup,
  );
  const isUserAManager = SetupMiddlewares.isUserAManager(systemSetup);
  const userRelatedToInstitution = SetupMiddlewares.userRelatedToInstitution(
    systemSetup,
  );
  const managerOrProfessorAuthenticated = SetupMiddlewares
    .professorOrManagerAuthenticated(systemSetup);

  const router: HttpContracts.Router<
    E.Router,
    E.Request,
    E.Response,
    E.NextFunction
  > = new HttpAdapters.HttpRouter([
    SetupRoutes.setupCreateUsers(systemSetup),
    SetupRoutes.setupCreateSession(systemSetup),
    SetupRoutes.setupCreateInstitutions(systemSetup, userAuthenticated),
    SetupRoutes.setupCreateProfessor(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupCreateStudent(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupGetProfessorsByManager(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupGetStudentsByManager(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupGetUsersAsManager(
      systemSetup,
      userAuthenticated,
      isUserAManager,
    ),
    SetupRoutes.setupUpdateUser(
      systemSetup,
      userAuthenticated,
    ),
    SetupRoutes.setupGetSelfProfile(userAuthenticated),
    SetupRoutes.setupCreateCourse(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupGetInstitutionCourses(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
    SetupRoutes.setupGetManagedInstitution(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupCreateDiscipline(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupListInstitutionDisciplines(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupListRelatedUserInstitutions(
      systemSetup,
      userAuthenticated,
    ),
    SetupRoutes.setupCreateClassCourse(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupListInstitutionClassCourses(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
    SetupRoutes.setupRegisterStudentIntoClass(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupListStudentClassRegistrationInInstitution(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
    SetupRoutes.setupRegisterProfessorIntoClass(
      systemSetup,
      userAuthenticated,
      managerAuthenticated,
    ),
    SetupRoutes.setupListProfessorClassRegistrationInInstitution(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
    SetupRoutes.setupCreateLearningTrail(
      systemSetup,
      userAuthenticated,
      managerOrProfessorAuthenticated,
    ),
    SetupRoutes.setupListInstitutionLearningTrails(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
    SetupRoutes.setupCreateLearningTrailStep(
      systemSetup,
      userAuthenticated,
      managerOrProfessorAuthenticated,
    ),
    SetupRoutes.setupListLearningTrailSteps(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
    SetupRoutes.setupCreateExam(
      systemSetup,
      userAuthenticated,
      managerOrProfessorAuthenticated,
    ),
    SetupRoutes.setupCreateExamQuestion(
      systemSetup,
      userAuthenticated,
      managerOrProfessorAuthenticated,
    ),
    SetupRoutes.setupListInstitutionExams(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
    SetupRoutes.setupListExamQuestions(
      systemSetup,
      userAuthenticated,
      userRelatedToInstitution,
    ),
  ]);

  express.use(cors());

  express.use(E.json());
  express.use(commonLogger);

  express.use(
    (router as HttpAdapters.HttpRouter).create(),
  );

  return new HttpAdapters.HttpService(express);
}
