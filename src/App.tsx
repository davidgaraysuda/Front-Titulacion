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
import SAgreementFilterCareer from './Pages/specific/filter/SAgreementFilterCareer';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <SiderMenu />
      </Layout>
    </BrowserRouter>
  );
}

export default App;