import { Navigate } from "react-router-dom";
const ProtectedRoute=({ children })=>{
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        alert("You Must Log in")
        return <Navigate to="/"/>
    }

    return children;
}
export default ProtectedRoute;