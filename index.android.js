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
  Navigator,
  Dimensions
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

var _navigator = null;
class AppNavigator extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      console.log('点击了返回', _navigator.getCurrentRoutes().length);
      if(_navigator == null){
        return false;
      }
      if(_navigator.getCurrentRoutes().length === 1){
        return false;
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
        return <MyListView navigator={nav}/>
    }
  }
  render() {
    return (
        <Navigator
            initialRoute={{ id: 'home'}}
            renderScene={this.renderScene}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
            }}
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
});

AppRegistry.registerComponent('Hello', () => AppNavigator);
