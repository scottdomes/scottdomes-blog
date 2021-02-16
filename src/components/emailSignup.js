import React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

export default class EmailSignup extends React.Component {
  state = {
    firstName: '',
    email: '',
    error: '',
    success: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: '' });
    addToMailchimp(this.state.email, {
      FNAME: this.state.firstName,
    }).then((data) => {
      if (data.msg) {
        this.setState({ error: data.msg });
      }

      if (data.result === 'success') {
        this.setState({ success: true });
      }
    });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };

  render() {
    const { firstName, email, error, success } = this.state;

    if (success) {
      return <h2>Thanks for signing up!</h2>;
    }

    return (
      <form
        style={{ display: 'flex', flexDirection: 'column', padding: '0 5px' }}
        onSubmit={this.handleSubmit}
      >
        <h2 className="text-center">Join my email list</h2>
        <p style={{ marginBottom: 10 }}>
          <strong>
            A short weekly summary of my writing + good stuff I've come across.
          </strong>
        </p>
        <label htmlFor="email">Email:</label>
        <input
          style={{
            marginBottom: 10,
            padding: 5,
            borderRadius: 5,
            border: '1px solid #e6e6e6',
          }}
          type="email"
          value={email}
          onChange={this.handleEmailChange}
        />
        <label htmlFor="first-name">First Name:</label>
        <input
          type="first-name"
          value={firstName}
          onChange={this.handleFirstNameChange}
          style={{
            marginBottom: 10,
            padding: 5,
            borderRadius: 5,
            border: '1px solid #e6e6e6',
          }}
        />
        <button
          style={{
            border: 'none',
            borderRadius: 6,
            background: '#ff4500',
            color: 'white',
            height: 48,
            margin: 10,
          }}
          type="submit"
        >
          Sign up
        </button>
        {error && <p dangerouslySetInnerHTML={{ __html: error }} />}
      </form>
    );
  }
}
