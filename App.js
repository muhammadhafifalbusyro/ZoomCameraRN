import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height / 1.5;

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    mediaPermission: null,
    mediaLocation: "",
    type: Camera.Constants.Type.back,
    uriImage: "",
    modalVisible: false,
    zoomValue: 0,
    indexZoom: [0, 1, 2, 3, 4, 5],
  };

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    const { media } = await MediaLibrary.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }
  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = (photo) => {
    console.log(photo.uri);
    MediaLibrary.createAssetAsync(photo.uri);
    this.setState({ uriImage: photo.uri });
  };
  takenImage = () => {
    if (this.state.uriImage === "") {
      return (
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: "white",
          }}
        />
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <Image
            source={{ uri: this.state.uriImage }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
      );
    }
  };
  numberFixed = () => {
    if (this.state.zoomValue != 10) {
      let number = this.state.zoomValue;
      let numStr = "0." + number;
      let intNum = parseFloat(numStr);
      return intNum;
    } else {
      let number = this.state.zoomValue;
      let numStr = "" + number + "";
      let numStrSelect = numStr[0];
      let numFix = parseInt(numStrSelect);
      return numFix;
    }
  };
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ImageBackground
                  source={{ uri: this.state.uriImage }}
                  style={{
                    height: windowHeight,
                    width: windowWidth,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      zIndex: 1,
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <View
                      style={{
                        height: 20,
                        width: 200,
                        borderBottomWidth: 1,
                        borderColor: "blue",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {this.state.indexZoom.map((value, key) => {
                        let zoomValue = this.state.zoomValue;
                        if (zoomValue === 0) {
                          return (
                            <Text key={key} style={{ color: "blue" }}>
                              {value}
                            </Text>
                          );
                        } else {
                          return (
                            <Text key={key} style={{ color: "blue" }}>
                              {value * zoomValue}
                            </Text>
                          );
                        }
                      })}
                    </View>
                    <View
                      style={{
                        height: 200,
                        width: 20,
                        borderRightWidth: 1,
                        borderColor: "red",
                        justifyContent: "space-between",
                      }}
                    >
                      {this.state.indexZoom.map((value, key) => {
                        let zoomValue = this.state.zoomValue;
                        if (zoomValue === 0) {
                          return (
                            <Text key={key} style={{ color: "red" }}>
                              {value}
                            </Text>
                          );
                        } else {
                          return (
                            <Text key={key} style={{ color: "red" }}>
                              {value * zoomValue}
                            </Text>
                          );
                        }
                      })}
                    </View>
                    <Text
                      style={{
                        marginTop: 30,
                        color: "white",
                      }}
                    >
                      PHOTO SCALE 1 :{" "}
                      {this.state.zoomValue === 0
                        ? 10
                        : 10 / this.state.zoomValue}
                    </Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Camera
            style={{ height: "65%", width: "100%" }}
            ratio="1:1"
            type={this.state.type}
            zoom={this.numberFixed()}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 20,
                    width: 200,
                    borderBottomWidth: 1,
                    borderColor: "blue",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {this.state.indexZoom.map((value, key) => {
                    let zoomValue = this.state.zoomValue;
                    if (zoomValue === 0) {
                      return (
                        <Text key={key} style={{ color: "blue" }}>
                          {value}
                        </Text>
                      );
                    } else {
                      return (
                        <Text key={key} style={{ color: "blue" }}>
                          {value * zoomValue}
                        </Text>
                      );
                    }
                  })}
                </View>
                <View
                  style={{
                    height: 200,
                    width: 20,
                    borderRightWidth: 1,
                    borderColor: "red",
                    justifyContent: "space-between",
                  }}
                >
                  {this.state.indexZoom.map((value, key) => {
                    let zoomValue = this.state.zoomValue;
                    if (zoomValue === 0) {
                      return (
                        <Text key={key} style={{ color: "red" }}>
                          {value}
                        </Text>
                      );
                    } else {
                      return (
                        <Text key={key} style={{ color: "red" }}>
                          {value * zoomValue}
                        </Text>
                      );
                    }
                  })}
                </View>
                <Text
                  style={{
                    marginTop: 30,
                    color: "white",
                  }}
                >
                  PHOTO SCALE 1 :{" "}
                  {this.state.zoomValue === 0 ? 10 : 10 / this.state.zoomValue}
                </Text>
              </View>
            </View>
          </Camera>
          <View
            style={{
              height: "35%",
              width: "100%",
              backgroundColor: "black",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "40%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  let number = this.state.zoomValue;
                  if (number <= 0) {
                    return false;
                  } else {
                    this.setState({
                      zoomValue: number - 2,
                    });
                  }
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    margin: 10,
                  }}
                >
                  <Text>DOWN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    margin: 10,
                  }}
                >
                  <Text>{this.state.zoomValue} x</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let number = this.state.zoomValue;
                  if (number >= 10) {
                    return false;
                  } else {
                    this.setState({
                      zoomValue: number + 2,
                    });
                  }
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    margin: 10,
                  }}
                >
                  <Text>UP</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: "60%",
                width: "100%",
                padding: "5%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {this.takenImage()}
              <TouchableOpacity
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={this.takePicture}
              >
                <Text>Take </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text>Rotate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
