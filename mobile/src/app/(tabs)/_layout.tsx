import React from "react";
import { Tabs } from "expo-router";

import { IconUi } from "@/src/components/ui";
import Colors from "@/src/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.Blue.dark,
      }}
    >
      <Tabs.Screen
        name="sintomas/index"
        options={{
          headerShown: false,
          title: "Sintomas",
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({ color }) => (
            <IconUi
              type="material"
              name="sick"
              color={color}
              size={30}
              style={{ marginBottom: -10 }}
            />
          ),

          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <IconUi
          //           type="fa"
          //           name="info-circle"
          //           size={25}
          //           color={"red"}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="doencas/index"
        options={{
          title: "Doenças",
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({ color }) => (
            <IconUi
              name="viruses"
              type="fa6"
              color={color}
              size={25}
              style={{ marginBottom: -10 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
