import React, { Component } from 'react';
import { Product } from '../../types';
import { ProductService } from '../../services/API';

interface Props {

}

interface State {
  loading: boolean;
  products: Product[];
}

export class ProductForm extends Component<Props, State> {
  productService: ProductService;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
    };

    this.productService = new ProductService();
  }

  async componentDidMount(): Promise<void> {
    this.setState({ loading: true });
    const products = await this.productService.getAll();
    this.setState({ loading: false, products });
  }

  render(): JSX.Element {
    const { loading } = this.state;

    if (loading) {
      return (<div>Cargando...</div>);
    }
    const { products = [] } = this.state;
    const listProducts = products.map((product) => <li key={product._id}>{product.name}</li>);
    return (
      <div>
        Product form
        <ul>
          {listProducts}
        </ul>
      </div>
    );
  }
}

export default ProductForm;
