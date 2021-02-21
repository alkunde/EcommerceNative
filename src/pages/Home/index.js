import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Product,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          title: 'Teste',
          price: 'R$ 190,99',
          amount: 0,
        },
        {
          id: 2,
          title: 'Outro',
          price: 'R$ 30,00',
          amount: 0,
        },
        {
          id: 3,
          title: 'Tenis novo',
          price: 'R$ 30,00',
          amount: 0,
        },
      ],
    };
  }

  renderProduct = ({ item }) => (
    <Product>
      <ProductTitle>{item.title}</ProductTitle>
      <ProductPrice>{item.price}</ProductPrice>
      <AddButton onPress={() => {}}>
        <ProductAmount>
          <Icon name="add-shopping-cart" color="#fff" size={25} />
          <ProductAmountText>{item.amount}</ProductAmountText>
        </ProductAmount>
        <AddButtonText>ADICIONAR</AddButtonText>
      </AddButton>
    </Product>
  );

  render() {
    const { products } = this.state;

    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={(item) => String(item.id)}
          renderItem={this.renderProduct}
        />
      </Container>
    );
  }
}

export default Home;
