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

    var MAX_VALUES_TO_ENTER;
    var MIN_TIME;
    var MAX_TIME;

    if (document.cookie != null) {
        MAX_VALUES_TO_ENTER = getCookie("max_values_to_enter");
        MIN_TIME = getCookie("min_time");
        MAX_TIME = getCookie("max_time");
    }

    var index = 0;

    const structure = document.getElementById("structure_selected").textContent.trim();

    if (structure == "Narbonne" || structure == "Sigean Corbières Méditerranée")
    {
        const demoClasses = document.querySelectorAll('.card-text');

        var buttonSave = document.getElementsByClassName("btn")[1];

        buttonSave.addEventListener("click", (event) => {loadValues()});

        var divEl = demoClasses[0];
        divEl.insertAdjacentHTML('afterbegin', '<div id="div_two" style="margin-bottom: 15px"></div>');

        var divTwo = document.getElementById("div_two");

        var textNumberOccurences = document.createElement("label");
        textNumberOccurences.setAttribute("id", "textNumberOccurences");
        textNumberOccurences.style.width = "180px";
        textNumberOccurences.style.marginBottom = "10px";

        var inputNumberOccurences = document.createElement("input");
        inputNumberOccurences.setAttribute("id", "inputNumberOccurences");
        inputNumberOccurences.setAttribute("type", "number");
        inputNumberOccurences.value = MAX_VALUES_TO_ENTER;

        var textMinimalTime = document.createElement("label");
        textMinimalTime.setAttribute("id", "textMinimalTime");
        textMinimalTime.style.width = "180px";
        textMinimalTime.style.marginBottom = "10px";

        var inputMinimalTime = document.createElement("input");
        inputMinimalTime.setAttribute("id", "inputMinimalTime");
        inputMinimalTime.setAttribute("type", "number");
        inputMinimalTime.value = MIN_TIME;

        var textMaximalTime = document.createElement("label");
        textMaximalTime.setAttribute("id", "textMaximalTime");
        textMaximalTime.style.width = "180px";
        textMaximalTime.style.marginBottom = "15px";

        var inputMaximalTime = document.createElement("input");
        inputMaximalTime.setAttribute("id", "inputMaximalTime");
        inputMaximalTime.setAttribute("type", "number");
        inputMaximalTime.value = MAX_TIME;

        var myButton = document.createElement("button");
        myButton.classList.add("btn", "btn-primary", "btn-submit", "me-1", "waves-effect", "waves-float", "waves-light");

        textNumberOccurences.innerHTML = "Nombre d'occurences";
        textMinimalTime.innerHTML = "Temps minimal";
        textMaximalTime.innerHTML = "Temps maximal";

        myButton.innerHTML = "Go !";

        var interval;

        myButton.addEventListener("click", function() {

            MAX_VALUES_TO_ENTER = inputNumberOccurences.value;
            MIN_TIME = inputMinimalTime.value;
            MAX_TIME = inputMaximalTime.value;

            if (MAX_VALUES_TO_ENTER < 1) {
                alert("Le nombre d'occurences doit être strictement positif");
                return;
            }

            if (MAX_VALUES_TO_ENTER > 30) {
                alert("Le nombre d'occurences ne peut être supérieur à 30");
                return;
            }

            if (MIN_TIME < 1) {
                alert("Le temps minimal ne peut être inférieur à 1s");
                return;
            }

            if (MAX_TIME < MIN_TIME) {
                alert("Le temps maximal ne peut être inférieur au temps minimal");
                return;
            }

            // Update the cookie with values
            document.cookie = "max_values_to_enter=" + MAX_VALUES_TO_ENTER;
            document.cookie = "min_time=" + MIN_TIME;
            document.cookie = "max_time=" + MAX_TIME;
            document.cookie = "SameSite=None";

            setDelay();
        });

        function setDelay() {

            clearInterval(interval);

            if (index >= MAX_VALUES_TO_ENTER) {
                return;
            }

            var rand = getRandomInt(MIN_TIME, MAX_TIME);

            loadValues();
            buttonSave.click();

            ++index;

            interval = setInterval(setDelay, rand * 1000);
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //divTwo.appendChild(divBlock);

        divTwo.appendChild(textNumberOccurences);
        divTwo.appendChild(inputNumberOccurences);

        divTwo.appendChild(document.createElement("br"));

        divTwo.appendChild(textMinimalTime);
        divTwo.appendChild(inputMinimalTime);

        divTwo.appendChild(document.createElement("br"));

        divTwo.appendChild(textMaximalTime);
        divTwo.appendChild(inputMaximalTime);

        divTwo.appendChild(document.createElement("br"));

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

    function getCookie(cookieName) {
        const name = cookieName + "=";
        const cDecoded = decodeURIComponent(document.cookie);
        const cArr = cDecoded .split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    }
})();