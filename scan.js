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

const Scan = ({
    setCurrentPage,
    restaurantRef,
    scanConfigRef,
    setIsSuccess,
}) => {
    const html5QrCode = useRef(null);
    const ws = useRef(null);
    const [isReaderReady, setIsReaderReady] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [notificationText, setNotificationText] = useState("");

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(decodedText);
        scanConfigRef.current.pid = decodedText;
        alert(decodedText);
        setIsCompleted(true);
        const request = {
            pid: decodedText,
            r_id: restaurantRef.current.restaurant_id,
            mode: scanConfigRef.current.mode,
            amount: scanConfigRef.current.amount,
        };
        ws.current.send(JSON.stringify(request));
    };
    const config = { fps: 10, qrbox: { width: 300, height: 300 } };

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
            if (result === "success") {
                setIsSuccess(true);
                setCurrentPage("HOME");
            } else {
                alert(json.reason);
                setIsCompleted(false);
            }
        };

        ws.current.onclose = () => {
            console.log("closed");
        };
    }, []);

    useEffect(() => {
        html5QrCode.current = new Html5Qrcode( /* element id */ "reader");
        const size = Math.round(window.innerWidth * 0.7);
        html5QrCode.current.start({ facingMode: "environment" },
            config,
            qrCodeSuccessCallback
        );
        setIsReaderReady(true);
    }, []);

    useEffect(() => {
        switch (scanConfigRef.current.mode) {
            case "LEND":
                setNotificationText(
                    `Lending out Greenhub x${scanConfigRef.current.amount}`
                );
                break;
            case "TOP UP":
                setNotificationText(`Topping up \$${scanConfigRef.current.amount}`);
                break;
            case "COLLECT":
                setNotificationText(
                    `Collecting Greenhub x${scanConfigRef.current.amount}`
                );
                break;
            case "COUPON":
                setNotificationText(`Scanning Coupon`);
                break;
        }
    }, []);

    useEffect(() => {
        if (isCompleted) {
            html5QrCode.current.stop();
        } else {
            html5QrCode.current.start({ facingMode: "environment" },
                config,
                qrCodeSuccessCallback
            );
        }
    }, [isCompleted]);

    return html `
    <div
      class="hero is-flex is-flex-direction-column full-height is-justify-content-space-between has-background-black"
    >
      <div
        class="is-flex is-flex-direction-column is-justify-content-center has-background-black qr-reader"
      >
        <div id="reader" class="has-background-black"></div>
      </div>
      <div
        class="notification notification-prop is-primary is-light is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between"
      >
        <div class="is-size-6 has-text-weight-medium">${notificationText}</div>
        <button
          class="button is-danger is-light"
          onclick=${() => {
            setCurrentPage("HOME");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  `;
};
export default Scan;