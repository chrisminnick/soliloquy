import useNavigateIfTokenExists from '../hooks/useNavigateIfTokenExists';
import useSignup from '../hooks/useSignup';
import { Link } from 'react-router-dom';

function SignupPage() {
  const { handleSignup, isLoading, signupMessage, error } = useSignup();
  useNavigateIfTokenExists();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(
      e.target.displayName.value,
      e.target.email.value,
      e.target.password.value
    );
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-5">
            <div className="card-header">
              <h4>Sign Up</h4>
            </div>
            <div className="card-body">
              {signupMessage && (
                <div className="alert alert-success" role="alert">
                  {signupMessage} Please <Link to="/login">login</Link>
                </div>
              )}
              {error && (
                <div className="alert alert-success" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Display Name</label>
                  <input
                    type="text"
                    id="displayName"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    required
                    type="password"
                    id="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <button className="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
