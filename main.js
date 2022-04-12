import "https://cdn.skypack.dev/preact/debug";
import { h, render } from "https://cdn.skypack.dev/preact";
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";

import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);

import Home from "./home.js";

// Firebase configuration

const Main = () => {
    //useStates for routing
    const user = useRef(null);
    const [currentPage, setCurrentPage] = useState("HOME");
    const [isLoading, setIsLoading] = useState(false);

    const restaurant = useRef({
        "restaurant_id": "d3f0c356-d8c9-4901-ab98-3256672e376e",
        "name": "Sang Kee Restaurant",
    })

    const _URL = new URL(document.location);
    const _GET = _URL.searchParams;

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

    if (isLoading) {
        return html `<p>Loading...</p>`;
    }
    let scene;
    switch (currentPage) {
        case "LOGIN":
            scene = html `<${Login} setCurrentPage=${setCurrentPage} />`;
            break;
        case "HOME":
            scene = html `<${Home} setCurrentPage=${setCurrentPage} restaurant=${restaurant} />`;
            break;
    }
    return scene;
};

render(html `<${Main} />`, document.body);