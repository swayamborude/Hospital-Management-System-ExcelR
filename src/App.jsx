import {Link,Route,Routes,BrowserRouter} from  'react-router-dom';
import Home from './components/auth/Home/Home';
import Login from './components/auth/Login/Login';
import Signup from './components/auth/Registration/Signup';
import ProtectedRoute from './components/dashboards/ProtectedRoute';
import PatientDashboard from './components/dashboards/Patient/PatientDashboard';
import DoctorDashboard from './components/dashboards/Doctor/DoctorDashboard';
import AdminDashboard from './components/dashboards/Admin/AdminDashboard';
import RoleSelection from './components/auth/Login/RoleSelection';
import DoctorAppointments from './components/dashboards/Doctor/DoctorAppointments';
const App=()=>{
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>


        <Route path='/patient-dashboard' element={<PatientDashboard/>}></Route>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
        <Route path="/role-selection" element={<RoleSelection/>}></Route>
        <Route path="/appointments/:id" element={<DoctorAppointments />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;
