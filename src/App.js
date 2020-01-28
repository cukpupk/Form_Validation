import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      firstnameError: "",
      lastnameError: "",
      emailError: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      //[e.target.name]  computed property names es6 new feature
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let firstnameError = this.state.firstnameError;
    let lastnameError = this.state.lastnameError;
    let emailError = this.state.emailError;

    if (!this.state.firstName) {
      firstnameError = "first name can not be blank";
    } else {
      firstnameError = "";
    }

    if (!this.state.lastName) {
      lastnameError = "last name can not be blank";
    } else {
      lastnameError = "";
    }

    if (!this.state.email.includes("@") || !this.state.email.includes(".com")) {
      emailError = "invalid email";
    } else {
      emailError = "";
    }

    this.setState({
      firstnameError: firstnameError,
      lastnameError: lastnameError,
      emailError: emailError
    });

    if (firstnameError || lastnameError || emailError) {
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault(); // avoid page refresh
    let isValid = this.validate();
    //console.log(isValid);

    if (isValid) {
      //console.log(this.state)
      axios
        .post("https://jsonplaceholder.typicode.com/posts", this.state)
        .then(response => {
          console.log(response);
          alert("submitted");
        })
        .catch(error => {
          console.log(error);
        });

      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        firstnameError: "",
        lastnameError: "",
        emailError: ""
      });
    }
  };

  render() {
    return (
      <>
        {/* when form is submitted, handleSubmit will be executed */}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="firstName"
              placeholder="firstName"
              value={this.state.firstName}
              onChange={this.handleOnChange}
            />
            <div>{this.state.firstnameError}</div>
          </div>

          <div>
            <input
              name="lastName"
              placeholder="lastName"
              value={this.state.lastName}
              onChange={this.handleOnChange}
            />
            <div>{this.state.lastnameError}</div>
          </div>

          <div>
            <input
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleOnChange}
            />
            <div>{this.state.emailError}</div>
          </div>

          {/* <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
            <div>{this.state.passwordError}</div>
          </div> */}

          <button type="submit">submit</button>
        </form>
      </>
    );
  }
}
export default App;
