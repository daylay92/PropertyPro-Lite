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
//Delete property Functions
//Popup Modal on click of the delete button
const proceedWithDelete = (id) => {
    const modalDeleteBtn = document.querySelector(id);
    const proceed = (e) => {
        window.location.assign('/UI/manage-properties.html');
        e.preventDefault();
        }
        modalDeleteBtn.addEventListener('click',proceed);
}
const deleteProperty = () => {
    const deleteBtns = document.querySelectorAll('.property-list__delete');
    const innerhtml = generateHTML('Do you want to Delete this Property?','delete','Yes');
    const popUpModal = (e) => {
        addModalToDOM(innerhtml,'.properties-dialog-overlay','afterbegin');
        enableCloseModal();
        proceedWithDelete('#delete');
        e.preventDefault();
   }
   if(!deleteBtns) return;
   deleteBtns.forEach((btn)=> {
       btn.addEventListener('click',popUpModal);
   })
}
//Post A Property Functions
// Assigns selected value to hidden state input field and the mimic span field when dropdown is clicked
const stateSelector = () => {
    const stateInput = document.querySelector('#stateInput');
    const stateInputTextMimic = document.querySelector('#stateText');
    const stateList = document.querySelectorAll('.post-prop__form-drop-down-item');
    if(!stateList) return;
    const selectValue = ({ target }) => {
        stateInput.value = target.textContent;
        stateInputTextMimic.textContent = target.textContent;
        stateInputTextMimic.className ='sign-up__block-form-input--color';
    }
    stateList.forEach(el => {
        el.addEventListener('click',selectValue);
    })
}
//Add states from json object to dropdown
const populateDrop = ()=> {
    fetch('assets/utils/states.json')
    .then(res => res.json())
    .then(result => {
        const dropDown = document.querySelector('.post-prop__form-drop-down');
        result.forEach(state => {
            const dropDownItem = document.createElement('li');
            dropDownItem.className = 'post-prop__form-drop-down-item';
            dropDownItem.appendChild(document.createTextNode(state));
            dropDown.appendChild(dropDownItem);
        })
        stateSelector();
    })
    .catch(err => (console.log(err.stack)));
    
}

//Control toggle of states dropdown
const toggleStateDropdown = () => {
    const body = document.querySelector('body');
    const dropDown = document.querySelector('.post-prop__form-drop-down');
    const dropDownMimicWrapper = document.querySelector('.post-prop__form-input-state-mimic');
    const mainIcon = document.querySelector('.fa-chevron-drop');
    if(!dropDown) return;
    const toggleDrop = ({ target }) => {
       if(target === dropDownMimicWrapper) return;
       if(target === mainIcon) return;
       dropDown.classList.remove('post-prop__form-drop-down--block');
    }
    body.addEventListener('click',toggleDrop);
    dropDownMimicWrapper.onclick = () => {
       dropDown.classList.toggle('post-prop__form-drop-down--block');
       mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
       mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
    }

}
//Control toggle of status dropdown
const toggleStatusDropdown = () => {
    const body = document.querySelector('body');
    const dropDown = document.querySelector('.post-prop__form-status-drop-down');
    const dropDownMimicWrapper = document.querySelector('.post-prop__form-input-status-mimic');
    const mainIcon = document.querySelector('.fa-chevron-status');
    if(!dropDown) return;
    const toggleDrop = ({ target }) => {
       if(target === dropDownMimicWrapper) return;
       if(target === mainIcon) return;
       dropDown.classList.remove('post-prop__form-drop-down--block');
    }
    body.addEventListener('click',toggleDrop);
    dropDownMimicWrapper.onclick = () => {
       dropDown.classList.toggle('post-prop__form-drop-down--block');
       mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
       mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
    }
}
// Assigns selected value to hidden status input field and the mimic span field when dropdown is clicked
const statusSelector = () => {
    const statusInput = document.querySelector('#statusInput');
    const statusInputTextMimic = document.querySelector('#statusText');
    const statusList = document.querySelectorAll('.post-prop__form-status-drop-down-item');
    if(!statusList) return;
    const selectValue = ({ target }) => {
        statusInput.value = target.textContent;
        statusInputTextMimic.textContent = target.textContent;
    }
    statusList.forEach(el => {
        el.addEventListener('click',selectValue);
    })
}
//Control toggle of property-type dropdown
const togglePropTypeDropdown = () => {
    const body = document.querySelector('body');
    const dropDown = document.querySelector('.post-prop__form-type-drop-down');
    const dropDownMimicWrapper = document.querySelector('.post-prop__form-type-input-mimic');
    const mainIcon = document.querySelector('.fa-chevron-prop-type');
    if(!dropDown) return;
    const toggleDrop = ({ target }) => {
       if(target === dropDownMimicWrapper) return;
       if(target === mainIcon) return;
       dropDown.classList.remove('post-prop__form-drop-down--block');
    }
    body.addEventListener('click',toggleDrop);
    dropDownMimicWrapper.onclick = () => {
       dropDown.classList.toggle('post-prop__form-drop-down--block');
       mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
       mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
    }
}
// Assigns selected value to hidden propertyType input field and the mimic span field when dropdown is clicked
const propertyTypeSelector = () => {
    const propertyTypeInput = document.querySelector('#propTypeInput');
    const propertyTypeTextMimic = document.querySelector('#propTypeText');
    const othersElem = document.querySelector('#OthersId');
    const propertyTypeList = document.querySelectorAll('.post-prop__form-type-drop-down-item');
    if(!propertyTypeList) return;
    const selectValue = ({ target }) => {
        propertyTypeInput.value = target.textContent;
        propertyTypeTextMimic.textContent = target.textContent;
        propertyTypeTextMimic.className ='sign-up__block-form-input--color';
        if(target.textContent === 'Others')
            othersElem.classList.remove('post-prop__form-group--hidden');
        else
        othersElem.classList.add('post-prop__form-group--hidden');
    }
    propertyTypeList.forEach(el => {
        el.addEventListener('click',selectValue);
    })
}
const startDashApp = () => {
    showSideNav();
    selectNextPropertyPage();
    markOrUnSoldOrRented();
    deleteProperty();
    populateDrop();
    toggleStateDropdown();
    toggleStatusDropdown();
    statusSelector();
    togglePropTypeDropdown();
    propertyTypeSelector();
}
startDashApp();