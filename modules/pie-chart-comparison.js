function PieChartComparison(x, y, x2, y2, diameter) {
  this.x = x;
  this.y = y;

  this.x2 = x2;
  this.y2 = y2;
  

  this.diameter = diameter;

  this.labelSpace = 30;

  this.get_radians = function (data) {
    var total = sum(data);
    var radians = [];

    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * TWO_PI);
    }

    return radians;
  };

  this.draw = function (data, data2, labels, colours, title, title2, title3) {
    // Test that data is not empty and that each input array is the
    // same length.
    if (data.length == 0) {
      alert("Data has length zero!");
    } else if (
      ![labels, colours].every((array) => {
        return array.length == data.length;
      })
    ) {
      alert(`Data (length: ${data.length})
Labels (length: ${labels.length})
Colours (length: ${colours.length})
Arrays must be the same length!`);
    }

    // https://p5js.org/examples/form-pie-chart.html

    var angles = this.get_radians(data);
    var angles2 = this.get_radians(data2);
    var lastAngle = 0;
    var lastAngle2 = 0;
    var colour;
    var colour2;

    for (var i = 0; i < data.length; i++) {
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }
      fill(colour);
      stroke(0);
      strokeWeight(1);

      arc(
        this.x,
        this.y,
        this.diameter,
        this.diameter,
        lastAngle,
        lastAngle + angles[i] + 0.001
      ); // Hack for 0!
      if (labels) {
        this.makeLegendItem(labels[i], i, colour);
      }

      lastAngle += angles[i];
    }
    if (title) {
      noStroke();
      textAlign("center", "center");
      //textSize(20);
      text(title, this.x, 100);
    }
    if (title2) {
      noStroke();
      textAlign("center", "center");
      //textSize(20);
      text(title2, this.x2, 100);
    }

    for (var j = 0; j < data2.length; j++) {
      if (colours) {
        colour2 = colours[j];
      } else {
        colour2 = map(j, 0, data2.length, 0, 255);
      }
      fill(colour2);
      stroke(0);
      strokeWeight(1);

      arc(
        this.x2,
        this.y2,
        this.diameter,
        this.diameter,
        lastAngle2,
        lastAngle2 + angles2[j] + 0.001
      ); // Hack for 0!
      lastAngle2 += angles2[j];
    }
  };

  this.makeLegendItem = function (label, i, colour) {
    var x = width - 200;
    var y = this.y + this.labelSpace * i - this.diameter / 3;
    var boxWidth = this.labelSpace / 2;
    var boxHeight = this.labelSpace / 2;

    fill(colour);
    rect(x, y, boxWidth, boxHeight);

    fill("black");
    noStroke();
    textAlign("left", "center");
    textSize(12);
    text(label, x + boxWidth + 10, y + boxWidth / 2);
  };
}
