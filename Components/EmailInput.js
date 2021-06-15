import React, { Component } from "react";
import { TextInput } from "react-native";

export default class EmailInput extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //  email: "",
    // };
  }
  render() {

    const { value, onChangeText } = this.props;

    return (
      <TextInput
        label         = "Email"
        returnKeyType = "next"
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
        autoCompleteType = "email"
        textContentType  = "emailAddress"
        keyboardType     = "email-address"
        placeholder      = "Email"
      />
    );
  }
}
