import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Loading({ load }) {
  const [loading] = useState(load);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={"#131313"} />
    </View>
  );
}
