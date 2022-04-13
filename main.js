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
import Scan from "./scan.js";

// Firebase configuration

const Main = () => {
    //useStates for routing
    const user = useRef(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const [currentPage, setCurrentPage] = useState("HOME");
    const [isLoading, setIsLoading] = useState(false);

    const restaurantRef = useRef({
        restaurant_id: "d3f0c356-d8c9-4901-ab98-3256672e376e",
        name: "Sang Kee Restaurant",
    });

    const [scanConfig, setScanConfig] = useState({});

    const _URL = new URL(document.location);
    const _GET = _URL.searchParams;

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

    if (isLoading) {
        return html `<p>Loading...</p>`;
    }
    switch (currentPage) {
        case "LOGIN":
            return html `<${Login} setCurrentPage=${setCurrentPage} />`;
        case "HOME":
            return html `<${Home}
        setCurrentPage=${setCurrentPage}
        restaurantRef=${restaurantRef}
        setScanConfig=${setScanConfig}
        scanConfig=${scanConfig}
        isSuccess=${isSuccess}
        setIsSuccess=${setIsSuccess}
      />`;
        case "SCAN":
            return html `<${Scan}
        setCurrentPage=${setCurrentPage}
        restaurantRef=${restaurantRef}
        setIsSuccess=${setIsSuccess}
        setScanConfig=${setScanConfig}
        scanConfig=${scanConfig}
      />`;
    }
};

render(html `<${Main} />`, document.body);