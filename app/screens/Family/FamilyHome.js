import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeAction from '../../action/homeAction';
import * as CONSTANT from '../../utils/Constants';
import Scale, {verticalScale} from '../../utils/Scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

class FamilyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      motherData: [],
      fatherData: [],
      siblingsData: [],
    };
  }

  componentDidMount() {
    this.recordsAPILits();
  }

  UNSAFE_componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.recordsAPILits();
    });
  }
  UNSAFE_componentWillReceiveProps(props) {
    let data = props && props.familyData;
    this.setState({
      state: data,
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
  }

  recordsAPILits() {
    this.props.action
      .getFamilyInfo()
      .then(res => {
        console.log('res===>', res);
        this.setState({
          userData: res.data[0]?.user,
          fatherData: res.data[0]?.father,
          motherData: res.data[0]?.mother,
          siblingsData: res.data[0]?.sibling,
        });
      })
      .catch(err => console.log(err));
  }

  navigateToAddFamily() {
    const userData = this.state.userData;
    const motherData = this.state.motherData;
    const fatherData = this.state.fatherData;
    const siblingsData = this.state.siblingsData;

    if (userData && fatherData && motherData && siblingsData) {
      this.props.navigation.navigate('addFamily', {
        father: fatherData.email,
        mother: motherData.email,
        sibling: siblingsData,
      });
    } else {
      this.props.navigation.navigate('addFamily');
    }
  }

  addIconView() {
    return (
      <TouchableOpacity
        style={styles.addIconView}
        onPress={() => this.navigateToAddFamily()}>
        <Ionicons name="add" color={CONSTANT.DEFAULT_WHITE} size={20} />
      </TouchableOpacity>
    );
  }

  renderDetailsView(title, data) {
    return (
      <>
        <Text style={{fontSize: 15, marginTop: 10}}>{title}</Text>
        <View style={styles.personalView}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 70,
                height: 70,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 35,
                overflow: 'hidden',
              }}>
              <Image
                source={
                  title == 'Mother'
                    ? require('../../../assets/woman.png')
                    : require('../../../assets/man.png')
                }
                style={{width: 50, height: 50}}
                resizeMode="cover"
              />
            </View>
            <View style={{paddingLeft: 20}}>
              <Text>{data.first_name + ' ' + data.last_name}</Text>
              <Text>{data.email}</Text>
              <Text style={{fontWeight: 'bold', marginTop: 10}}>
                {data.type}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  async doLogout() {
    await AsyncStorage.setItem('USER_TOKEN', '');
    this.props.navigation.replace('Splash');
  }

  renderFamilyInfo() {
    const userData = this.state.userData;
    const motherData = this.state.motherData;
    const fatherData = this.state.fatherData;
    const siblingsData = this.state.siblingsData;

    return (
      <View style={{paddingHorizontal: Scale(30)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: 15,
              color: CONSTANT.THEME_GREEN,
            }}>
            Family Information
          </Text>

          <TouchableOpacity onPress={() => this.doLogout()}>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: 15,
                color: CONSTANT.THEME_GREEN,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingVertical: verticalScale(15),
            marginBottom: verticalScale(50),
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {userData && this.renderDetailsView('Personal', userData)}
            {motherData && this.renderDetailsView('Mother', motherData)}
            {fatherData && this.renderDetailsView('Father', fatherData)}
            {siblingsData &&
              siblingsData.map((item, index) => {
                return this.renderDetailsView('Sibling', item);
              })}
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: CONSTANT.DEFAULT_WHITE}}>
        {this.renderFamilyInfo()}
        {this.addIconView()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state-->', state);
  if (state) {
    return {
      familyData: state.home.familyData,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(homeAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyHome);

const styles = StyleSheet.create({
  personalView: {
    // paddingHorizontal: Scale(30),
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
    paddingVertical: verticalScale(10),
  },
  addIconView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: CONSTANT.THEME_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
