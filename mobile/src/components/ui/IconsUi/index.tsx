import React from "react";
import {
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

type IconProps = {
  name: string;
  color: string;
  size?: number;
  type: "fa" | "fa6" | "material" | "ant";
  style?: any;
};

const IconUi = ({ name, color, size, type, style }: IconProps) => {
  if (type === "fa6") {
    return (
      <FontAwesome6
        name={name as any}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (type === "fa") {
    return (
      <FontAwesome name={name as any} size={size} color={color} style={style} />
    );
  }

  if (type === "material") {
    return (
      <MaterialIcons
        name={name as any}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  if (type === "ant") {
    return (
      <AntDesign name={name as any} size={size} color={color} style={style} />
    );
  }
};

export default IconUi;
