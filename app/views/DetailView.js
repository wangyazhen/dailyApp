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
            responseData: null
        };
    }
    componentWillMount() {
        let id = this.props.itemId;
        console.log('Detail id', id);
        fetch(`http://news-at.zhihu.com/api/4/news/${id}`)
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('这里是成功回调  Detail 数据');
                this.setState({
                    responseData: responseData,
                    loaded: true
                });
            })
    }
    render() {
        if (!this.state.responseData) {
            return <Text>正在加载呢 ...</Text>
        }
        let imgHtmlStr = `<div class="img-wrap">
                        <h1 class="headline-title">${this.state.responseData.title}</h1>
                        <img src="${this.state.responseData.image}" alt="">
                    </div>`;
        const bodyStr = this.state.responseData.body;
        // todo 注意 页面头部的图片代替
        let replaceBody = bodyStr.replace(bodyStr.substr(60, 37), imgHtmlStr);
        const HTML = `
        <!DOCTYPE html>\n
        <html>
          <head>
            <title>HTML字符串</title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
            <link rel="stylesheet" type="text/css" href="${this.state.responseData.css[0]}">
            <style type="text/css">
              body {
                margin: 0;
                padding: 0;
                font: 62.5% arial, sans-serif;
                background: #F5FCFF;
              }
              h1 {
                padding: 45px;
                margin: 0;
                text-align: center;
                color: #33f;
              }
              .img-wrap {
                position: relative;
                max-height: 375px;
                overflow: hidden;
              }
              .img-wrap .headline-title {
                position: absolute;
                color: white;
                text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
              }
            </style>
          </head>
          <body>
            ${replaceBody}
          </body>
        </html>
        `;
        console.log(' 渲染内容：', HTML.length);

        return (
            <WebView
                source={{html: HTML}}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
            />
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default DetailView