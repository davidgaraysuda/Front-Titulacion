import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
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
import Contact from '../Pages/Contact';
import '../index.css';
import SAgreementFilterCurrent from '../Pages/specific/filter/SAgreementCurrent';
import SAgreementFilterExpired from '../Pages/specific/filter/SAgreementExpired';
import AgreementFilterCurrent from '../Pages/agreement/filter/AgreementFilterCurrent';
import AgreementFilterExpired from '../Pages/agreement/filter/AgreementFilterExpired';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const menuItems = [
  { path: '/', label: 'Inicio', icon: <HomeOutlined /> },
  {
    path: '/agreement',
    label: 'Convenios',
    icon: <CopyOutlined />,
    subMenuItems: [
      { label: 'Vigentes', path: '/agreement/current', icon: <SnippetsOutlined /> },
      { label: 'Caducados', path: '/agreement/expired', icon: <SnippetsOutlined /> },
    ],
  },
  {
    path: '/specific',
    label: 'C. Especificos',
    icon: <SnippetsOutlined />,
    subMenuItems: [
      { label: 'Vigentes', path: '/specific/current', icon: <SnippetsOutlined /> },
      { label: 'Caducados', path: '/specific/expired', icon: <SnippetsOutlined /> },
    ],
  },
  { path: '/career', label: 'Carreras', icon: <TrophyOutlined /> },
  { path: '/company', label: 'Empresas', icon: <ShopOutlined /> },
  { path: '/activity', label: 'Actividades', icon: <CoffeeOutlined /> },
  { path: '/activitydtl', label: 'Detalle de Actividades', icon: <ContainerOutlined /> },
  { path: '/practice', label: 'Asignacion de estudiantes', icon: <SmileOutlined /> },
  { path: '/practicedtl', label: 'Detalle de Practicas', icon: <AuditOutlined /> },
  { path: '/student', label: 'Estudiantes', icon: <SolutionOutlined /> },
  { path: '/teacher', label: 'Tutor Academico', icon: <SoundOutlined /> },
  { path: '/tutor', label: 'Tutor Empresarial', icon: <TeamOutlined /> },
  // Agrega más elementos de menú aquí
];

const SliderMenu = () => {
  const location = useLocation();

  return (
    <Layout>
      <Sider collapsible collapsed={false}>
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" defaultSelectedKeys={['0']}>
          {menuItems.map((route, index) => {
            if (route.subMenuItems) {
              return (
                <SubMenu key={index} title={<span>{route.icon}<span>{route.label}</span></span>}>
                  {route.subMenuItems.map((subItem, subIndex) => (
                    <Menu.Item key={index + '-' + subIndex}>
                      <Link to={subItem.path}>{subItem.icon}<span style={{ marginLeft: '10px' }}>{subItem.label}</span></Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={index}>
                  <Link to={route.path}>{route.icon}<span style={{ marginLeft: '10px' }}>{route.label}</span></Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
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
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SliderMenu;
