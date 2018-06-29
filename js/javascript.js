function getRisk(score){
    if(score < 3) return 'LOW';
    if(score < 6) return 'MEDIUM';
    if(score <= 9) return 'HIGH';
}

function getCriticaly(L, I){
    //NOTE
    if(L == "LOW" && I == "LOW") return 'NOTE';

    //LOW
    if(L == "LOW" && I == "MEDIUM") return 'LOW';
    if(L == "MEDIUM" && I == "LOW") return 'LOW';
    
    //MEDIUM
    if(L == "LOW" && I == "HIGH") return 'MEDIUM';
    if(L == "MEDIUM" && I == "MEDIUM") return 'MEDIUM';
    if(L == "HIGH" && I == "LOW") return 'MEDIUM';

    //HIGH
    if(L == "HIGH" && I == "MEDIUM") return 'HIGH';
    if(L == "MEDIUM" && I == "HIGH") return 'HIGH';

    //CRITICAL
    if(L == "HIGH" && I == "HIGH") return 'CRITICAL';
}

function deleteClass(){
    $(".LS").removeClass("bNote");
    $(".LS").removeClass("bMedium");
    $(".LS").removeClass("bHigh");
    $(".IS").removeClass("bNote");
    $(".IS").removeClass("bMedium");
    $(".IS").removeClass("bHigh");

    $(".RS").removeClass("bNote");
    $(".RS").removeClass("bLow");
    $(".RS").removeClass("bMedium");
    $(".RS").removeClass("bHigh");
    $(".RS").removeClass("bCritical");
}

function calculate(){
    var LS = 0;
    var IS = 0;

    LS = + $("#L1").val() +
    + $("#L2").val() +
    + $("#L3").val() +
    + $("#L4").val() +
    + $("#L5").val() +
    + $("#L6").val() +
    + $("#L7").val() +
    + $("#L8").val() + 0;

    IS = + $("#I1").val() +
    + $("#I2").val() +
    + $("#I3").val() +
    + $("#I4").val() +
    + $("#I5").val() +
    + $("#I6").val() +
    + $("#I7").val() +
    + $("#I8").val() + 0;
    
    LS = (LS/8).toFixed(3);
    IS = (IS/8).toFixed(3);

    FLS = getRisk(LS);
    FIS = getRisk(IS)

    $(".LS").text(LS + " " + FLS);
    $(".IS").text(IS + " " + FIS);

    deleteClass();

    if(getRisk(LS) == "LOW"){
        $(".LS").addClass("bNote");
    } else if (getRisk(LS) == "MEDIUM"){
        $(".LS").addClass("bMedium");
    } else {
        $(".LS").addClass("bHigh");
    }

    if(getRisk(IS) == "LOW"){
        $(".IS").addClass("bNote");
    } else if (getRisk(IS) == "MEDIUM"){
        $(".IS").addClass("bMedium");
    } else {
        $(".IS").addClass("bHigh");
    }

    //FINAL
    RS = getCriticaly(FLS, FIS);
    if(RS == "NOTE"){
        $(".RS").text(RS);
        $(".RS").addClass("bNote");
    } else if (RS == "LOW"){
        $(".RS").text(RS);
        $(".RS").addClass("bLow");
    } else if(RS == "MEDIUM"){
        $(".RS").text(RS);
        $(".RS").addClass("bMedium");
    } else if(RS == "HIGH"){
        $(".RS").text(RS);
        $(".RS").addClass("bHigh");
    } else if(RS == "CRITICAL"){
        $(".RS").text(RS);
        $(".RS").addClass("bCritical");
    } else {
        $(".RS").text(RS);
        $(".RS").addClass("bNote");
    }
}

/*
$("#btnCalculate").click(function(){
    calculate(1, false);
});
*/fi