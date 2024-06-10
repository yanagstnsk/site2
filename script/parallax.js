let background = document.querySelector('.background');
let model = document.querySelector('.models');

document.onmousemove = (e) => {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    background.style.transform = "translate(-" + x*50 + "px, -" + y*50 + "px)";
    model.style.transform = "translate(-" + x *70 + "px, -" + y*70+"px)";
};