import Monitoring from '../pages/Dashboard/Direcao/Monitoring.jsx';
import { lazy } from 'react';
import StudentArea from '../pages/Dashboard/Estudante/StudentArea.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
export const HomeLight = lazy(() => import('../pages/Landing/Home.jsx'));
const DirectorDashboardLight = lazy(() => import('../pages/Dashboard/Direcao/DirectorDashboardLight.jsx'));
const DirectorDashboardDark = lazy(() => import('../pages/Dashboard/Direcao/DirectorDashboardDark.jsx'));
const DirectorNotificationsLight = lazy(() => import('../pages/Dashboard/Direcao/DirectorNotificationsLight.jsx'));
const DirectorNotificationsDark = lazy(() => import('../pages/Dashboard/Direcao/DirectorNotificationsDark.jsx'));
const ReportsLight = lazy(() => import('../pages/Dashboard/Direcao/ReportsLight.jsx'));
const ReportsDark = lazy(() => import('../pages/Dashboard/Direcao/ReportsDark.jsx'));
const DirectorSettingsLight = lazy(() => import('../pages/Dashboard/Direcao/DirectorSettingsLight.jsx'));
const DirectorSettingsDark = lazy(() => import('../pages/Dashboard/Direcao/DirectorSettingsDark.jsx'));
const TeacherRoom = lazy(() => import('../pages/Dashboard/Professor/MinhaSala.jsx'));
const TeacherFollowupLight = lazy(() => import('../pages/Dashboard/Professor/TeacherFollowupLight.jsx'));
const TeacherFollowupDark = lazy(() => import('../pages/Dashboard/Professor/TeacherFollowupDark.jsx'));
const TeacherNotificationsLight = lazy(() => import('../pages/Dashboard/Professor/TeacherNotificationsLight.jsx'));
const TeacherNotificationsDark = lazy(() => import('../pages/Dashboard/Professor/TeacherNotificationsDark.jsx'));
const TeacherSettingsLight = lazy(() => import('../pages/Dashboard/Professor/TeacherSettingsLight.jsx'));
const TeacherSettingsDark = lazy(() => import('../pages/Dashboard/Professor/TeacherSettingsDark.jsx'));
const StudentSpaceLight = lazy(() => import('../pages/Dashboard/Estudante/StudentSpaceLight.jsx'));
const StudentSpaceDark = lazy(() => import('../pages/Dashboard/Estudante/StudentSpaceDark.jsx'));
export const profiles = {
  Lucas: Array(4), Camila: Array(4), Isabela: Array(4), Eduardo: Array(4),
  Yasmin: Array(4), Livia: Array(4), AnaBeatriz: Array(2), Heitor: Array(2),
};

export const pages = {
  home: [HomeLight, HomeLight],
  login: [LoginPage, LoginPage],
  director: [DirectorDashboardLight, DirectorDashboardDark],
  directorFollowup: [Monitoring, Monitoring],
  directorNotifications: [DirectorNotificationsLight, DirectorNotificationsDark],
  reports: [ReportsLight, ReportsDark],
  directorSettings: [DirectorSettingsLight, DirectorSettingsDark],
  teacher: [TeacherRoom, TeacherRoom],
  teacherRoom: [TeacherRoom, TeacherRoom],
  teacherAttendance: [TeacherRoom, TeacherRoom],
  teacherFollowup: [TeacherFollowupLight, TeacherFollowupDark],
  teacherNotifications: [TeacherNotificationsLight, TeacherNotificationsDark],
  teacherSettings: [TeacherSettingsLight, TeacherSettingsDark],
  student: [StudentArea, StudentArea],
  studentSpace: [StudentArea, StudentArea],
  studentJourney: [StudentArea, StudentArea],
  studentSettings: [StudentArea, StudentArea],
  studentActivities: [StudentArea, StudentArea],
  studentCalendar: [StudentArea, StudentArea],
  studentSubjects: [StudentArea, StudentArea],
  studentNotices: [StudentArea, StudentArea],
  studentPlan: [StudentArea, StudentArea],
  studentSupport: [StudentArea, StudentArea],
  carometroManagement: [HomeLight, HomeLight],
  carometroTeacher: [HomeLight, HomeLight],
};

export const resolvePage = (value) => {
  if (pages[value]) return value;
  const match = value.match(/^Profile(.+)(Management|Teacher)$/);
  return match && profiles[match[1]] ? value : 'home';
};
