function ElectDistrTimeSeries() {
  // Name for the visualisation to appear in the menu bar.
  this.name = "Electricity Source Distribution over the years 2000 - 2019";

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = "elect-distr-2000-2019";

  // Title to display above the plot.
  this.title =
    "Electricity generation measured in terawatt-hours, 2000 - 2019 ";

  // Names for each axis.
  this.xAxisLabel = "year";
  this.yAxisLabel = "energy source %";

  this.colors = ["blue", "red", "green", "pink", "purple", "yellow", "orange"];

  var marginSize = 35;
  var labelSpace = 30;

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    marginSize: marginSize,

    // Margin positions around the plot. Left and bottom have double
    // margin size to make space for axis and tick labels on the canvas.
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize,
    bottomMargin: height - marginSize * 2,
    pad: 5,

    plotWidth: function () {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function () {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 10,
    numYTickLabels: 8,
  };

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.data1 = loadTable(
      "./data/energy-consumption/time-series-dbs/ElectricitySourceDistribution_Africa.csv",
      "csv",
      "header",
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      }
    );
    this.data2 = loadTable(
      "./data/energy-consumption/time-series-dbs/ElectricitySourceDistribution_AsiaPacific.csv",
      "csv",
      "header",
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      }
    );
    this.data3 = loadTable(
      "./data/energy-consumption/time-series-dbs/ElectricitySourceDistribution_Europe.csv",
      "csv",
      "header",
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      }
    );
    this.data4 = loadTable(
      "./data/energy-consumption/time-series-dbs/ElectricitySourceDistribution_MiddleEast.csv",
      "csv",
      "header",
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      }
    );
    this.data5 = loadTable(
      "./data/energy-consumption/time-series-dbs/ElectricitySourceDistribution_NorthAmerica.csv",
      "csv",
      "header",
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      }
    );
  };

  this.setup = function () {
    this.select = createSelect();

    this.select.position(450, 100);

    // Fill the options with all country names.
    this.select.option("Africa");
    this.select.option("AsiaPacific");
    this.select.option("Europe");
    this.select.option("MiddleEast");
    this.select.option("NorthAmerica");

    this.selectedCountry = "";

    // Get min and max years:
    this.endYear = 2019;
    this.startYear = 2000;
    //Get min and max (100%)
    this.minY = 0;
    this.maxY = 100;

    this.africa = this.get_series(this.data1);
    this.asiapacific = this.get_series(this.data2);
    this.europe = this.get_series(this.data3);
    this.middleeast = this.get_series(this.data4);
    this.northamerica = this.get_series(this.data5);
  };

  this.destroy = function () {
    this.select.remove();
  };

  this.draw = function () {
    if (!this.loaded) {
      console.log("Data not yet loaded");
      return;
    }

    // Draw the title above the plot.
    this.drawTitle();

    // Draw all y-axis labels.
    drawYAxisTickLabels(
      this.minY,
      this.maxY,
      this.layout,
      this.mapYToHeight.bind(this),
      0
    );

    // Draw x and y axis.
    drawAxis(this.layout);

    // Draw x and y axis labels.
    drawAxisLabels(this.xAxisLabel, this.yAxisLabel, this.layout);

    // Plot all pay gaps between startYear and endYear using the width
    // of the canvas minus margins.

    var numYears = this.endYear - this.startYear;

    for (var i = 0; i < numYears; i++) {
      // The number of x-axis labels to skip so that only
      // numXTickLabels are drawn.
      var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

      y = this.startYear + i;
      // Draw the tick label marking the start of the previous year.
      if (i % xLabelSkip == 0) {
        drawXAxisTickLabel(y, this.layout, this.mapYearToWidth.bind(this));
      }
    }

    this.selectedCountry = this.select.value();

    if (this.selectedCountry == "Africa") {
      this.drawChartLines(this.africa, this.colors);
    }
    if (this.selectedCountry == "AsiaPacific") {
      this.drawChartLines(this.asiapacific, this.colors);
    }
    if (this.selectedCountry == "Europe") {
      this.drawChartLines(this.europe, this.colors);
    }
    if (this.selectedCountry == "MiddleEast") {
      this.drawChartLines(this.middleeast, this.colors);
    }
    if (this.selectedCountry == "NorthAmerica") {
      this.drawChartLines(this.northamerica, this.colors);
    }
  };

  this.drawTitle = function () {
    fill(0);
    noStroke();
    textSize(20);
    textAlign("center", "center");

    text(
      this.title,
      this.layout.plotWidth() / 2 + this.layout.leftMargin,
      this.layout.topMargin - this.layout.marginSize / 2
    );
  };

  this.mapYearToWidth = function (value) {
    return map(
      value,
      this.startYear,
      this.endYear,
      this.layout.leftMargin, // Draw left-to-right from margin.
      this.layout.rightMargin
    );
  };

  this.mapYToHeight = function (value) {
    return map(
      value,
      this.minY,
      this.maxY,
      this.layout.bottomMargin,
      this.layout.topMargin
    );
  };
  this.makeLegendItem = function (label, i, colour) {
    var x = this.layout.rightMargin - 90;
    var y = 200 + labelSpace * i - 150;
    var lineWidth = 30;

    fill(colour);
    line(x - 20, y, x + lineWidth - 20, y + lineWidth / 2);

    fill("black");
    noStroke();
    textAlign("left", "center");
    textSize(12);
    text(label, x + lineWidth - 10, y + lineWidth / 2);
  };

  this.get_series = function (data) {
    var series = {};

    //loop over all the rows
    for (var i = 0; i < data.getRowCount(); i++) {
      var row = data.getRow(i);
      //if the series isn't there already add a new array
      if (series[row.getString(0)] == undefined) {
        series[row.getString(0)] = [];
      }

      for (var j = 1; j < data.getColumnCount(); j++) {
        var tot = sum(data.getColumn(j));
        this.minY = min(this.minY, (100 * row.getNum(j)) / tot);
        this.maxY = max(this.maxY, (100 * row.getNum(j)) / tot);
        // we are assuming that the data is in chronological order
        series[row.getString(0)].push((100 * row.getNum(j)) / tot);
      }
    }
    return series;
  };

  this.drawChartLines = function (series, colors) {
    var legend = Object.keys(series);
    for (var j = 0; j < legend.length; j++) {
      var previous = null;
      // Loop over all rows and draw a line from the previous value to
      // the current.
      for (var i = 0; i < series[legend[j]].length; i++) {
        // Create an object to store data for the current year.
        var current = {
          year: this.startYear + i,

          percentage: series[legend[j]][i],
        };
        strokeWeight(2);
        if (previous != null) {
          // Draw line segment connecting previous year to current
          stroke(colors[j]);
          line(
            this.mapYearToWidth(previous.year),
            this.mapYToHeight(previous.percentage),
            this.mapYearToWidth(current.year),
            this.mapYToHeight(current.percentage)
          );
        }
        // Assign current year to previous year so that it is available
        // during the next iteration of this loop to give us the start
        // position of the next line segment.
        previous = current;
      }
      //Create the legend visualisation
      this.makeLegendItem(legend[j], j, colors[j]);
    }
  };
}
