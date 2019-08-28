import React from 'react'
import {Line} from 'react-chartjs-2'
import {monthlySnap} from '../chartFunctions'
import {connect} from 'react-redux'

function LineChart(props) {
  let obj = props.chartPrice
// console.log(snapshot)

  return (
          
            <Line
              width={300}
              height={300}
              data={monthlySnap(obj)}
              options={{
                maintainAspectRatio: true,
                responsive: true,
                cutoutPercentage: 60,
                animateScale: true,
                scales:{
                  xAxes:[{
                    ticks:{
                      fontColor:"white"
                    }
                  }],
                  yAxes:[{
                    ticks:{
                      fontColor:"white"
                    }
                  }]
                }
              }}
            legend={{
              display: true,
              position: 'top',
              fullWidth: true,
              reverse: false, 
              labels: {
                fontColor: 'white'
              },
              stockPrices: {
                fontColor: 'white'
              },
              stockDates:{
                fontColor:'white'
              }
            }}
            scales={{
              yAxes: [{
                  ticks: {
                      fontColor: 'white',
                      fontSize: 18,
                      stepSize: 1,
                      beginAtZero: true
                  }
              }],
              xAxes: [{
                  ticks: {
                      fontColor: 'white',
                      fontSize: 14,
                      stepSize: 1,
                      beginAtZero: true
                  }
              }]
          }}
             />

  )
}



const mapStateToProps =(state)=>{
  return state.stock
}

export default connect(mapStateToProps)(LineChart);

