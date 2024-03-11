var output = document.getElementById("output");
var button = document.getElementById("btn");
var bigfishbutton = document.getElementById("bigfishbtn")
// i don't know why i do stuff in the way i do but honestly i cba rewriting stuff when it works :)

function compare(big) {
    let arr1 = JSON.parse($('#input1').val());
    let arr2 = JSON.parse($('#input2').val());
    let compared = arr2.filter(x => !arr1.includes(x));
    let fishdiff = []
    // finds the differences
    compared.forEach((element) =>  {
        found = fishlist[0][element]
        if (found === undefined) {
            console.log(element+" was undefined")
        }
        fishdiff.push(found)
    });
    // filter undefined because some fish come back undefined and it's probably related to the fish list but i'll look into it eventually
    fishdiff_filtered = fishdiff.filter(element => element !== undefined);
    // checks if its a big fish or not if  that button is pressed
    if (big === "bigfish") {
        let bigfishdiff = []
        fishdiff_filtered.forEach((fish) =>{
            if (fish.rarity == 2) {
                // console.log(fish.name+" is a bigfish")
                bigfishdiff.push(fish.name)
            } else {
                // console.log(fish.name+" is not a bigfish, doing nothing")
            }
        })
        return bigfishdiff.join('\n');
    }
    // lists all fish if bigfish wasn't clicked
    else {
        fishdiff_names = []
        fishdiff_filtered.forEach((fish) =>{
            let nmf = fish.name
            fishdiff_names.push(nmf)
        })
        return fishdiff_names.join('\n');
    }
    return
}

button.addEventListener('click', () => {
    let compared = compare()
    output.value = compared 
})

bigfishbutton.addEventListener('click', () => {
    let compared = compare("bigfish")
    output.value = compared 
})