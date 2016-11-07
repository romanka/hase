/**
 * Created by Romi on 27.10.16.
 */

var path = require('path');
var https = require('https');
var notifier = require('node-notifier');
var morning_answered = false;
var triggerEvening = false;
var morning_evening_answered = false;

var startHour;
var hourlyTrigger;

function Surveys() {}

var surveyWindow_morning;
var surveyJSON_morning = {
    pages: [
        {
            name: "Morning Survey",
            questions: [
                {
                    type: "rating",
                    isRequired: true,
                    maximumRateDescription: "very good",
                    mininumRateDescription: "very poor",
                    name: "sleep_quality",
                    title: "Rate the quality of your sleep from the previous night",
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
                    type: "radiogroup",
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
                    name: "planned_activity",
                    title: "Have you planned any physical activity for today?",
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
                    name: "hours_planned_activity",
                    title: "How many hours of physical activity do you plan? (0 if none)",
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
            name: "Evening Survey",
            questions: [
                {
                    type: "rating",
                    isRequired: true,
                    maximumRateDescription: "very productive",
                    mininumRateDescription: "very distracted",
                    name: "total_daily_productivity",
                    title: "How productive were you the entire day?",
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
                    type: "radiogroup",
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
                    name: "planned_activity_evening",
                    title: "Did you plan any physical activity for today?",
                    validators: [
                        {
                            type: "answercount",
                            maxCount: "1",
                            minCount: "1"
                        }
                    ]
                },
                {
                    type: "radiogroup",
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
                    name: "fulfilled_activity",
                    title: "Did you keep your plans for physical activity?",
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


var surveyWindow_hourPM;
var surveyJSON_hourPM = {
    pages: [
        {
            name: "Hourly Survey Afternoon",
            questions: [
                {
                    type: "rating",
                    isRequired: true,
                    maximumRateDescription: "very productive",
                    mininumRateDescription: "very distracted",
                    name: "hourly_productivity_PM",
                    title: "How productive were you this past hour?",
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
                },
                {
                    type: "radiogroup",
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
                    name: "finished",
                    title: "Are you finished with your work for today?",
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

var surveyWindow_hourAM;
var surveyJSON_hourAM = {
    pages: [
        {
            name: "Hourly Survey Morning",
            questions: [
                {
                    type: "rating",
                    isRequired: true,
                    maximumRateDescription: "very productive",
                    mininumRateDescription: "very distracted",
                    name: "hourly_productivity_AM",
                    title: "How productive were you this past hour?",
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

/*
    surveyWindow_hourPM = new Survey.SurveyWindow(surveyJSON_hourPM);
    surveyWindow_morning = new Survey.SurveyWindow(surveyJSON_morning);
    surveyWindow_evening = new Survey.SurveyWindow(surveyJSON_evening);*/

    start();
};


function start(){
    //start function for the surveys
    //only triggered once as surveys.init is only called once
    //after that, the application runs in the background without being stopped

    //assume: first time application is opened, it is morning
    var wakeupTime = 1478345558; //testing reasons: 13.00
    calculateStartTime(wakeupTime);
    morningSurvey();
}

function morningSurvey(){
    morning_answered = true;
    surveyWindow_morning = new Survey.SurveyWindow(surveyJSON_morning);
    surveyWindow_morning.show();
    surveyWindow_morning.survey.onComplete.add(saveSurvey);
}

function saveSurvey(survey) {

    console.log(hourlyTrigger);
    var resultAsJSON = survey.data;
    var timeout = 1000; //set to 60*60*1000 afterwards

    if (resultAsJSON.finished === 'true'){
        triggerEvening = true;
    } else {
        triggerEvening = false;
    }

    if (!morning_answered && !triggerEvening) {
        setTimeout(function () { morningSurvey(); }, timeout);
    }
    if (!triggerEvening) {
        setTimeout(function () { hourlySurvey(); }, timeout);
    }

    //trigger evening when they answer with true (done with productivity)
    if (triggerEvening) {
        //KEEP 5 SEK TIMEOUT!!!!
        setTimeout(function () { eveningSurvey(); }, 5000);

        morning_answered = false;
        triggerEvening = false;
        morning_evening_answered = false;

        //todo: set time for next morning and trigger it in the morning

    }



}


function calculateStartTime(wakeTime){

    //TODO: get wakeup time from Jawbone!
    // awake_time returns an Epoch timestamp when the user awoke
    //right now: hardcoded to 11/5/2016, 7:32:38 AM


    var d = new Date(0);
    d.setUTCSeconds(wakeTime); //example return: Mon Nov 07 2016 15:11:28 GMT+0100 (CET)

    //calculate first timetrigger for event: round up from wakeupTime to next hour
    startHour = d.getHours()+1;
    hourlyTrigger = startHour;

    console.log(startHour);
}

function eveningSurvey(){
    morning_evening_answered = true;
    surveyWindow_evening = new Survey.SurveyWindow(surveyJSON_evening);
    surveyWindow_evening.show();
    surveyWindow_evening.survey.onComplete.add(saveSurvey);
}

function hourlySurvey(){
    //set correct time and date

    surveyJSON_hourAM.pages[0].questions[0].name = "How productive were you this past hour from " + hourlyTrigger + ":00 to " + (hourlyTrigger +1) + ":00?"

    //Check if morning or evening
    if (hourlyTrigger < 16) {
        //if after 16:00, trigger other event
        surveyWindow_hourAM = new Survey.SurveyWindow(surveyJSON_hourAM);
        surveyWindow_hourAM.show();
        surveyWindow_hourAM.survey.onComplete.add(saveSurvey);

    } else {
        surveyWindow_hourPM = new Survey.SurveyWindow(surveyJSON_hourPM);
        surveyWindow_hourPM.show();
        surveyWindow_hourPM.survey.onComplete.add(saveSurvey);
    }
    hourlyTrigger = hourlyTrigger + 1;
}



/*
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

};*/
