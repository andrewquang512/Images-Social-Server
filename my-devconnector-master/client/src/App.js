import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // ? If you want to run an effect and clean it up only once (on mount and unmount)
  // ? you can pass an empty array ([]) as a second argument
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route
              path='/register'
              element={
                <section className='container'>
                  <Alert />
                  <Register />
                </section>
              }
            />
            <Route
              path='/login'
              element={
                <section className='container'>
                  <Alert />
                  <Login />
                </section>
              }
            />
            <Route
              path='/profiles'
              element={
                <section className='container'>
                  <Alert />
                  <Profiles />
                </section>
              }
            />
            <Route
              path='/profile/:id'
              element={
                <section className='container'>
                  <Alert />
                  <Profile />
                </section>
              }
            />
            {/* //? React router v5 PrivateRoute syntax */}
            {/* <PrivateRoute
              path='/dashboard'
              element={
                <section className='container'>
                  <Alert />
                  <Dashboard />
                </section>
              }
            /> */}
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <Dashboard />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path='/create-profile'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <CreateProfile />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path='/edit-profile'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <EditProfile />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path='/add-experience'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <AddExperience />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path='/add-education'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <AddEducation />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path='/posts'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <Posts />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path='/posts/:id'
              element={
                <PrivateRoute>
                  <section className='container'>
                    <Alert />
                    <Post />
                  </section>
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
