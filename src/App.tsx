import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import SiderMenu from './components/SiderMenu';
import Home from './Pages/Home';
import AgreementPage from './Pages/agreement/AgreementPage';
import SAgreementPage from './Pages/specific/SAgreementPage';
import ActivityPage from './Pages/activity/ActivityPage';
import ActivityDetailPage from './Pages/activitydtl/ActivityDetailPage';
import PracticePage from './Pages/practice/PracticePage';
import PracticedtlPage from './Pages/practicedtl/PracticedtlPage';
import CareerPage from './Pages/career/CareerPage';
import CompanyPage from './Pages/company/CompanyPage';
import StudentPage from './Pages/student/StudentPage';
import TutorPage from './Pages/tutor/TutorPage';
import TeacherPage from './Pages/teacher/TeacherPage';
import Contact from './Pages/Contact';
import './index.css';

const routes = [
  { path: '/', label: 'Inicio', element: <Home />} ,
  { path: '/agreement', label: 'Convenio', element: <AgreementPage /> },
  { path: '/specific', label: 'Convenios Especificos', element: <SAgreementPage />},
  { path: '/career', label: 'Carreras', element: <CareerPage />},
  { path: '/company', label: 'Empresas', element: <CompanyPage />},
  { path: '/activity', label: 'Actividades', element: <ActivityPage />},
  { path: '/activitydtl', label: 'Detalle de Actividades', element: <ActivityDetailPage />},
  { path: '/practice', label: 'Practicas', element:<PracticePage />},
  { path: '/practicedtl', label: 'Detalle de Practicas', element:<PracticedtlPage />},
  { path: '/student', label: 'Estudiantes', element: <StudentPage />},
  { path: '/teacher', label: 'Tutor Academico', element: <TeacherPage />},
  { path: '/tutor', label: 'Tutor Empresarial', element:<TutorPage />},
];


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <SiderMenu menuItems={routes} />
        <Layout.Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agreement" element={<AgreementPage />} />
            <Route path="/specific" element={<SAgreementPage />} />
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
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
