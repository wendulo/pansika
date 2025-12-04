export type HomeStackParamList = {
  Home: undefined;
  Store: { storeId: number };
  ProductDetails: { productId: number };
};

export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId?: number };
};

export type OrdersStackParamList = {
  Orders: undefined;
  OrderDetail: { orderId: number };
};

export type FavoritesStackParamList = {
  Favourites: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};
