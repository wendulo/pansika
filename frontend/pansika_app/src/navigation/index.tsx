import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import StoreScreen from "../screens/StoreScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {
  HomeStackParamList,
  CartStackParamList,
  OrdersStackParamList,
  FavoritesStackParamList,
  ProfileStackParamList
} from "./types";

const RootStack = createNativeStackNavigator();
const AuthStackNav = createNativeStackNavigator();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const CartStackNav = createNativeStackNavigator<CartStackParamList>();
const OrdersStackNav = createNativeStackNavigator<OrdersStackParamList>();
const FavoritesStackNav = createNativeStackNavigator<FavoritesStackParamList>();
const ProfileStackNav = createNativeStackNavigator<ProfileStackParamList>();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
    <AuthStackNav.Screen name="Splash" component={SplashScreen} />
    <AuthStackNav.Screen name="Login" component={LoginScreen} />
    <AuthStackNav.Screen name="Register" component={RegisterScreen} />
  </AuthStackNav.Navigator>
);

const HomeStack = () => (
  <HomeStackNav.Navigator>
    <HomeStackNav.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <HomeStackNav.Screen name="Store" component={StoreScreen} options={{ title: "Store" }} />
    <HomeStackNav.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{ title: "Product" }}
    />
  </HomeStackNav.Navigator>
);

const CartStack = () => (
  <CartStackNav.Navigator>
    <CartStackNav.Screen name="Cart" component={CartScreen} options={{ title: "My Cart" }} />
    <CartStackNav.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
    <CartStackNav.Screen
      name="OrderConfirmation"
      component={OrderConfirmationScreen}
      options={{ title: "Order Confirmation", headerShown: false }}
    />
  </CartStackNav.Navigator>
);

const OrdersStack = () => (
  <OrdersStackNav.Navigator>
    <OrdersStackNav.Screen name="Orders" component={OrdersScreen} options={{ title: "My Orders" }} />
    <OrdersStackNav.Screen
      name="OrderDetail"
      component={OrderDetailScreen}
      options={{ title: "Order Detail" }}
    />
  </OrdersStackNav.Navigator>
);

const FavouritesStack = () => (
  <FavoritesStackNav.Navigator>
    <FavoritesStackNav.Screen
      name="Favourites"
      component={FavouritesScreen}
      options={{ title: "Favourites" }}
    />
  </FavoritesStackNav.Navigator>
);

const ProfileStack = () => (
  <ProfileStackNav.Navigator>
    <ProfileStackNav.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
  </ProfileStackNav.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 16,
        height: 70,
        borderRadius: 24,
        backgroundColor: "#fff",
        paddingBottom: 8,
        paddingTop: 8,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8
      },
      tabBarIcon: ({ color, size }) => {
        const icons: Record<string, string> = {
          Home: "home-outline",
          "My Cart": "cart-outline",
          Favourite: "heart-outline",
          "My Orders": "reader-outline",
          Profile: "person-outline"
        };
        return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="My Cart" component={CartStack} />
    <Tab.Screen name="Favourite" component={FavouritesStack} />
    <Tab.Screen name="My Orders" component={OrdersStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const RootNavigation = () => {
  const { token, loading } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <RootStack.Screen name="Loading" component={SplashScreen} />
        ) : token ? (
          <RootStack.Screen name="App" component={MainTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
