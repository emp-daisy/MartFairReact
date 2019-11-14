import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, Divider, Form,
  Grid, Header, Segment, Message,
} from 'semantic-ui-react';
import { registerCustomer, loginCustomerWithFacebook } from '../actions/customer';

class RegisterPage extends Component {
  state={
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  registerUser=() => {
    const { fullName, email, password } = this.state;
    this.props.registerCustomer({name: fullName, email, password});
  }

  vaidateForm = () => {
    const { loading } = this.props;
    const { fullName, email, password, confirmPassword } = this.state;
    const disabled = loading || email.trim().length < 1 || fullName.trim().length < 1
    // eslint-disable-next-line no-useless-escape
    || password.trim().length < 1 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    || password !== confirmPassword;
    return disabled;
  }

  render() {
    if (this.props.loggedIn) {
      this.props.history.replace('/');
    }
    const { loading, error, errorMessage } = this.props;
    const { fullName, email, password, confirmPassword } = this.state;
    const disabledLogin = this.vaidateForm();
    return (
      <Grid container textAlign="center" verticalAlign="middle" style={{ margin: 'auto 0' }}>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            {error && <Message attached error>{errorMessage}</Message>}
            <Form size="large">
              <Segment raised>
                <Header as="h2" className="yellish" textAlign="center">
                  Register
                </Header>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Full name"
                  name="fullName"
                  // error={email}
                  value={fullName}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  // error={email}
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Verify Password"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
                <Button
                  className="yellish roundish"
                  fluid
                  size="large"
                  disabled={disabledLogin}
                  loading={loading}
                  onClick={this.registerUser}
                >
              Register
                </Button>

                <Divider horizontal>Or</Divider>
                <Button color="facebook" content="Sign up with Facebook" icon="facebook" labelPosition="left" />

                <Grid columns={1} stackable inverted style={{ paddingTop: 30 }}>
                  <Grid.Row>
                    <Grid.Column>
              Already a customer?
                      {' '}
                      <a className="yellish" href="/login">Sign in</a>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.customer.loading,
  errorMessage: state.customer.errorMessage,
  error: state.customer.error,
  loggedIn: state.customer.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  registerCustomer, loginCustomerWithFacebook,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
