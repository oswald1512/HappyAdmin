import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome.js";


import StatusPedidoScreen from "./screens/StatusPedidosV.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ setIsAuthenticated }) {
  return (
    <Tab.Navigator
      initialRouteName="StatusPedidosV" // Establece la pestaña inicial
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";  
          } 
          else if (route.name === "Favorite") {
            iconName = "heart";
          }
          else if (route.name === "Shop") {
            iconName = "clock-o";
          }
          else if (route.name === "Settings") {
            iconName = "user";
          }
          else if (route.name === "StatusPedidosV") {
            iconName = "list"; // Cambia el icono según sea necesario
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#6A040F", 
        tabBarInactiveTintColor: "gray", 
        tabBarStyle: {
          padding: 0,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    >
      
      
      
      <Tab.Screen name="StatusPedidosV">
        {(props) => (
          <StatusPedidoScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
            
          </Stack.Screen>
        ) : (
          // Mostrar directamente la pantalla de StatusPedidosV
          <Stack.Screen name="StatusPedidosV" options={{ headerShown: false }}>
            {(props) => (
              <StatusPedidoScreen
                {...props}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
