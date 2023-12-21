import useNavigateIfTokenExists from '../hooks/useNavigateIfTokenExists';
import useSignup from '../hooks/useSignup';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';

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
                <InputField label="Email" type="email" id="email" />
                <InputField label="Display Name" type="text" id="displayName" />
                <InputField label="Password" type="password" id="password" />
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
