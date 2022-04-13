import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";

export const Home = ({
        setCurrentPage,
        restaurantRef,
        isSuccess,
        setIsSuccess,
        setScanConfig,
        scanConfig,
    }) => {
        const [mode, setMode] = useState(null);
        const [modalActiveness, setModalActiveness] = useState("");
        const [modalInput, setModalInput] = useState("");

        const handleModeSelect = (mode) => {
            setIsSuccess(false);
            setScanConfig({...scanConfig, mode: mode });
            if (mode === "COUPON") {
                setCurrentPage("SCAN");
                return;
            }
            setMode(mode);
            setModalActiveness("is-active");
        };

        const handleQuickSelect = (amount) => {
            setScanConfig({...scanConfig, amount: amount });
            setCurrentPage("SCAN");
        };

        return html `
    <div class="modal ${modalActiveness}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box mx-4 is-flex is-flex-direction-column">
          <div class="header">
            <h1 class="title ml-1 mb-3 is-4 has-text-primary has-text-weight-bold">
              ${mode}
            </h1>
          </div>
          <div class="field">
            <label class="label"> ${
              mode === "LEND"
                ? "How many Greenhub you are lending out?"
                : mode === "COLLECT"
                ? "How many Greenhub you are collecting?"
                : "Please enter top up amount"
            }</label>
            </label>
            <div class="contro mx-1">
              <input class="input" type="text" placeholder="Only accept Integer" oninput=${(
                e
              ) => {
                setModalInput(e.target.value);
              }}>
            </div>
          </div>
          <button class="button is-primary is-light my-3" onclick=${() => {
            try {
              const amount = parseInt(modalInput);
              if (isNaN(amount) || amount < 0) {
                alert("Please enter a valid amount");
              } else {
                setScanConfig({ ...scanConfig, amount: amount });
                setCurrentPage("SCAN");
              }
            } catch (error) {
              console.log(error);
              alert("Please enter a valid amount");
            }
          }}>Comfirm</button>
          <span>Quick select</span>
          <div class="buttons my-3 is-flex is-flex-direction-row is-justify-content-center">
          ${
            mode === "TOP UP"
              ? html`
                  <button
                    class="button is-success is-large"
                    onclick=${() => {
                      handleQuickSelect(10);
                    }}
                  >
                    $10
                  </button>
                  <button
                    class="button is-info is-large"
                    onclick=${() => {
                      handleQuickSelect(20);
                    }}
                  >
                    $20
                  </button>
                  <button
                    class="button is-danger is-large"
                    onclick=${() => {
                      handleQuickSelect(100);
                    }}
                  >
                    $100
                  </button>
                `
              : html`
                  <button
                    class="button is-success is-large"
                    onclick=${() => {
                      handleQuickSelect(1);
                    }}
                  >
                    x1
                  </button>
                  <button
                    class="button is-info is-large"
                    onclick=${() => {
                      handleQuickSelect(2);
                    }}
                  >
                    x2
                  </button>
                  <button
                    class="button is-danger is-large"
                    onclick=${() => {
                      handleQuickSelect(3);
                    }}
                  >
                    x3
                  </button>
                `
          }
          </div>
        </div>
      </div> <button class="modal-close is-large" aria-label="close" onclick=${() => {
        setModalActiveness("");
      }}></button>
    </div>
    <div class="hero is-flex is-flex-direction-column full-height">
      <div class="px-5 pt-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start">
        <div class="header">
          <h1 class="title ml-1 mb-3 is-4 has-text-primary is-primary has-text-weight-bold">
            Hi, ${restaurantRef.current.name}
          </h1>
        </div>
        <div id="button-row-1" class="is-flex is-justify-content-space-between my-3">
          <div id=" lend-button" class="button is-success is-light admin-button is-large" onclick=${() => {
            handleModeSelect("LEND");
          }}>
            <span class="is-4">Lend Out</span>
          </div>
          <div id="collect-button" class="button is-warning is-light admin-button is-large" onclick=${() => {
            handleModeSelect("COLLECT");
          }}>
            <span class="is-4">Collect </span>
          </div>
        </div>
        <div id="button-row-2" class="is-flex is-justify-content-space-between my-3">
          <div id="coupon-button" class="button is-info is-light admin-button is-large" onclick=${() => {
            handleModeSelect("COUPON");
          }}>
            <span class="is-4">Coupon</span>
          </div>
          <div id="top-up-button" class="button is-danger is-light admin-button is-large" onclick=${() => {
            handleModeSelect("TOP UP");
          }}>
              <span class=" is-4">Top-up</span>
          </div>
        </div>
      </div>
      ${
        isSuccess
          ? html` <div
              class="notification is-primary notification-prop is-flex is-align-items-center"
            >
              <button
                class="delete"
                onclick=${() => {
                  setIsSuccess(false);
                }}
              ></button>
              <span class="icon-text is-align-items-center">
                <span class="is-size-5">Success</span>
                <span class="icon is-large">
                  <i class="fas fa-circle-check fa-2x"></i>
                </span>
              </span>
            </div>`
          : html``
      }
    </div>
`;
};

export default Home;