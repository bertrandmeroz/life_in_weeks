var prompt_age = -1;
var prompt_genre = "femme";

window.onload = function() {
    

    document.getElementById("frm2").addEventListener('click', function (event) {
        if (event.target && event.target.matches("input[type='radio']")) {
            if (prompt_age != -1){
                d3.select("svg")
                    .remove();
            }
            prompt_genre = document.querySelector('input[name="genres"]:checked').value;
            console.log("genre", prompt_genre);
            console.log("type de genre:", typeof(prompt_genre));
            if (prompt_age != -1){
                prompt_age = parseFloat(document.getElementById("age_i").value);
                console.log("Updated age:", prompt_age);
                console.log("type de Updated age:", typeof(prompt_age));

                console.log("genre avant lancer", prompt_genre);

                if (prompt_genre=="femme"){
                    console.log("lancer femme");
                    affichecanvas("f_02.csv");
                }
                else{
                    console.log("lancer homme");
                    affichecanvas("h_01.csv");
                }
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
        console.log("Updated age:", prompt_age);
        console.log("type de Updated age:", typeof(prompt_age));
        console.log("genre", prompt_genre);
        console.log("type de genre:", typeof(prompt_genre));
        if (prompt_genre=="femme"){
            affichecanvas("f_02.csv");
        }
        else{
            affichecanvas("h_01.csv");
        }
    });

    console.log("Page fully loaded");
};

console.log("Updated age:", prompt_age);


function affichecanvas(file){
    console.log(file);

    d3
        //.csv("f_01.csv")
        .csv(file)
        .then(function(data) {
            data.forEach(function(d) {
                d.Age = +d.Age;
                d.Annee_2021 = +d.Annee_2021
            });

            l_vie = prompt_age;
            document.getElementById("time").innerHTML= Object.entries(data[l_vie])[1][1] + " years";
            document.getElementById("time_left").innerHTML="Time left : ";
            console.log(data[l_vie]);
            console.log(Array.isArray(data));
            

            console.log(Object.entries(data[l_vie])[1][1]);
            
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

                console.log("l_vie", l_vie);
                console.log("echelle", echelle);
                console.log("l_vie_data", Object.entries(data[l_vie])[1][1]);
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
                else {
                    axisLeft.tickValues([1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, echelle]);
                };
                d3.select('#left').call(axisLeft);
    });  
};