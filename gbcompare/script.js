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
    let includeOceanFish = document.getElementById("oceanFishToggle").checked;

    // rarity 1 = normal
    // rarity 2 = big
    // rarity 3 = ocean fish blue/big
    compared.forEach((element) => {
        let found = fishlist[0][element];
        let foundspearfish = spearfishlist[element];
        let foundoceanfish = oceanfishlist[element];

        if (found === undefined) {
            console.log(element + " is probably a spearfish, checking against spearfish list");
            if (includeSpearfishing && foundspearfish) {
                fishdiff.push(foundspearfish);
            }
        } else {
            if ((includeRegularFish && found.rarity == 1) || (includeBigFish && found.rarity == 2) || (includeOceanFish && foundoceanfish)) {
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
    updateEntryCount('input1', 'input1_count');
    // store the right value
    let rightinput = document.getElementById("input2").value;
    localStorage.setItem("rightinput", rightinput);
    updateEntryCount('input2', 'input2_count');
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

// Function to filter the output
function filterOutput(searchTerm) {
    var compared = compare(); // Get the original comparison results
    var filteredResults = compared.split('\n').filter(function(line) {
        return line.toLowerCase().includes(searchTerm); // Filter lines that contain the search term
    });
    
    // Sort the filtered results alphabetically
    filteredResults.sort();
    
    // Join the filtered lines back together
    output.value = filteredResults.join('\n');
}

// Event listener for the Compare button
button.addEventListener('click', function() {
    var compared = compare();
    output.value = compared;
    output.value = sortAlphabetically(compared);
    
    // reset scroll position
    document.getElementById("output").scrollTop = 0;
});

// sort array alphabetically
function sortAlphabetically(text) {
    var lines = text.split('\n');
    lines.sort();
    return lines.join('\n');
}

// Event listener for the search bar
document.getElementById('searchBar').addEventListener('input', function() {
    var searchTerm = this.value.trim(); // Get the value of the search bar
    if (searchTerm === '') {
        // If search bar is empty, show original comparison results sorted alphabetically
        output.value = sortAlphabetically(compare());
    } else {
        filterOutput(searchTerm); // Filter the output based on the search term
    }
    
    // reset scroll position
    document.getElementById("output").scrollTop = 0;
});

// entry count in lists
function updateEntryCount(inputId, countId) {
    var input = document.getElementById(inputId);
    var count = document.getElementById(countId);
    var lines = input.value.trim().split('\n');
    var totalCount = 0;
    var lastLineEndedWithComma = false;
    // do something with this at some point so when new fish added dynamically increases fish amount
    var totalFishAmount = 1525;
    
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line || isNaN(parseInt(line[0]))) {
            continue;
        }
        if (line.endsWith(',')) {
            totalCount++;
            lastLineEndedWithComma = true;
        } else {
            if (lastLineEndedWithComma) {
                totalCount++;
            }
            lastLineEndedWithComma = false;
        }
    }
    count.textContent = totalCount + "/" + totalFishAmount;
}

updateEntryCount('input1', 'input1_count');
updateEntryCount('input2', 'input2_count');

document.getElementById('input1').addEventListener('input', function() {
    updateEntryCount('input1', 'input1_count');
});

document.getElementById('input2').addEventListener('input', function() {
    updateEntryCount('input2', 'input2_count');
});

// flip inputs
document.getElementById("flipBtn").addEventListener("click", function() {
    let templeftinput = document.getElementById("input1").value;
    let temprightinput = document.getElementById("input2").value;
    document.getElementById("input1").value = temprightinput;
    document.getElementById("input2").value = templeftinput;
    updateEntryCount('input1', 'input1_count');
    updateEntryCount('input2', 'input2_count');
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("output").value = "";
    document.getElementById("searchBar").value = ""; // Clear the search bar
    pullfromlocalstorage();
    
    // reset scroll position
    document.getElementById("output").scrollTop = 0;
});