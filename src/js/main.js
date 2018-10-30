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


const nextTransition = () => {
    debugger;
    if (currentLandmark < locations[currentCity].length) {
        transitionLandmark();
        currentLandmark++;
    } 
    else {
        if (currentCity < locations.length) {
            currentCity++;
        } else {
            currentCity = 0;
        }
        currentLandmark = 0;
        transitionCity();
    }
}

const transitionLandmark = () => {


}

const transitionCity = () => {

    //random int for top right bot left
    let direction = Math.floor((Math.random() * 4) + 1);

    transition_out_move_up();

    // switch(direction) {
    //     case 0:
    //         transition_out_move_up();
    //         break;
    //     case 1: 
    //         transition_out_move_up();
    //         break;
    //     case 2:
    //         transition_out_move_up();
    //         break;
    //     case 3:
    //         transition_out_move_down();   
    //         break;
    // }

}

const update_location_details_delay = 2500;
const move_in_delay = 3000;

const transition_out_move_up = () => {
    city.classList.add('scroll-up-cityheading');
    state.classList.add('scroll-up-state');
    details_container.classList.add('scroll-up-details');
    photo.classList.add('scroll-up-photo');
    state_bar_decoration.classList.add('shrink-state-decoration');
    setTimeout(update_location_details, 2500);
    setTimeout(move_in_bottom, 3000);
}

const transition_out_move_down = () => {
    city.classList.add('scroll-down-cityheading');
    state.classList.add('scroll-down-state');
    details_container.classList.add('scroll-down-details');
    photo.classList.add('scroll-down-photo');
    state_bar_decoration.classList.add('shrink-state-decoration');
}
const transition_out_move_left = () => {
    city.classList.add('scroll-left-cityheading');
    state.classList.add('scroll-left-state');
    details_container.classList.add('scroll-left-details');
    photo.classList.add('scroll-left-photo');
    state_bar_decoration.classList.add('shrink-state-decoration');
}
const transition_out_move_right = () => {
    city.classList.add('scroll-right-cityheading');
    state.classList.add('scroll-right-state');
    details_container.classList.add('scroll-right-details');
    photo.classList.add('scroll-right-photo');
    state_bar_decoration.classList.add('shrink-state-decoration');
}


//reposition methods once off page, dont need to change city i think
//after applying inline styles remove old classes

const reposition_offscreen_top = () => {
    photo.classList.add("reposition-photo-top");
    details_container.classList.add("reposition-details-top");
    state.classList.add("reposition-state-top");
    city.classList.add('reposition-cityheading-top');
}

const reposition_offscren_right = () => {
    photo.classList.add("reposition-photo-right");
    details_container.classList.add("reposition-details-right");
    state.classList.add("reposition-state-right");
}

const reposition_offscreen_bottom = () => {
    photo.classList.add("reposition-photo-bottom");
    details_container.classList.add("reposition-details-bottom");
    state.classList.add("reposition-state-bottom");
    city.classList.add('reposition-cityheading-bottom')
}

const reposition_offscreen_left = () => {
    photo.classList.add("reposition-photo-left");
    details_container.classList.add("reposition-details-left");
    state.classList.add("reposition-state-left");
}


//move in animations
const move_in_top = () => {
    photo.classList.add('move-in-photo-top');
    details_container.classList.add('move-in-details-top');
    state.classList.add('move-in-state-top');
    state_bar_decoration.classList.add('grow-state-decoration');
}

const move_in_right = () => {
    photo.classList.add('move-in-photo-right');
    details_container.classList.add('move-in-details-right');
    state.classList.add('move-in-state-right');
    state_bar_decoration.classList.add('grow-state-decoration');
}

const move_in_bottom = () => {
    photo.classList.add('move-in-photo-bottom');
    details_container.classList.add('move-in-details-bottom');
    state.classList.add('move-in-state-bottom');
    city.classList.add('move-in-cityheading-bottom');
    state_bar_decoration.classList.add('grow-state-decoration');
}

const move_in_left = () => {
    photo.classList.add('move-in-photo-left');
    details_container.classList.add('move-in-details-left');
    state.classList.add('move-in-state-left');
    state_bar_decoration.classList.add('grow-state-decoration');
}





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



//change values 
const update_location_details = () => {
    //snapshot pointer to the current city for clarification
    let current_city = locations[currentCity];
    debugger;
    photo.style.backgroundImage = `url('../img/${current_city.landmarks[currentLandmark].image}')`;
    photo_title.innerHTML = current_city.landmarks[currentLandmark].name;
    city.innerHTML = current_city.city;
    state.innerHTML = current_city.state;
    details_population.innerHTML = current_city.population;
    details_elevation.innerHTML = current_city.elevation;
    details_area.innerHTML = current_city.area;
}



// INVOKE LOOP

setTimeout(nextTransition, 2000);