import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

export default function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user)
  if (!currentUser) {
    return <Navigate to="/users" />
  }
  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};