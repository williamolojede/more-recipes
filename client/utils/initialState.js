// create an object for default data

const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token')
};

export default initialState;
