import "../sass/main.scss";

import { locations } from './locations_struct';

//animate for moving
let photo = document.querySelector('.content__image-container');
let photo_title = document.querySelector('.content__image-title-span');

let city = document.querySelector('.content__cityheading');
let state = document.querySelector('.content__stateheading');
let state_bar_decoration = document.querySelector('.content__stateheading-decoration');

let details_container = document.querySelector('.content__info-details-container');
let details_population = document.querySelector('#content__population-value');
let details_elevation = document.querySelector('#content__elevation-value');
let details_area = document.querySelector('#content__area-value');

//states
let nsw = document.querySelector('#AU-NSW');
let vic = document.querySelector('#AU-VIC');
let sa = document.querySelector('#AU-SA');
let qld = document.querySelector('#AU-QLD');
let tas = document.querySelector('#AU-TAS');
let nt = document.querySelector('#AU-NT');
let wa = document.querySelector('#AU-WA');

let states = [nsw, vic, sa, qld, tas, nt, wa];

let currentCity = 0;
let currentLandmark = 0;

// city.classList.add('scroll-down-cityheading');
// state.classList.add('scroll-down-state');



const nextTransition = (locations) => {

    if (currentLandmark < locations[currentCity].length) {
        currentLandmark++;
        transitionLandmark();
    } else {
        if (currentLocation < locations.length) {
            currentLocation++;
        } else {
            currentLocation = 0;
        }
        transitionCity();
    }

}


const transitionLandmark = () => {




}


const transitionCity = () => {




}




const city_transition_moveUp() => {
    city.classList.add('scroll-up-cityheading');
    state.classList.add('scroll-up-state');
    details_container.classList.add('scroll-up-details');
    photo.classList.add('scroll-up-photo');
    state_bar_decoration.classList.add('shrink-state-decoration');
}


const city_transition_moveDown() => {

}

setTimeout(ity_transition_moveUp, 2000);
//change values


//move back

// //on timer call "next" method.

// //have previous method as well


// function move(location, landmark){

//     let direction = Math.floor((Math.random() * 4) + 1); // 0 - up, 1 - right, 2 - down, 3 - left

//     photo.st

// };



// function

let changeState = (state) => {

    for ( let state in states ) {
        state.classList.remove('current-state');
    }

    switch(state) {

        case "nsw":
            nsw.classList.add('current-state');
            break;
        case "vic":
            vic.classList.add('current-state');
            break;
        case "qld":
            qld.classList.add('current-state');
            break;
        case "wa":
            wa.classList.add('current-state');
            break;
        case "sa":
            sa.classList.add('current-state');
            break;
        case "nt":
            nt.classList.add('current-state')
            break;
        case "act":
            act.classList.add('current-state');
            break;

    }
}



