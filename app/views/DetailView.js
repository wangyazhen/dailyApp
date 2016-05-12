/**
 * Created by wyz on 2016/5/12.
 */

import React, {
    Component, Text, View, StyleSheet, Image, WebView,
    TouchableHighlight
} from 'react-native';

class DetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            post: '正在加载呢 ...'
        };
    }
    componentWillMount() {
        let id = this.props.itemId;
        console.log('Detail id', id);
        fetch(`http://news-at.zhihu.com/api/4/news/${id}`)
            .then((response) => response.json())
            .then((responseData) => {
                console.log('这里是成功回调  Detail 数据', responseData);
                this.setState({
                    post: responseData.body,
                    loaded: true
                });
            })
    }
    render() {
        console.log(' 渲染内容：');
        return (
            <View style={styles.container}>

                <WebView
                    style={{height: 300}}
                    source={{body: this.state.post}}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f0'
    }
});

export default DetailView