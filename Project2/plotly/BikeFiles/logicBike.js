
Plotly.d3.csv('bike.csv', (err, rows) => {
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key];
    });
  } 
trace1 = {
  x: unpack(rows, 'bikerAge'),
  autobinx: false,
  au5tobiny: true,
  marker: {color: 'navy'},
  name: 'Age of Bicyclist',
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
  name: 'Drivers Estimated Speed (mph)',
  type: 'histogram',
  xbins: {
    end: 80,
    size: 5,
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
    title: 'Age of Bicyclist and Car Driver (years)',
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
    title: 'Drivers Estimated Speed (mph)',
    type: 'string'
  },
  yaxis: {
    autorange: true,
    range: [0, 30],
    title: '# of Accidents',
    type: 'linear'
  },
}

layout3 = {margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 0
  }};


Plotly.plot('graph', data1, layout1)
Plotly.plot('graph2', data2, layout2)

// Plotly.relayout('graph2', {
//   'xaxis.autorange': ['(0-5]','(6-10]','(11-15]','(16-20]', '(21-25]', '(26-30]', '(31-35]', '(36-40]', '(41-45]', '(46-50]', '(51-55]', '(56-60]', '(61-65]', 'unknown']
// })
});

