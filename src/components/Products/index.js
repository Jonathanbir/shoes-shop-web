import React from "react";
import axios from "commons/axios";
import Product from "../../components/organisms/Product";
import ToolBox from "../../components/organisms/ToolBox";
import Panel from "../../components/organisms/Panel";
import AddInventory from "../molecules/AddInventory";

import "./index.scss";

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0,
  };

  componentDidMount() {
    // fetch("http://localhost:3003/products")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       products: data,
    //     });
    //   });
    axios.get("/products").then((response) => {
      this.setState({
        products: response.data,
        sourceProducts: response.data,
      });
    });
    this.updateCartNum();
  }

  search = (text) => {
    //1.  get New Array
    let _products = [...this.state.sourceProducts];
    //2. Filter New Array
    _products = _products.filter((p) => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return !!matchArray;
    });
    //3. set State
    this.setState({
      products: _products,
    });
  };

  toAdd = () => {
    Panel.open({
      component: AddInventory,
      callback: (data) => {
        console.log("products data", data);
        if (data) {
          this.add(data);
        }
      },
    });
  };

  add = (product) => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sProducts = [...this.state.sourceProducts];
    _sProducts.push(product);

    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  update = (product) => {
    const _products = [...this.state.products];
    const _index = _products.findIndex((p) => p.id === product.id);
    _products.splice(_index, 1, product);
    const _sProducts = [...this.state.sourceProducts];
    const _sIndex = _sProducts.findIndex((p) => p.id === product.id);
    _sProducts.splice(_sIndex, 1, product);

    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  delete = (id) => {
    const _products = this.state.products.filter((p) => p.id !== id);
    const _sProducts = this.state.sourceProducts.filter((p) => p.id !== id);

    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({ cartNum: cartNum });
  };

  initCartNum = async () => {
    const user = global.auth.getUser() || {};
    const res = await axios.get("/carts", {
      params: {
        userId: user.email,
      },
    });
    const carts = res.data || [];
    const cartNum = carts
      .map((cart) => cart.mount)
      .reduce((a, value) => a + value, 0);
    return cartNum;
  };

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div class="columns is-multiline is-desktop">
            {this.state.products.map((p) => {
              return (
                <div className="column is-3" key={p.id}>
                  <Product
                    product={p}
                    update={this.update}
                    delete={this.delete}
                    updateCartNum={this.updateCartNum}
                  />
                </div>
              );
            })}
          </div>
          {(global.auth.getUser() || {}).type === 1 && (
            <button className="button is-primary add-btn" onClick={this.toAdd}>
              add
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default Products;
