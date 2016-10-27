/**
 * Created by Romi on 26.10.16.
 */

var data_box = document.querySelectorAll('.data_box');
    prepareData();


function prepareData(data_box) {
    var foo = '';
    https.get('https://www.rescuetime.com/anapi/data?key=b63kycosejaunc0fr2uleftti_lgc2ypl9klmf_b&perspective=interval&interval=hour&restrict_begin=2016-10-26t10&restrict_end=2016-10-26&format=json'
        , function(res){
            response = res.statusCode;

            console.log(res.statusCode);

            res.on('data', function(more){
                foo += more;
            })
            res.on('end', function(){
                data_box.add = JSON.parse(foo).rows;
                console.log(data);
            })

        })
}