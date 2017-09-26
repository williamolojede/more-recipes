// create an object for default data

const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('id_token')
};

export default initialState;
