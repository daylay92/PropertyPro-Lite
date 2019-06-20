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
//Mark property sold/rented Functions
//Utilities that adds and removes Modals
const addModalToDOM = (innerhtml, childSelector, position) => {
    const childModal = document.querySelector(childSelector);
    const parentElem = document.querySelector('body');
    if(childModal) parentElem.removeChild(childModal);
    parentElem.insertAdjacentHTML(position,innerhtml);
}
const removeModalFromDom = (childSelector) => {
    const childModal = document.querySelector(childSelector);
    const parentElem = document.querySelector('body');
    if(!parentElem) return;
    if(!childModal) return;
    parentElem.removeChild(childModal);
}
const generateHTML = (CallToAction,actionId,action) => {
    return `
    <div class="properties-dialog-overlay">
        <div class="properties-dialog-overlay__confirm">   
            <div class="properties-dialog-overlay__heading">
                <h5 class="properties-dialog-overlay__header">Please confirm Action</h5>
                <button class="properties-dialog-overlay__close-btn">
                    <i class="far fa-window-close properties-dialog-close"></i>
                </button>
            </div>
            <div class="properties-dialog-overlay__body">
                <p class="properties-dialog-overlay__body-text">${CallToAction}</p>
            </div>
            <div class="properties-dialog-overlay__footer">
                <button class="properties-dialog-overlay__cancel-btn" >no</button>
                <button class="properties-dialog-overlay__proceed-btn" id="${actionId}">${action}</button>
            </div>
        </div>
    </div>
`;
}
const enableCloseModal = () => {
    const modalCloseBtn = document.querySelector('.properties-dialog-overlay__close-btn');
    const modalCancelBtn = document.querySelector('.properties-dialog-overlay__cancel-btn');
    const closeNow = (e) => {
            removeModalFromDom('.properties-dialog-overlay');
            e.preventDefault();
        }
    modalCloseBtn.addEventListener('click',closeNow);
    modalCancelBtn.addEventListener('click',closeNow);
}
const proceedWithMark = (selector) => {
    const modalProceedBtn = document.querySelector(selector);
    const proceed = (e) => {
        window.location.assign('/UI/manage-properties.html');
        e.preventDefault();
        }
        modalProceedBtn.addEventListener('click',proceed);
}
//Adds and removes  Modal on click of Mark as rented/sold
const markOrUnSoldOrRented = () => {
   const markBtns = document.querySelectorAll('.property-list__mark');
    const innerhtml = generateHTML('Would you like to proceed?','proceed','Yes');
   const popUpModal = (e) => {
        addModalToDOM(innerhtml,'.properties-dialog-overlay','afterbegin');
        enableCloseModal();
        proceedWithMark('#proceed');
        e.preventDefault();
   }
   if(!markBtns) return;
   markBtns.forEach((btn)=> {
       btn.addEventListener('click',popUpModal);
   })
}

const startDashApp = () => {
    showSideNav();
    selectNextPropertyPage();
    markOrUnSoldOrRented();
}
startDashApp();