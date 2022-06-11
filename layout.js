let dbg;
const setDocHeight = () => {
  console.log(window.innerHeight);
  if (dbg) {
    dbg.innerText = window.innerHeight;
  }
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight / 100}px`
  );
};

setDocHeight();
addEventListener("resize", setDocHeight);
addEventListener("orientationchange", setDocHeight);

addEventListener("load", () => {
  dbg = document.getElementById("dbg");
  console.log(dbg);
  setDocHeight();
  setTimeout(function () {
    // This hides the address bar:
    window.scrollTo(0, 1);
  }, 0);
});
