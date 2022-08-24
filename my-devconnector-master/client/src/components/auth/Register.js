import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
// ? Redirect is deprecated
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  // ? instead of using {setAlert}, we can use props then props.setAlert
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });
  // ? ...formData is used for copy the formData and only change name field with value
  // ? for reuse purpose, we can use [e.target.name] to select field from formData

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
      // ? setAlert = (msg = 'Passwords do not match', alertType = 'danger')
      // ? actually, we need to dispatch(setAlert()) but in connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
      // ? and mapDispatchToProps it has already help dispatch so we dont need to dispatch(setAlert())
    } else {
      // const newUser = {
      //   name,
      //   email,
      //   password,
      // };
      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   };
      //   const body = JSON.stringify(newUser);
      //   console.log(body);
      //   const res = await axios.post(
      //     'http://localhost:5000/api/users',
      //     body,
      //     config
      //   );
      //   console.log(res.data);
      // } catch (error) {
      //   console.error(error.response.data);
      // }
      register({ name, email, password });
    }
  };

  // Navigate if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            value={name}
            onChange={(e) => onChange(e)}
            // ? we can use the onChange={setFormdata()} here
            placeholder='Name'
            name='name'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            onChange={(e) => onChange(e)}
            placeholder='Email Address'
            name='email'
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};
// ? when ever we need use prop, we have to declare propTypes
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
// ? to access, we have to use props.setAlert
// ? connect(null, { setAlert }) with call setAlert(), we will call action setAlert()
