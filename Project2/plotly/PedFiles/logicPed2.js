Plotly.d3.csv('peds.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]});
    }

    colors = []
    for (i=0; i < unpack(rows, 'pedInjury').length; i++) {
        if (unpack(rows, 'pedInjury')[i] == "unknown") {
            colors.push(0)
        } else if (unpack(rows, 'pedInjury')[i] == "O") {
            colors.push(0.5)
        } else if (unpack(rows, 'pedInjury')[i] == "A") {
            colors.push(1)
        } else if (unpack(rows, 'pedInjury')[i] == "B") {
            colors.push(1.5)
        } else if (unpack(rows, 'pedInjury')[i] == "C") {
            colors.push(2)
        } else if (unpack(rows, 'pedInjury')[i] == "K") {
            colors.push(2.5)    
        }

    var pl_colorscale=[
              [0.0, '#999999'],
              [0.2, '#f9e79f'],
              [0.4, '#f8c471'],
              [0.6, '#2ecc71'],
              [0.8, '#636efa'],
              [1, '#e74c3c']
    ]

    var axis = () => ({
      showline:false,
      zeroline:false,
      gridcolor:'#ffff',
      ticklen:4
    })

    var data = [{
      type: 'splom',
      dimensions: [
        {label:'Hour of Crash', values:unpack(rows,'hourOfCrash')},
        {label:'Day of the Week', values:unpack(rows,'dayOfWeek')},
        {label:'Weather', values:unpack(rows,'Weather')},
        {label:'Month of Crash', values:unpack(rows,'causeOfCrash')}
      ],
      text: unpack(rows, 'pedInjury'),
      marker: {
        color: colors,
        colorscale:pl_colorscale,
        size: 7,
        line: {
          color: 'white',
          width: 0.5
        }
      }
    }]

    var layout = {
      title:'Pedestrian vs Car Accidents',
      height: 1600,
      width: 1600,
      autosize: false,
      hovermode:'closest',
      dragmode:'select',
      plot_bgcolor:'rgba(240,240,240, 0.95)',
      xaxis:axis(),
      yaxis:axis(),
      xaxis2:axis(),
      xaxis3:axis(),
      xaxis4:axis(),
      yaxis2:axis(),
      yaxis3:axis(),
      yaxis4:axis()
    }

    Plotly.react('graph5', data, layout)

};
});
