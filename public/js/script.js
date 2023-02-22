document.addEventListener("DOMContentLoaded", function () {
    const copyButton = document.querySelector("#no");
    copyButton.addEventListener("click", function () {
      const md = document.querySelector("#md-to-copy").innerText;
      const text = document.querySelector("#copytext")
      const ogtext = text.innerHTML
      navigator.clipboard.writeText(md)
        .then(() => {
          text.innerHTML = "<strong>text copied!!!</strong>"
          setTimeout(() => {
            text.innerHTML = ogtext
          },500)
          
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    });
    const reload = document.querySelector("#try")
    reload.addEventListener('click',() => {
      location.reload();
    })
  });