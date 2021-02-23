import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';
import api from '../../services/api';
// import { formatPrice } from '../../util/format';

import {
  Wrapper,
  ContainerHeader,
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
  Logo,
  BasketContainer,
  ItemCount,
} from './styles';
import navigation from '../../services/navigation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api.get('/products');

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: 'R$ 100,00',
    }));

    this.setState({ products: data });
  };

  handleAddProduct = (id) => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  renderProduct = ({ item }) => {
    const { amount } = this.props;

    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => this.handleAddProduct(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#fff" size={25} />
            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>Adicionar</AddButtonText>
        </AddButton>
      </Product>
    );
  };

  render() {
    const { products, cartSize } = this.state;

    return (
      <Container>
        <Wrapper>
          <ContainerHeader>
            <Logo />
            <BasketContainer onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-basket" color="#fff" size={24} />
              <ItemCount>{cartSize || 0}</ItemCount>
            </BasketContainer>
          </ContainerHeader>
        </Wrapper>
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

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
