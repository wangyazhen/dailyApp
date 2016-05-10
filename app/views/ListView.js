import React, {
    Component, Text, View, StyleSheet, Image, ListView, ScrollView
} from 'react-native';

const datas = {
    "date": "20160502",
    "stories": [
        {
            "images": [
                "http://pic2.zhimg.com/ef5491c021a5c234eadb93f829d9f19d.jpg"
            ],
            "type": 0,
            "id": 8175900,
            "ga_prefix": "050210",
            "title": "最最快活的吃法：汤泡饭、泡菜 + 椒麻鸡"
        },
        {
            "images": [
                "http://pic4.zhimg.com/189a1a52a0109fad85b9a3b0b076aa1f.jpg"
            ],
            "type": 0,
            "id": 8241434,
            "ga_prefix": "050209",
            "title": "钻牛角尖会上瘾，你需要活的轻松一些"
        },
        {
            "images": [
                "http://pic3.zhimg.com/31e981add30dd3a572611f80a7a3b136.jpg"
            ],
            "type": 0,
            "id": 8242746,
            "ga_prefix": "050208",
            "title": "一开始「凯撒」们之间还有点亲戚关系，到后来就乱了套了"
        },
        {
            "images": [
                "http://pic1.zhimg.com/06dc27f6d3f023f19fd431b41d987d2c.jpg"
            ],
            "type": 0,
            "id": 8231370,
            "ga_prefix": "050207",
            "title": "我翻了 1006 个名字，发现美国人取中文名真挺有趣的"
        },
        {
            "images": [
                "http://pic1.zhimg.com/d9a53fc5d8113a87b9ef1aca5c88ec28.jpg"
            ],
            "type": 0,
            "id": 8131769,
            "ga_prefix": "050207",
            "title": "他提名 13 次奥斯卡均未获奖，却被业界大咖交口称赞"
        },
        {
            "images": [
                "http://pic1.zhimg.com/bf430e46bf27060f6f6a7f56c6cb7b3c.jpg"
            ],
            "type": 0,
            "id": 8242736,
            "ga_prefix": "050207",
            "title": "首先，康熙不是皇帝的名字，只是年号"
        },
        {
            "images": [
                "http://pic2.zhimg.com/4eada1d348151e9d22af80ada359e9e9.jpg"
            ],
            "type": 0,
            "id": 8242735,
            "ga_prefix": "050207",
            "title": "读读日报 24 小时热门 TOP 5 · 如何分辨「莆田系」医院"
        },
        {
            "images": [
                "http://pic4.zhimg.com/2eb0511e2fbf71b71ebaaf201a22da2b.jpg"
            ],
            "type": 0,
            "id": 8240528,
            "ga_prefix": "050206",
            "title": "瞎扯 · 如何正确地吐槽"
        }
    ],
    "top_stories": [
        {
            "image": "http://pic3.zhimg.com/2738fb154b35e82fe196e4bc0e2ea346.jpg",
            "type": 0,
            "id": 8175900,
            "ga_prefix": "050210",
            "title": "最最快活的吃法：汤泡饭、泡菜 + 椒麻鸡"
        },
        {
            "image": "http://pic2.zhimg.com/76dbbcf2956d9da6929d890fb9f8fd75.jpg",
            "type": 0,
            "id": 8241434,
            "ga_prefix": "050209",
            "title": "钻牛角尖会上瘾，你需要活的轻松一些"
        },
        {
            "image": "http://pic2.zhimg.com/db58fa8e914dcb8a29a16ff1aadb1ae9.jpg",
            "type": 0,
            "id": 8131769,
            "ga_prefix": "050207",
            "title": "他提名 13 次奥斯卡均未获奖，却被业界大咖交口称赞"
        },
        {
            "image": "http://pic3.zhimg.com/6baf7389f72eac5392b75faba9e66072.jpg",
            "type": 0,
            "id": 8242735,
            "ga_prefix": "050207",
            "title": "读读日报 24 小时热门 TOP 5 · 如何分辨「莆田系」医院"
        },
        {
            "image": "http://pic3.zhimg.com/b3be2c9195b9f48990853034ea3f9aea.jpg",
            "type": 0,
            "id": 8229594,
            "ga_prefix": "050115",
            "title": "最近很火的「轻断食」减肥法，效果怎么样？"
        }
    ]
};

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
        console.log('要获取数据了');
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(datas.stories),
                loaded: true
            });
        }, 1000);
        // todo fetch 跨域请求问题
        /*fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log('这里是成功回调， set 数据');
                this.setState({
                    movies: responseData.stories,
                });
            })
            .done();*/
    }
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    正在加载数据 ……
                </Text>
            </View>
        );
    }
    renderMovie(movie) {
        //console.log('调试---》', movie);
        return (
            <View style={styles.container}>
                <Image style={styles.thumbnail} source={{uri: movie.images[0]}} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>

                </View>
            </View>
        );
    }
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
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
        marginBottom: 5,
        borderBottomColor: '#eee',
        paddingHorizontal : 10
    },
    rightContainer: {
        flex: 1
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
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