import "../sass/main.scss";


import { locations } from './locations_struct';
// import { TIMEOUT } from "dns";
// import { landmark } from './landmark_transitions';

//animate for moving
let photo = document.querySelector('.content__image-container');
let photo_title_container = document.querySelector('.content__image-title');
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


const remove_class_regex = () => {

    let animated_elements = [photo, city, state, details_container];
    let animation_class_regex_patterns = [
        /^scroll-/,
        /^reposition-/,
        /^move-/,
    ];
    let element_classes;
    //for each element, for each pattern, if match, remove
    for ( let i = 0; i < animated_elements.length; i++ ) {
        
        element_classes = animated_elements[i].className.split(" ");

        for ( let b = 0; b < animation_class_regex_patterns.length; b++) {

            //if contains match, remove
            for (let c = 0; c < element_classes.length; c++) {

                if (animation_class_regex_patterns[b].test(element_classes[c])) {

                    animated_elements[i].classList.remove(element_classes[c]);

                }
            }
        }
    }
    //specific for decoration
    state_bar_decoration.classList.remove("shrink-state-decoration");
    state_bar_decoration.classList.remove("grow-state-decoration");

}   

let states = [nsw, vic, sa, qld, tas, nt, wa];

let currentCity = 0;
let currentLandmark = 1;

const nextTransition = () => {

    // 3 landmarks per city
    if (currentLandmark < 3) {
        transitionLandmark(currentCity, currentLandmark);
        currentLandmark++;
    } 
    else {
        //if at last landmark transition to next city
        currentLandmark = 0;
        if (currentCity < locations.length - 1) {
            currentCity++;
        } else {
            console.log("reseting current City");
            currentCity = 0;
        }
        transitionCity(currentCity, currentLandmark);
    }
}

const transitionLandmark = (cityIndex, landmarkIndex) => {

    //reset photo title classes so they dont build up
    photo_title.classList.remove("fade-in-photo-title");
    photo_title.classList.remove("fade-out-photo-title");

    //image, create new , apply class to offset it, apply equivelent animation to main to slide in at same time as main slides out
    // photo_title.classList.add("fade-out-photo-title");
    // setTimeout(function(){ 
    //     photo_title.innerHTML = locations[cityIndex].landmarks[landmarkIndex].name;
    //     photo_title.classList.add("fade-in-photo-title");
    //     photo_title.style.opacity = "1";
    // } , 2000);

    change_photo_title();
        
    //create new image
    let landmark_container = document.querySelector('.content__overflow-hidden-fix');
    let new_landmark = document.createElement('div');
    new_landmark.style.backgroundImage = `url('../img/${locations[cityIndex].landmarks[landmarkIndex].image}')`;
    new_landmark.classList.add("content__landmark-image","content__next-image");
    landmark_container.appendChild(new_landmark);

    //apply animations
    let current_landmark = landmark_container.querySelector(":not(.content__next-image)");
    new_landmark.classList.add("move-new-photo-right");
    current_landmark.classList.add("move-current-photo-right");

    //animation is 1.2s, 2s to be safe
    setTimeout(function() {
        //remove old landmark div
        landmark_container.removeChild(current_landmark);
        //remove next-image class, probably not needed
        landmark_container.querySelector(".content__next-image").classList.remove("content__next-image");
        // remove_class_regex();
    }, 2000)
}

const transitionCity = (cityIndex, landmarkIndex) => {
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
    setTimeout(function() {
        move_in_bottom();
        currentLandmark++;
    }, 3000);
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
    setTimeout(remove_class_regex, 3000);
}

const move_in_right = () => {
    photo.classList.add('move-in-photo-right');
    details_container.classList.add('move-in-details-right');
    state.classList.add('move-in-state-right');
    state_bar_decoration.classList.add('grow-state-decoration');
    setTimeout(remove_class_regex, 3000);
}

const move_in_bottom = () => {
    photo.classList.add('move-in-photo-bottom');
    details_container.classList.add('move-in-details-bottom');
    state.classList.add('move-in-state-bottom');
    city.classList.add('move-in-cityheading-bottom');
    state_bar_decoration.classList.add('grow-state-decoration');
    setTimeout(remove_class_regex, 3000);
}

const move_in_left = () => {
    photo.classList.add('move-in-photo-left');
    details_container.classList.add('move-in-details-left');
    state.classList.add('move-in-state-left');
    state_bar_decoration.classList.add('grow-state-decoration');
    setTimeout(remove_class_regex, 3000);
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
    let current_photo = document.querySelector(".content__landmark-image")
    current_photo.style.backgroundImage = `url('../img/${current_city.landmarks[currentLandmark].image}')`;
    photo_title.innerHTML = current_city.landmarks[currentLandmark].name;
    city.innerHTML = current_city.city;
    state.innerHTML = current_city.state;
    details_population.innerHTML = current_city.population;
    details_elevation.innerHTML = current_city.elevation;
    details_area.innerHTML = current_city.area;
}

const change_photo_title = () => {

    let cloned_title = photo_title_container.cloneNode(true);
    photo.appendChild(cloned_title);
    photo_title_container.style.visibility = "hidden";
    let current_width = photo_title_container.offsetWidth;
    photo_title.innerHTML = locations[currentCity].landmarks[currentLandmark].name;
    let new_width = photo_title_container.offsetWidth;
   
    //lets width animation finish
    let cloned_span = cloned_title.querySelector('.content__image-title-span');
    cloned_span.classList.add("fade-out-photo-title");
    photo_title.classList.add("fade-out-photo-title");

    // cloned_title.style.width = current_width + "px";
    // cloned_title.style.width = new_width + "px";

    // photo_title_container.style.visibility = "visible";
    // photo.removeChild(cloned_title);
    // photo_title.classList.add("fade-in-photo-title")

    // photo_title.style.opacity = "1";
    // photo_title.classList.remove("fade-in-photo-title");
    // photo_title.classList.remove("fade-out-photo-title");

    //dummy section
    setTimeout(function(){
        debugger;
        cloned_title.style.width = current_width + "px";
        cloned_title.style.width = new_width + "px";
    }, 500);

    setTimeout(function(){
        debugger;
        photo_title_container.style.visibility = "visible";
        photo.removeChild(cloned_title);
        photo_title.classList.add("fade-in-photo-title")
    }, 1500);
    
    setTimeout(function() {
        debugger;
        photo_title.classList.remove("fade-in-photo-title");
        photo_title.classList.remove("fade-out-photo-title");
    }, 2500);


}

// INVOKE LOOP
setInterval(nextTransition, 7500);

// transitionCity();

