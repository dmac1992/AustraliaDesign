import flindersImage from '../img/flinders.jpg';
import fedsquareImage from '../img/fedsquare.jpg';
import yarraImage from '../img/yarra.jpg';

import harbourBridge from '../img/harbourbridge.jpg';
import bondi from '../img/bondi.jpg';
import operaHouse from '../img/operahouse.jpg';


export const locations = [
    {
        "city": "Melbourne",
        "state": "Vic",
        "population": "5,000,000",
        "elevation": "31m",
        "area": "9,992.5 km&sup2",
        "landmarks": [
            {
                "image": flindersImage,
                "name": "flinders"
            },
            {
                "image": fedsquareImage,
                "name": "federation square"
            },
            {
                "image": yarraImage,
                "name": "yarra river"
            }
        ]
    },
    {
       "city": "Sydney",
       "state": "Nsw",
       "population": "5,100,000",
       "elevation" : "80m",
       "area": "12,368 km&sup2",
       "landmarks": [
           {
               "image": harbourBridge,
               "name": "harbour bridge"
           },
           {
               "image": bondi,
               "name": "bondi beach"
           },
           {
               "image": operaHouse,
               "name": "opera house"
           }
       ]
    }
]