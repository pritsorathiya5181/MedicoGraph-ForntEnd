import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import Scale, {verticalScale} from '../../utils/Scale';
import * as authAction from '../../action/authAction';
import * as CONSTANT from '../../utils/Constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class SecondScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        bloodGroup: '',
        height: '',
        weight: '',
        hasDiabetes: false,
        hasBP: false,
        hasHeartDisease: false,
        hasArthritis: false,
      },
      showDatePicker: false,
    };
  }

  configueHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Medical Information</Text>
      </View>
    );
  }
  configueFooter() {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.createMedicalInfo()}>
          <Text style={styles.footerText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  createMedicalInfo() {
    const {data} = this.state;
    const raw = {
      bloodGroup: data.bloodGroup,
      height: data.height,
      weight: data.weight,
      hasDiabetes: data.hasDiabetes,
      hasHeartDisease: data.hasHeartDisease,
      hasArthritis: data.hasArthritis,
      hasBloodPressureProblem: data.hasBP,
    };

    this.props.action
      .createMedicalInfo(raw)
      .then(result => {
        console.log(result);
        this.props.navigation.replace('Home');
      })
      .catch(err => console.log('error===>', err));
  }

  render() {
    const {data} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: CONSTANT.DEFAULT_WHITE}}>
        {this.configueHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: Scale(30)}}>
            <Text style={[styles.titleText]}>Blood Group</Text>
            <View style={styles.action}>
              <Fontisto name="blood-drop" color="#05375a" size={20} />
              <TextInput
                placeholder="i.e. O+, AB+"
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

            <Text style={[styles.titleText]}>Height</Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="human-male-height-variant"
                color="#05375a"
                size={20}
              />
              <TextInput
                placeholder="i.e. 5.7 (In feet)"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.height}
                onChangeText={val =>
                  this.setState({
                    data: {
                      ...data,
                      height: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>Weight</Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="weight-kilogram"
                color="#05375a"
                size={20}
              />
              <TextInput
                placeholder="i.e. 56"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.weight}
                onChangeText={val =>
                  this.setState({
                    data: {
                      ...data,
                      weight: val,
                    },
                  })
                }
              />
            </View>

            <Text style={{marginTop: 15}}>Additional questions</Text>
            <View style={[styles.row, {marginTop: 5}]}>
              <CheckBox
                disabled={false}
                value={data.hasDiabetes}
                onValueChange={newValue =>
                  this.setState({data: {...data, hasDiabetes: newValue}})
                }
              />
              <Text>Do you have a diabetes?</Text>
            </View>

            <View style={styles.row}>
              <CheckBox
                disabled={false}
                value={data.hasHeartDisease}
                onValueChange={newValue =>
                  this.setState({data: {...data, hasHeartDisease: newValue}})
                }
              />
              <Text>Do you have a heart disease?</Text>
            </View>

            <View style={styles.row}>
              <CheckBox
                disabled={false}
                value={data.hasArthritis}
                onValueChange={newValue =>
                  this.setState({data: {...data, hasArthritis: newValue}})
                }
              />
              <Text>Do you have a arthritis?</Text>
            </View>

            <View style={styles.row}>
              <CheckBox
                disabled={false}
                value={data.hasBP}
                onValueChange={newValue =>
                  this.setState({data: {...data, hasBP: newValue}})
                }
              />
              <Text>Do you have a problem of blood pressure?</Text>
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
      medicalData: state.auth.MedicalInfo,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(authAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen);

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
