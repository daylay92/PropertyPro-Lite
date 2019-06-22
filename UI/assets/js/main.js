//Preloader Action while page loads

window.onload = () => {
    document.querySelector('.preloader__loader').classList.add('preloader__loader--off');
    setTimeout(()=>{
        document.querySelector('.preloader').classList.add('preloader--off');
    },400);
}
//Home Page Functions
//Assign navbar class by title
const assignNavbarColor = () => {
    if(document.title === 'PropertyPro Lite | Home') return;
    const navbar = document.querySelector('.navbar');
    if(!navbar) return;
    navbar.classList.add('navbar--color-deepen');
}
//Adjusts Navbar color on Home Page 
const colorNav = () => {
    const height = window.innerHeight;
    const navbar = document.querySelector('.navbar');
    if(document.title !== 'PropertyPro Lite | Home') return;
    window.onscroll = () => {
        if(window.pageYOffset > height || document.documentElement.scrollTop > height)
        navbar.classList.add('navbar--color-blue');
        else
        navbar.classList.remove('navbar--color-blue');
    }
}

//Adjusts Navbar to facilitate responsiveness
const manageNavResponsive = () => {
    const body = document.querySelector('body');
    const navBarMenu = document.querySelector('.navbar__menu');
    const toggleBtn = document.querySelector('.navbar__toggle-icon');
    if(!toggleBtn) return;
    body.onresize = () => {
        if(parseInt(window.innerWidth) < 948) 
        navBarMenu.classList.remove('navbar__menu--display-flex');
    }
    
    toggleBtn.onclick = () => {
            navBarMenu.classList.toggle('navbar__menu--display-flex');
            toggleBtn.classList.toggle('navbar__toggle-icon--transform-clockwise');
            toggleBtn.classList.toggle('navbar__toggle-icon--transform-anti-clockwise');     
    }
}
//Mimic Select Dropdown Element and assigns value to span field
const HometypeSelector = () => {
    const typeInputTextMimic = document.querySelector('#inputTypeText');
    const typeList = document.querySelectorAll('.hero-section__dropdown-item');
    if(!typeList) return;
    const selectValue = ({target}) => {
        typeInputTextMimic.textContent = target.textContent;
    }
    typeList.forEach(el => {
        el.addEventListener('click',selectValue);
    })
}
//Mimic Select dropdown
const toggleHeroDropDown = () => {
    const body = document.querySelector('body');
    const dropDown = document.querySelector('.hero-section__dropdown-options');
    const dropDownMimicWrapper = document.querySelector('.hero-section__search-area');
    const mainIcon = document.querySelector('.chevron-home');
    const IconWrap = document.querySelector('.hero-section__dropdown-btn');
    const searchField = document.querySelector('#inputField');
    const textField = document.querySelector('.hero-section__field-text');
    if(!dropDown) return;
    const toggleDrop = ({ target }) => {
       if(target === dropDownMimicWrapper) return;
       if(target === searchField) return;
       if(target === mainIcon) return;
       if(target === IconWrap) return;
       if(target === textField) return;
       dropDown.classList.remove('hero-section__dropdown-options--show');
    }
    body.addEventListener('click',toggleDrop);
    searchField.onclick = () => {
       dropDown.classList.toggle('hero-section__dropdown-options--show');
       mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
       mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
    }
     mainIcon.onclick = () => {
        dropDown.classList.toggle('hero-section__dropdown-options--show');
        mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
        mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
     }
}
//Opens a view properties page which displays properties under the categories selected in the dropdown
const searchForPropRedirect = () => {
    const searchButton = document.querySelector('.hero-section__search-icon');
    if(!searchButton) return;
    searchButton.onclick = () => {
        window.location.assign('view-properties.html');
    }
}

//view-properties page Functions
 //Google Map: API utilizes only ES5 Synthax
 function initialize(location) {
    const mapBlock = document.querySelector('.location');
    if(!mapBlock) return;
    const map = new google.maps.Map( mapBlock, {zoom: 15, center: location});
    const marker = new google.maps.Marker({position: location, map: map});
}
function codeAddress() {
    const address = "28, Ojumu Crescent, Ijapo Estate, Akure, Ondo State"
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address},(results,status) => {
        let coordinate = '';
        if(status === 'OK')
        {
            coordinate = results[0].geometry.location;
            initialize(coordinate);
        }
        else{
            console.log('something went wrong');
        }  
    })
}
//Sign Up Page Functions
 //controls gender dropdown
 const toggleGenderDropdown = () => {
    const body = document.querySelector('body');
    const dropDown = document.querySelector('.sign-up__block-form-drop-down');
    const dropDownMimicWrapper = document.querySelector('.sign-up__block-form-input-gender-mimic');
    const mainIcon = document.querySelector('.fa-chevron-down');
    if(!dropDown) return;
    const toggleDrop = ({ target }) => {
       if(target === dropDownMimicWrapper) return;
       if(target === mainIcon) return;
       dropDown.classList.remove('sign-up__block-form-drop-down--block');
    }
    body.addEventListener('click',toggleDrop);
    dropDownMimicWrapper.onclick = () => {
       dropDown.classList.toggle('sign-up__block-form-drop-down--block');
       mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
       mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
    }

}
//add the selected option as input field value
const genderSelector = () => {
   const genderInputField = document.querySelector('#hiddenGender');
   const genderInputTextMimic = document.querySelector('#genderText');
   const genderLists = document.querySelectorAll('.sign-up__block-form-drop-down-item');
   if(!genderLists) return;
   const selectValue = ({target}) => {
       genderInputField.value = target.textContent;
       genderInputTextMimic.textContent = target.textContent;
       genderInputTextMimic.className ='sign-up__block-form-input--color';
   }
   genderLists.forEach(el => {
       el.addEventListener('click',selectValue);
   })
}

// Filter functions and Pagination on view-properties Page
    //Assigns fixed position to Filter Bar
    const fixFilterPosition = () => {
        const height = window.innerHeight;
        const diffInHeight = Math.round(height/2);
        const filterSection = document.querySelector('.filter-section');
        if(!filterSection) return;
        window.onscroll = () => {
            if(window.pageYOffset > diffInHeight || document.documentElement.scrollTop > diffInHeight)
            filterSection.classList.add('filter-section--fixed');
            else
            filterSection.classList.remove('filter-section--fixed');
        }
    }
    //Shows and closes the custom select drop down for filter by type
    const toggleTypeDropDown = () => {
        const body = document.querySelector('body');
        const dropDown = document.querySelector('.filter-section__by-type-drop-down');
        const dropDownMimicWrapper = document.querySelector('.filter-section__by-type');
        const mainIcon = document.querySelector('.chevron-type');
        if(!dropDown) return;
        const toggleDrop = ({ target }) => {
           if(target === dropDownMimicWrapper) return;
           if(target === mainIcon) return;
           dropDown.classList.remove('filter-section__by-type-drop-down--block');
        }
        body.addEventListener('click',toggleDrop);
        dropDownMimicWrapper.onclick = () => {
           dropDown.classList.toggle('filter-section__by-type-drop-down--block');
           mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
           mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
        }
    }
    const typeSelector = () => {
        const typeInputTextMimic = document.querySelector('#typeText');
        const typeList = document.querySelectorAll('.filter-section__by-type-item');
        if(!typeList) return;
        const selectValue = ({target}) => {
            typeInputTextMimic.textContent = target.textContent;
        }
        typeList.forEach(el => {
            el.addEventListener('click',selectValue);
        })
    }
    //Shows and closes the custom select drop down for filter by purpose
    const togglePurposeDropDown = () => {
        const body = document.querySelector('body');
        const dropDown = document.querySelector('.filter-section__by-purpose-drop-down');
        const dropDownMimicWrapper = document.querySelector('.filter-section__by-purpose');
        const mainIcon = document.querySelector('.chevron-purpose');
        if(!dropDown) return;
        const toggleDrop = ({ target }) => {
           if(target === dropDownMimicWrapper) return;
           if(target === mainIcon) return;
           dropDown.classList.remove('filter-section__by-purpose-drop-down--block');
        }
        body.addEventListener('click',toggleDrop);
        dropDownMimicWrapper.onclick = () => {
           dropDown.classList.toggle('filter-section__by-purpose-drop-down--block');
           mainIcon.classList.toggle('fa-chevron-down--animate-clockwise');
           mainIcon.classList.toggle('fa-chevron-down--animate-anti-clockwise');
        }
    }
    const purposeSelector = () => {
        const purposeInputTextMimic = document.querySelector('#purposeText');
        const purposeList = document.querySelectorAll('.filter-section__by-purpose-item');
        if(!purposeList) return;
        const selectValue = ({target}) => {
            purposeInputTextMimic.textContent = target.textContent;
        }
        purposeList.forEach(el => {
            el.addEventListener('click',selectValue);
        })
    }
    //Controls the behavior of the pagination buttons
    const selectNextPage = () => {
        const prevBtn = document.querySelector('.pagination__prev');
        const nextBtn = document.querySelector('.pagination__next');
        const currentPageNum = document.querySelector('.pagination__current');
        const lastPageNum = document.querySelector('.pagination__count');
        if(!prevBtn) return;
        if(!nextBtn) return;
        prevBtn.onclick = (e) => {
            const diff = parseInt(currentPageNum.textContent) - 1;
            if(diff === 1)
                prevBtn.classList.add('pagination__btn--disabled');
            if(parseInt(lastPageNum.textContent) === parseInt(currentPageNum.textContent))
                nextBtn.classList.remove('pagination__btn--disabled');
            currentPageNum.textContent --;
            e.preventDefault();
        }
        nextBtn.onclick = (e) => {
            if(parseInt(currentPageNum.textContent) >= 1)
                prevBtn.classList.remove('pagination__btn--disabled');
            const diff = parseInt(lastPageNum.textContent) - parseInt(currentPageNum.textContent);
            if(diff === 1)
                nextBtn.classList.add('pagination__btn--disabled');
            currentPageNum.textContent ++;
            e.preventDefault();
        }
    }
    //Adapts Filters to fit screen
    const manageFilterResponsive = () => {
        const body = document.querySelector('body');
        const filterFields = document.querySelector('.filter-section__filter-options');
        const filterBtn = document.querySelector('.filter-section__filter-btn-wrapper');
        const toggleBtn = document.querySelector('.filter__toggle-button');
        if(!toggleBtn) return;
        body.onresize = () => {
            if(parseInt(window.innerWidth) < 943) 
            filterFields.classList.remove('filter-section__filter-options--display-flex');
            filterBtn.classList.remove('filter-section__filter-btn-wrapper--display-block');
        }
        
        toggleBtn.onclick = () => {
            filterFields.classList.toggle('filter-section__filter-options--display-flex');
            filterBtn.classList.toggle('filter-section__filter-btn-wrapper--display-block');
            toggleBtn.classList.toggle('filter__toggle-icon--transform-clockwise');
            toggleBtn.classList.toggle('filter__toggle-icon--transform-anti-clockwise');     
        }
    }
const startApp = () => {
    assignNavbarColor();
    colorNav();
    manageNavResponsive();
    HometypeSelector();
    toggleHeroDropDown();
    searchForPropRedirect();
    toggleGenderDropdown();
    genderSelector();
    fixFilterPosition();
    toggleTypeDropDown();
    togglePurposeDropDown();
    typeSelector();
    purposeSelector();
    selectNextPage();
    manageFilterResponsive();
}
startApp();