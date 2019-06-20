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
//Paginates Manage Properties
const selectNextPropertyPage = () => {
    const prevBtn = document.querySelector('.pagination-dashboard__prev');
    const nextBtn = document.querySelector('.pagination-dashboard__next');
    const currentPageNum = document.querySelector('.pagination-dashboard__current');
    const lastPageNum = document.querySelector('.pagination-dashboard__count');
    if(!prevBtn) return;
    if(!nextBtn) return;
    prevBtn.onclick = (e) => {
        const diff = parseInt(currentPageNum.textContent) - 1;
        if(diff === 1)
            prevBtn.classList.add('pagination-dashboard__btn--disabled');
        if(parseInt(lastPageNum.textContent) === parseInt(currentPageNum.textContent))
            nextBtn.classList.remove('pagination-dashboard__btn--disabled');
        currentPageNum.textContent --;
        e.preventDefault();
    }
    nextBtn.onclick = (e) => {
        if(parseInt(currentPageNum.textContent) >= 1)
            prevBtn.classList.remove('pagination-dashboard__btn--disabled');
        const diff = parseInt(lastPageNum.textContent) - parseInt(currentPageNum.textContent);
        if(diff === 1)
            nextBtn.classList.add('pagination-dashboard__btn--disabled');
        currentPageNum.textContent ++;
        e.preventDefault();
    }
}
const startDashApp = () => {
    showSideNav();
    selectNextPropertyPage();
}
startDashApp();