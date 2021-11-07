import React, {Component} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeAction from '../../action/homeAction';
import * as CONSTANT from '../../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Scale, {verticalScale} from '../../utils/Scale';

var siblingsList = [];
class AddFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editRecord: false,
      family: {
        father: '',
        mother: '',
        sibling: [],
      },
      siblingCount: 0,
    };
  }

  componentDidMount() {
    console.log('data==', this.props.route.params?.sibling);
    this.setState({
      editRecord: typeof this.props.route.params == 'undefined' ? false : true,
      family: {
        father: this.props.route.params?.father,
        mother: this.props.route.params?.mother,
        sibling: this.props.route.params?.sibling.map(item => item.email),
      },
    });
    siblingsList = this.state.sibling;
  }

  configueHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {this.state.editRecord ? 'Update Family Info' : 'Add Family Info'}
        </Text>
      </View>
    );
  }

  deleteRecordView() {
    return (
      <TouchableOpacity
        style={styles.deleteIconView}
        onPress={() => this.deleteRecord()}>
        <AntDesign name="delete" color={CONSTANT.DEFAULT_WHITE} size={20} />
      </TouchableOpacity>
    );
  }

  saveRecordView() {
    return (
      <TouchableOpacity
        style={styles.addIconView}
        onPress={() => {
          this.state.editRecord ? this.updateRecord() : this.saveRecord();
        }}>
        <AntDesign name="save" color={CONSTANT.DEFAULT_WHITE} size={20} />
      </TouchableOpacity>
    );
  }

  saveRecord() {
    const {family} = this.state;
    var raw = JSON.stringify({
      father: family.father,
      mother: family.mother,
      sibling: family.sibling,
    });

    this.props.action
      .createFamily(raw)
      .then(res => {
        console.log('res', res);
        if (res.success) {
          // this.props.navigation.replace('Home');
          this.props.navigation.goBack();
        } else {
          Alert.alert(res.message);
        }
      })
      .catch(err => console.log(err));
  }

  updateRecord() {
    const {family} = this.state;
    console.log('family===>', family);

    var raw = JSON.stringify({
      father: family.father,
      mother: family.mother,
      sibling: family.sibling,
    });

    this.props.action
      .updateFamily(raw)
      .then(res => {
        console.log('res', res);
        if (res.success) {
          this.props.navigation.goBack();
        } else {
          Alert.alert(res.message);
        }
      })
      .catch(err => console.log(err));
  }

  deleteRecord() {
    var raw = JSON.stringify({
      id: this.state.family?._id,
    });

    this.props.action
      .deleteRecord(raw)
      .then(res => {
        console.log('res', res);
        if (res.success) {
          this.props.navigation.replace('Home');
        } else {
          Alert.alert(res.message);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const {family} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: CONSTANT.DEFAULT_WHITE}}>
        {this.configueHeader()}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: Scale(30)}}>
            <Text style={[styles.titleText]}>Father's Email</Text>
            <View style={styles.action}>
              <AntDesign name="mail" color="#05375a" size={20} />
              <TextInput
                placeholder="Father email"
                style={styles.textInput}
                autoCapitalize="none"
                value={family.father}
                onChangeText={val =>
                  this.setState({
                    family: {
                      ...family,
                      father: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>Mother's Email</Text>
            <View style={styles.action}>
              <AntDesign name="mail" color="#05375a" size={20} />
              <TextInput
                placeholder="Mother Email"
                style={styles.textInput}
                autoCapitalize="none"
                value={family.mother}
                onChangeText={val =>
                  this.setState({
                    family: {
                      ...family,
                      mother: val,
                    },
                  })
                }
              />
            </View>

            {family.sibling?.map((item, index) => {
              return (
                <>
                  <Text style={[styles.titleText]}>Sibling's Email</Text>
                  <View style={styles.action}>
                    <AntDesign name="mail" color="#05375a" size={20} />
                    <TextInput
                      placeholder="Sibling's Email"
                      style={styles.textInput}
                      autoCapitalize="none"
                      value={family.sibling[index]}
                      onChangeText={val =>
                        this.setState({
                          family: {
                            ...family,
                            sibling: family.sibling.map((item, i) =>
                              i == index ? val : item,
                            ),
                          },
                        })
                      }
                    />
                  </View>
                </>
              );
            })}

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderColor: CONSTANT.THEME_GREEN,
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                this.setState({
                  siblingCount: this.state.siblingCount + 1,
                  family: {
                    ...family,
                    sibling: [...(family.sibling ? family.sibling : []), ''],
                  },
                });
                siblingsList = [...(siblingsList ? siblingsList : []), 'hello'];
              }}>
              <AntDesign name="addusergroup" color="#05375a" size={20} />
              <Text
                style={{
                  color: CONSTANT.THEME_GREEN,
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingLeft: 15,
                }}>
                Add Siblings
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {this.saveRecordView()}
        {/* {this.state.editRecord && this.deleteRecordView()} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFamily);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: CONSTANT.DEFAULT_WHITE,
  },
  headerContainer: {
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: CONSTANT.THEME_GREEN,
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
    marginTop: 5,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
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
  deleteIconView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: CONSTANT.THEME_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    right: 30,
  },
});
