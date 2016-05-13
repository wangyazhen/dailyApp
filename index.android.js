/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  BackAndroid,
  TouchableOpacity,
  Navigator,
  Dimensions,
  ToastAndroid
} from 'react-native';

import MyListView from './app/views/ListView';
import DetailView from './app/views/DetailView';

class Hello extends Component {
  constructor(prop) {
    super(prop);
    this.state = {splashed: false}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({splashed: true})
    }, 1500)
  }
  render() {
    console.log('Hello 组件渲染：', this.state);
    if (this.state.splashed) {
      return <MyListView navigator={_navigator}/>;
    }
    return (
      <View style={styles.container}>
        <Image style={styles.welcomeImg} source={{uri: 'https://pic4.zhimg.com/715717d2436d1fed01f2b20453dc686b.jpg'}}></Image>
      </View>
    );
  }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
        <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            {previousRoute.title || '返回'}
          </Text>
        </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
        <TouchableOpacity
            onPress={() => alert('下一页')}
            style={styles.navBarRightButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Next
          </Text>
        </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.title}
        </Text>
    );
  },

};
var _navigator = null;
class AppNavigator extends Component {
  constructor() {
    super();
    this.lastBackPressed = null
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if(_navigator == null){ return false; }
      let routeLength = _navigator.getCurrentRoutes().length;
      console.log('点击了返回', routeLength);

      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }

      if (routeLength === 1) {
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
      }
      _navigator.pop();
      return true;
    });
  }

  renderScene (route, nav) {
    _navigator = nav;
    console.log('render Scene ', route.id);
    var Comp = null;
    switch (route.id) {
      case 'detail':
        console.log('详情页 --- itemId', route.itemId);
        return <DetailView navigator={nav} itemId={route.itemId}/>;
      default:
        return <MyListView navigator={nav} />
    }
  }
  render() {
    return (
        <Navigator
            initialRoute={{ id: 'home', title: '首页'}}
            renderScene={this.renderScene}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
            }}
            /*navigationBar={
              <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={styles.navBar}
              />
            }*/
        />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
});

AppRegistry.registerComponent('Hello', () => AppNavigator);
