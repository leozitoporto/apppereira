import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  SalesList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProviderListTitle,
} from './styles';

export interface Sale {
  id: string;
  name: string;
  obs: string;
  price: number;
  weight: number;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('sales').then((response) => {
      setSales(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

         <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
          <Button title="Sair" onPress={signOut} />
        </ProfileButton> 
      </Header>

      <SalesList
        data={sales}
        keyExtractor={(sale) => sale.id}
        ListHeaderComponent={
          <ProviderListTitle>Lista de Carnes</ProviderListTitle>
        }
        renderItem={({ item: sale }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(sale.id)}
          >
            <ProviderAvatar source={{ uri: sale.avatar_url }} />
            <ProviderInfo>
              <ProviderName>{sale.name}</ProviderName>

              <ProviderMeta>
                <Icon name="edit" size={14} color="#ff9000" />
                <ProviderMetaText>{sale.obs}</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="chevrons-right" size={14} color="#ff9000" />
                <ProviderMetaText>R$ {sale.price} - Peso: {sale.weight}kg</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};
export default Dashboard;
