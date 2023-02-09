  
var getDate = () => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return day = today.toLocaleDateString("en-GB", options);
};


var getDay = () => {
  let today = new Date();

  let options = {
    weekday: "long"
  };
  return day = today.toLocaleDateString("en-GB", options);
};

module.exports =  {
  getDate,
  getDay
}