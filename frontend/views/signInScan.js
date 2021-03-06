import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

import styles from '../styles/signIn.scss';

import loginInfo from '../connections/loginInfo';

class SignInScan extends Component {
	constructor(props) {
		super(props);
		console.log(props);

		this.state = {
			navigation: this.props.navigation.navigation,
			camera: true,
			hasCameraPermission: null,
			scanned: false
		};
	}

	async componentDidMount() {
		this.getPermissionsAsync();
	}

	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			hasCameraPermission: status === 'granted'
		});
	};

	handleBarCodeScanned = async ({ type, data }) => {
		this.setState({
			scanned: true
		});

		const scanResult = await loginInfo(data);
		console.log(scanResult);

		if (scanResult.status === 'succes') {
			if (scanResult.data.createUser) {
				// Navigera till att skapa kopplad användare
				this.state.navigation.navigate('ScanRegister', { supervisorId: scanResult.data.supervisorId });
			} else {
				// Navigera till kopplad användares konversationer
				this.state.navigation.navigate('LogInScan', { userId: scanResult.data.userId });
			}
		}

		// alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	render() {
		const { hasCameraPermission, scanned } = this.state;

		var instructions = '';

		if (this.state.camera) {
			instructions = 'Skanna en QR-kod';
		}

		if (hasCameraPermission === null) {
			return <Text> Requesting for camera permission </Text>;
		}

		if (hasCameraPermission === false) {
			return <Text> No access to camera </Text>;
		}

		return (
			<View style={styles.container}>
				{this.state.camera && (
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject}
					/>
				)}
				<View style={styles.instructionsBox}>
					<Text style={styles.instructions}>{'Skanna QR-kod för att starta konto'}</Text>
				</View>
			</View>
		);
	}
}

export default function(navigation) {
	return <SignInScan navigation={navigation} />;
}
