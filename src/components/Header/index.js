import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';

import { Wrapper, Container, Logo, BasketContainer, ItemCount } from './styles';

function Header({ navigation, cartSize }) {
  return (
    <Wrapper>
      <Container>
        <BasketContainer onPress={() => navigation.navigate('Home')}>
          <Logo />
        </BasketContainer>
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color={colors.white} size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}

export default connect(
  (state) => ({
    cartSize: state.cart.length,
  }),
  null
)(Header);
