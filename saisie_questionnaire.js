// ==UserScript==
// @name         questionnaire
// @namespace    http://tampermonkey.net/
// @version      2024-08-09
// @description  Add a selection to fill the form faster
// @author       You
// @match        https://pimms-mediation.lebureauvirtuel.fr/questionnaire
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const structure = document.getElementById("structure_selected").textContent.trim();

    if (structure == "Narbonne" || structure == "Sigean Corbières Méditerranée")
    {
        const demoClasses = document.querySelectorAll('.card-text');

        var divEl = demoClasses[0];
        divEl.insertAdjacentHTML('afterbegin', '<div id="div_two" style="margin-bottom: 15px" align="left"></div>');

        var divTwo = document.getElementById("div_two");
        var combobox = document.createElement("select");

        combobox.options[0] = new Option("5 étoiles", "5 étoiles");

        Array.from(combobox.options).forEach((element) => (element.onclick = loadValues));

        function loadValues() {

            if (combobox.value.trim() == "5 étoiles") {

                checkRadioButton("q0_rate5");
                checkRadioButton("q1_rate5");
                checkRadioButton("q2_rate5");
                checkRadioButton("q3_rate5");
                checkRadioButton("q4_rate5");
            }
        }
        divTwo.appendChild(combobox);
    }

    function checkRadioButton(name) {
        document.getElementById(name).checked = true;
        document.getElementById(name).click();
    }
})();