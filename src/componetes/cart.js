import React, { Component } from 'react'
import Currency from '../utill';
import Fade from 'react-reveal/Fade';

export default class cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            showcheackout: false,
            Name : "",
            Email : "",
            Addrese : ""
        }
    }
    handleInput = (e) =>{
        this.setState({
           [e.target.name] : e.target.value
        });
    }
    createOrder = (e) => {

        e.preventDefault();

        const order = {
            name : this.state.Name,
            email : this.state.Email,
            Addrese : this.state.Addrese,
            CartItems : this.props.CartItems
        }

        this.props.createOrder(order);
    };
    render() {
        const {CartItems} = this.props;
        // const alldata = CartItems,map((item)=>{


        // })
        return (
            <div>
                {CartItems.length === 0 ? (

                    <div className="cart cart-header"> Cart is Empty</div>
                ) : (

                    <div className="cart cart-header"> you have {CartItems.length} in the cart</div>
                )
                }
                <div>
                <div className="cart">
                <Fade left cascade>
                        <ul className="cart-items">
                            {CartItems.map((item)=>{
                                return(
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div> 
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {Currency(item.price)} X {item.count} {" "}
                                                <button className="button" onClick={()=> this.props.removeformatcart(item)}> Remove</button>
                                            </div>
                                        </div>
                                    </li> 
                                )
                            })}
                        </ul>
                        </Fade>
                    </div>
                    {CartItems.length !==0  && (
                        <div className="cart">
                                <div className="total">
                                    <div>
                                        Total : {" "}
                                        {Currency(CartItems.reduce((a,b) => a + b.price * b.count ,0))}
                                    </div>
                                    <button className="button-primary button" onClick={()=> this.setState({showcheackout : true})}> Proceed</button>
                                </div>
                        </div>
                    )}
                    {this.state.showcheackout &&(
                        <div className="cart">
                        <Fade right cascade>
                            <form onSubmit={this.createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label for="Email">Email</label>
                                        <input type="text" required onChange={this.handleInput} name="Email"/>
                                    </li>
                                    <li>
                                        <label for="Name">Name</label>
                                        <input type="text" required onChange={this.handleInput} name="Name"/>
                                    </li>
                                    <li>
                                        <label for="Addrese">Addrese</label>
                                        <input type="text" required onChange={this.handleInput} name="Addrese"/>
                                    </li>
                                    <li>
                                        <button type="submit" className="button button-primary"> CreateOrder</button>
                                    </li>
                                </ul>
                            </form>
                        </Fade>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
