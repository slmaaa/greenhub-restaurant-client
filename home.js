import "https://cdn.skypack.dev/preact/debug";
import { h } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
const html = htm.bind(h);
import {
    useEffect,
    useState,
    useRef,
} from "https://cdn.skypack.dev/preact/hooks";

export const Home = ({ setCurrentPage, restaurant }) => {

    return html `
    <div class="hero is-flex is-flex-direction-column full-height">
      <div class="px-5 pt-5 is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-start">
        <div class="header">
          <h1 class="title ml-1 is-4 has-text-primary is-primary has-text-weight-bold">
            Hi, ${restaurant.current.name}
          </h1>
        </div>
        <div id="button-row-1" class="is-flex is-justify-content-space-between my-3">
          <div id=" lend-button" class="button is-success is-light admin-button is-large">
            <span class="is-4">Lend Out</span>
          </div>
          <div id="collect-button" class="button is-warning is-light admin-button is-large">
            <span class="is-4">Collect </span>
          </div>
        </div>
        <div id="button-row-2" class="is-flex is-justify-content-space-between my-3">
          <div id="coupon-button" class="button is-info is-light admin-button is-large">
            <span class="is-4">Coupon</span>
          </div>
          <div id="top-up-button" class="button is-danger is-light admin-button is-large">
            <span class=" is-4">Top-up</span>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default Home;