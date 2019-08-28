// import PortfolioContainer from "../containers/PortfolioContainer";

// import history from './history'
// import {b} from 'react-router';
// **import Popup from 'reactjs-popup';
// let symbl;
// const real_api = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbl}&apikey=18BGJDXOZO2QLLIU`
// const API = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo`
const id = localStorage.uid
// const all_symbols = ['AAPL','MSFT','V',' GOOGL', 'AMZN']
// const all_symbols = ['AAPL','MSFT','V','GOOGL', 'AMZN']
const all_symbols = ['MSFT']
// const NEW_API= `https://api.intrinio.com/prices/exchange?identifier=USCOMP&price_date=2019-07-25&api_key=OjZjM2IwOTIxMTEyMWVjZTQzNDVkM2Y5NmM0NjcyMTc2`
const NEW_API= `https://api-v2.intrinio.com/stock_exchanges/USCOMP/prices?api_key=OjFlMjFhNTEzNGI1MWY1MzNiZGRjNjgyNjNjNjFiZmEx`

// OjFlMjFhNTEzNGI1MWY1MzNiZGRjNjgyNjNjNjFiZmEx

// OjZjM2IwOTIxMTEyMWVjZTQzNDVkM2Y5NmM0NjcyMTc2




export const getStocks = () => dispatch => {
    
   all_symbols.map(symbl => 
    // fetch(API)
    // fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbl}&apikey=18BGJDXOZO2QLLIU`)
    fetch(NEW_API)
    .then(res => res.json())
    .then(data => 
      dispatch({ type: "GET_STOCKS", data: data.stock_prices })
      )
    )
}



export const handleChange = (e) => dispatch=>{

  e.target.name ==='username'?
  dispatch(
    { type: 'CHANGE_USER', 'username': e.target.value}
  ) 
  : 
  dispatch(
      { type: 'CHANGE_PASS', 'password': e.target.value}
    ) 
  
}


export const getPortfolio =(e)=> dispatch => {
  // e.preventDefault()
  fetch(`https://investiversity-backend.herokuapp.com/portfolio/show_all?user_id=${id}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      dispatch({ type: "PORT_HISTORY", data: data.portfolio })
    })
}


// export const getUserWithId =()=> dispatch => {
//   fetch(`https://investiversity-backend.herokuapp.com/users/${id}`)
//   .then(res => res.json())
//   .then(data => { 
//     console.log('user', data)
//     localStorage.setItem('portfolio', JSON.stringify(data.portfolio))
//     dispatch({ type: 'GET_PORTFOLIO',portfolio: data.portfolio })
//   })
// }


export const handleSignUp=(e)=> dispatch => {
    
  e.preventDefault()

  let newUserObject ={
    firstname: e.target.firstname.value,
    lastname: e.target.lastname.value,
    username: e.target.username.value,
    password: e.target.password.value,
    email: e.target.email.value
  }
 
  fetch('https://investiversity-backend.herokuapp.com/users',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
    body:JSON.stringify({ user: newUserObject})
    })
    .then(res=> res.json())
    .then(data => {

      if (data.errors) {
        alert("Sorry, your username or password is incorrect.")
        dispatch({ type: 'SIGNUP_ERROR',errors: data.message })
      }
      else {

        localStorage.setItem('token', data.token)
        // browserHistory.push('/login')
        // this.props.history.push('/login')
       
        // history.push('/login')
      }
    })
}

 export const searchStock =(e) => dispatch => {
  e.preventDefault()
  // console.log(e.target)
  fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo")
  .then(res => res.json())
  .then(data => dispatch({
    type: 'SEARCH_STOCK',
    payload: data["bestMatches"]
  }))
 }

 export const  handleLogin =(e, user,history) => dispatch=> {
  e.preventDefault()

  fetch('https://investiversity-backend.herokuapp.com/login', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data => { 

    if(data.errors){
      dispatch({type: 'LOGIN_ERROR', error: data.errors})
      localStorage.setItem('logged',false)
      alert('Incorrect Username or Password! ')
    }
    else {

      history.push('/dashboard')
      localStorage.setItem('logged',true)
      localStorage.setItem('token', data.token)
      localStorage.setItem('uid', data.user.id)
      localStorage.setItem('firstname', data.user.firstname)
      localStorage.setItem('portfolio',JSON.stringify(data.user.portfolios))
      localStorage.setItem('reamining_balance', data.user.remaining_balance)
      localStorage.setItem('invested_balance', data.user.invested_balance)
      
      dispatch({type:'LOGIN_SUCCESS', user: data.user, logged: true, portfolio: data.user.portfolios})
    }
  })

}


//   STOCK
export const buyStock = (e, eachStock, balance)=> dispatch=> {
  e.preventDefault()
  // console.log(e.target)
  
  let stock ={

    price: parseFloat(eachStock['close']),
    ticker: eachStock.security['ticker'],
    quantity: parseFloat(e.target.quantity.value),
    total_price: parseFloat(eachStock['close'] * e.target.quantity.value),
    user_id: parseFloat(localStorage.uid)

  }

  if(balance.remaining_balance < stock.total_price){
    alert('Not Enough Balance')
    return 
  }

  let user ={
    remaining_balance: balance.remaining_balance - stock.total_price,
    invested_balance: balance.invested_balance + stock.total_price
  }
  
  fetch(`https://investiversity-backend.herokuapp.com/portfolios`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({portfolio: stock})
    })
  
    fetch(`https://investiversity-backend.herokuapp.com/users/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Token":localStorage.getItem('token')
      },
        body: JSON.stringify({user: user})
      })
      .then(res=> res.json()
    .then(data=> console.log(data)))
    


  dispatch({type: 'BUY_STOCK', payload: stock})
  e.target.reset()

  }


// Persist portfolio and balance
// export const persistData =()=> dispatch=>{
//   console.log('running')

//   fetch(`https://investiversity-backend.herokuapp.com/users/${id}`)
//   .then(res => res.json())
//   .then(data=> 
//     {console.log(data)
//   dispatch({type:'LOGIN_SUCCESS', user: data.user, logged: true, portfolio: data.user.portfolios})}

//   )
// }

// logout
export const handleLogout=(e, history)=> dispatch=>{
  // console.log(e.target)
  e.preventDefault()
  localStorage.clear()
  // console.log(history.push)
   dispatch({
    type: 'LOGOUT',
    logged: false
  })
  history.push('/')

}


export const  sellStock = (e, eachStock,balance)=> dispatch=> {
  e.preventDefault()
  // console.log(e.target)
  let stock ={
    price: parseFloat(eachStock.price),
    ticker: eachStock.ticker,
    quantity: -parseInt(e.target.quantity.value),
    total_price: -parseFloat(eachStock.price * e.target.quantity.value),
    user_id: parseInt(localStorage.uid)

  }
  
  let user ={
    remaining_balance: balance.remaining_balance - stock.total_price,
    invested_balance: balance.invested_balance + stock.total_price
  }
  
  fetch(`https://investiversity-backend.herokuapp.com/portfolios`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({portfolio: stock})
    })

    fetch(`https://investiversity-backend.herokuapp.com/users/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Token":localStorage.getItem('token')
      },
        body: JSON.stringify({user: user})
      })
      .then(res=> res.json()
    .then(data=> console.log(data)))


  dispatch({type: 'SELL_STOCK', payload: stock})
  e.target.reset()

  }