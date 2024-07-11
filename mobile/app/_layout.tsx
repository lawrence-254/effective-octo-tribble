import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  );
}

// import { Slot } from 'expo-router';
// import { Text } from 'react-native';
//
// export default function RootLayout() {
//   return (
//     <>
//     <Text>Header</Text>
//     <Slot />
//     <Text>Footer</Text>
//     </>
//   );
// }
