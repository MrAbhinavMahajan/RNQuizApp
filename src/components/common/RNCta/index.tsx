import React, { ComponentProps, PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type RNCTAProps = {
  title?: string;
  rightIcon?: React.ReactNode;
  containerStyles?: any;
  titleStyles?: any;
} & ComponentProps<typeof Pressable>;

const RNCta = ({
  title,
  rightIcon,
  containerStyles,
  titleStyles,
  children,
  ...pressableProps
}: PropsWithChildren<RNCTAProps>) => {
  return (
    <Pressable style={[styles.container, containerStyles]} {...pressableProps}>
      {!!title && <Text style={[styles.title, titleStyles]}>{title}</Text>}
      {!!rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      {children}
    </Pressable>
  );
};

export const RNPrimaryCTA = ({
  title,
  rightIcon,
  containerStyles,
  titleStyles,
  ...pressableProps
}: RNCTAProps) => {
  return (
    <Pressable style={[styles.primaryCta, containerStyles]} {...pressableProps}>
      <Text style={[styles.primaryCtaText, titleStyles]}>{title}</Text>
      {!!rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </Pressable>
  );
};

export const RNSecondaryCTA = ({
  title,
  rightIcon,
  containerStyles,
  titleStyles,
  ...pressableProps
}: RNCTAProps) => {
  return (
    <Pressable
      style={[styles.secondaryCta, containerStyles]}
      {...pressableProps}
    >
      <Text style={[styles.secondaryCtaText, titleStyles]}>{title}</Text>
      {!!rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      {!!rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </Pressable>
  );
};

export default RNCta;
