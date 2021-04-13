const hello = () => {
  return console.log("Webpack babel");
}

let promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
    console.log(promise);
  }, 1000)
});

hello();