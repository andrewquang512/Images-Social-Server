import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ! Not understand
const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
  return !isAuthenticated && !loading ? <Navigate to='/login' /> : children;
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

//  ? React router v5 PrivateRoute syntax
// const PrivateRoute = ({
//   component: Component,
//   auth: { isAuthenticated, loading },
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !isAuthenticated && !loading ? (
//           <Navigate to='/login' />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// };
export default connect(mapStateToProps)(PrivateRoute);
