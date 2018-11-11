import "../sass/main.scss";
import { locations } from './locations_struct';
require('velocity-animate');


let startTime = Date.now();

//capture states
let nsw = document.querySelector('#AU-NSW');
let vic = document.querySelector('#AU-VIC');
let sa = document.querySelector('#AU-SA');
let qld = document.querySelector('#AU-QLD');
let tas = document.querySelector('#AU-TAS');
let nt = document.querySelector('#AU-NT');
let wa = document.querySelector('#AU-WA');

let currentCity = 0;
let currentLandmark = 1;

const nextTransition = () => {

    // 3 landmarks per city
    if (currentLandmark < 3) {

        //Current Landmark at the zero value should only be handled by transitioning city
        if (currentLandmark === 0)
            currentLandmark = 1;
           
        transitionLandmark(currentCity, currentLandmark);
        currentLandmark++;
    } 
    else {
        //if at last landmark transition to next city
        currentLandmark = 0;
        if (currentCity < locations.length - 1) {
            currentCity++;
        } else {
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

    new_landmark.style.backgroundImage = `url('../img/${locations[cityIndex].landmarks[landmarkIndex].image}')`;
    //append child, position to left of current image with image--new class
    let landmark_image_container = document.querySelector(".content__overflow-hidden-fix");
    landmark_image_container.appendChild(new_landmark);

     // === PREPPING IMAGE TITLE FOR ANIMATION === //

    //create dummy element to ascertain width
    let real_image_title_container = document.querySelector(".content__image-title");
    let current_image_title_width = real_image_title_container.offsetWidth;
    let landmark_title_span = real_image_title_container.firstChild;
    let cloned_title = real_image_title_container.cloneNode(true);

    //set cloned element name to new landmark name, and set visiblity to hidden.
    //Just getting dimensions here to animate the original title properly
    cloned_title.firstChild.innerHTML = locations[cityIndex].landmarks[landmarkIndex].name;
    cloned_title.style.visibility = "hidden";

    //set cloned element width to auto, otherwise clones inline width set by animations
    cloned_title.style.width = "auto";


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
            Velocity(real_image_title_container, {width: [cloned_title_width]}, {
                duration: 600,
                complete: function() {
                    //change inner html of real landmark title to same as cloned title 
                    landmark_title_span.innerHTML = cloned_title.firstChild.innerHTML;
                    //Fade in
                    Velocity(landmark_title_span, {opacity: [1, 0]}, {
                        duration: 200,
                        complete: function() {
                            //delete cloned element at end
                            landmark_container.removeChild(cloned_title);
                        }
                    });
                }
            })
        }
    })
}

const transitionCity = (cityIndex, landmarkIndex) => {
    //random int for top right bot left
    let direction = Math.floor((Math.random() * 4) + 1);

    let city_title = document.querySelector(".content__cityheading");
    let state_title = document.querySelector(".content__stateheading");
    let state_decoration = document.querySelector(".content__stateheading-decoration");
    let landmark_container = document.querySelector(".content__image-container");
    let landmark_image = document.querySelector(".content__landmark-image");
    let landmark_image_title = document.querySelector(".content__image-title-span");
    let details_container = document.querySelector(".content__info-details-container");
    let details_population = document.querySelector("#content__population-value");
    let details_elevation = document.querySelector("#content__elevation-value");
    let details_area = document.querySelector("#content__area-value");
    let current_state_svg = document.querySelector(".current-state-svg");

    //animate landmark container out of top of page
    Velocity(landmark_container, {translateY: "-2000px"}, {
        duration: 700,
        complete: function() {
            //change background image
            landmark_image.style.backgroundImage = `url('../img/${locations[cityIndex].landmarks[landmarkIndex].image}')`;
            landmark_image_title.innerHTML = locations[cityIndex].landmarks[landmarkIndex].name;
            //snap image to under page using velocityjs forcefeeding functionality, anmimate back up to 0px (default)
            Velocity(landmark_container, {translateY: ["0px", "2000px"]}, {
                duration: 700,
            });
        }
    })

    //animate state title
    Velocity(state_title, {translateY: "-2000px"}, {
        duration: 700,
        complete: function() {
            state_title.innerHTML = locations[cityIndex].state;
            Velocity(state_title, {translateY: ["0px", "2000px"]}, {
                duration: 700,
            });
        }
    });

    //Animate Details container
    Velocity(details_container, {translateY: ["-5000%", "-50%"]}, {
        duration: 700,
        complete: function() {
            //change details box details
            details_population.innerHTML = locations[cityIndex].population;
            details_elevation.innerHTML = locations[cityIndex].elevation;
            details_area.innerHTML = locations[cityIndex].area;

            Velocity(details_container, {translateY: ["-50%", "5000%"]}, {
                duration: 700,
            });
        }
    });

    //Animate City Heading
    Velocity(city_title, {translateY: "-100%"}, {
        duration: 800,
        complete: function() {
            //change city name
            city_title.innerHTML = locations[cityIndex].city;
            Velocity(city_title, {translateY: ["0%", "100%"]}, {
                duration: 300
            })
        }
    })

    //Animate STate Decoration
    Velocity(state_decoration, {width: "0%"},{
        duration: 250,
        delay: 200,
        loop: 1
    });

    //Animate State Svg 
    Velocity(current_state_svg, {fill: ["#999999", "#339900"]}, {
        duration: 700,
        complete: function() {
            //remove current active states class identifier
            current_state_svg.classList.remove("current-state-svg");
            //switch statement to reassign current state
            switch(locations[currentCity].state.toLowerCase()) {
                case "nsw":
                    nsw.classList.add("current-state-svg");
                    break;
                case "vic":
                    vic.classList.add("current-state-svg");
                    break;
                case "qld":
                    qld.classList.add("current-state-svg");
                    break;
                case "wa":
                    wa.classList.add("current-state-svg");
                    break;
                case "sa":
                    sa.classList.add("current-state-svg");
                    break;
                case "nt":
                    nt.classList.add("current-state-svg");
                    break;
                case "act":
                    act.classList.add("current-state-svg");
                    break;
            }
            //animate fade in active color
            Velocity(document.querySelector(".current-state-svg"), {fill: ["#339900", "#999999"]}, {
                duration: 700
            });

        }
    })
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

window.onload = function() {

    //in milliseconds, avoids flashing load screen
    let pageLoadedTime = Date.now() - startTime;
    
    if (pageLoadedTime < 3000) {
        setTimeout(website_boot, 2000);
    } else {
        website_boot();
    }
}

// will need to run once on load as well i think
window.addEventListener('resize', restructure_dom);
function restructure_dom()  {

    //elements subject to restructuring
    let cityheading = document.querySelector('.content__cityheading-container');
    let navigation_container = document.querySelector('.content__navigate-container');
    let info_container = document.querySelector('.content__info-container');
    let info_panel = document.querySelector('.content__info-panel')
    let panel_container = document.querySelector('.content');
    let container = document.querySelector('.container');
    //layout parents involved
    let image_container = document.querySelector('.content__image-container');
    
    //if resized to mobile like dimensions
    if (window.innerWidth < 1150) {

        //basic check to see if dom already set for mobile
        if ( !document.querySelector('.content__side-menu') ) {

            //create new cityheading container put it after header and before content, then append container for city/state heading 
            let mobile_city_parent_container = document.createElement("div"); // outer container needed to inline block the inner container
            mobile_city_parent_container.classList.add("content__mobile-heading-parent-container");
            let mobile_city_heading_container = document.createElement("div"); // inline-block container used
            mobile_city_heading_container.classList.add("content__mobile-heading-container");

            //append inner mobile city container to parent mobile city container
            mobile_city_parent_container.appendChild(mobile_city_heading_container);
            
            container.insertBefore(mobile_city_parent_container, panel_container);
            mobile_city_heading_container.appendChild(cityheading);

            //create menu right and assign appropriate class
            let mobile_circle_menu = document.createElement("div");
            mobile_circle_menu.classList.add("content__side-menu");

            //append info container (australis svg and statistics to newly created menu). 
            //also set info_container opacity to zero, fades in as circle menu grows
            mobile_circle_menu.appendChild(info_container);
            
            info_container.style.opacity = 0;
            info_container.style.transform = "scale(0)";

            //append new menu to body (its a fixed element)
            document.body.appendChild(mobile_circle_menu);

            //grab append navigation box to photo container
            image_container.appendChild(navigation_container);
           
            //create hamburger menu
        }
    }

    //if resized to desktop like dimensions
    if (window.innerWidth >= 1150) {
        //basic check to see if dom already set for desktop
        if ( document.querySelector('.content__side-menu') ) {

            //fill side panel
            //relocate side menu info panel
            info_panel.appendChild(cityheading);

            //delete makeshift mobilecityheading structure
            let makeshift_mobile_header = document.querySelector(".content__mobile-heading-parent-container");
            container.removeChild(makeshift_mobile_header);

            //append side panel info container to left panel
            let muh_info_container = document.querySelector(".content__info-container");
            info_panel.appendChild(muh_info_container);
            info_container.style.opacity = 1;
            info_container.style.transform = "scale(1)";

            //remove side menu
            let side_menu_delete = document.querySelector(".content__side-menu");
            document.body.removeChild(side_menu_delete);

            //reposition nav arrows
            info_panel.appendChild(navigation_container);
        
        }
    }
}
// turn back on for production
const website_boot = () => {

    restructure_dom();


    setInterval(nextTransition, 5000);

    // let load_screen_div = document.querySelector(".loadscreen");

    // Velocity(load_screen_div, {opacity: 0}, {
    //     duration: 2000,
    //     complete: function() {
    //         document.body.removeChild(load_screen_div);
    //         setInterval(nextTransition, 5000);
    //     }
    // });


    

}



