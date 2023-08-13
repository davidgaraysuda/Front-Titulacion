import React, { useContext } from 'react';
import { Layout, Menu, Button} from 'antd';
import { Link, useLocation, Routes, Route} from 'react-router-dom';
import {
  CopyOutlined,
  TeamOutlined,
  HomeOutlined,
  SnippetsOutlined,
  TrophyOutlined,
  ShopOutlined,
  CoffeeOutlined,
  ContainerOutlined,
  SmileOutlined,
  SolutionOutlined,
  AuditOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import Home from '../Pages/Home';
import AgreementPage from '../Pages/agreement/AgreementPage';
import SAgreementPage from '../Pages/specific/SAgreementPage';
import ActivityPage from '../Pages/activity/ActivityPage';
import ActivityDetailPage from '../Pages/activitydtl/ActivityDetailPage';
import PracticePage from '../Pages/practice/PracticePage';
import PracticedtlPage from '../Pages/practicedtl/PracticedtlPage';
import CareerPage from '../Pages/career/CareerPage';
import CompanyPage from '../Pages/company/CompanyPage';
import StudentPage from '../Pages/student/StudentPage';
import TutorPage from '../Pages/tutor/TutorPage';
import TeacherPage from '../Pages/teacher/TeacherPage';
import '../index.css';
import SAgreementFilterCurrent from '../Pages/specific/filter/SAgreementCurrent';
import SAgreementFilterExpired from '../Pages/specific/filter/SAgreementExpired';
import AgreementFilterCurrent from '../Pages/agreement/filter/AgreementFilterCurrent';
import AgreementFilterExpired from '../Pages/agreement/filter/AgreementFilterExpired';
import { AppContext } from '../context/AppContext';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const menuItems = [
  { path: '/', label: 'Inicio', icon: <HomeOutlined />, roles: ["TEACHER", "STUDENT", "ADMIN"] },
  {
    path: '/agreement',
    label: 'Convenios',
    icon: <CopyOutlined />,
    roles: ["TEACHER", "ADMIN"],
    subMenuItems: [
      { label: 'Vigentes', path: '/agreement/current', icon: <SnippetsOutlined />, roles: ["TEACHER", "ADMIN"] },
      { label: 'Caducados', path: '/agreement/expired', icon: <SnippetsOutlined />, roles: ["TEACHER", "ADMIN"] },
    ],
  },
  {
    path: '/specific',
    label: 'C. Especificos',
    icon: <SnippetsOutlined />,
    roles: ["TEACHER", "ADMIN"],
    subMenuItems: [
      { label: 'Vigentes', path: '/specific/current', icon: <SnippetsOutlined />, roles: ["TEACHER", "ADMIN"] },
      { label: 'Caducados', path: '/specific/expired', icon: <SnippetsOutlined />, roles: ["TEACHER", "ADMIN"] },
    ],
  },
  { path: '/career', label: 'Carreras', icon: <TrophyOutlined />, roles: ["ADMIN"] },
  { path: '/company', label: 'Empresas', icon: <ShopOutlined />, roles: ["TEACHER", "ADMIN", "STUDENT"] },
  { path: '/activity', label: 'Actividades', icon: <CoffeeOutlined />, roles: ["TEACHER", "ADMIN"] },
  { path: '/activitydtl', label: 'Detalle de Actividades', icon: <ContainerOutlined />, roles: ["TEACHER", "ADMIN", "STUDENT"] },
  { path: '/practice', label: 'Asignacion de estudiantes', icon: <SmileOutlined />, roles: ["TEACHER", "ADMIN"] },
  { path: '/practicedtl', label: 'Detalle de Practicas', icon: <AuditOutlined />, roles: ["TEACHER", "ADMIN", "STUDENT"] },
  { path: '/student', label: 'Estudiantes', icon: <SolutionOutlined />, roles: ["ADMIN"] },
  { path: '/teacher', label: 'Tutor Academico', icon: <SoundOutlined />, roles: ["ADMIN", "STUDENT"] },
  { path: '/tutor', label: 'Tutor Empresarial', icon: <TeamOutlined />, roles: ["TEACHER", "ADMIN", "STUDENT"] },
  // Agrega más elementos de menú aquí
];

const SliderMenu = () => {
  const location = useLocation();
  const appContext = useContext(AppContext);

  const handleLogout = () => {
    // Borrar tokens de sesión (ejemplo: localStorage)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

  if (!appContext) {
    throw new Error("Contexto no proporcionado");
  }

  const { roles } = appContext;

  return (
    <Layout>
      <Sider collapsible collapsed={false} style={{ minHeight: '100vh' }}>
        <div className="logo">
          <img src={"https://sudamericano.edu.ec/wp-content/uploads/2021/07/Logo-SUDAMERICANO-BLANCO-1024x274.png"} alt="Logo" style={{ height: '35px', margin: '18px' }} />
        </div >
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" defaultSelectedKeys={['0']}>
        {menuItems.filter(item => item.roles && item.roles.includes(roles)).map((route, index) => {
            if (route.subMenuItems) {
              return (
                <SubMenu key={`${route.path}-${index}`} title={<span>{route.icon}<span>{route.label}</span></span>}>
                  {route.subMenuItems.map((subItem, subIndex) => (
                    <Menu.Item key={`${route.path}-${index}-${subIndex}`}>
                      <Link to={subItem.path}>{subItem.icon}<span style={{ marginLeft: '10px' }}>{subItem.label}</span></Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={route.path}>
                  <Link to={route.path}>{route.icon}<span style={{ marginLeft: '10px' }}>{route.label}</span></Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
        <Button type="primary" onClick={handleLogout} style={{ margin: '10px' }}>
          Logout
        </Button>
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agreement" element={<AgreementPage />} />
            <Route path="/agreement/current" element={<AgreementFilterCurrent />} />
            <Route path="/agreement/expired" element={<AgreementFilterExpired />} />
            <Route path="/specificall" element={<SAgreementPage />} />
            <Route path="/specific/current" element={<SAgreementFilterCurrent />} />
            <Route path="/specific/expired" element={<SAgreementFilterExpired />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/activitydtl" element={<ActivityDetailPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practicedtl" element={<PracticedtlPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/tutor" element={<TutorPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SliderMenu;
