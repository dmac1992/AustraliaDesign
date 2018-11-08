import "../sass/main.scss";
import { locations } from './locations_struct';
require('velocity-animate');

//animate for moving
// let photo = document.querySelector('.content__image-container');
// let photo_title_container = document.querySelector('.content__image-title');
// let photo_title = document.querySelector('.content__image-title-span');


// let city = document.querySelector('.content__cityheading');
// let state = document.querySelector('.content__stateheading');
// let state_bar_decoration = document.querySelector('.content__stateheading-decoration');

// let details_container = document.querySelector('.content__info-details-container');
// let details_population = document.querySelector('#content__population-value');
// let details_elevation = document.querySelector('#content__elevation-value');
// let details_area = document.querySelector('#content__area-value');

// //states
// let nsw = document.querySelector('#AU-NSW');
// let vic = document.querySelector('#AU-VIC');
// let sa = document.querySelector('#AU-SA');
// let qld = document.querySelector('#AU-QLD');
// let tas = document.querySelector('#AU-TAS');
// let nt = document.querySelector('#AU-NT');
// let wa = document.querySelector('#AU-WA');

// let states = [nsw, vic, sa, qld, tas, nt, wa];

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

    // === PREPING LANDMARK IMAGE FOR ANIMATION === //
    //set variables for current image and images container
    let current_landmark = document.querySelector(".content__landmark-image");
    let landmark_container = document.querySelector(".content__image-container");

    //create child element, apply classes and background image
    let new_landmark = document.createElement("div");
    new_landmark.className = "content__landmark-image content__landmark-image--new";

    new_landmark.style.backgroundImage = `url('../img/${locations[0].landmarks[1].image}')`;
    //append child, position to left of current image with image--new class
    let landmark_image_container = document.querySelector(".content__overflow-hidden-fix");
    landmark_image_container.appendChild(new_landmark);

     // === PREPPING IMAGE TITLE FOR ANIMATION === //

    //create dummy element to ascertain width
    let real_image_title_container = document.querySelector(".content__image-title");
    let landmark_title_span = real_image_title_container.firstChild;
    let cloned_title = real_image_title_container.cloneNode(true);

    //set cloned element name to new landmark name, and set visiblity to hidden.
    //Just getting dimensions here to animate the original title properly
    cloned_title.firstChild.innerHTML = locations[0].landmarks[1].name;
    cloned_title.style.visibility = "hidden";

    //append and store width of new hidden element
    landmark_container.appendChild(cloned_title);
    let cloned_title_width = cloned_title.offsetWidth;

    
    //Animation to slide current out to right
    Velocity(current_landmark, {translateX: ["100%", 0]}, {
        duration: 1000, 
        queue: false,
        complete: function() {
            landmark_image_container.removeChild(current_landmark);
        }
    });
    //Animation to slide new across from left
    Velocity(new_landmark, {translateX: [0, "-100%"]}, {
        duration: 1000,
        complete: function() { 
            //remove new image class once finished transitioning in
            new_landmark.classList.remove("content__landmark-image--new");
        }
    });

    //Animation to transition title
    //first fade out text
    Velocity(landmark_title_span, {opacity: [0, 1]}, {
        duration: 200,
        complete: function() {
            //then grow or shrink box to fit new content
            Velocity(real_image_title_container, {width: cloned_title_width}, {
                duration: 600,
                complete: function() {
                    //change inner html of real landmark title to same as cloned title 
                    landmark_title_span.innerHTML = cloned_title.firstChild.innerHTML;

                    //Fade in
                    Velocity(landmark_title_span, {opacity: [1, 0]}, {
                        duration: 200
                    });
                }
            })
        }
    })

   
}


const transitionCity = (cityIndex, landmarkIndex) => {
    //random int for top right bot left

    let direction = Math.floor((Math.random() * 4) + 1);


    
}

//reposition methods once off page, dont need to change city i think
//after applying inline styles remove old classes

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



// INVOKE LOOP
setTimeout(transitionLandmark, 2500);

// transitionCity();

