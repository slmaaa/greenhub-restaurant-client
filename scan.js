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
        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             * 
             */
            if (devices && devices.length) {
                cameraId.current = devices[0].id;
                console.log(cameraId.current)
                    // .. use this to start scanning.
                html5QrCode.start(
                        cameraId.current, {
                            fps: 10, // Optional, frame per seconds for qr code scanning
                            qrbox: { width: size, height: size } // Optional, if you want bounded box UI
                        },
                        (decodedText, decodedResult) => {
                            console.log(decodedText, decodedResult);
                            alert(decodedText)
                        },
                        (errorMessage) => {
                            // parse error, ignore it.
                        })
                    .catch((err) => {
                        // Start failed, handle it.
                    });
            }
        }).catch(err => {
            console.log(err)
        });

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
        <div id="reader" class="has-background-black is-flex-grow-1"></div>
    </div>`
}
export default Scan;