import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, Divider, Form,
  Grid, Header, Segment, Message,
} from 'semantic-ui-react';
import { loginCustomer, loginCustomerWithFacebook } from '../actions/customer';

class LoginPage extends Component {
  state={
    email: '',
    password: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  loginUser=() => {
    const { email, password } = this.state;
    this.props.loginCustomer(email, password);
  }

  render() {
    if (this.props.loggedIn) {
      this.props.history.replace('/');
    }
    const { loading, error, errorMessage } = this.props;
    const { email, password } = this.state;
    const disabledLogin = loading || email.trim().length < 1
    // eslint-disable-next-line no-useless-escape
    || password.trim().length < 1 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return (
      <Grid textAlign="center" verticalAlign="middle" style={{ margin: 'auto 0' }}>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            {error && <Message attached error>{errorMessage}</Message>}
            <Form size="large">
              <Segment raised>
                <Header as="h2" className="yellish" textAlign="center">
                  Login
                </Header>
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
                <Form.Checkbox label="Remember me" />
                <Button
                  className="yellish roundish"
                  fluid
                  size="large"
                  disabled={disabledLogin}
                  loading={loading}
                  onClick={this.loginUser}
                >
              Sign in
                </Button>

                <Divider horizontal>Or</Divider>
                <Button color="facebook" content="Sign in with Facebook" icon="facebook" labelPosition="left" />

                <Grid columns={2} stackable inverted style={{ paddingTop: 30 }}>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <a className="yellish" href="/">Forgot password</a>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <a className="yellish" href="/register">Have an account?</a>
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
  loginCustomer, loginCustomerWithFacebook,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
