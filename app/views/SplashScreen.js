import React, {
    Component, Text, View, StyleSheet, Image, Dimensions
} from 'react-native';


const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
class SplashScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.welcomeImg}
					   source={{uri: 'https://pic4.zhimg.com/715717d2436d1fed01f2b20453dc686b.jpg'}}></Image>
			</View>
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
	welcomeImg: {
		width: WindowWidth,
		height: WindowHeight
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

export default SplashScreen