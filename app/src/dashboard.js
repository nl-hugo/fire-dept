
console.log(d3);


async function getData() {
  // const data = await d3.json("https://data.ripple.com/v2/accounts/rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn/payments?currency=USD&limit=3");
  const data = await d3.json("https://fire-dept-api.herokuapp.com/alarmeringen/?page=1");
  console.log(data);
};

getData();