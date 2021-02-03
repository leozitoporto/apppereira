import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth_routes';
import AppRoutes from './app_routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  // se existir usuario vai pra rota do app
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
