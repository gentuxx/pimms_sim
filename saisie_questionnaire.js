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

                /*
                document.querySelector("#name").value = "INDIVIDUEL";
                document.querySelector("#place").value = "NARBONNE";
                document.querySelector("#nb_duration_hour").value = 90;
                document.querySelector("#nb_mediator").value = 1;
                document.querySelector("#nb_attendee").value = 1;

                $("#operator_id").val(293);
                $("#operator_id").change();

                $("#operator_action_id").val(1393);
                $("#operator_action_id").change();
                */

                checkRadioButton("q0_rate5");
                checkRadioButton("q1_rate5");
                checkRadioButton("q2_rate5");
                checkRadioButton("q3_rate5");
                checkRadioButton("q4_rate5");
            }
        }

        divTwo.appendChild(combobox);

        /*
        document.querySelector("#name").value = "INDIVIDUEL";
        document.querySelector("#place").value = "NARBONNE";
        document.querySelector("#nb_duration_hour").value = 90;
        document.querySelector("#nb_mediator").value = 1;
        document.querySelector("#nb_attendee").value = 1;

        $("#operator_id").val(293);
        $("#operator_id").change();

        $("#operator_action_id").val(1393);
        $("#operator_action_id").change();*/
    }

    function checkRadioButton(name) {
        document.getElementById(name).checked = true;
        document.getElementById(name).click();
    }
})();