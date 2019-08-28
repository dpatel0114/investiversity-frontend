import React, { Component } from 'react'

export class About extends Component {
  render() {
    return (
     
      <div class="about text-primary "> 
         <div class=" card container shadow bg-white" style={{"margin-top":"7.0rem", 'fontSize': '1.2rem', width:"900px"}}>
            <h5 class="card-header shadow text-center" style={{'fontSize': '1.5rem'}}> About Investment University  </h5>
            <div class="card-body text-left " >

          <p>  Investing - A word that can strike fear into the heart. A subject with broad and potentially confusing scope of choices, it can be wild.    </p>

          <p>  If you are just beginning to learn about the world of investments of Stocks, Investiversity is your one-stop shop for anything you want
               to learn.                                                                                                                                   </p>

          <p>  Investors need the latest information in order to stay current with the markets. Here, You can buy and sell Stocks for current price on 
               market every day. Find more info about comapny as well, to click the info button on the each stock. Investiversity will provide you more 
               about comapny like who is CEO, which state and country is located at, what is price fluctuation for that week, what is steady price for  
               the day, and volume of stocks. you can see the graph with quaterly Stocks price lose and gain.                                              </p>

          <p>  As a user, when you sign up you will get $1000 for investment. Here, You can buy and sell Stocks for current price on 
               market every day. After that, you can see your account balance that how much did you invest and how much is remaining balance in your 
               account including percentage in chart. There will be history you can look at, which will give you your account history that which 
               comapny's stocks you bought or sold with price, quantity, date and time.                                                                    </p>

          {/* <p>  There is search button on the top in the navbar but the funactionality is not working yet.             </p> */}

           </div>
         </div>
      </div>
    
    )
  }
}

export default About;





// import React, { Component } from 'react'
// import posed from 'react-pose';

// const Box = posed.div({
//     visible: {opacity: 1},
//     hidden: { opacity:0}
//   });
  

// class About extends Component {
//     state = { isVisible: true };

//     componentDidMount() {
//         setInterval(() => {
//           this.setState({ isVisible: !this.state.isVisible });
//         }, 1000);
//       }
//     render() {
//         const { isVisible } = this.state;
//         // return <Box className="box" pose={isVisible ? 'visible' : 'hidden'} />;


//         return (
//             <Box className="box" pose={'visible'}/>
//         )
//     }
// }

// export default About


