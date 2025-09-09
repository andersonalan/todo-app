import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 remove o header de todas as telas
      }}
    />
  );
}