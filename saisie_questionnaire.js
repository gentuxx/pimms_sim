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

    var name = document.getElementsByClassName("user-name")[0].outerText.toUpperCase();
    var bName = name.includes("LOIC") || name.includes("SOPHIE") || name.includes("SABRINA");

    if (!bName) {
        return;
    }

    var MAX_VALUES_TO_ENTER = 5;
    var MIN_TIME = 15;
    var MAX_TIME = 30;

    var index = 0;

    const structure = document.getElementById("structure_selected").textContent.trim();

    if (structure == "Narbonne" || structure == "Sigean Corbières Méditerranée")
    {
        const demoClasses = document.querySelectorAll('.card-text');

        var buttonSave = document.getElementsByClassName("btn")[1];

        buttonSave.addEventListener("click", (event) => {loadValues()});

        var divEl = demoClasses[0];
        divEl.insertAdjacentHTML('afterbegin', '<div id="div_two" style="margin-bottom: 15px" align="left"></div>');

        var divTwo = document.getElementById("div_two");
        var myButton = document.createElement("button");
        myButton.innerHTML = "Automatisation";

        var interval;

        myButton.addEventListener("click", function() {
            setDelay();
        });

        function setDelay() {

            clearInterval(interval);

            var rand = getRandomInt(MIN_TIME, MAX_TIME);

            loadValues();
            buttonSave.click();

            interval = setInterval(setDelay, rand * 1000);

            ++index;

            if (index >= MAX_VALUES_TO_ENTER) {
                clearInterval(interval);
                return;
            }
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        divTwo.appendChild(myButton);

        function loadValues() {

            uncheckRadioButton("q0_rate1");
            uncheckRadioButton("q0_rate2");
            uncheckRadioButton("q0_rate3");
            uncheckRadioButton("q0_rate4");
            uncheckRadioButton("q0_rate5");

            uncheckRadioButton("q1_rate1");
            uncheckRadioButton("q1_rate2");
            uncheckRadioButton("q1_rate3");
            uncheckRadioButton("q1_rate4");
            uncheckRadioButton("q1_rate5");

            uncheckRadioButton("q2_rate1");
            uncheckRadioButton("q2_rate2");
            uncheckRadioButton("q2_rate3");
            uncheckRadioButton("q2_rate4");
            uncheckRadioButton("q2_rate5");

            uncheckRadioButton("q3_rate1");
            uncheckRadioButton("q3_rate2");
            uncheckRadioButton("q3_rate3");
            uncheckRadioButton("q3_rate4");
            uncheckRadioButton("q3_rate5");

            uncheckRadioButton("q4_rate1");
            uncheckRadioButton("q4_rate2");
            uncheckRadioButton("q4_rate3");
            uncheckRadioButton("q4_rate4");
            uncheckRadioButton("q4_rate5");

            checkRadioButton("q0_rate5");
            checkRadioButton("q1_rate5");
            checkRadioButton("q2_rate5");
            checkRadioButton("q3_rate5");
            checkRadioButton("q4_rate5");
        }
    }

    function checkRadioButton(name) {
        document.getElementById(name).checked = true;
        document.getElementById(name).click();
    }

    function uncheckRadioButton(name) {
        document.getElementById(name).checked = false;
    }
})();