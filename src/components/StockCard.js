import React from 'react';
import { Form, Modal ,Button, Collapse } from 'react-bootstrap';
import {connect} from 'react-redux';
import {buyStock} from '../actions/stockActions';
import LineChart from '../components/LineChart'
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import MyNotification from './MyNotification';

// import posed from 'react-pose'
// import Popover from './Popup';
// const COM_API = `https://api-v2.intrinio.com/companies/${props.eachStock.ticker}&api_key=OjFlMjFhNTEzNGI1MWY1MzNiZGRjNjgyNjNjNjFiZmEx`
function StockCard(props) {


  const createNotification = (type,e) => {
    return () => {
      // console.log('hey')
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'Bought':
          NotificationManager.success(`You Bought ${e.target.quantiy.value} Stocks`,'Notification',3000);
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };


  const buyAndNotify=(e,eachStock, balance)=>{
    props.buyStock(e,eachStock,balance)
     createNotification('Bought',e)
  }

  let obj= props.chartPrice

  const [open, setOpen] = React.useState(false);
  const [show, setShow, showPop, setShowPop] = React.useState(false);

  const handleClose = () => {setShow(false)};
  const handleShowPop =()=> setShowPop(true);
  const handleShow = ()=> {
    fetch(`https://api-v2.intrinio.com/companies/${props.eachStock.security.ticker}?api_key=OjFlMjFhNTEzNGI1MWY1MzNiZGRjNjgyNjNjNjFiZmEx`)
    .then(res=> res.json())
    .then(data => 
    //  getCompany(data)
      props.getCompany(data)
    )

    fetch(`https://api-v2.intrinio.com/securities/${props.eachStock.security.ticker}/prices?api_key=OjFlMjFhNTEzNGI1MWY1MzNiZGRjNjgyNjNjNjFiZmEx`)
    .then(res => res.json())
    .then(data => 
      props.getPrice(data.stock_prices))
    setShow(true)
  };

  return (
    <>

            <td>{props.eachStock.security['ticker']}  </td> 
            <td> <i class="fas fa-dollar-sign"></i> {props.eachStock['close']}</td>
            <td>
              <form class="form-inline" onSubmit={(e)=>buyAndNotify(e,props.eachStock,{"remaining_balance":props.remaining_balance,"invested_balance":props.invested_balance})}>
            
                <Form.Control name="quantity" type="number" step="1" style={{width:'5.5rem'}} min='1' required="required"
                placeholder="Stocks"/> &nbsp;&nbsp;
            
                <Button  data-toggle="button" type="submit" style={{margin: '3px'}}> <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;Buy</Button>
                </form>
            </td>

            <td> <i class="fas fa-info-circle fa-lg offset-md-4"  onClick={handleShow}></i>&nbsp;&nbsp;</td>

           {/* <MyNotification /> */}
            {/* <td>
            <Button 
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              // data-toggle="collapse"
              // data-target="#example-collapse-text"
            > <i class="fas fa-chevron-circle-down"></i> </Button>
            </td>
         */}
             
          
            {/* <td> */}
               {/* <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"> Detail</button>&nbsp;  */}
            {/* <i class="fas fa-info-circle float-left fa-lg offset-md-4"  onClick={handleShow}></i></td> */}
            {/* onClick={handleShowPop} */}
            {/* <div class="collapse" id="collapseExample">
              <div class="card card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
              </div>
            </div> */}

            
      <Modal class="modal fade right border-bottom" data-backdrop="static" focus='true' role="dialog" show={show} onHide={handleClose}>
        <Modal.Header style={{border: "doubled"}} closeButton>
          <Modal.Title > Info About {props.eachStock.ticker} </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {/* <img style={{width:"40%", height:"20%"}}src="https://static.seekingalpha.com/uploads/2016/4/7/17225882-14600640903610125_origin.png"/> */}
      {/* {console.log("info:", props.info)} */}

          <h5><strong> Ticker:</strong> &nbsp;{props.info.ticker} </h5> 
          <h5> <strong> Company Name:</strong> &nbsp;{props.info.name}</h5>
          <h5><strong> CEO:</strong> &nbsp;{props.info.ceo} </h5>
          <h5><strong> State: </strong> &nbsp;{props.info.hq_state} </h5>
          <h5><strong> Country:</strong> &nbsp;{props.info.hq_country} </h5>
          <h5><strong> Price:</strong> &nbsp;{props.eachStock.close}</h5>
          <h5><strong> High Price:</strong>  &nbsp;{props.eachStock.high}</h5>
          <h5><strong> Low Price:</strong> &nbsp;{props.eachStock.low}</h5>
          <h5><strong> Volume:</strong>  &nbsp;{props.eachStock.volume}</h5>

          {/* <h5><strong> Description:</strong> &nbsp; {props.info.short_description}</h5> */}
  
  
           <div class="card ">
            <div class="card-header chart border-bottom" style={{fontSize:"1.4rem"}}>
              Quaterly Summary
            </div>
            <div class="card-body text-center" style={{fontColor: 'white'}}>
             <LineChart/>
            </div>
         </div>


        </Modal.Body>
      </Modal>

      {/* <Collapse in={open}>
                <div id="example-collapse-text ">
                  <div className="card">
            <div className="card-header" style={{fontSize:"1rem"}}>
              Quaterly Summary
            </div>
            <div className="card-body text-center">
             <LineChart/>
            </div>
         </div> 
                </div>
      </Collapse> */}
</>
  )
}


const mapStateToProps =(state)=>{
  return state.stock
}

const getCompany=(data)=> dispatch=>{
  dispatch({type:'GET_COM_INFO', data: data})
}

const getPrice=(data)=> dispatch=>[
  dispatch({type:'GET_CHART_PRICE', data: data})
]

export default connect(mapStateToProps,{buyStock, getCompany, getPrice})(StockCard);
