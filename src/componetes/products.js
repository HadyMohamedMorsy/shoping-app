import React, { Component } from 'react'
import Currency from '../utill';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product : null,
        };
    }
    openModel = (product) =>{
        this.setState({
            product,
        });
    }
    closeModal = ()=>{
        this.setState({product : null});
    }
    render() {
        const {product} = this.state;
        return (
            <div>
            <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.map((product =>{
                            return(
                                <li key={product._id}>
                                    <div className="product">
                                        <a href={"#" + product._id} onClick={()=> this.openModel(product)}>
                                            <img src={product.image} alt={product.title}></img>
                                            <p>{product.title}</p>
                                        </a>
                                        <div className="product-price">
                                            <div>
                                                {Currency(product.price)}
                                            </div>
                                            <button className="button-primary button" onClick={() => this.props.addtocart(product)}> Add to cart</button>
                                        </div>
                                    </div>
                                </li>

                            )
                        }))}
                    </ul>
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                        <button className="close-modal" onClick={this.closeModal}>X</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>{product.description}</p>
                                    <p>
                                        Avaiable sizes
                                        {product.availableSizes.map((x)=>{
                                            return(
                                                <span>
                                                    {" "}
                                                    <button className="button">{x}</button>
                                                </span>
                                            )
                                        })}
                                    </p>
                                    <div className="product-price">
                                        <div>{Currency(product.price)}</div>
                                        <button className="button-primary button" onClick={(e)=>{
                                            this.closeModal();
                                            this.props.addtocart(product);
                                        }}>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>

                )}
            </div>
        )
    }
}
