function ElectDistrBubble() {
  // Name for the visualisation to appear in the menu bar.
  this.name =
    "Dynamic Visualization: Electricity Source Distribution 2000 - 2019";

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = "elect-distr-bubble";

  this.colors = ["blue", "red", "green", "pink", "purple", "yellow", "orange"];

  // Property to represent whether data has been loaded.
  this.loaded = false;

  var maxAmt;

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

    this.endYear = 20;
    this.startYear = 0;

    this.slider = createSlider(
      this.startYear,
      this.endYear - 1,
      this.startYear,
      1
    );

    this.slider.position(650, 100);

    // Set the Bubble Chart for each country
    this.africa = this.set_bubbles(this.data1);
    this.asiapacific = this.set_bubbles(this.data2);
    this.europe = this.set_bubbles(this.data3);
    this.middleeast = this.set_bubbles(this.data4);
    this.northamerica = this.set_bubbles(this.data5);
  };

  this.destroy = function () {
    this.select.remove();
    this.slider.remove();
  };
  
   this.drawTitle = function () {
    fill(0);
    noStroke();
    textSize(20);
    textAlign("center", "center");

    text(
      this.name,
      this.layout.plotWidth() - 900,
      this.layout.plotHeight() - 220
    );
  };

  this.draw = function () {
    if (!this.loaded) {
      console.log("Data not yet loaded");
      return;
    }
    
    
    this.selectedCountry = this.select.value();

    if (this.selectedCountry == "Africa") {
      this.drawBubbles(this.africa);
      this.changeYear(this.africa, this.slider.value());
    } else if (this.selectedCountry == "AsiaPacific") {
      this.drawBubbles(this.asiapacific);
      this.changeYear(this.asiapacific, this.slider.value());
    } else if (this.selectedCountry == "Europe") {
      this.drawBubbles(this.europe);
      this.changeYear(this.europe, this.slider.value());
    } else if (this.selectedCountry == "MiddleEast") {
      this.drawBubbles(this.middleeast);
      this.changeYear(this.middleeast, this.slider.value());
    } else {
      this.drawBubbles(this.northamerica);
      this.changeYear(this.northamerica, this.slider.value());
    }
    
    this.drawTitle();
  };

  this.set_bubbles = function (data) {
    var bubbles = [];

    var rows = data.getRows();
    var numColumns = data.getColumnCount();

    maxAmt = 0;

    for (var i = 0; i < rows.length; i++) {
      if (rows[i].get(0) != "") {
        var b = new BubbleChart(rows[i].get(0));

        for (var j = 1; j < numColumns; j++) {
          if (rows[i].get(j) != "") {
            var n = rows[i].getNum(j);
            if (n > maxAmt) {
              maxAmt = n; //keep a tally of the highest value
            }
            b.data.push(n);
          } else {
            b.data.push(0);
          }
        }
        bubbles.push(b);
      }
    }

    return bubbles;
  };

  this.changeYear = function (bubbles, year) {
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].setData(year, maxAmt);
    }
  };

  this.drawBubbles = function (bubbles) {
    background(255);
    this.drawYear();

    translate(width / 2, height / 2);
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].update(bubbles);
      bubbles[i].draw(this.colors[i]);
    }
  };

  this.drawYear = function () {
    fill(0);
    noStroke();
    textSize(20);
    textAlign("center", "center");

    text("Year: " + [2000 + this.slider.value()], 900, 25);
    textSize(12);
  };
}
