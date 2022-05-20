import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'

class Login extends React.Component {
	constructor() {
		super()
		this.state = {
			username: "",
			password: ""
		}
	}

	loginProcess(event) {
		event.preventDefault()
		let endpoint = "http://localhost:9000/api/login";

		let request = {
			username: this.state.username,
			password: this.state.password
		};

		axios
			.post(endpoint, request)
			.then(result => {
				if (result.data.logged) {
					// simpan token di local storage
					localStorage.setItem("token", result.data.token);
					localStorage.setItem(
						"user", JSON.stringify(result.data.user));
					// window.alert("Congratulation! You're logged")
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Signed in successfully',
						showConfirmButton: false,
						timer: 3000
					  })
					  
					window.location.href = "/"
				} else {
					window.alert("Maaf, username dan password Anda tidak ada")
				}
			})
			.catch(error => console.log(error))
	}

	render() {
		return (
      <div className="container">
        <br />
        <br />
        <br />
        <h1 className="text-1 text-center">Welcome Back, Please Login</h1>
        <br></br>
        <div className="col-lg-6" style={{ margin: "0 auto" }}>
          <div className="card">
            <div className="card-header bg-dark">
              <h4 className="text-white text-center">Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(ev) => this.loginProcess(ev)}>
                Username
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="form-control mb-2"
                  required
                  value={this.state.username}
                  onChange={(ev) =>
                    this.setState({ username: ev.target.value })
                  }
                />
                Password
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  required
                  value={this.state.password}
                  onChange={(ev) =>
                    this.setState({ password: ev.target.value })
                  }
                />
                <div class="d-grid gap-12">
                  <button type="submit" className="btn btn-secondary">
                    Login
                  </button>
                </div>
                {/* <button type="submit" className="btn btn-primary">
                  Login
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
	}

}

export default Login