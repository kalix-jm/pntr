(function(){
    listElements = document.querySelectorAll(".menu-vertical");
    list = document.querySelector(".menu-horizontal");

    const addClick = ()=>{
        listElements.forEach(element => {
        element.addEventListener('click', ()=>{

            console.log(element)

        })    
        });
    }
    addClick();
})();
document.addEventListener("DOMContentLoaded", function () {
    const ctfLinks = document.querySelectorAll("#ct ul.menu-vertical li a");
    const contentDiv = document.createElement("div");
    contentDiv.id = "ctf-content";
    document.body.appendChild(contentDiv);

    ctfLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const ctfName = link.textContent.trim().replace(/\s+/g, "");
            loadChallenges(ctfName);
        });
    });
});

function loadChallenges(ctfName) {
    const contentDiv = document.getElementById("ctf-content");
    contentDiv.innerHTML = `<h2>${ctfName} - Retos Resueltos</h2><p>Cargando...</p>`;
    
    fetch(`ctf/${ctfName}/retos.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se encontró el archivo de retos.");
            }
            return response.json();
        })
        .then(data => {
            contentDiv.innerHTML = `<h2>${ctfName} - Retos Resueltos</h2>`;
            const list = document.createElement("ul");
            data.forEach(challenge => {
                const item = document.createElement("li");
                item.innerHTML = `<strong>${challenge.nombre}</strong> (${challenge.dificultad}) - 
                                 <a href="ctf/${ctfName}/${challenge.writeup}" target="_blank">Ver writeup</a>`;
                list.appendChild(item);
            });
            contentDiv.appendChild(list);
        })
        .catch(error => {
            contentDiv.innerHTML = `<h2>${ctfName} - Retos Resueltos</h2><p>Error al cargar los retos.</p>`;
        });
}
