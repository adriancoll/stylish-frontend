import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import LoginScreen from "../screens/auth/LoginScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
        </Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
