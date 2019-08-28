import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import  { snapshot }  from '../chartFunctions'
import {connect} from 'react-redux'



 function Chart(props) {
  let obj = {'remaining_balance':props.remaining_balance,
              'invested_balance': props.invested_balance}
// console.log(snapshot)

  return (
            <Doughnut
              width={300}
              height={300}
              data={snapshot(obj)}
              options={{
                maintainAspectRatio: true,
                responsive: false,
                cutoutPercentage: 50,
              
                animation:{
                  animateScale: true,
                  animateRotate: true 
                },
                // tooltips: {
                //   callbacks: {
                //     label: function(tooltipItem, data) {
                //       var dataset = data.datasets[tooltipItem.datasetIndex];
                //       var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                //         return previousValue + currentValue;
                //       }); var currentValue = dataset.data[tooltipItem.index];
                //       var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                //       return percentage + "%";}}}

                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var dataset = data.datasets[tooltipItem.datasetIndex];
                      var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                      var total = parseFloat(meta.total).toFixed(2);
                      var currentValue = dataset.data[tooltipItem.index];
                      var percentage = parseFloat((currentValue/total*100).toFixed(1));
                      return currentValue + ' (' + percentage + '%)';
                    },
                    title: function(tooltipItem, data) {
                      return data.labels[tooltipItem[0].index];
                    }
                  }
                }
              }}
            legend={{
              display: true,
              position: 'top',
              fullWidth: true,
              reverse: false,
              text: 'center',
              
              labels: {
                fontColor: 'white'
              }
            }}
             />
  )
}


const mapStateToProps =(state)=>{
  return state.stock
}

export default connect(mapStateToProps)(Chart);



