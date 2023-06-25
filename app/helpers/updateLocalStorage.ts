export const updateLocalStorage = (userData: Auth) => {
  window.localStorage.setItem('ACTIVE_USER', userData.user!.name!);
  window.localStorage.setItem('USER_ID', userData.user!.id!);
  window.localStorage.setItem('USER_EMAIL', userData.user!.email!);
  window.localStorage.setItem('AUTH_TOKEN', userData.token!);
}

export const clearLocalStorage = () => {
  window.localStorage.setItem('ACTIVE_USER', '');
  window.localStorage.setItem('USER_ID', '');
  window.localStorage.setItem('USER_EMAIL', '');
  window.localStorage.setItem('AUTH_TOKEN', '');
}
