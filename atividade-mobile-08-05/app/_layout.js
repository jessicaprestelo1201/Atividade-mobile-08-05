// app/_layout.js
import React from "react";
import { Stack } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f48fb1" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "💐 Contatos",
          headerRight: () => (
            <Pressable onPress={() => router.push("/settings")} style={styles.gearButton}>
              <Text style={styles.gearText}>❤️</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "❤️ Configurações" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  gearButton: {
    marginRight: 16,
  },
  gearText: {
    color: "#fff",
    fontSize: 18,
  },
});
