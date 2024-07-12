import React, { PropsWithChildren, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type CardProps = {
  title: string;
  containerStyles?: any;
  titleStyles?: any;
};

const RNCard = ({
  title,
  children,
  containerStyles,
  titleStyles,
}: PropsWithChildren<CardProps>) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      {children}
    </View>
  );
};

export default RNCard;
