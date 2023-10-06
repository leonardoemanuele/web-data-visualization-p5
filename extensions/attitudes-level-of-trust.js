function AttitudesLevelTrust() {
  // Name for the visualisation to appear in the menu bar.
  this.name =
    "Survey: People's level of trust on information about Climate change";

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = "attitudes-level-of-trust";

  this.title =
    "What is the level of trust on information about climate change, if you were to receive it from the following?";

  var waffles = [];

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

  // Property to represent whether data has been loaded.
  this.loaded = false;

  this.preload = function () {
    var self = this;
    this.data = loadTable(
      "./data/survey/attitudes-level-of-trust.csv",
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

    var source = [
      "Family members",
      "Colleagues",
      "Government bodies",
      "Scientists",
      "Energy suppliers",
      "Environmental organisations",
      "Media (TV, radio, newspaper, etc)",
    ];

    var values = ["A lot", "A little", "Not very much", "Not at all"];

    //initilizing multiple waffles chart
    for (var i = 0; i < source.length; i++) {
      if (i < 4) {
        waffles.push(
          new WaffleChart(
            this.layout.leftMargin + i * 220,
            this.layout.topMargin + 10,
            200,
            200,
            8,
            8,
            this.data,
            source[i],
            values
          )
        );
      } else {
        waffles.push(
          new WaffleChart(
            this.layout.leftMargin + (i - 4) * 220,
            this.layout.topMargin + 240 + 10,
            200,
            200,
            8,
            8,
            this.data,
            source[i],
            values
          )
        );
      }
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

  this.destroy = function () {};

  this.draw = function () {
    if (!this.loaded) {
      console.log("Data not yet loaded");
      return;
    }

    // Draw the title above the plot.
    this.drawTitle();

    for (i = 0; i < waffles.length; i++) {
      waffles[i].draw();
      for (var j = 0; j < waffles.length; j++) {
        waffles[i].checkMouse(mouseX, mouseY);
      }
    }
  };
}
