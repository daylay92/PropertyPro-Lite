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
    searchButton.onclick = () => {
        window.location.assign('/UI/view-properties.html');
    }
}

const startApp = () => {
    assignNavbarColor();
    colorNav();
    manageNavResponsive();
    HometypeSelector();
    toggleHeroDropDown();
    searchForPropRedirect();
}
startApp();