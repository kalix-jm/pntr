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