import React, {Component} from 'react';
import {
  Alert,
  Image,
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
    this.props.action
      .getFamilyInfo()
      .then(res => {
        console.log('res===>', res);
        this.setState({
          userData: res.data[0].user,
          fatherData: res.data[0].father,
          motherData: res.data[0].mother,
          siblingsData: res.data[0].sibling,
        });
      })
      .catch(err => console.log(err));
  }

  addIconView() {
    return (
      <TouchableOpacity
        style={styles.addIconView}
        onPress={() => this.props.navigation.navigate('addFamily')}>
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
            <View style={{width: 70, height: 70, borderRadius: 35}}>
              <Image
                source={{
                  uri: data.avatar,
                }}
                style={{width: 70, height: 70}}
                resizeMode="contain"
              />
            </View>
            <View>
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

  renderFamilyInfo() {
    const userData = this.state.userData;
    const motherData = this.state.motherData;
    const fatherData = this.state.fatherData;
    const siblingsData = this.state.siblingsData;

    return (
      <View style={{paddingHorizontal: Scale(30)}}>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 15,
            color: CONSTANT.THEME_GREEN,
          }}>
          Family Information
        </Text>

        {this.renderDetailsView('Personal', userData)}
        {this.renderDetailsView('Mother', motherData)}
        {this.renderDetailsView('Father', fatherData)}
        {siblingsData.map((item, index) => {
          return this.renderDetailsView('Sibling', item);
        })}
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
    paddingHorizontal: Scale(30),
    borderBottomWidth: 1,
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
