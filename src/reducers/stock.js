

const initialState = {
  items: [],
  firstname:'',
  user: {
    username:'',
    email: ''
  },
  remaining_balance: '',
  invested_balance:'',
  error:'',
  logged: '',
  bestMatches:[],
  portfolio: [], 
  sell_stock: [],
  porthistory: [],
  info: [],
  chartPrice: []

}

export default (state = initialState, action) => {
  switch (action.type){
    case 'GET_STOCKS': 
      return { ...state, items: action.data}
    
      case 'TEST':
        console.log('hey')
      return {...state}
    
      case "GET_COM_INFO":
      return {...state, info: action.data}

      case "GET_CHART_PRICE":{
        return {...state, chartPrice: action.data}
      }
    // case "CHANGE_USER":
    //   return { ...state, user: {...state.user, username: action.username}}

    // case "CHANGE_PASS":
    //   return { ...state, user: {...state.user, password: action.password}}

    case "LOGOUT":
      return {...state, logged: false}

    case "PORT_HISTORY":
      return {...state, porthistory: action.data}

    // case "OPEN_MODAL": {
    //   return {...state, showModal: action.showModal, infoId: action.infoId}
    // }

    // case "CLOSE_MODAL": {
    //   return { ...state, showModal: false, infoId: 0 }
    // }

    case "LOGIN_ERROR":
      return { ...state, error: action.error}

    case "UPDATE_BALANCE":
      return {...state, remaining_balance: action.payload.remaining_balance, invested_balance: action.payload.invested_balance,
             logged: true, portfolio: action.payload.portfolios}
    

    case "LOGIN_SUCCESS":
      // debugger
      return { ...state, logged: action.logged, remaining_balance: action.user.remaining_balance,
        invested_balance: action.user.invested_balance , portfolio: action.portfolio, user: {...state.user, username: action.user.username, email: action.user.email, firstname: action.user.firstname, lastname: action.user.lastname}
      }
    
    case "SIGNUP_ERROR":{
      return { ...state, error:action.error}
    }

    case "SEARCH_STOCK":{
      return { ...state, bestMatches: action.payload}
    }
    case "GET_PORTFOLIO":{
    
      if(action.payload.portfolio.length===0){
        return {...state,remaining_balance: 1000,
          invested_balance: 0}
      }else{
      return { ...state, portfolio: action.payload.portfolio,
         remaining_balance: action.payload.user.remaining_balance,
        invested_balance: action.payload.user.invested_balance ,
        firstname: action.payload.user.firstname
      }
      }
    }
    
    case "SELL_STOCK":{

      let new_portfolio = state.portfolio
        new_portfolio.map(s => {
          if(s.ticker === action.payload.ticker){
            s.quantity += action.payload.quantity
            s.total_price += action.payload.total_price
          }})
      
      return { ...state, portfolio:new_portfolio,
        remaining_balance: state.remaining_balance - action.payload.total_price,
        invested_balance: state.invested_balance + action.payload.total_price,}
    }

    case "PERSIST_DATA":{
      return {...state,
      portfolio: action.portfolio,
      remaining_balance: action.remaining_balance,
      invested_balance: action.invested_balance}
    }

    case "BUY_STOCK":{     
      if (state.remaining_balance >= action.payload.total_price){

        let flag = false
        let new_portfolio = state.portfolio
        new_portfolio.map(s => {
          if(s.ticker === action.payload.ticker){
            s.quantity += action.payload.quantity
            s.total_price += action.payload.total_price
            flag = true
          }})
        return {
          ...state,
          remaining_balance: state.remaining_balance - action.payload.total_price,
          invested_balance: state.invested_balance + action.payload.total_price,
          portfolio: flag? new_portfolio : [...state.portfolio,action.payload]
        }

      }else{
        alert('Not Enough Balance')
      }
    }
    
    default: 
      return state  
  }

}
