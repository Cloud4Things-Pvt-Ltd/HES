//Pending Commands
var options = {
  series: [{
    name: "Sent",
    data: [10, 20, 15, 40, 20, 50, 30, 80, 150]
  },
  {
    name: "Completed",
    data: [22, 30, 25, 50, 40, 60, 70, 100, 200]
  },
  {
    name: "Failed",
    data: [44, 25, 20, 45, 30, 55, 60, 90, 120]
  }

  ],
  colors: ["#0079fbff", "#0cd62eff", "#da0e0eff"],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  // title: {
  //   text: 'Product Trends by Month',
  //   align: 'left'
  // },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  }
};
document.addEventListener("DOMContentLoaded", function () {
  const chartDiv = document.querySelector("#pendingCommands");
  if (chartDiv) {
    new ApexCharts(chartDiv, options).render();
  }
});
// var chart = new ApexCharts(document.querySelector("#pendingCommands"), options);
// chart.render();

//Load Profile

var options = {
  series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};

var chart = new ApexCharts(document.querySelector("#loadProfile"), options);
chart.render();

//Consumption Chart

var options = {
  series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }],
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5,
      borderRadiusApplication: 'end'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
};

var chart = new ApexCharts(document.querySelector("#consumptionChart"), options);
chart.render();











// ---------- Feeder treemap (used as 'heatmap') ----------
var treeOptions = {
  chart: { type: 'treemap', height: 180 },
  series: [{
    data: [
      { x: 'A', y: 364 }, { x: 'B', y: 337 }, { x: 'C', y: 315 }, { x: 'D', y: 291 }, { x: 'E', y: 247 },
      { x: 'F', y: 210 }, { x: 'G', y: 120 }, { x: 'H', y: 100 }
    ]
  }],
  colors: ['#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3']
};
new ApexCharts(document.querySelector('#feeder-treemap'), treeOptions).render();


// ---------- Duplicate Reads Trend (combo: column + line) ----------
(function () {
  // sample dates and data to mimic the image
  const labels = [
    "Apr 1", "Apr 3", "Apr 5", "Apr 7", "Apr 9", "Apr 11", "Apr 13", "Apr 15", "Apr 17", "Apr 19", "Apr 21", "Apr 23", "Apr 25", "Apr 27", "Apr 29"
  ];

  // daily duplicate reads (line) - slightly varying with an uptick at end
  const lineData = [45000, 75000, 60000, 40000, 52000, 48000, 50000, 40000, 60000, 72000, 85000, 90000, 65000, 70000, 98000];

  // 30-day duplicate read rate as bars
  const barData = [4500, 7500, 6000, 4000, 5200, 4800, 5000, 4000, 6000, 7200, 8500, 9000, 6500, 7000, 9800];

  const options = {
    chart: { height: 280, type: 'line', toolbar: { show: false } },
    series: [
      { name: 'Daily Duplicate Reads', type: 'line', data: lineData },
      { name: '30-Day Duplicate Read Rate', type: 'column', data: barData }
    ],
    stroke: { width: [3, 0], curve: 'smooth' },
    plotOptions: { bar: { columnWidth: '45%' } },
    markers: { size: 3 },
    xaxis: { categories: labels, labels: { rotate: -20 } },
    yaxis: [
      { title: { text: undefined }, labels: { formatter: function (val) { return Math.round(val / 1000) + 'k'; } } },
    ],
    colors: ['#2563eb', '#facc15'],
    legend: { show: true, position: 'top' },
    grid: { borderColor: '#eef2ff' },
    tooltip: { shared: true }
  };

  const chart = new ApexCharts(document.querySelector("#trendChart"), options);
  chart.render();
})();

// ---------- Pie Chart: Root-Cause Distribution ----------
(function () {
  const options = {
    chart: { type: 'pie', height: 200 },
    labels: ['Network Issue', 'Minor times', 'Bashand Collision', 'Invalid Timestamp'],
    series: [45, 26, 26, 3],
    colors: ['#2563eb', '#facc15', '#6b7280', '#60a5fa'],
    legend: { show: false },
    stroke: { colors: ['#fff'] },
    tooltip: { y: { formatter: function (val) { return val + '%'; } } }
  };
  const chart = new ApexCharts(document.querySelector("#pieChart"), options);
  chart.render();
})();

// ---------- Scatter Chart: Timestamp Correlation ----------
(function () {
  // generate sample correlated data
  const points = [];
  for (let i = 0; i < 60; i++) {
    // x: duplicates reads, y: position index (pseudo)
    const x = Math.round(200 + i * 8 + (Math.random() * 80 - 40));
    const y = Math.round(50 + i * 2 + (Math.random() * 30 - 15));
    points.push([x, y]);
  }

  const options = {
    chart: { type: 'scatter', height: 220, zoom: { enabled: false }, toolbar: { show: false } },
    series: [{ name: 'Duplicates', data: points }],
    xaxis: { title: { text: 'Duplicates Reads' } },
    yaxis: { title: { text: 'Possible Error Rate' } },
    markers: { size: 5 },
    colors: ['#2563eb'],
    grid: { borderColor: '#eef2ff' }
  };

  const chart = new ApexCharts(document.querySelector("#scatterChart"), options);
  chart.render();
})();

// ---------- Meter-Wise Duplicates (vertical bar) ----------
(function () {
  const options = {
    chart: { type: 'bar', height: 220, toolbar: { show: false } },
    series: [{ name: 'Duplicates', data: [800, 600, 450, 380, 720] }],
    plotOptions: { bar: { borderRadius: 6, barHeight: '60%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Ingestion', 'Validation', 'Processing', 'Storage', 'Distribution'] },
    yaxis: { labels: { formatter: function (val) { return val; } } },
    colors: ['#fbbf24'],
    grid: { borderColor: '#f1f5f9' }
  };

  const chart = new ApexCharts(document.querySelector("#meterBarChart"), options);
  chart.render();
})();

//Energy Consumption

var options = {
  series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }],
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};

var chart = new ApexCharts(document.querySelector("#energyConsumption"), options);
chart.render();

//Demand & Supply

var options = {
  series: [{
    name: 'Demand',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'Supply',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};

var chart = new ApexCharts(document.querySelector("#demandSupply"), options);
chart.render();

//Missing Trend Charts

var options = {
  series: [{
    name: 'TEAM A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  }, {
    name: 'TEAM C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }],
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },

  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: ['01/01/2025', '02/01/2025', '03/01/2025', '04/01/2025', '05/01/2025', '06/01/2025', '07/01/2025',
    '08/01/2025', '09/01/2025', '10/01/2025', '11/01/2025'
  ],
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    title: {
      text: 'Points',
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;

      }
    }
  }
};

var chart = new ApexCharts(document.querySelector("#missingTrendCharts"), options);
chart.render();

//event severity trend chart

var options = {
  series: [{
    name: "Critical",
    data: [10, 41, 35, 51]
  },
  {
    name: "Major",
    data: [20, 22, 46, 66]
  },
  {
    name: "Minor",
    data: [30, 55, 88, 99]
  },
  {
    name: "Pending",
    data: [40, 60, 70, 80]
  }
  ],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Event Severity Trend (Last 24 Hours)',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['Critical', 'Major', 'Minor', 'Pending'],
  }
};

var chart = new ApexCharts(document.querySelector("#areaTrend"), options);
chart.render();

//Event count by feeder
var options = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '50%',
      borderRadius: 4,
    }
  },
  series: [
    {
      name: "Event Type 1",
      data: [80, 60, 70, 55, 50]
    },
    {
      name: "Event Type 2",
      data: [40, 30, 35, 25, 20]
    },
    {
      name: "Event Type 3",
      data: [20, 15, 10, 5, 8]
    }
  ],
  colors: ["#1C75D8", "#5CA9EF", "#CFE5FF"],
  xaxis: {
    categories: ["Feeder A", "Feeder B", "Feeder C", "DT-01", "DT-01"],
    labels: {
      style: {
        fontSize: '14px'
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    strokeDashArray: 3
  }
};

var chart = new ApexCharts(document.querySelector("#eventFeederCount"), options);
chart.render();

//Load Analytics
var options = {
  chart: {
    type: "line",
    height: 340,
    toolbar: { show: false },
  },

  stroke: {
    curve: "smooth",
    width: 3
  },

  series: [
    {
      name: "Load",
      data: [
        1800, 1700, 2000, 2600, 2400, 3100,
        3600, 3300, 2400, 2800
      ]
    }
  ],

  xaxis: {
    categories: [
      "12 AM", "1 AM", "2 AM", "3 AM",
      "4 AM", "5 AM", "7 AM", "10 AM", "11 AM"
    ],
    labels: { style: { fontSize: "12px" } }
  },

  yaxis: {
    min: 0,
    max: 4000,
    tickAmount: 4,
    labels: { style: { fontSize: "12px" } }
  },

  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.4,
      opacityFrom: 0.4,
      opacityTo: 0,
    }
  },

  markers: {
    size: 5,
    colors: ["#1a73e8"],
    strokeColors: "#fff",
    strokeWidth: 2
  },

  annotations: {
    xaxis: [
      {
        x: "7 AM",
        borderColor: "#999",
        strokeDashArray: 5,
        label: {
          text: "Peak Load",
          style: { background: "#fff", color: "#000" },
          offsetY: -10
        }
      }
    ]
  },

  colors: ["#1a73e8"],
  grid: {
    borderColor: "#ececec",
  }
};

var chart = new ApexCharts(document.querySelector("#loadCurveChart"), options);
chart.render();

//Feeder Load Chart
document.addEventListener("DOMContentLoaded", function () {
  const options = {
    // Chart Type and Height
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false // Hide the download/zoom toolbar
      }
    },
    // Series Data (The values shown in the bars)
    series: [{
      name: 'Load',
      data: [3150, 3650] // Approximate values from the image
    }],
    // X-axis Categories (The labels below the bars)
    xaxis: {
      categories: ['Feeder', 'DISIr: Transform'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600
        }
      }
    },
    // Y-axis Configuration
    yaxis: {
      min: 0,
      max: 4000,
      tickAmount: 4, // To get 0, 1000, 2000, 3000, 4000
      labels: {
        formatter: function (val) {
          // Format Y-axis labels to look like the image (no decimals/units)
          return val.toFixed(0);
        }
      },
      title: {
        // Keep y-axis title empty if not needed, or remove this property
      }
    },
    // Plot Options for Bar Chart
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%', // Adjust width as needed
        endingShape: 'rounded'
      },
    },
    // Title Configuration
    title: {
      text: 'Feeder vs. DT Load',
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    // Data Labels (Values on top of the bars) - hidden in the source image
    dataLabels: {
      enabled: false
    },
    // Grid Lines Configuration
    grid: {
      row: {
        colors: ['#fff', '#f3f3f3'], // Alternate row colors
      },
      yaxis: {
        lines: {
          show: true // Show horizontal grid lines for y-axis
        }
      }
    },
    // Color for the bars (a shade of blue similar to the image)
    colors: ['#2E93fA'],
    // Tooltip (What pops up on hover)
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " units"; // You can add a unit here
        }
      }
    }
  };

  // Render the chart
  const chart = new ApexCharts(document.querySelector("#feederLChart"), options);
  chart.render();
});

new ApexCharts(document.querySelector("#readTrend"), {
  chart: { type: 'line', height: 260 },
  series: [{
    name: "Read %",
    data: [91, 88, 85, 84, 88, 87, 91]
  }],
  xaxis: {
    categories: ["Apr 11", "Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17"]
  },
  stroke: { width: 3, curve: 'smooth' }
}).render();

// Comm Success Trend
new ApexCharts(document.querySelector("#commTrend"), {
  chart: { type: 'line', height: 260 },
  series: [{
    name: "Comm %",
    data: [92, 90, 89, 90, 88, 91, 93]
  }],
  xaxis: {
    categories: ["Apr 11", "Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17"]
  },
  stroke: { width: 3, curve: 'smooth' }
}).render();

// Read Failures Bar Chart
new ApexCharts(document.querySelector("#failuresChart"), {
  chart: { type: 'bar', height: 260 },
  series: [{
    name: "Failures",
    data: [55, 51, 48, 45]
  }],
  xaxis: {
    categories: ["BSK FDR 05", "VRG FDR 04", "BSK FDR 02", "KPR FDR 06"]
  }
}).render();

// Offline Meters Horizontal Chart
new ApexCharts(document.querySelector("#offlineChart"), {
  chart: { type: 'bar', height: 260 },
  plotOptions: { bar: { horizontal: true } },
  series: [{
    name: "Offline",
    data: [120, 90, 75, 68, 60]
  }],
  xaxis: {
    categories: ["YLN FDR 03", "NDG FDR 02", "BSK FDR 10", "KPR FDR 08", "VRG FDR 01"]
  }
}).render();

// Command Executed
const lineOptions = {
  chart: {
    type: 'line',
    height: 280,
    toolbar: { show: false }
  },
  series: [{
    name: "Commands",
    data: [220, 340, 180, 410, 260, 430, 350]
  }],
  xaxis: {
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  grid: {
    borderColor: '#e5e7eb'
  }
};

new ApexCharts(document.querySelector("#commandExecuted"), lineOptions).render();

// Command Status
const donutOptions = {
  chart: {
    type: 'donut',
    height: 280
  },
  labels: ["Successful", "Pending", "Failed"],
  colors: ["#2887a7ff", "#1b5178ff", "#bc3939ff"],
  series: [62, 21, 17],
  legend: {
    position: 'bottom'
  },
  stroke: {
    width: 0
  }
};

new ApexCharts(document.querySelector("#commandStatus"), donutOptions).render();


var lineOptions1 = {
  chart: {
    type: 'area',
    height: 280,
    toolbar: { show: false }
  },
  series: [
    {
      name: 'Upgrades',
      data: [22, 20, 18, 34, 28, 31, 40, 35, 30, 36, 33, 40]
    },
    {
      name: 'Failures',
      data: [10, 12, 11, 14, 16, 13, 15, 17, 16, 18, 20, 19]
    }
  ],
  xaxis: {
    categories: ['Mar 24', 'Mar 27', 'Apr 24', 'Apr 29', 'Apr 28', 'Apr 30', 'Apr 22', 'Apr 23', 'Apr 24', 'Apr 25', 'Apr 26', 'Apr 27']
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.3,
      opacityFrom: 0.4,
      opacityTo: 0.05
    }
  },
  dataLabels: { enabled: false },
  grid: { borderColor: '#eee' }
};

new ApexCharts(document.querySelector("#lineChart"), lineOptions1).render();

var barOptions = {
  chart: {
    type: 'bar',
    height: 280,
    toolbar: { show: false }
  },
  series: [{
    name: 'Devices',
    data: [45, 60, 42, 38, 30, 28, 24]
  }],
  xaxis: {
    categories: ['FIRM-1', 'FIRM-2', 'FIRM-3', 'FIRM-4', 'FIRM-5', 'FIRM-9', 'FIRM-7']
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '45%'
    }
  },
  dataLabels: { enabled: false },
  grid: { borderColor: '#eee' }
};

new ApexCharts(document.querySelector("#barChart"), barOptions).render();

//Energy Consumption Report
var options = {
  chart: { type: 'line', height: 260 },
  series: [{ name: 'Consumption', data: [410, 380, 450, 320, 480, 360, 430, 470, 350, 390, 410, 510, 460, 330] }],
  xaxis: { categories: ['3/1', '4/1', '2/1', '6/1', '6/1', '10/1', '12/1', '13/1', '14/1', '15/1', '16/1', '17/1', '18/1', '19/1'] }
};
var chart = new ApexCharts(document.querySelector('#energyConsumptionChart'), options);
chart.render();


// -------- Chart 1 --------
var options1 = {
  chart: {
    type: "line",
    height: 220,
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  series: [{
    name: "Revenue",
    data: [6, 6.5, 6.1, 7.2, 7.8, 6.9, 6.2, 6.8, 7.3, 6.9, 7.6, 6.4]
  }],
  stroke: { width: 3, curve: "smooth" },
  colors: ["#1A73E8"],
  xaxis: {
    categories: ["Last 30 days", "1 Apr", "2 Apr", "3 Apr", "4 Apr", "5 Apr", "6 Apr", "7 Apr", "8 Apr", "9 Apr", "10 Apr"],
    labels: { style: { fontSize: "12px" } },
    tooltip: { enabled: false }
  },
  yaxis: {
    min: 3,
    max: 10,
    tickAmount: 3,
    decimalsInFloat: 0,
    labels: {
      formatter: val => "₹" + Math.round(val)   // <- rounds values
    }
  },
  grid: {
    borderColor: "#eaeaea",
    strokeDashArray: 4
  },
  markers: { size: 0 }
};

var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
chart1.render();

// -------- Chart 2 --------
var options2 = {
  chart: {
    type: "line",
    height: 220,
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  series: [{
    name: "Revenue",
    data: [7, 7.3, 7.1, 6.8, 6.5, 6.2, 6.7, 6.9, 6.8, 7.1]
  }],
  stroke: { width: 3, curve: "smooth" },
  colors: ["#1A73E8"],
  xaxis: {
    categories: ["Last 30-days", "104 dgo"],
    labels: { style: { fontSize: "12px" } },
    tooltip: { enabled: false }
  },
  yaxis: {
    min: 3,
    max: 10,
    tickAmount: 3,
    decimalsInFloat: 0,
    labels: {
      formatter: val => "₹" + Math.round(val)   // <- rounds values
    }
  },
  grid: {
    borderColor: "#eaeaea",
    strokeDashArray: 4
  },
  markers: { size: 0 }
};

var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

//AT&C Loss Funnel Chart

var options = {
  series: [
    {
      name: "Funnel Series",
      data: [1380, 1100, 990, 880],
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    dropShadow: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      horizontal: true,
      barHeight: '80%',
      isFunnel: true,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
    },
    dropShadow: {
      enabled: true,
    },
  },
  // title: {
  //   text: 'Recruitment Funnel',
  //   align: 'middle',
  // },
  xaxis: {
    categories: [
      'Input Energy',
      'Billed Energy',
      'Collected Revenue',
      'TeKC Loss',
    ],
  },
  legend: {
    show: false,
  },
};

var chart = new ApexCharts(document.querySelector("#funnelChart"), options);
chart.render();


//Circlewise AT&C Loss Chart
var options = {
  chart: {
    type: 'bar',
    height: 350
  },
  title: {
    // text: "Circle-wise AT&C Loss",
    align: "left",
    style: {
      fontSize: "18px",
      fontWeight: 600
    }
  },
  series: [{
    name: "AT&C Loss (%)",
    data: [11.5, 12.1, 13.0, 11.3] // You can adjust values
  }],
  xaxis: {
    categories: ["Central", "North", "East", "West"],
    labels: { style: { fontSize: "14px" } }
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return val.toFixed(1) + "%";
      }
    }
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
      borderRadius: 4
    }
  },
  colors: ["#4C9DD9", "#5FA8DD", "#3F6CC8", "#1C3D67"],
  grid: {
    borderColor: "#e0e0e0"
  }
};

var chart = new ApexCharts(document.querySelector("#circleChart"), options);
chart.render();

//AT&C Loss Trend Chart
var options = {
  chart: {
    type: "line",
    height: 300,
    toolbar: { show: false }
  },

  title: {
    // text: "AT&C Loss Trend",
    align: "left",
    style: {
      fontSize: "18px",
      fontWeight: 600
    }
  },

  series: [
    {
      name: "AT&C Loss",
      data: [9, 10, 11, 10, 12, 14, 16, 14, 13, 12] // Editable
    }
  ],

  stroke: {
    curve: "smooth",
    width: 3
  },

  markers: {
    size: 5,
    colors: "#fff",
    strokeColors: "#1A73E8",
    strokeWidth: 3
  },

  colors: ["#1A73E8"],

  xaxis: {
    categories: ["10", "14", "21", "28", "24", "34", "7", "8 ", "4 ", " 9"],
    labels: {
      style: { fontSize: "13px" }
    }
  },

  yaxis: {
    min: 0,
    max: 18,
    tickAmount: 6,
    labels: {
      style: { fontSize: "13px" }
    }
  },

  grid: {
    borderColor: "#e5e7eb"
  }
};

var chart = new ApexCharts(document.querySelector("#atcTrendChart"), options);
chart.render();

//BillingImport
var options = {
  chart: {
    type: 'donut',
    height: 180
  },

  series: [98.4],
  labels: [''],

  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: { show: false },
          value: {
            show: true,
            fontSize: '22px',
            fontWeight: 600,
            formatter: (val) => val + "%"
          }
        }
      }
    }
  },

  colors: ['#67c17b'],   // green
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "diagonal1",
      gradientToColors: ["#b9e5c7"],
      stops: [0, 100]
    }
  },

  stroke: {
    width: 6,
    colors: ["#e6f4ea"]
  },

  dataLabels: {
    enabled: false
  },

  legend: {
    show: false
  }
};

var chart = new ApexCharts(document.querySelector("#billingImport"), options);
chart.render();


var trendOptions = {
  chart: { type: "line", height: 230, toolbar: { show: false } },
  series: [{ name: "Reads", data: [40, 60, 55, 70, 65, 80, 90] }],
  stroke: { width: 3, curve: "smooth" },
  xaxis: {
    categories: ["Mar 23", "Apr 29", "Apr 15", "Apr 08", "Apr 03", "Apr 15", "Apr 08", "Apr 03"],
  },
  colors: ["#3b82f6"]
};
new ApexCharts(document.querySelector("#billingSyncTrendChart"), trendOptions).render();

/* Horizontal Bars */
var barOptions1 = {
  chart: { type: "bar", height: 60, sparkline: { enabled: true } },
  series: [{ data: [45.204] }],
  plotOptions: { bar: { horizontal: true, barHeight: "40%" } },
  colors: ["#1d4ed8"]
};
new ApexCharts(document.querySelector("#bar1"), barOptions1).render();

var barOptions2 = {
  chart: { type: "bar", height: 60, sparkline: { enabled: true } },
  series: [{ data: [46.252] }],
  plotOptions: { bar: { horizontal: true, barHeight: "40%" } },
  colors: ["#1d4ed8"]
};
new ApexCharts(document.querySelector("#bar2"), barOptions2).render();


// Reconciliation Chart
new ApexCharts(document.querySelector("#reconChart"), {
  chart: { type: "bar", height: 200 },
  series: [{ name: "Transactions", data: [15, 20, 10, 25, 30] }],
  xaxis: { categories: ["15 Apr", "16 Apr", "18 Apr", "19 Apr", "20 Apr"] }
}).render();

// Daily Volume Chart
new ApexCharts(document.querySelector("#volumeChart"), {
  chart: { type: "bar", height: 220 },
  series: [{
    data: [25, 55, 20, 15, 5, 40, 18]
  }],
  xaxis: { categories: ["<0%", "10%", "20%", "30%", "40%", "50%", "60%"] }
}).render();

// Delay Histogram
new ApexCharts(document.querySelector("#delayChart"), {
  chart: { type: "bar", height: 220 },
  series: [{
    data: [50, 30, 20, 10, 5, 2]
  }],
  xaxis: { categories: ["<20", "23", "40", "50", "60", ">50"] }
}).render();


// --- SYNC SUCCESS LINE CHART ---
var syncOptions = {
  chart: {
    type: 'line',
    height: 260,
    toolbar: { show: false },
    zoom: { enabled: false },
    sparkline: { enabled: false }
  },
  series: [{
    name: 'Sync Success',
    data: [88, 92, 93, 95, 97.8] // Tue, Thu, Sat, Mon etc
  }],
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    categories: ['Tue', 'Thu', 'Sat', 'Sun', 'Mon'],
    labels: {
      style: { colors: '#6b7280' }
    }
  },
  yaxis: {
    labels: {
      formatter: function (val) { return val + "%"; },
      style: { colors: '#6b7280' }
    },
    min: 80, max: 100
  },
  markers: { size: 4 },
  colors: ['#0b5ed7'],
  tooltip: {
    y: { formatter: function (val) { return val + "%"; } }
  },
  grid: {
    strokeDashArray: 4,
    borderColor: '#e6eef6'
  },
  legend: { show: false }
};

var syncChart = new ApexCharts(document.querySelector("#syncSuccessChart"), syncOptions);
syncChart.render();

// --- PENDING vs REJECTED BAR CHART ---
var pendingRejectedOptions = {
  chart: {
    type: 'bar',
    height: 260,
    stacked: false,
    toolbar: { show: false }
  },
  series: [
    { name: 'Pending Reads', data: [160, 210, 130, 200, 240] },
    { name: 'Rejected Reads', data: [90, 180, 230, 150, 260] }
  ],
  colors: ['#155bd3', '#b8c4cf'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 6
    }
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Tue', 'Sat', 'Tet', 'Mon'],
    labels: { style: { colors: '#6b7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6b7280' } },
    title: { text: undefined }
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center'
  },
  grid: { borderColor: '#e6eef6' }
};

var pendingRejectedChart = new ApexCharts(document.querySelector("#pendingRejectedChart"), pendingRejectedOptions);
pendingRejectedChart.render();

/* ------------------------------
     BILLING SUCCESS RATE (LINE)
 ------------------------------ */
const billingOptions = {
  chart: {
    type: 'line',
    height: 300,
    toolbar: { show: false }
  },
  series: [{
    name: "Success Rate",
    data: [
      95, 96, 95.5, 97, 96.2, 95.8, 96.7, 96.3, 96.8,
      97.2, 96.9, 97.1, 96.5, 96.9, 97.3
    ]
  }],
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  colors: ["#1A73E8"],
  xaxis: {
    categories: [
      "Jan 30 days", "3 Day", "31 Jan", "30 Jan",
      "31 Jan", "3 Day", "Jan 30 days", "30 Jan",
      "31 Jan", "Jan 30 days", "3 Day", "31 Jan",
      "30 Jan", "Jan 30 days", "3 Day"
    ]
  },
  yaxis: {
    min: 94,
    max: 100,
    labels: {
      formatter: val => val.toFixed(0) + "%"
    }
  },
  grid: {
    strokeDashArray: 4,
    borderColor: "#eee"
  }
};

new ApexCharts(document.querySelector("#billingRateChart"), billingOptions).render();


/* ------------------------------
    CONSUMER TYPE DONUT
------------------------------ */
const consumerOptions = {
  chart: {
    type: 'donut',
    height: 300
  },
  labels: ["Domestic", "Commercial", "Industrial", "Agriculture", "Anulustricc"],
  series: [39, 25, 15, 8, 16],
  colors: ["#1A73E8", "#4378FF", "#6B95FF", "#8BB2FF", "#3A62D7"],
  legend: {
    position: "right",
    fontSize: "14px"
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%"
      }
    }
  }
};

new ApexCharts(document.querySelector("#consumerTypeChart"), consumerOptions).render();

//Datatables
$(document).ready(function () {
  $('.tableMain').DataTable({
    dom: 'Bfrtip',   // Buttons, search, pagination, entries count
    buttons: [
      {
        extend: 'colvis',
        className: 'btn btn-primary'
      }
    ],
    pageLength: 10
  });
});




//Progress Circle for Missing Reads Trend
// Set your target percentages here
const targets = [70, 45];

const circles = [
  { circle: document.getElementById("circle1"), value: document.getElementById("value1") },
  { circle: document.getElementById("circle2"), value: document.getElementById("value2") }
];

let progress = [0, 0];   // Start values for both circles
let speed = 20;          // Animation speed

let animate = setInterval(() => {

  circles.forEach((item, index) => {
    if (progress[index] < targets[index]) {
      progress[index]++;

      item.value.textContent = `${progress[index]}%`;

      item.circle.style.background = `conic-gradient(
        var(--primary) ${progress[index] * 3.6}deg,
        #ddd ${progress[index] * 3.6}deg
      )`;
    }
  });

  // Stop interval when both circles reach their targets
  if (progress[0] === targets[0] && progress[1] === targets[1]) {
    clearInterval(animate);
  }

}, speed);




//Date Range Picker for Missing Reads Trend

$(function () {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function (start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});

function formatDate(date) {
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let dd = String(date.getDate()).padStart(2, '0');
  let yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

let today = new Date();
let last7 = new Date();
last7.setDate(today.getDate() - 7);

document.getElementById("daterange").value = formatDate(last7) + " - " + formatDate(today);

