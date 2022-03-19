let url: string = "";

if (process.env.NODE_ENV === "development")
  url = "http://localhost:5000/products";
else url = "";

export default url;
