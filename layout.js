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

