let donnees = [1,10,20,40,51]
let corps = d3.select('body');
let canevas =corps.append('svg')
    .attr('width', 510)
    .attr('height', 510);

let carre = canevas.append('rect')
    .attr('x',50)
    .attr('y',50)
    .attr('width',10)
    .attr('height',10)
    .style ('fill', black)

    canevas.selectAll('rect')
        .data(donnees)
        .enter()
        .append('rect')
            .attr('x', (d,i)=>i*20)
            .attr('y',50)
            .attr('width',10)
            .attr('height',10)
            .style ('fill', black)