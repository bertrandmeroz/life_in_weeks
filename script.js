var prompt_age = -1;
var prompt_genre = "femme";
var pays = "Switzerland"

window.onload = function() {
    
    document.getElementById("darker").addEventListener('click', hideinfobox);

    document.getElementById("frm2").addEventListener('click', function (event) {
        if (event.target && event.target.matches("input[type='radio']")) {
            if (prompt_age != -1){
                d3.select("svg")
                    .remove();
            }
            prompt_genre = document.querySelector('input[name="genres"]:checked').value;
            pays = document.getElementById("country").value;

            if (prompt_age != -1){
                prompt_age = parseFloat(document.getElementById("age_i").value);

                if (pays == "Switzerland"){
                    if (prompt_genre=="femme"){
                        affichecanvas("f_02.csv");
                        console.log("log 2");
                    }
                    else{
                        affichecanvas("h_01.csv");
                    }
                }
                else if (pays == "USA"){
                    if (prompt_genre=="femme"){
                        affichecanvas("uswomen_01.csv");
                    }
                    else{
                        affichecanvas("usmen_01.csv");
                    }
                }
                else if (pays == "Chad"){
                    if (prompt_genre=="femme"){
                        affichecanvas("chadfemme.csv");
                    }
                    else{
                        affichecanvas("chadhomme.csv");
                    };
                }
                else if (pays == "Russia"){
                    if (prompt_genre=="femme"){
                        affichecanvas("russiawomen.csv");
                    }
                    else{
                        affichecanvas("russiamen.csv");
                    };
                };
            }
        }
    });

    document.getElementById("frm1").addEventListener("submit", function(e) {
        e.preventDefault();
        if (prompt_age != -1){
            d3.select("svg")
                .remove();
        }
        prompt_age = parseFloat(document.getElementById("age_i").value);  // Update the variable with the input value
        prompt_genre = document.querySelector('input[name="genres"]:checked').value;
        pays = document.getElementById("country").value;
        if (pays == "Switzerland"){
            if (prompt_genre=="femme"){
                affichecanvas("f_02.csv");
            }
            else{
                affichecanvas("h_01.csv");
            }
        }
        else if (pays == "USA"){
            if (prompt_genre=="femme"){
                affichecanvas("uswomen_01.csv");
            }
            else{
                affichecanvas("usmen_01.csv");
            }
        }
        else if (pays == "Chad"){
            if (prompt_genre=="femme"){
                affichecanvas("chadfemme.csv");
            }
            else{
                affichecanvas("chadhomme.csv");
            };
        }
        else if (pays == "Russia"){
            if (prompt_genre=="femme"){
                affichecanvas("russiawomen.csv");
            }
            else{
                affichecanvas("russiamen.csv");
            };
        };
    });

    document.getElementById("frm3").addEventListener("change", function() {
        if (prompt_age != -1){
            d3.select("svg")
                .remove();
        }

        prompt_genre = document.querySelector('input[name="genres"]:checked').value;
        pays = document.getElementById("country").value;

        if (prompt_age != -1){

            prompt_age = parseFloat(document.getElementById("age_i").value);

            if (pays == "Switzerland"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("f_02.csv");
                    affichecanvas("f_02.csv");
                }
                else{
                    load_csv_for_html("h_01.csv");
                    affichecanvas("h_01.csv");
                }
            }
            else if (pays == "USA"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("uswomen_01.csv");
                    affichecanvas("uswomen_01.csv");
                }
                else{
                    load_csv_for_html("usmen_01.csv");
                    affichecanvas("usmen_01.csv");
                }
            }
            else if (pays == "Chad"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("chadfemme.csv");
                    affichecanvas("chadfemme.csv");
                }
                else{
                    load_csv_for_html("chadgomme.csv");
                    affichecanvas("chadhomme.csv");
                };
            }
            else if (pays == "Russia"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("russiawomen.csv");
                    affichecanvas("russiawomen.csv");
                }
                else{
                    load_csv_for_html("russiamen.csv");
                    affichecanvas("russiamen.csv");
                };
            };
        }
        else{
            if (pays == "Switzerland"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("f_02.csv");
                }
                else{
                    load_csv_for_html("h_01.csv");
                }
            }
            else if (pays == "USA"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("uswomen_01.csv");
                }
                else{
                    load_csv_for_html("usmen_01.csv");
                }
            }
            else if (pays == "Chad"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("chadfemme.csv");
                }
                else{
                    load_csv_for_html("chadgomme.csv");
                };
            }
            else if (pays == "Russia"){
                if (prompt_genre=="femme"){
                    load_csv_for_html("russiawomen.csv");
                }
                else{
                    load_csv_for_html("russiamen.csv");
                };
            };
        };
        
    });

};


function affichecanvas(file){

    d3
        .csv(file)
        .then(function(data) {
            data.forEach(function(d) {
                d.Age = +d.Age;
                d.Annee_2021 = +d.Annee_2021
            });

            l_vie = prompt_age;

            Age_max = data.map(object => {
                return object.Age;
            });


            max2 = Math.max(...Age_max);


            max = max2;


            document.getElementById("enter_age").innerHTML="Enter your age (between 0 and "+ max +") ";

            document.getElementById("age_i").max = max;
            document.getElementById("time").innerHTML= Object.entries(data[l_vie])[1][1] + " years";
            document.getElementById("time_left").innerHTML="Time left : ";
            espace = 13;
            bord = 7;
            decale = 10;

            const svg = d3
                .select("#content")
                .append('svg')
                    .attr('width', 800)
                    .attr('height', Object.entries(data[l_vie])[1][1]*espace + l_vie*espace +100)
                .append("g")
                    .attr("id", "left") 
                    .attr("transform", "translate(50, 50)");

                svg.selectAll('vecu_rect')
                    .data(Array.from({ length: l_vie*52 }, (_,i) => i + 1))
                    .enter()
                    .append('rect')
                        .attr('x', (d,i)=> (i%52)*espace+decale)
                        .attr('y',(d,i)=>Math.floor(i/52)*espace)
                        .attr('width',bord)
                        .attr('height',bord)
                        .style("stroke",  "#141414" )
                        .style('fill', '#7e5b5b ')
                        .style("stroke-width", 1);
                
                svg.selectAll('restant_rect')
                    .data(Array.from({ length: Object.entries(data[l_vie])[1][1]*52 }, (_,i) => i + 1))
                    .enter()
                    .append('rect')
                        //.attr('x', (d,i)=>i*20)
                        .attr('x', (d,i)=> (i%52)*espace+decale)
                        .attr('y',(d,i)=> (Math.floor(i/52))*espace +l_vie*espace)
                        .attr('width',bord)
                        .attr('height',bord)
                        .style("stroke",  "#141414" )
                        .style('fill', 'none') //'#ff262d'
                        .style("stroke-width", 1);

                echelle = (Object.entries(data[l_vie])[1][1]) + l_vie;
                if (Object.entries(data[l_vie])[1][1]%Math.floor(Object.entries(data[l_vie])[1][1])==0){
                    scale = d3.scaleLinear().domain([1, (Math.floor(Object.entries(data[l_vie])[1][1])+l_vie)]).range([bord/2, Math.floor(Object.entries(data[l_vie])[1][1])*espace + l_vie*espace + bord/2 - espace]);
                }
                else {
                    scale = d3.scaleLinear().domain([1, (Math.floor(Object.entries(data[l_vie])[1][1])+l_vie+1)]).range([bord/2, Math.floor(Object.entries(data[l_vie])[1][1])*espace + l_vie*espace + bord/2]);
                };   
                
                axisLeft = d3.axisLeft(scale).tickFormat(d3.format(".1f"));
                if (echelle < 90){
                    axisLeft.tickValues([1, 10, 20, 30, 40, 50, 60, 70, 80, echelle]);
                }
                else if (echelle < 100){
                    axisLeft.tickValues([1, 10, 20, 30, 40, 50, 60, 70, 80, 90, echelle]);
                }
                else if (echelle < 110){
                    axisLeft.tickValues([1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, echelle]);
                }
                else if (echelle < 120){
                    axisLeft.tickValues([1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, echelle]);
                };
                d3.select('#left').call(axisLeft);
    });  
};

function load_csv_for_html(file){
    d3
        .csv(file)
        .then(function(data) {
            data.forEach(function(d) {
                d.Age = +d.Age;
                d.Annee_2021 = +d.Annee_2021
            });
            Age_max = data.map(object => {
                return object.Age;
            });
            max2 = Math.max(...Age_max);
            max = max2;
            document.getElementById("enter_age").innerHTML="Enter your age (between 0 and "+ max +") ";
            document.getElementById("age_i").max = max;

            document.getElementById("time").innerHTML= "";
            document.getElementById("time_left").innerHTML="";
    });  
};

function showinfobox() {

    document.getElementById("info_box").style.display = "flow";
    document.getElementById("darker").style.display = "flow";
};
function hideinfobox() {

    document.getElementById("info_box").style.display = "none";
    document.getElementById("darker").style.display = "none";
};
