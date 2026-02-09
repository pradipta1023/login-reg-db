// const details = { name: "Dummy", password: "dummy1234" };

// const repsonse = await fetch("http://localhost:8000/reg", {
//   method: "POST",
//   headers: {
//     "content-type": "application/json",
//   },
//   body: JSON.stringify(details),
// });

// const jsonResponse = await repsonse.json();

// console.log({ jsonResponse });

const details = { id: 5, password: "dummy1234" };

const response = await fetch("http://localhost:8000/login", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(details),
});

if (response.status === 200) {
  const jsonResponse = await response.json();
  console.log({ jsonResponse });
}
const textResponse = await response.text();
console.log({ textResponse });

const ;
