import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';



function ProtectedRoute({ children }){
    const [isAuthorized, setIsAuthorized] = useState(null);

		useEffect(() => {
			auth().catch(e =>
				setIsAuthorized(false));
		}, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Get refresh token from local storage
				try {
					// Send refresh token to get new access token to API
					const response = await api.post('/api/token/refresh/', { refresh: refreshToken });

					if(response.status === 200) {
					localStorage.setItem(ACCESS_TOKEN, response.data.access);
					setIsAuthorized(true);
				} 
				else setIsAuthorized(false);
				}
				
				catch(e){
					console.warn(e);
					setIsAuthorized(false);
				}
    }

    const auth = async () => {
			const token = localStorage.getItem(ACCESS_TOKEN);
			if(!token){
				setIsAuthorized(false);
				return;
    }
		const decoded = jwtDecode(token);
		const tokenExpiration = decoded.exp * 1000;
		const now = Date.now() / 1000;

		(tokenExpiration < now) ? 
			await refreshToken():
			setIsAuthorized(true);
	}

    if (isAuthorized === null) {
        auth();
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute