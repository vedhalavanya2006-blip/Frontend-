function checkLucky() {

    let num = document.getElementById("num").value;
    let result = document.getElementById("result");

    if(num === ""){
        result.innerHTML = "Please enter a number";
        result.style.color = "red";
        return;
    }

    num = parseInt(num);

    // Lucky Number Condition
    if(num === 7 || num % 7 === 0){
        result.innerHTML = "🎉 Lucky Number!";
        result.style.color = "green";
    }
    else{
        result.innerHTML = "😔 Better Luck Next Time";
        result.style.color = "red";
    }
}