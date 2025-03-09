interface AuthResponse {
  code: string;
  title: string;
  message: string;
  data: {
    token: string;
    refresh_token: string;
    user: {
      email: string;
      city: string;
      status: string;
      mobile: string;
      full_name: string;
      gov_id: string | null;
    };
  };
}

export class AuthService {
  setAuthData(response: AuthResponse, roleType: string): void {
    if (!response.data) {
      throw new Error('Invalid auth data');
    }

    const { token, refresh_token, user } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role_type', roleType);
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role_type = localStorage.getItem('role_type');
    return {
      token,
      user: user ? JSON.parse(user) : null,
      role_type
    };
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('role_type');
  }
} 