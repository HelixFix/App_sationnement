import React, { Component } from "react";
import { TextInput } from "react-native";

export default class PasswordInput extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   password: "",
    // };
  }
  render() {

    const { value, onChangeText } = this.props;
    
    return (
      <TextInput
        label         = "Password"
        returnKeyType = "done"
        value         = {value}
        onChangeText  = {onChangeText}
        style         = {{
          height     : 40,
          borderColor: "gray",
          borderWidth: 1,
          margin     : 10,
          width      : "60%",
          padding    : 10,
        }}
        autoCompleteType = "password"
        textContentType  = "password"
        keyboardType     = "default"
        placeholder      = "Password"
        secureTextEntry  = {true}
      />
    );
  }
}
