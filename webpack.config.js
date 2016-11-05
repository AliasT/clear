var path = require("path");
module.exports = {
  entry: {
    app: ["./main.js"]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].js"
  },
  reslove: {
    extensions: ['.scss', '.js']
  },
  module: {
    loaders: [
      { test: /(\.js)|(\.jsx)$/, exclude: /node_modules/, loader: "babel"  },
      { test: /\.scss$/, loaders: ["style", "css", "sass"]}
    ]
  }
};
