import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import scale, {verticalScale} from '../../utils/Scale';
import * as authAction from '../../action/authAction';
import * as CONSTANT from '../../utils/Constants';
import Scale from '../../utils/Scale';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class FirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        dob: '',
        streetAdd: '',
        city: '',
        state: '',
        phoneNo: '',
      },
      showDatePicker: false,
    };
  }

  configueHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Personal Information</Text>
      </View>
    );
  }
  configueFooter() {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.footerText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const {data} = this.state;
            var raw = {
              dateOfBirth: data.dob,
              street: data.streetAdd,
              city: data.city,
              state: data.state,
              phone: data.phoneNo,
            };
            this.props.action
              .createPersonalInfo(raw)
              .then(result => {
                console.log('result==', result);
                this.props.navigation.navigate('Second');
              })
              .catch(err => console.log('err', err));
          }}>
          <Text style={styles.footerText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onChange(date) {
    this.setState({showDatePicker: false});
    console.log(date);
  }

  render() {
    const {navigation} = this.props;
    const {data, showDatePicker} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: CONSTANT.DEFAULT_WHITE}}>
        {this.configueHeader()}

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={date => {
            this.setState({showDatePicker: false, data: {...data, dob: date}});
          }}
          onCancel={() => this.setState({showDatePicker: false})}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: Scale(30)}}>
            <Text style={[styles.titleText]}>Date of Birth</Text>
            <View style={styles.action}>
              <Fontisto name="date" color="#05375a" size={20} />
              <TouchableOpacity
                style={styles.textInput}
                onPress={() => this.setState({showDatePicker: true})}>
                <Text>
                  {data.dob == '' ? 'Your DOB' : data.dob.toDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.titleText]}>Street Address</Text>
            <View style={styles.action}>
              <Entypo name="address" color="#05375a" size={20} />
              <TextInput
                placeholder="Add your street address"
                style={styles.textInput}
                autoCapitalize="none"
                multiline={true}
                onChangeText={val =>
                  this.setState({
                    data: {
                      ...this.state.data,
                      firstname: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>City</Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="home-city-outline"
                color="#05375a"
                size={20}
              />
              <TextInput
                placeholder="city"
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
            </View>

            <Text style={[styles.titleText]}>State</Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="sign-real-estate"
                color="#05375a"
                size={20}
              />
              <TextInput
                placeholder="state"
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
            </View>

            <Text style={[styles.titleText]}>Phone Number</Text>
            <View style={styles.action}>
              <Ionicons name="call-outline" color="#05375a" size={20} />
              <TextInput
                placeholder="Phone No"
                keyboardType="number-pad"
                maxLength={10}
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
            </View>
          </View>
        </ScrollView>

        {this.configueFooter()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state-->', state);
  if (state) {
    return {
      personalInfo: state.auth.personalInfo,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(authAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);

const styles = StyleSheet.create({
  headerContainer: {
    height: verticalScale(50),
    backgroundColor: CONSTANT.THEME_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: CONSTANT.DEFAULT_WHITE,
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerContainer: {
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Scale(30),
  },
  footerText: {
    color: CONSTANT.THEME_GREEN,
  },
  titleText: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 10,
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
    justifyContent: 'center',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
