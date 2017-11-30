import React, { Component } from "react";
import "./App.css";

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      items: [],
      totalPrice: 0,
      totalPayment: ""
    };
    this.nameInput = this.nameInput.bind(this);
    this.priceInput = this.priceInput.bind(this);
    this.totalPaymentInput = this.totalPaymentInput.bind(this);
    this.addItems = this.addItems.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.pay = this.pay.bind(this);
  }
  nameInput(e) {
    this.setState({
      name: e.target.value
    });
  }
  priceInput(e) {
    this.setState({
      price: e.target.value
    });
  }
  totalPaymentInput(e) {
    this.setState({
      totalPayment: Number(e.target.value)
    });
  }
  addItems(e) {
    e.preventDefault();
    let input = this.state.items;
    if (this.state.name == "" || this.state.price == "") {
      alert("Neither item name nor item price can be left out");
    } else {
      input.push({
        name: this.state.name,
        price: this.state.price
      });
      this.setState({
        items: input,
        name: "",
        price: ""
      });
    }
    this.computeTotalPrice();
  }
  computeTotalPrice() {
    let totalPrice = 0;
    let i = 0;
    while (i <= this.state.items.length - 1) {
      totalPrice += Number(this.state.items[i].price);
      i++;
    }
    this.setState({
      totalPrice: totalPrice
    });
  }
  removeItem(e) {
    let items = this.state.items;
    let newtotalPrice = this.state.totalPrice;
    let totalPrice = newtotalPrice - this.state.items[e.target.value].price;
    items.splice(e.target.value, 1);
    this.setState({
      items: items,
      totalPrice: totalPrice
    });
  }
  pay(e) {
    e.preventDefault();
    console.log(this.state.totalPayment);
    if (this.state.items.length == 0) {
      alert("Cannot buy zero goods");
      this.setState({
        name: "",
        price: "",
        items: [],
        totalPrice: 0,
        totalPayment: ""
      });
    } else if (this.state.totalPayment < this.state.totalPrice) {
      alert("Credit not allowed!");
    } else {
      alert("Thanks for your support");
      this.setState({
        name: "",
        price: "",
        items: [],
        totalPrice: 0,
        totalPayment: ""
      });
    }
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <legend className="text-muted">Enter commodity and price</legend>
            <form action="">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.nameInput}
                  placeholder="Item name"
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  value={this.state.price}
                  onChange={this.priceInput}
                  placeholder="Item price"
                />
              </div>

              <div className="form-group">
                <button className="btn btn-default" onClick={this.addItems}>
                  Add to cart
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7">
            <legend className="text-muted">
              {this.state.items.length}&nbsp;items in the cart&nbsp;worth{" "}
              {this.state.totalPrice}
            </legend>
            <div>
              {this.state.items.map((item, index) => {
                return (
                  <div className="card bordered" key={index}>
                    <div className="row">
                      <div className="col-md-4">{item.name}</div>
                      <div className="col-md-3">{item.price}</div>
                      <div className="col-md-5">
                        <button
                          className="btn btn-default btn-block btn-sm"
                          value={index}
                          onClick={this.removeItem}
                        >
                          Remove {item.name} from cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <form action="" className="mt-1" onSubmit={this.pay}>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.totalPayment}
                    onChange={this.totalPaymentInput}
                    placeholder="Amount paid"
                  />
                </div>
                <button className="btn btn-default btn-block">
                  Pay and purchase {this.state.items.length} items
                </button>
              </form>
              <div className="card bg-warning mt-2">
                Balance:&nbsp;{this.state.totalPayment - this.state.totalPrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
