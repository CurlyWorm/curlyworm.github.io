var output = document.getElementById("output");
var button = document.getElementById("btn");
// i don't know why i do stuff in the way i do but honestly i cba rewriting stuff when it works :)
// i am also not a programmer i'm just a cat on the internet who knows how to use google
// Function to handle the comparison
function compare() {
    pushtolocalstorage();
    let arr1 = JSON.parse($('#input1').val());
    let arr2 = JSON.parse($('#input2').val());
    let compared = arr2.filter(x => !arr1.includes(x));
    let fishdiff = [];

    // Check the state toggles
    let includeRegularFish = document.getElementById("regularFishToggle").checked;
    let includeBigFish = document.getElementById("bigFishToggle").checked;
    let includeSpearfishing = document.getElementById("spearfishingToggle").checked;

    // rarity 1 = normal
    // rarity 2 = big
    compared.forEach((element) => {
        let found = fishlist[0][element];
        let foundspearfish = spearfishlist[element];

        if (found === undefined) {
            console.log(element + " is probably a spearfish, checking against spearfish list");
            if (includeSpearfishing && foundspearfish) {
                fishdiff.push(foundspearfish);
            }
        } else {
            if ((includeRegularFish && found.rarity == 1) || (includeBigFish && found.rarity == 2)) {
                fishdiff.push(found);
            }
        }
    });

    let fishdiff_names = fishdiff.map(fish => fish.name);
    return fishdiff_names.join('\n');
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
    // put the right value from last session back
    let rightoutput = localStorage.getItem('rightinput');
    document.getElementById("input2").value = rightoutput;
}

// Event listener for the Compare button
button.addEventListener('click', () => {
    let compared = compare();
    output.value = compared;
});


