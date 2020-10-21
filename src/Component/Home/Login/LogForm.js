import React from "react";
import { Link } from "react-router-dom";
import './LogForm.css';

const LogForm = (props) => {
	const { toggleUser, validation, submit, errors } = props;

	return (
		<div className="tg-form login">
			<h4>Login</h4>
           <div className="login-form">
			<form onSubmit={submit}>
				<div className="form-group">
					<input type="email" className="form-control" placeholder="Email" name="email" onBlur={validation} />
					{errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
				</div>

				<div className="form-group">
					<input onBlur={validation} type="password" className="form-control" placeholder="Password" name="password"/>
					{errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
				</div>

				<div className="form-group password">
					<div className="custom-control custom-checkbox mr-sm-2">
						<input type="checkbox" className="custom-control-input" id="rememberUser" />
						<label className="custom-control-label" htmlFor="rememberUser">
							Remember me
						</label>
					</div>
					<Link to="/" className="forgot-passowrd">
						Forgot Password
					</Link>
				</div>

				<button type="submit" className="btn btn-warning tg-primary btn-block">
					Login
				</button>
			</form>
			<br/>
			<div className="register-login">
				Don’t have an account?{" "}
				<button style={{color: 'green', border: 'none', textDecoration: 'underline'}} className="bg-transparent" onClick={toggleUser}>
					Create an account
				</button>
			</div>
			</div>
		</div>
	);
};

export default LogForm;
