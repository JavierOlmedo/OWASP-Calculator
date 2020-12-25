"use strict";

// VARIABLES -----------------------
var riskChart = document.getElementById('riskChart').getContext('2d');

const colors = [
'rgba(255, 102, 255)',
'rgba(255, 0, 0)',
'rgba(255, 169, 0)',
'rgba(255, 255, 0)',
'rgba(144, 238, 144)'
];

const backgrounds = [
  'rgba(255, 102, 255, 0.5)',
  'rgba(255, 0, 0, 0.5)',
  'rgba(255, 169, 0, 0.5)',
  'rgba(255, 255, 0, 0.5)',
  'rgba(144, 238, 144, 0.5)'
];

const threads = ["Skills required", "Motive", "Opportunity", "Population Size",
"Easy of Discovery", "Ease of Exploit", "Awareness", "Intrusion Detection",
"Loss of confidentiality", "Loss of Integrity", "Loss of Availability", "Loss of Accountability",
"Financial damage", "Reputation damage", "Non-Compliance", "Privacy violation"
];

const riskChartOptions = {
  legend: {
    position: 'top',
    display: false,
  },
  title: {
    display: false,
    text: 'Chart.js Radar Chart'
  },
  scale: {
    ticks: {
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: 10,
      stepSize: 1
    }
  }
};

// CHARTS -----------------------
riskChart = new Chart(riskChart, {
  type: 'radar',
  data: {
    labels: [],
    datasets: [{
      data: [],
      pointBackgroundColor: "",
      backgroundColor: "",
      borderColor: "",
      borderWidth: 2
    }]
  },
  options: riskChartOptions
});
updateRiskChart()


// FUNCTIONS -----------------------
function updateRiskChart(dataset, RS){
  var c = 0;
  var dataset = dataset;

  switch (RS) {
    case "LOW":
      c = 3;
      break;
    case "MEDIUM":
      c = 2;
      break;
    case "HIGH":
      c = 1;
      break;
    case "CRITICAL":
      c = 0;
      break;
    default:
      c = 4;
      break;
  }

  riskChart.data.labels = threads;
  riskChart.data.datasets[0].data = dataset;
  riskChart.data.datasets[0].pointBackgroundColor = colors[c];
  riskChart.data.datasets[0].backgroundColor = backgrounds[c];
  riskChart.data.datasets[0].borderColor = colors[c];

  riskChart.update();
}

function getRisk(score){
  if(score < 3) return 'LOW';
  if(score < 6) return 'MEDIUM';
  if(score <= 9) return 'HIGH';
}

function calculate(){
  var LS = 0;
  var IS = 0;
  var dataset = [];

  // Get values THREAT AGENT FACTORS and VULNERABILITY FACTORS
  LS = + $("#L1").val() +
  + $("#L2").val() +
  + $("#L3").val() +
  + $("#L4").val() +
  + $("#L5").val() +
  + $("#L6").val() +
  + $("#L7").val() +
  + $("#L8").val() + 0;
  dataset.push($("#L1").val());
  dataset.push($("#L2").val());
  dataset.push($("#L3").val());
  dataset.push($("#L4").val());
  dataset.push($("#L5").val());
  dataset.push($("#L6").val());
  dataset.push($("#L7").val());
  dataset.push($("#L8").val());

  // Get values TECHNICAL IMPACT FACTORS and BUSINESS IMPACT FACTORS
  IS = + $("#I1").val() +
  + $("#I2").val() +
  + $("#I3").val() +
  + $("#I4").val() +
  + $("#I5").val() +
  + $("#I6").val() +
  + $("#I7").val() +
  + $("#I8").val() + 0;
  dataset.push($("#I1").val());
  dataset.push($("#I2").val());
  dataset.push($("#I3").val());
  dataset.push($("#I4").val());
  dataset.push($("#I5").val());
  dataset.push($("#I6").val());
  dataset.push($("#I7").val());
  dataset.push($("#I8").val());
  
  var LS = (LS/8).toFixed(3);
  var IS = (IS/8).toFixed(3);

  var FLS = getRisk(LS);
  var FIS = getRisk(IS);

  $(".LS").text(LS + " " + FLS);
  $(".IS").text(IS + " " + FIS);

  deleteClass();

  if(getRisk(LS) == "LOW"){
      $(".LS").addClass("classNote");
  } else if (getRisk(LS) == "MEDIUM"){
      $(".LS").addClass("classMedium");
  } else {
      $(".LS").addClass("classHigh");
  }

  if(getRisk(IS) == "LOW"){
      $(".IS").addClass("classNote");
  } else if (getRisk(IS) == "MEDIUM"){
      $(".IS").addClass("classMedium");
  } else {
      $(".IS").addClass("classHigh");
  }

  //FINAL
  var RS = getCriticaly(FLS, FIS);
  if(RS == "NOTE"){
      $(".RS").text(RS);
      $(".RS").addClass("classNote");
  } else if (RS == "LOW"){
      $(".RS").text(RS);
      $(".RS").addClass("bLow");
  } else if(RS == "MEDIUM"){
      $(".RS").text(RS);
      $(".RS").addClass("classMedium");
  } else if(RS == "HIGH"){
      $(".RS").text(RS);
      $(".RS").addClass("classHigh");
  } else if(RS == "CRITICAL"){
      $(".RS").text(RS);
      $(".RS").addClass("classCritical");
  } else {
      $(".RS").text(RS);
      $(".RS").addClass("classNote");
  }

  updateRiskChart(dataset, RS)
}


// Calculate final Risk Serverity
function getCriticaly(L, I){
  //NOTE
  if(L == "LOW" && I == "LOW") return 'NOTE';

  //LOW
  if(L == "LOW" && I == "MEDIUM") return 'LOW';
  if(L == "MEDIUM" && I == "LOW") return 'LOW';
  
  //MEDIUM
  if(L == "LOW" && I == "HIGH") return 'MEDIUM';
  if(L == "MEDIUM" && I == "MEDIUM") return 'MEDIUM';
  if(L == "HIGH" && I == "LOW") return 'MEDIUM';

  //HIGH
  if(L == "HIGH" && I == "MEDIUM") return 'HIGH';
  if(L == "MEDIUM" && I == "HIGH") return 'HIGH';

  //CRITICAL
  if(L == "HIGH" && I == "HIGH") return 'CRITICAL';
}
// Delete class before of calculate
function deleteClass(){
  // Delete Class Likelihood Score
  $(".LS").removeClass("classNote");
  $(".LS").removeClass("classMedium");
  $(".LS").removeClass("classHigh");

  // Delete Class Impact Score
  $(".IS").removeClass("classNote");
  $(".IS").removeClass("classMedium");
  $(".IS").removeClass("classHigh");

  // Delete Class Risk Severity
  $(".RS").removeClass("classNote");
  $(".RS").removeClass("bLow");
  $(".RS").removeClass("classMedium");
  $(".RS").removeClass("classHigh");
  $(".RS").removeClass("classCritical");
}