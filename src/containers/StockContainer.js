import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Container, Card } from 'react-bootstrap';
import  {getStocks}  from '../actions/stockActions';
import StockCard from '../components/StockCard';
import posed from 'react-pose'
import {Trail, Keyframes,Spring} from 'react-spring/renderprops'
import {animated} from 'react-spring'
import {NotificationContainer, NotificationManager} from 'react-notifications';

// const API = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo'

const Box = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});


const Modal = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const KeyframesList = Keyframes.Trail({
  peek: [{ delay: 600, from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } }, { to: { x: -100, opacity: 0 } }],
  open: { delay: 100, to: { x: 0, opacity: 1 } },
  close: { to: { x: -100, opacity: 0 } }
})

class StockContainer extends Component {
  state = { isVisible: false , show: 'peek'};

  componentDidMount(){ 
    this.props.getStocks()   
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible, show: 'open' });
    }, 1000); 

  }

  



  render() {
    const { isVisible, show } = this.state;
    const stockCards = this.props.stock.items.map(s=> <StockCard eachStock={s}/>)


    // const result = this.props.items.map(s=> <StockCard eachStock={s}/>)
    return (

      <div class="scrollbar row">

        <table class="table table-striped ">
          <Trail

          items={stockCards} key={item => item.key}
          from={{opacity:0}}
          to={{opacity:1}}
          >
            {item => props => <tr style={props}> {item} </tr>}

          </Trail>


            <KeyframesList
                native 
                keys={stockCards.map((_, i) => i)} config={{ tension: 200, friction: 20 }} state={show}
                >
                {stockCards.map((item, i) => ({ x, ...props }) => (
                          <animated.div
                            style={{
                              transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                              ...props
                            }}>
                              {item}
                        </animated.div>))}

            </KeyframesList>
           



          </table>
                                           
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   return {stock: state.stock }
}


export default connect(mapStateToProps,{getStocks})(StockContainer);
