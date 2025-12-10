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

