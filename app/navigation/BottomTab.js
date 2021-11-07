import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as CONSTANT from '../utils/Constants';

export default class BottomTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: 'Browse',
      importedContact: [],
    };
  }

  gotoRoute(routeName) {
    this.setState({
      routeName: routeName,
    });
    this.props.navigation.navigate(routeName);
  }

  render() {
    return (
      <View style={styles.paddingView}>
        <View style={styles.container}>
          {this.props.state.index === 0 ? (
            <View
              style={[
                styles.iconView,
                {borderTopColor: CONSTANT.THEME_GREEN, borderTopWidth: 2},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this.gotoRoute('Home');
                }}
                style={styles.centerView}>
                <View style={[styles.boxView]}>
                  <Ionicons name="add" color={CONSTANT.THEME_GREEN} size={20} />
                </View>
                <Text
                  style={[
                    styles.font12,
                    {
                      color:
                        this.props.state.index === 0 ? '#30354E' : '#7D7D7D',
                    },
                  ]}>
                  Records
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.iconView]}>
              <TouchableOpacity
                onPress={() => {
                  this.gotoRoute('Home');
                }}
                style={styles.centerView}>
                <View style={[styles.boxView]}>
                  <Ionicons name="add" color={CONSTANT.THEME_GREEN} size={20} />
                </View>
                <Text
                  style={[
                    styles.font12,
                    {
                      color:
                        this.props.state.index === 0 ? '#30354E' : '#7D7D7D',
                    },
                  ]}>
                  Records
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View
            style={[
              styles.iconView,
              {
                borderTopColor: CONSTANT.THEME_GREEN,
                borderTopWidth: this.props.state.index === 1 ? 2 : 0,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.gotoRoute('family');
              }}
              style={styles.centerView}>
              <View style={[styles.boxView]}>
                <MaterialIcons
                  name="family-restroom"
                  color={CONSTANT.THEME_GREEN}
                  size={20}
                />
              </View>
              <Text
                style={[
                  styles.font12,
                  {color: this.props.state.index === 2 ? '#30354E' : '#7D7D7D'},
                ]}>
                Family
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#DCDCDC',
  },
  paddingView: {
    backgroundColor: '#fff',
    paddingBottom: 0,
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
  },
  imgProfile: {
    height: 30,
    width: 30,
  },
  font12: {
    fontSize: 10,
    fontFamily: 'Raleway-SemiBold',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon32: {
    height: 32,
    width: 32,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  image32: {
    height: 32,
    width: 32,
  },
  view31: {
    height: 31,
    width: 31,
    borderRadius: 16,
    backgroundColor: 'rgb(233, 234,242)', // '#B4B8D5'
  },
});
