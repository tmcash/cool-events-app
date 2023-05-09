import decode from 'jwt-decode';

class AuthService {
<<<<<<< HEAD
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
=======
getProfile() {
    return decode(this.getToken());
}

loggedIn() {
    const token = this.getToken();

    return token && !this.isTokenExpired(token) ? true : false;
}

isTokenExpired(token) {

    const decoded = decode(token);

    if (decoded.exp < Date.now() / 1000) {
    localStorage.removeItem('id_token');
    return true;
    }

    return false;
}

getToken() {
    return localStorage.getItem('id_token');
}

login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
}

logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
}
}
let AuthServiceInstance = new AuthService ();
export default AuthServiceInstance;
>>>>>>> dde0aad7b59cc1f65a012899f71e24f19d8570db
