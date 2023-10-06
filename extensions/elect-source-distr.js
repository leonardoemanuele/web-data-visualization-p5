function ElectSourceDistr() {
  // Name for the visualisation to appear in the menu bar.
  this.name = "Electricity Source Distribution Comparison: 2000 & 2019";

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = "elect-source-distr";

  // Property to represent whether data has been loaded.
  this.loaded = false;
  var marginSize = 35;
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
  };

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.data = loadTable(
      "./data/energy-consumption/Year_2000.csv",
      "csv",
      "header",
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      }
    );
    this.data2 = loadTable(
      "./data/energy-consumption/Year_2019.csv",
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
    if (!this.loaded) {
      console.log("Data not yet loaded");
      return;
    }

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(450, 100);

    // Fill the options with all country names.
    for (var i = 0; i < this.data.columns.length; i++) {
      this.select.option(this.data.columns[i]);
    }
  };

  this.destroy = function () {
    this.select.remove();
  };
  
  this.drawTitle = function () {
    fill(0);
    noStroke();
    textSize(20);
    textAlign("center", "center");

    text(
      this.name,
      this.layout.plotWidth() / 2 + this.layout.leftMargin,
      this.layout.topMargin - this.layout.marginSize / 2
    );
  };

  // Create a new pie chart object.
  this.pie = new PieChartComparison(
    width / 5,
    height / 2,
    600,
    height / 2,
    width * 0.3
  );

  this.draw = function () {
    if (!this.loaded) {
      console.log("Data not yet loaded");
      return;
    }
    
    // Get the value of the country we're interested in from the
    // select item.
    countryName = this.select.value();

    // Get the chosen year column of raw data for countryName.
    col = this.data.getColumn(countryName); // 2000
    col2 = this.data2.getColumn(countryName); //2019
    // Convert all data strings to numbers.
    col = stringsToNumbers(col);
    col2 = stringsToNumbers(col2);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = [
      "blue",
      "red",
      "green",
      "pink",
      "purple",
      "yellow",
      "orange",
    ];

    // Make a title.
    var title = "2000 Electricity Source Distribution";
    var title2 = " 2019 Electricity Source Distribution";
    // Draw the title above the plot.
    this.drawTitle();

    // Draw the pie chart!
    this.pie.draw(col, col2, labels, colours, title, title2);
  };
}
