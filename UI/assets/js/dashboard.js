//Preloader Action while page loads
window.onload = () => {
    document.querySelector('.preloader__loader').classList.add('preloader__loader--off');
    setTimeout(()=>{
        document.querySelector('.preloader').classList.add('preloader--off');
    },400);
}
//Make sidenav visible on mobile
const showSideNav = ()=> {
    const toggleBtn = document.querySelector('.dashboard-header__sidenav-icon');
    const sideNav = document.querySelector('.dashboard-sidenav__board');
    const mainOverLay = document.querySelector('.dashboard-main__overlay');
    if(!mainOverLay) return;
    if(!sideNav) return;
    toggleBtn.onclick = () => {
        toggleBtn.classList.toggle('dashboard-header__sidenav-icon--transform-anti-clockwise');
        toggleBtn.classList.toggle('dashboard-header__sidenav-icon--transform-clockwise');
        sideNav.classList.toggle('dashboard-sidenav__board--show');
        if(!sideNav.classList.contains('dashboard-sidenav__board--show'))
            mainOverLay.classList.remove('dashboard-main__overlay--show');
        else
            mainOverLay.classList.add('dashboard-main__overlay--show'); 
    }
    mainOverLay.onclick = () => {
        sideNav.classList.remove('dashboard-sidenav__board--show');
        mainOverLay.classList.remove('dashboard-main__overlay--show');
    }
    window.onresize = () => {
        if(parseInt(window.innerWidth) > 700) 
        sideNav.classList.remove('dashboard-sidenav__board--show');
        mainOverLay.classList.remove('dashboard-main__overlay--show');
    }
}
const startDashApp = () => {
    showSideNav();
}
startDashApp();