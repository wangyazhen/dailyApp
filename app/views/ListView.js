import React, {
    Component, Text, View, StyleSheet, Image, ListView, ScrollView,
    TouchableHighlight
} from 'react-native';
import SplashScreen from './SplashScreen'

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

        return (
            <ScrollView>
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
        width: 65,
        height: 85,
    },
});

export default MyListView