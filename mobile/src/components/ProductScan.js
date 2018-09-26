import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { styles } from './styles.css';

export default class ProductScan extends Component {
  static navigationOptions = {
    title: 'Find Book'
  };

  constructor(props) {
    super(props);
    this.camera = null;

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      }
    };
  }

  enterBarcodeManualButton = () => {
    console.log('enterBarcodeManualButton clicked');
  };

  onBarCodeRead(scanResult) {
    if (scanResult.data !== null) {
      const { navigate } = this.props.navigation;
      navigate('Info', { barcode: scanResult.data });
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log('took pictire', data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
          barcodeFinderWidth={280}
          barcodeFinderHeight={220}
          barcodeFinderBorderColor="white"
          barcodeFinderBorderWidth={2}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={this.enterBarcodeManualButton}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
          />
        </View>
      </View>
    );
  }
}
