import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";
import WebSocket from "https://cdn.skypack.dev/isomorphic-ws";

const Scan = ({ setCurrentPage, restaurantRef, scanConfigRef }) => {
    const html5QrCode = useRef(null);
    const ws = useRef(null);
    const [isReaderReady, setIsReaderReady] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        console.log(scanConfigRef.current);
        ws.current = new WebSocket(
            "wss://greenhub.slmaaa.work/ws/user_db/qr_verify"
        );
        ws.current.onopen = () => {
            console.log("opened");
        };
        ws.current.onmessage = (data) => {
            console.log("Received data");
            const json = JSON.parse(data.data);
            console.log(json);
        };

        ws.current.onclose = () => {
            console.log("closed");
        };
    }, []);

    useEffect(() => {
        html5QrCode.current = new Html5Qrcode( /* element id */ "reader");
        const size = Math.round(window.innerWidth * 0.7);
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            console.log(decodedText);
            scanConfigRef.current.pid = decodedText;
            setIsCompleted(true);
            const request = {
                pid: decodedText,
                r_id: restaurantRef.current.restaurant_id,
                mode: scanConfigRef.current.mode,
            };
            ws.current.send(JSON.stringify(request));
        };
        const config = { fps: 10, qrbox: { width: 200, height: 200 } };
        html5QrCode.current.start({ facingMode: "environment" },
            config,
            qrCodeSuccessCallback
        );
        setIsReaderReady(true);
    }, []);

    useEffect(() => {
        if (isCompleted) {
            html5QrCode.current.stop();
        }
    }, [isCompleted]);

    return html `
    <div
      class="hero is-flex is-flex-direction-column full-height is-justify-content-center"
    >
      <div id="reader" class="has-background-black"></div>
    </div>
    <button
      class="button is-overlay is-primary is-light is-large m-4"
      onclick=${() => {
        setCurrentPage("HOME");
      }}
    >
      <span class="icon">
        <i class="fas fa-arrow-left"></i>
      </span>
    </button>
  `;
};
export default Scan;