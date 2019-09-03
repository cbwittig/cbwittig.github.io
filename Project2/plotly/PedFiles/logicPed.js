
Plotly.d3.csv('peds.csv', (err, rows) => {
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key];
    });
  } 
trace1 = {
  x: unpack(rows, 'pedestrianAge'),
  autobinx: false,
  au5tobiny: true,
  marker: {color: 'teal'},
  name: 'Age of Pedestrian',
  type: 'histogram',
  xbins: {
    end: 80,
    size: 'M1',
    start: 0
  }
};

trace2 = {
  x: unpack(rows, 'driverAge'),
  autobinx: false,
  au5tobiny: true,
  marker: {color: '#CF56CA'},
  name: 'Age of Driver',
  type: 'histogram',
  xbins: {
    end: 80,
    size: 'M1',
    start: 0
  }
};

trace3 = {
  x: unpack(rows, 'DES'),
  autobinx: true,
  au5tobiny: true,
  marker: {color: '#CF56CA'},
  name: 'Drivers Estimated Speed',
  type: 'histogram',
  xbins: {
    end: 80,
    size: 'M1',
    start: 0
  }
};

data1 = [trace1, trace2];
data2 = [trace3];

layout1 = {
  paper_bgcolor: 'rgb(240, 240, 240)',
  plot_bgcolor: 'rgb(240, 240, 240)',
  title: '',
  xaxis: {
    autorange: true,
    range: ['0', '70'],
    title: 'Age of Pedestrian and Car Driver (years)',
    type: 'string'
  },
  yaxis: {
    autorange: true,
    range: [0, 20],
    title: '# of Accidents',
    type: 'linear'
  },
}

layout2 = {
  paper_bgcolor: 'rgb(240, 240, 240)',
  plot_bgcolor: 'rgb(240, 240, 240)',
  title: '',
  xaxis: {
    autorange: true,
    range: ['0', '70'],
    title: 'Drivers Estimated Speed',
    type: 'string'
  },
  yaxis: {
    autorange: true,
    range: [0, 30],
    title: '# of Accidents',
    type: 'linear'
  },
}
Plotly.plot('graph3', data1, layout1)
Plotly.plot('graph4', data2, layout2)
});
