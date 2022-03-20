let url: string = "";

if (process.env.NODE_ENV === "development")
  url = "http://localhost:5000/products";
else url = "https://floating-lowlands-37974.herokuapp.com/products";

export default url;
