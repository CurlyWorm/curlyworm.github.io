var output = document.getElementById("output");
var button = document.getElementById("btn");
// i don't know why i do stuff in the way i do but honestly i cba rewriting stuff when it works :)
// i am also not a programmer i'm just a cat on the internet who knows how to use google
function compare() {
    pushtolocalstorage()
    let arr1 = JSON.parse($('#input1').val());
    let arr2 = JSON.parse($('#input2').val());
    let compared = arr2.filter(x => !arr1.includes(x));
    let fishdiff = []
    var big = ""
    // check if button is toggled
    if ($("#bigfishbtn").hasClass("active")) {
        var big = "bigfish"
    } else {
        // nothing
    }
    // find differences
    compared.forEach((element) =>  {
        found = fishlist[0][element]
        if (found === undefined) {
            console.log(element+" was undefined, probably a spearfish")
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
}

function pushtolocalstorage() {
    console.log("pushing inputs to local storage")
    // store the left value
    let leftinput = document.getElementById("input1").value;
    localStorage.setItem("leftinput", leftinput);
    // store the right value
    let rightinput = document.getElementById("input2").value;
    localStorage.setItem("rightinput", rightinput);
}

function pullfromlocalstorage() {
    console.log("pulling from local storage")
    // put the left value from last session back
    let leftoutput = localStorage.getItem('leftinput');
    document.getElementById("input1").value = leftoutput;
    console.log(leftoutput)
    // put the right value from last session back
    let rightoutput = localStorage.getItem('rightinput');
    document.getElementById("input2").value = rightoutput;
    console.log(rightoutput)
}

button.addEventListener('click', () => {
    let compared = compare()
    output.value = compared 
})