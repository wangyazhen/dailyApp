import React, {
    Component, Text, View, StyleSheet, Image, ListView, ScrollView,
    TouchableHighlight
} from 'react-native';
import SplashScreen from './SplashScreen';
import Swiper from 'react-native-swiper';

import Dimensions from 'Dimensions';

class MyListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        };
    }
    componentDidMount() {
        this.fetchData('http://news-at.zhihu.com/api/4/news/latest');
    }
    fetchData(url) {
        fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            console.log('这里是成功回调， set 数据', responseData);
            // 故意弄个慢的效果 看广告时间
            setTimeout(() => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
                    loaded: true
                });
            }, 1500);
        })
        .catch(err => {
            console.error('出错了:', err);
        });
    }

    onPressMovie(id) {
        this.props.navigator.push({id: 'detail', title: "详情页", itemId: id});
    }
    renderMovie = (movie) => {
        //console.log('调试---》', movie);
        return (
            <TouchableHighlight underlayColor='#e1f6ff' onPress={this.onPressMovie.bind(this, movie.id)}>
                <View style={styles.container}>
                    <Image style={styles.thumbnail} source={{uri: movie.images[0]}} />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{movie.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
    render() {
        if (!this.state.loaded) {
            return <SplashScreen/>;
        }

        let {height, width} = Dimensions.get('window');
        let SwiperHeight = 260;

        let swiperImgStyle = {width: width, height: SwiperHeight};
        // 图片的缩放模式 contain cover stretch center
        return (
            <ScrollView>
                <Swiper
                    style={styles.wrapper}
                    height={SwiperHeight}
                    autoplay={true}
                    loop={false}
                >
                    <View style={styles.slide1}>
                        <Image style={{flex: 1}} source={{uri: 'http://img.zcool.cn/sucaiori/8521B6E2-A386-A3CA-AB73-C53E9D6A974B.jpg@236w_0l.jpg'}}/>
                    </View>
                    <View style={styles.slide2}>
                        <Image style={{height: SwiperHeight, resizeMode: Image.resizeMode.stretch}} source={{uri: 'http://img.zcool.cn/sucaiori/4E531247-688D-1963-F672-8AEBE948AA0E.jpg@236w_0l.jpg'}}/>
                    </View>
                    <View style={styles.slide3}>
                        <Image style={swiperImgStyle} source={{uri: 'http://f.hiphotos.baidu.com/image/h%3D200/sign=a31c9680a1773912db268261c8198675/730e0cf3d7ca7bcb5f591712b6096b63f624a8e9.jpg'}}/>
                    </View>
                    <View style={styles.slide3}>
                        <Image style={swiperImgStyle} source={{uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79ec54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg'}}/>
                    </View>
                </Swiper>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderBottomColor: '#eee',
        marginVertical: 3,
        paddingHorizontal : 10
    },
    rightContainer: {
        flex: 1
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
        paddingBottom: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    idText: {
        textAlign: 'center'
    },
    thumbnail: {
        width: 90,
        height: 85,
    },

    wrapper: {
    },
    slide1: {
        flex: 1,
        alignItems: 'stretch'
    },

    slide2: {
        flex: 1,
        backgroundColor: '#FFD700'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7FFFD4'
    },
});

export default MyListView