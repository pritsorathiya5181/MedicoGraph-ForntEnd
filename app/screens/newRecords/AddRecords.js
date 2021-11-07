import * as React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {bindActionCreators} from 'redux';
import * as CONSTANT from '../../utils/Constants';
import Scale, {verticalScale} from '../../utils/Scale';
import * as homeAction from '../../action/homeAction';
import {connect} from 'react-redux';

class AddRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editRecord: false,
      records: {
        title: '',
        hemoglobin: 0,
        sugarLevel: 0,
        hBloodPressure: 0,
        lBloodPressure: 0,
        rbcCount: 0,
        wbcCount: 0,
        notes: 'Test was qeqefantastic',
      },
    };
  }

  componentDidMount() {
    this.setState({
      editRecord: typeof this.props.route.params == 'undefined' ? false : true,
      records: {...this.props.route.params?.record},
    });
  }

  saveRecord() {
    const {records} = this.state;
    console.log('Work====', records);
    var raw = JSON.stringify({
      hemoglobin: records.hemoglobin | 0,
      sugarLevel: records.sugarLevel | 0,
      rbcCount: records.rbcCount | 0,
      wbcCount: records.wbcCount | 0,
      lBloodPressure: records.lBloodPressure | 0,
      hBloodPressure: records.hBloodPressure | 0,
      title: records.title,
      notes: records.notes,
    });

    this.props.action
      .addRecords(raw)
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

  updateRecord() {
    const {records} = this.state;
    var raw = JSON.stringify({
      id: records._id,
      hemoglobin: records.hemoglobin | 0,
      sugarLevel: records.sugarLevel | 0,
      rbcCount: records.rbcCount | 0,
      wbcCount: records.wbcCount | 0,
      lBloodPressure: records.lBloodPressure | 0,
      hBloodPressure: records.hBloodPressure | 0,
      title: records.title,
      notes: records.notes,
    });

    this.props.action
      .updateRecord(raw)
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

  deleteRecord() {
    var raw = JSON.stringify({
      id: this.state.records._id,
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

  configueHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {this.state.editRecord ? 'Update Record' : 'New Record'}
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

  render() {
    const {records} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: CONSTANT.DEFAULT_WHITE}}>
        {this.configueHeader()}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: Scale(30)}}>
            <Text style={[styles.titleText]}>Title</Text>
            <View style={styles.action}>
              <AntDesign name="disconnect" color="#05375a" size={20} />
              <TextInput
                placeholder="Title"
                style={styles.textInput}
                autoCapitalize="none"
                value={records.title?.toString()}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      title: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>Hemoglobin Level</Text>
            <View style={styles.action}>
              <AntDesign name="disconnect" color="#05375a" size={20} />
              <TextInput
                placeholder="Hemoglobin"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={records.hemoglobin?.toString()}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      hemoglobin: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>Sugar Level</Text>
            <View style={styles.action}>
              <AntDesign name="disconnect" color="#05375a" size={20} />
              <TextInput
                placeholder="Sugar Level"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={records.sugarLevel?.toString()}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      sugarLevel: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>High Bool Pressure</Text>
            <View style={styles.action}>
              <AntDesign name="disconnect" color="#05375a" size={20} />
              <TextInput
                placeholder="High BP"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={records.hBloodPressure?.toString()}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      hBloodPressure: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>Low Blood Pressure</Text>
            <View style={styles.action}>
              <AntDesign name="disconnect" color="#05375a" size={20} />
              <TextInput
                placeholder="Low BP"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={records.lBloodPressure?.toString()}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      lBloodPressure: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>Red Blood Cell Count</Text>
            <View style={styles.action}>
              <AntDesign name="disconnect" color="#05375a" size={20} />
              <TextInput
                placeholder="RBC Count"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={records.rbcCount?.toString()}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      rbcCount: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>White Blood Cell Count</Text>
            <View style={styles.action}>
              <AntDesign name="disconnect" color="#05375a" size={20} />
              <TextInput
                placeholder="WBC Count"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={records.wbcCount?.toString()}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      wbcCount: val,
                    },
                  })
                }
              />
            </View>

            <Text style={[styles.titleText]}>Notes</Text>
            <View style={[styles.action, {alignItems: 'flex-start'}]}>
              <MaterialIcons name="notes" color="#05375a" size={20} />
              <TextInput
                placeholder="Notes"
                style={[
                  styles.textInput,
                  {textAlignVertical: 'top', paddingTop: 0},
                ]}
                autoCapitalize="none"
                multiline={true}
                numberOfLines={3}
                value={records.notes}
                onChangeText={val =>
                  this.setState({
                    records: {
                      ...records,
                      notes: val,
                    },
                  })
                }
              />
            </View>
          </View>
        </ScrollView>

        {this.saveRecordView()}
        {this.state.editRecord && this.deleteRecordView()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state-->', state);
  if (state) {
    return {
      addData: state.auth.addData,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(homeAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecords);

const styles = StyleSheet.create({
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
