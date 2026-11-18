import Monitoring from '../pages/Dashboard/Direcao/Monitoring.jsx';
import { lazy } from 'react';
import StudentArea from '../pages/Dashboard/Estudante/StudentArea.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
export const HomeLight = lazy(() => import('../pages/Landing/Home.jsx'));
const DirectorDashboardLight = lazy(() => import('../pages/Dashboard/Direcao/SchoolOverview.jsx'));
const DirectorDashboardDark = DirectorDashboardLight;
const NotificationsView = lazy(() => import('../pages/Dashboard/NotificationsView.jsx'));
const SettingsView = lazy(() => import('../pages/Dashboard/SettingsView.jsx'));
const ReportsView = lazy(() => import('../pages/Dashboard/Direcao/ReportsView.jsx'));
const TeacherRoom = lazy(() => import('../pages/Dashboard/Professor/MinhaSala.jsx'));
export const profiles = {
  Lucas: Array(4), Camila: Array(4), Isabela: Array(4), Eduardo: Array(4),
  Yasmin: Array(4), Livia: Array(4), AnaBeatriz: Array(2), Heitor: Array(2),
};

export const pages = {
  home: [HomeLight, HomeLight],
  login: [LoginPage, LoginPage],
  director: [DirectorDashboardLight, DirectorDashboardDark],
  directorFollowup: [Monitoring, Monitoring],
  directorNotifications: [NotificationsView, NotificationsView],
  reports: [ReportsView, ReportsView],
  directorSettings: [SettingsView, SettingsView],
  teacher: [TeacherRoom, TeacherRoom],
  teacherRoom: [TeacherRoom, TeacherRoom],
  teacherAttendance: [TeacherRoom, TeacherRoom],
  teacherFollowup: [Monitoring, Monitoring],
  teacherNotifications: [NotificationsView, NotificationsView],
  teacherSettings: [SettingsView, SettingsView],
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
