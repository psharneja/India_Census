const in_folder ='data/';
const fs = require('fs');
var file_names = ['India2011.csv','IndiaSC2011.csv','IndiaST2011.csv'];

//for reading file names from pre defined directory
/*fs.readdir(in_folder, (err, files) => {
    files.forEach(function(i){
                      tasks(in_folder + i);

                    console.log(i);
        
                  });
})*/


var headers = []; //title details


//objects for json
var age_wise = {};
var graduates = {};
var education = {};


file_names.forEach(function(i){
 //calling tasks function
    tasks(in_folder + i);
});

//calling file write function
writing(age_wise,graduates);

function tasks(file){
    
    var age_det;
    var state_det;
    var edu_det;
    
    fs.readFileSync(file).toString().split('\n').forEach(function (line_value, index_value) {
    var row=line_value.split(','); //diving row in cells and getting array of cells
        if(index_value === 0){
            headers = row;//saving first header row
        }
    
        if(index_value !== 0 && line_value !== ''){
                
            if( row[4] === 'Total' && row [5] !== 'All ages'){
                //age wise data distribution
                var literate_population = parseInt(row[12]);
                var literate_males = parseInt(row[13]);
                var literate_females = parseInt(row[14]);
                
                if(row[5] in age_wise){
                    age_det = row[5];
                    age_wise[age_det]._all = age_wise[age_det]._all + literate_population;
                    age_wise[age_det]._males = age_wise[age_det]._males + literate_males;
                    age_wise[age_det]._females = age_wise[age_det]._females + literate_females;
                }else {
                    age_det = row[5];
                    age_wise[age_det] = {
                        _all: literate_population,
                        _males: literate_males,
                        _females: literate_females
                    };

                }
                
                // all graduates data
                var state = row[3];
                var g_all = parseInt(row[39]);
                var g_males = parseInt(row[40]);
                var g_females = parseInt(row[41]);
                            
                if(row[3] in graduates){
                    state_det = row[3].replace(/State - /g, '');
                    graduates[state_det].state_name = row[3].replace(/State - /g, '');
                    graduates[state_det].grad_all = graduates[state_det].grad_all + g_all;
                    graduates[state_det].grad_males = graduates[state_det].grad_males + g_males;
                    graduates[state_det].grad_females = graduates[state_det].grad_females + g_females;
                }else {
                    state_det = row[3].replace(/State - /g, '');
                    graduates[state_det] = {
                        state_name: row[3].replace(/State - /g, ''),
                        grad_all: g_all,
                        grad_males: g_males,
                        grad_females: g_females
                    };

                }
                //Education level of all categories
                for(var indexes = 15; indexes <43; indexes = indexes + 3 ){

                    var parts = headers[indexes].trim().match(/^Educational level\s+-\s+(.*[^\\*])\s+-\s+\w*$/i);
                    var headingname = parts[1];
                    if( headingname in education ){
                        education[headingname].total = education[headingname].total+parseInt(row[indexes]);
                    } else {
                        education[headingname] = {
                            education_level: headingname,
                            total: parseInt(row[indexes])
                        };
                    }
                    
                }
                
            }
            
        }
        
        
        
        
        
    })

}

// writing objects as json files
function writing(){
    fs.writeFileSync('./output_files/age_wise_data.json', JSON.stringify(age_wise));
    fs.writeFileSync('./output_files/graduates_data.json', JSON.stringify(graduates));
    fs.writeFileSync('./output_files/literate.json', JSON.stringify(education));

}





