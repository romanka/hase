/**
 * Created by Romi on 27.10.16.
 */

var path = require('path');
var https = require('https');
var notifier = require('node-notifier');


function Surveys() {}

var surveyWindow_morning;
var surveyJSON_morning = {
    pages: [
        {
            name: "Survey",
            questions: [
                {
                    type: "rating",
                    isRequired: true,
                    maximumRateDescription: "very good",
                    mininumRateDescription: "very poor",
                    name: "Rate the quality of your sleep from the previous night.",
                    rateValues: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7"
                    ]
                },
                {
                    type: "checkbox",
                    choices: [
                        {
                            value: "true",
                            text: "Yes"
                        },
                        {
                            value: "false",
                            text: "No"
                        }
                    ],
                    isRequired: true,
                    name: "Have you planned any physical activity for today?",
                    validators: [
                        {
                            type: "answercount",
                            maxCount: "1",
                            minCount: "1"
                        }
                    ]
                },
                {
                    type: "text",
                    isRequired: true,
                    name: "How many hours of physical activity did you plan? (0 if none)",
                    startWithNewLine: false,
                    validators: [
                        {
                            type: "numeric",
                            maxValue: "12",
                            minValue: "0"
                        }
                    ]
                }
            ]
        }
    ],
    requiredText: "",
    showQuestionNumbers: "off"
};

var surveyWindow_evening;
var surveyJSON_evening = {
    pages: [
        {
            name: "Survey",
            questions: [
                {
                    type: "rating",
                    isRequired: true,
                    maximumRateDescription: "very productive",
                    mininumRateDescription: "very distracted",
                    name: "How productive were you the entire day?",
                    rateValues: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7"
                    ]
                },
                {
                    type: "checkbox",
                    choices: [
                        {
                            value: "true",
                            text: "Yes"
                        },
                        {
                            value: "false",
                            text: "No"
                        }
                    ],
                    isRequired: true,
                    name: "Did you plan any physical activity for today?",
                    validators: [
                        {
                            type: "answercount",
                            maxCount: "1",
                            minCount: "1"
                        }
                    ]
                },
                {
                    type: "checkbox",
                    choices: [
                        {
                            value: "true",
                            text: "Yes"
                        },
                        {
                            value: "false",
                            text: "No"
                        },
                        {
                            value: "null",
                            text: "Not applicable"
                        }
                    ],
                    isRequired: true,
                    name: "Did you keep your plans for physical activity?",
                    startWithNewLine: false,
                    validators: [
                        {
                            type: "answercount",
                            maxCount: "1",
                            minCount: "1"
                        }
                    ]
                }
            ]
        }
    ],
    requiredText: "",
    showQuestionNumbers: "off"
};

var surveyWindow_hour;
var surveyJSON_hour = {
    pages: [
        {
            name: "How productive were you this past hour?",
            questions: [
                {
                    type: "rating",
                    isRequired: true,
                    maximumRateDescription: "very productive",
                    mininumRateDescription: "very distracted",
                    name: "How productive were you this past hour?",
                    rateValues: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7"
                    ],
                    validators: [
                        {
                            type: "answercount",
                            maxCount: "1",
                            minCount: "1"
                        }
                    ]
                }
            ]
        }
    ],
    requiredText: "",
    showQuestionNumbers: "off"
};


Surveys.init = function(){
    surveyWindow_hour = new Survey.SurveyWindow(surveyJSON_hour);
    surveyWindow_morning = new Survey.SurveyWindow(surveyJSON_morning);
    surveyWindow_evening = new Survey.SurveyWindow(surveyJSON_evening);


};

function saveSurvey(survey) {
    var resultAsString = JSON.stringify(survey.data);
    console.log(resultAsString); //send Ajax request to your web server.
}

// Add an event listeners
window.onready = function() {

    console.log("I was here!");
    Surveys.init();



    //var Min = getMinutes();
    //var trig_in = (59 - Min + 1)*60000;
    //var hour = getHour();
    //var time = getTime()+trig_in;

    //TODO: Tigger of hourly surveys
    surveyWindow_hour.show();

    //TODO: Trigger of evening surveys
    //surveyWindow_evening.show();

    //TODO: Trigger of morning surveys
    //surveyWindow_morning.show();

    //Use onComplete event to save the data
    surveyWindow_hour.survey.onComplete.add(saveSurvey);
    surveyWindow_morning.survey.onComplete.add(saveSurvey);
    surveyWindow_evening.survey.onComplete.add(saveSurvey);

};