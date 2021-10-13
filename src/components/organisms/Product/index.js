import React from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import axios from "commons/axios";
import Panel from "components/organisms/Panel";
import EditInventory from "components/molecules/EditInventory";

import "./index.scss";

class Product extends React.Component {
  toEdit = () => {
    Panel.open({
      component: EditInventory,
      props: { product: this.props.product, deleteProduct: this.props.delete },
      callback: (data) => {
        console.log("data", data);
        if (data) {
          this.props.update(data);
        }
      },
    });
  };

  addCart = async () => {
    if (!global.auth.isLogin()) {
      this.props.history.push("/login");
      toast.info("please Login First");
      return;
    }
    try {
      const user = global.auth.getUser() || {};
      const { id, name, image, price } = this.props.product;
      const res = await axios.get(`/carts?productId=${id}`);
      const carts = res.data;
      console.log("carts", carts);
      if (carts && carts.length > 0) {
        const cart = carts[0];
        cart.mount += 1;
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1,
          userId: user.email,
        };
        await axios.post("carts", cart).then((res) => console.log(res.data));
      }
      toast.success("Add Cart Success");
      this.props.updateCartNum();
    } catch (error) {
      toast.error("Add Cart Failed");
    }
  };

  renderMangerBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right" onClick={this.toEdit}>
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      );
    }
  };

  render() {
    const { name, image, tags, price, status } = this.props.product;
    return (
      <div>
        <div className="product">
          <div className="p-content">
            {this.renderMangerBtn()}
            <div className="img-wrapper">
              {status == "unavailable" && (
                <div className="out-stock-text">Out of Stock</div>
              )}
              <figure
                className={
                  status == "available"
                    ? "image is-4by3"
                    : "image is-4by3 out-stock"
                }
              >
                <img src={image} alt={name} />
              </figure>
            </div>
            <p className="p-tags">{tags}</p>
            <p className="p-name">{name}</p>
          </div>
          <div className="p-footer">
            <div className="p-price">${price}</div>
            <div
              className={
                status == "available" ? "add-car" : "add-car out-stock-btn"
              }
            >
              <i className="fas fa-shopping-cart" onClick={this.addCart}></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Product);
