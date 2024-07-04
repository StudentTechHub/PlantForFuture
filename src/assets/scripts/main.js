// Use fetch to include components dynamically
const components = ["navbar/navbar"];

components.forEach((component) => {
  fetch(`/src/components/${component}.html`)
    .then((response) => response.text())
    .then((html) => {
      document.querySelector("#app").innerHTML += html;
    });
});
