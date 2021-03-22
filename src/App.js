import React from 'react';
import data from './data.json';
import './App.css';
import Products from './componetes/products';
import Filter from './componetes/filter';
import Cart from './componetes/cart';

class Table extends React.Component {
    constructor(){
        super();
        this.state = {
            products : data.products,
            CartItems : [],
            size : "",
            sort: ""

        }
        
    }
    createOrder = (order) =>{
        alert('this is your order is ready for  : ' +  order.name)
    }
    removeformatcart = (product) =>{
        const CartItems = this.state.CartItems.slice();

        this.setState({
            CartItems : CartItems.filter(x => x._id !== product._id),
        });


    };
    addtocart = (product) =>{
        const CartItems = this.state.CartItems.slice();
        let alreadyCart = false;
        CartItems.forEach((item)=>{
            if(item._id === product._id){
                item.count++;
                alreadyCart = true;
            }
        });
        if(!alreadyCart){
            CartItems.push({ ...product, count: 1});
        }
        this.setState({CartItems})
    };

    sizeFilter = (event) =>{
        if(event.target.value === ""){
            this.setState({size :event.target.value ,  products : data.products});
        }else{
            this.setState({
                size :event.target.value,
                products : data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0),
            });
        };
    }
    sortFilter = (event) =>{
        const sort = event.target.value;
        this.setState((state) => ({
            sort : sort,
            products : this.state.products.slice()
            .sort((a,b) =>
                sort === "lowest" 
                ? a.price > b.price
                ? 1
                : -1 
                : sort === "highest"
                ? a.price < b.price
                ? 1
                : -1 
                :a._id < b._id
                ? 1 
                : -1
            ),

        }));
    };
   
    render() {
        console.log(this.state.CartItems);
        return ( 
            <div className = "grid-container" >
            <header >
            <a href = "/" > React shopping cart </a> 
            </header> 
            <main >
                <div className="content">
                    <div className="main">
                        <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort} sizeFilter={this.sizeFilter} sortFilter={this.sortFilter}></Filter>
                        <Products products={this.state.products} addtocart = {this.addtocart}></Products>
                    </div>
                    <div className="sidbar">
                        <Cart CartItems={this.state.CartItems} removeformatcart={this.removeformatcart} createOrder={this.createOrder}/>
                    </div>
                </div>
            </main> 
            <footer> All Rights Reserved</footer>
            </div>
        );

    }
};
export default Table;