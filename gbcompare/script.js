var output = document.getElementById("output");
var button = document.getElementById("btn");
// i don't know why i do stuff in the way i do
console.log(items)

button.addEventListener('click', () => {
    let arr1 = JSON.parse($('#input1').val());
    let arr2 = JSON.parse($('#input2').val());
    let notinleft = arr2.filter(x => !arr1.includes(x));
    const fish = []
    notinleft.forEach((element) =>  {
        found = items[0][element]
        fish.push(found)
    });
    output.value = fish.join('\n');
})
