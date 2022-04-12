import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";


const Scan = () => {
    const cameraId = useRef(null);
    useEffect(() => {
        const html5QrCode = new Html5Qrcode( /* element id */ "reader");
        const size = Math.round(window.innerWidth * 0.7);
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            alert(decodedText);
        };
        const config = { fps: 10, qrbox: { width: size, height: size } };
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

    }, []);
    return html `
    
    <div class="hero is-flex is-flex-direction-column full-height">
        <div class="px-5 pt-5 is-flex is-flex-direction-column is-justify-content-start">
            <div class="header">
                <h1 class="title ml-1 is-4 has-text-primary is-primary has-text-weight-bold">
                    Green
                </h1>
            </div>
        </div>
        <div id="reader" class="has-background-black qr-reader"></div>
    </div>`
}
export default Scan;