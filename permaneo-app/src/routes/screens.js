import { lazy } from 'react';
import { frequenciaIntegrada } from '../services/frequenciaApi.js';
import StudentArea from '../pages/Dashboard/Estudante/StudentArea.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
export const HomeLight = lazy(() => import('../pages/Landing/HomeLight.jsx'));
const HomeDark = lazy(() => import('../pages/Landing/HomeDark.jsx'));
const DirectorDashboardLight = lazy(() => import('../pages/Dashboard/Direcao/DirectorDashboardLight.jsx'));
const DirectorDashboardDark = lazy(() => import('../pages/Dashboard/Direcao/DirectorDashboardDark.jsx'));
const DirectorFollowupLight = lazy(() => import('../pages/Dashboard/Direcao/DirectorFollowupLight.jsx'));
const DirectorFollowupDark = lazy(() => import('../pages/Dashboard/Direcao/DirectorFollowupDark.jsx'));
const DirectorNotificationsLight = lazy(() => import('../pages/Dashboard/Direcao/DirectorNotificationsLight.jsx'));
const DirectorNotificationsDark = lazy(() => import('../pages/Dashboard/Direcao/DirectorNotificationsDark.jsx'));
const ReportsLight = lazy(() => import('../pages/Dashboard/Direcao/ReportsLight.jsx'));
const ReportsDark = lazy(() => import('../pages/Dashboard/Direcao/ReportsDark.jsx'));
const DirectorSettingsLight = lazy(() => import('../pages/Dashboard/Direcao/DirectorSettingsLight.jsx'));
const DirectorSettingsDark = lazy(() => import('../pages/Dashboard/Direcao/DirectorSettingsDark.jsx'));
const TeacherClassesLight = lazy(() => import('../pages/Dashboard/Professor/TeacherClassesLight.jsx'));
const TeacherClassesDark = lazy(() => import('../pages/Dashboard/Professor/TeacherClassesDark.jsx'));
const TeacherFollowupLight = lazy(() => import('../pages/Dashboard/Professor/TeacherFollowupLight.jsx'));
const TeacherFollowupDark = lazy(() => import('../pages/Dashboard/Professor/TeacherFollowupDark.jsx'));
const TeacherNotificationsLight = lazy(() => import('../pages/Dashboard/Professor/TeacherNotificationsLight.jsx'));
const TeacherNotificationsDark = lazy(() => import('../pages/Dashboard/Professor/TeacherNotificationsDark.jsx'));
const TeacherSettingsLight = lazy(() => import('../pages/Dashboard/Professor/TeacherSettingsLight.jsx'));
const TeacherSettingsDark = lazy(() => import('../pages/Dashboard/Professor/TeacherSettingsDark.jsx'));
const StudentSpaceLight = lazy(() => import('../pages/Dashboard/Estudante/StudentSpaceLight.jsx'));
const StudentSpaceDark = lazy(() => import('../pages/Dashboard/Estudante/StudentSpaceDark.jsx'));
const CarometroManagementLight = lazy(() => import('../pages/Dashboard/Carometro/CarometroManagementLight.jsx'));
const CarometroManagementDark = lazy(() => import('../pages/Dashboard/Carometro/CarometroManagementDark.jsx'));
const CarometroTeacherLight = lazy(() => import('../pages/Dashboard/Carometro/CarometroTeacherLight.jsx'));
const CarometroTeacherDark = lazy(() => import('../pages/Dashboard/Carometro/CarometroTeacherDark.jsx'));

export const profiles = {
  Lucas: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLucasManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLucasManagementDark.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLucasTeacherLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLucasTeacherDark.jsx')),
  ],
  Camila: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileCamilaManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileCamilaManagementDark.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileCamilaTeacherLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileCamilaTeacherDark.jsx')),
  ],
  Isabela: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileIsabelaManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileIsabelaManagementDark.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileIsabelaTeacherLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileIsabelaTeacherDark.jsx')),
  ],
  Eduardo: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileEduardoManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileEduardoManagementDark.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileEduardoTeacherLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileEduardoTeacherDark.jsx')),
  ],
  Yasmin: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileYasminManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileYasminManagementDark.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileYasminTeacherLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileYasminTeacherDark.jsx')),
  ],
  Livia: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLiviaManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLiviaManagementDark.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLiviaTeacherLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileLiviaTeacherDark.jsx')),
  ],
  AnaBeatriz: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileAnaBeatrizManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileAnaBeatrizManagementDark.jsx')),
  ],
  Heitor: [
    lazy(() => import('../pages/Dashboard/Carometro/ProfileHeitorManagementLight.jsx')),
    lazy(() => import('../pages/Dashboard/Carometro/ProfileHeitorManagementDark.jsx')),
  ],
};

export const pages = {
  home: [HomeLight, HomeDark],
  login: [LoginPage, LoginPage],
  director: [DirectorDashboardLight, DirectorDashboardDark],
  directorFollowup: [DirectorFollowupLight, DirectorFollowupDark],
  directorNotifications: [DirectorNotificationsLight, DirectorNotificationsDark],
  reports: [ReportsLight, ReportsDark],
  directorSettings: [DirectorSettingsLight, DirectorSettingsDark],
  teacher: [TeacherClassesLight, TeacherClassesDark],
  teacherFollowup: [TeacherFollowupLight, TeacherFollowupDark],
  teacherNotifications: [TeacherNotificationsLight, TeacherNotificationsDark],
  teacherSettings: [TeacherSettingsLight, TeacherSettingsDark],
  student: [StudentArea, StudentArea],
  studentSpace: [StudentSpaceLight, StudentSpaceDark],
  studentActivities: [StudentArea, StudentArea],
  studentCalendar: [StudentArea, StudentArea],
  studentSubjects: [StudentArea, StudentArea],
  studentNotices: [StudentArea, StudentArea],
  studentPlan: [StudentArea, StudentArea],
  studentSupport: [StudentArea, StudentArea],
  carometroManagement: [CarometroManagementLight, CarometroManagementDark],
  carometroTeacher: [CarometroTeacherLight, CarometroTeacherDark],
};

export const resolvePage = (value) => {
  if (value === 'frequencia' && frequenciaIntegrada) return value;
  if (pages[value]) return value;
  const match = value.match(/^Profile(.+)(Management|Teacher)$/);
  return match && profiles[match[1]] ? value : 'home';
};
