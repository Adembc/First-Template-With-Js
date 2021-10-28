// open and close nav bar
const menu = document.querySelector(".landing-page header i") ; 
const links = document.querySelector(".landing-page header .links")
menu.onclick = ()=>{
    menu.classList.toggle("fa-bars") ; 
    menu.classList.toggle("fa-times") ; 
    if(menu.classList.contains("fa-bars")){
        links.style.display = "none" ; 
    }else{
        links.style.display = "flex" ;
    }
    
}
window.onresize = ()=>{
    if(window.innerWidth >= 768){
        links.style.display = "flex" ;
    }
    else{
        links.style.display = "none";
    }
 }

// change background image randomly

const images = [] ; 
for(let i = 1 ; i< 6 ;i++){
    
    images.push(`images/0${i}.jpg`) ; 
}
// Rundom number from 0 to 8 
let landingPage = document.querySelector(".landing-page") ; 
function changeBackground(){
    let randomIndex = Math.floor(Math.random()*images.length) ; 
    landingPage.style.backgroundImage = `url(${images[randomIndex]})`;
}
//  window.setInterval(changeBackground,1000)

// Show or hide settings box
let settingIcon = document.querySelector("i.fa-cog") ; 
let settingsBox = document.querySelector(".settings-box")
let spinner = document.querySelector(".spinner")
spinner.onclick = ()=>{
    settingsBox.classList.toggle("show");
    settingIcon.classList.toggle("fa-spin"); 
}

// set bullets color in settings box
let lis = document.querySelectorAll(".colors li") ; 
lis.forEach((li)=>{
    li.style.backgroundColor = li.getAttribute("data-color")
})

// change color 
function changeColor(){
    lis.forEach((li)=>{   
        li.addEventListener("click",(e)=>{
            for(let i = 0 ; i < lis.length ; i++){
                lis[i].classList.remove("active")
            }
            e.target.classList.add("active")   ; 
            let root = document.documentElement;
            root.style.setProperty("--main-color",e.target.getAttribute("data-color")) ; 
            localStorage.mainColor = e.target.getAttribute("data-color")
        })
    })

}



// check locale stroage

if(localStorage.mainColor){
    let root = document.documentElement;
    root.style.setProperty("--main-color",localStorage.mainColor) ; 
    for(let i = 0 ; i < lis.length ; i++){
        lis[i].classList.remove("active") ; 
    }
    document.querySelector(`.colors li[data-color="${localStorage.mainColor}"]`).classList.add("active")
}
changeColor() ; 

// change random background 
let buttons = document.querySelectorAll(".random-bg button") ; 
if(localStorage.isChangable){
    if(localStorage.isChangable == "yes"){
        buttons[1].classList.remove("active");
        buttons[0].classList.add("active");
       var  handle  = window.setInterval(changeBackground,1000) ; 
    }else{
        buttons[0].classList.remove("active");
        buttons[1].classList.add("active");
        window.clearInterval(handle)
    }
}
buttons.forEach((btn)=>{
    btn.onclick = ()=>{
        buttons[0].classList.remove("active")
        buttons[1].classList.remove("active")
        btn.classList.add("active") ; 
        localStorage.isChangable = btn.getAttribute("data-change") ; 
        if(btn === document.querySelector(`.random-bg button[data-change="yes"]`)){
           handle  = window.setInterval(changeBackground,10000) ; 
        }else{
            window.clearInterval(handle)
        }
    }
    
});
let reset = document.querySelector("button.reset") ; 
reset.onclick = ()=>{
    localStorage.clear() ; 
    window.location.reload() ; 
}

// set the width of the skills bar 
function setWidth(){
    let skills = document.querySelectorAll(".progress-bar") ; 
    skills.forEach((skill)=>{
        skill.style.width =  skill.getAttribute("data-progress") ;  
    })
}
let skillsSection = document.querySelector(".skills .container")
window.addEventListener("scroll",(e)=>{
if(window.scrollY >= (skillsSection.offsetTop + skillsSection.offsetHeight - window.innerHeight) ){
    setWidth(); 
}})

// onclick image show pop up
let galleryImages = document.querySelectorAll(" .img-box img") ; 
galleryImages.forEach((img)=>{
    img.addEventListener("click",(e)=>{
        let popUpOverlay = document.createElement("div") ; 
        popUpOverlay.className = "pop-up-overlay" ; 
        document.body.appendChild(popUpOverlay) ; 
        let imgBox = document.createElement("div") ; 
        imgBox.className = "pop-up-img-box" ; 
        popUpOverlay.appendChild(imgBox);
        let title = document.createElement("h3") ; 
        title.innerHTML = img.alt ; 
        imgBox.appendChild(title); 
        let image = img.cloneNode(true); 
        imgBox.appendChild(image);
        let closeIcon = document.createElement("i") ; 
        closeIcon.classList.add("fas","fa-times-circle","close");
        imgBox.appendChild(closeIcon);
        closeIcon.onclick = ()=>{
            closeIcon.parentElement.parentElement.remove();
        }
    })
})

let currentTest = 2 ; 
let nextBtn = document.getElementById("btn-next");
let prevBtn = document.getElementById("btn-prev");
let allTest = document.querySelectorAll(".testimonial") 
let swap = document.querySelectorAll(".bullets li");
function check(){
    if(currentTest==0){
        prevBtn.style.cursor = "no-drop"
    }else{
        prevBtn.style.cursor = "pointer"
    }
    if(currentTest==allTest.length-1){
        nextBtn.style.cursor = "no-drop"
    }else{
        nextBtn.style.cursor = "pointer"
    }
}
prevBtn.onclick = ()=>{
    if(currentTest>0){
        currentTest-- ; 
        changeTest()
        check()
    }
}
nextBtn.onclick = ()=>{
    if(currentTest<allTest.length-1){
        currentTest++ ; 
        changeTest()
        
    }
}
swap.forEach((bullet)=>{
    bullet.onclick = ()=>{
       currentTest =  bullet.dataset.num ; 
       changeTest()
    }
})
function changeTest(){
    // Remove Active Class From All Test
    allTest.forEach(()=>{  
        for(let i = 0 ; i<allTest.length; i++){
            allTest[i].classList.remove("active");
            swap[i].classList.remove("active"); 
        }
        // Add active class to the current element 
        allTest[currentTest].classList.add("active")
        swap[currentTest].classList.add("active")   
        check()
    })
}

// scrollto top button 
let scrollBtn =  document.querySelector(".scroll");
window.onscroll = ()=>{
    if(this.scrollY >=2050){
        scrollBtn.style.visibility ="visible";
    }else{
        scrollBtn.style.visibility = "hidden";

    }
}
scrollBtn.onclick = ()=>{
    window.scrollTo({
        left:0 , top:0, behavior:"smooth"
    })
}