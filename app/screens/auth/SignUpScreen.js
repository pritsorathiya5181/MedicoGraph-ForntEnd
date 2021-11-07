import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Validators from '../../utils/Validators';
import * as authAction from '../../action/authAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
      },
    };
  }

  textInputChange(val) {
    if (Validators.isEmailValid(val.trim())) {
      this.setState({
        data: {
          ...this.state.data,
          email: val,
          check_textInputChange: true,
        },
      });
    } else {
      this.setState({
        data: {
          ...this.state.data,
          email: val,
          check_textInputChange: false,
        },
      });
    }
  }

  handlePasswordChange(val) {
    this.setState({
      data: {
        ...this.state.data,
        password: val,
      },
    });
  }

  handleConfirmPasswordChange(val) {
    this.setState({
      data: {
        ...this.state.data,
        confirm_password: val,
      },
    });
  }

  updateSecureTextEntry() {
    this.setState({
      data: {
        ...this.state.data,
        secureTextEntry: !this.state.data.secureTextEntry,
      },
    });
  }

  updateConfirmSecureTextEntry() {
    this.setState({
      data: {
        ...this.state.data,
        confirm_secureTextEntry: !this.state.data.confirm_secureTextEntry,
      },
    });
  }

  signInHandle(firstname, lastname, email, password) {
    // add login check logic here
    const data = {
      email: email,
      password: password,
      first_name: firstname,
      last_name: lastname,
    };
    this.props.action
      .SIGNUPUSER(data)
      .then(res => {
        console.log('result====>', res);
        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log('error===>', err);
      });
  }

  render() {
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.text_footer]}>First Name</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your firstname"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val =>
                  this.setState({
                    data: {
                      ...this.state.data,
                      firstname: val,
                    },
                  })
                }
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}>
              Last Name
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your lastname"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val =>
                  this.setState({
                    data: {
                      ...this.state.data,
                      lastname: val,
                    },
                  })
                }
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}>
              Email
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.textInputChange(val)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={() => this.updateSecureTextEntry()}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>

            {/* <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 10,
                },
              ]}>
              Confirm Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Confirm Your Password"
                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.handleConfirmPasswordChange(val)}
              />
              <TouchableOpacity
                onPress={() => this.updateConfirmSecureTextEntry()}>
                {data.confirm_secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View> */}
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By signing up you agree to our
              </Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Terms of service
              </Text>
              <Text style={styles.color_textPrivate}> and</Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Privacy policy
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  this.signInHandle(
                    data.firstname,
                    data.lastname,
                    data.email,
                    data.password,
                  );
                }}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={[
                  styles.signIn,
                  {
                    borderColor: '#009387',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#009387',
                    },
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state-->', state);
  if (state) {
    return {
      signUpData: state.auth.SignUpUser,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(authAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
