import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as CONSTANT from '../utils/Constants';
import Scale, {verticalScale} from '../utils/Scale';
import * as homeAction from '../action/homeAction';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

class HomeScreen extends React.Component {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
  }

  componentDidMount() {
    this.getRecordsLists();
  }

  UNSAFE_componentWillMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.getRecordsLists();
    });
  }
  UNSAFE_componentWillReceiveProps(props) {
    let data = props && props.recordsList;
    this.setState({
      state: data,
    });
  }

  componentWillUnmount() {
    this._unsubscribe;
  }

  getRecordsLists() {
    this.props.action
      .getRecords()
      .then(res => {
        console.log(res);
        this.setState({records: res.data});
      })
      .catch(err => console.log(err));
  }

  addIconView() {
    return (
      <TouchableOpacity
        style={styles.addIconView}
        onPress={() => this.props.navigation.navigate('addRecords')}>
        <Ionicons name="add" color={CONSTANT.DEFAULT_WHITE} size={20} />
      </TouchableOpacity>
    );
  }

  last3RecordsList() {
    return this.state.records.slice(0, 3).map((item, index) => {
      return (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() =>
            this.props.navigation.navigate('addRecords', {record: item})
          }>
          <View style={{width: '60%'}}>
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {item.notes}
            </Text>
          </View>
          <View style={{flex: 1, paddingLeft: Scale(10)}}>
            <Text>{moment(item.date).format('MM/DD/YYYY')}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }
  recordsList() {
    const records =
      this.state.records.length > 3
        ? this.state.records.slice(3, this.state.records.length)
        : this.state.records;
    return (
      records?.length >= 1 &&
      records.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() =>
              this.props.navigation.navigate('addRecords', {record: item})
            }>
            <View style={{width: '60%'}}>
              <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {item.notes}
              </Text>
            </View>
            <View style={{flex: 1, paddingLeft: Scale(10)}}>
              <Text>{moment(item.date).format('MM/DD/YYYY')}</Text>
            </View>
          </TouchableOpacity>
        );
      })
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.records.length > 3 && (
          <View
            style={{
              paddingHorizontal: Scale(30),
              marginTop: verticalScale(15),
            }}>
            {/* <Text>Last 3 added records</Text> */}
            <Text style={styles.titleText}>Last 3 Records</Text>
          </View>
        )}
        {this.state.records.length > 3 && this.last3RecordsList()}

        <View
          style={{paddingHorizontal: Scale(30), marginTop: verticalScale(15)}}>
          <Text style={styles.titleText}>Previous Records</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.recordsList()}
        </ScrollView>
        {this.addIconView()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state-->', state);
  if (state) {
    return {
      recordsList: state.home.homeData,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(homeAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFF',
    flex: 1,
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
  titleText: {
    color: CONSTANT.THEME_GREEN,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingVertical: verticalScale(7),
    paddingHorizontal: Scale(30),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});
