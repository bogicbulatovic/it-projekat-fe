const logout = () => {
  window.localStorage.clear();
  window.location.href = "/login";
};

export { logout };
