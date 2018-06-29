function getRisk(score){
    if(score < 3) return 'LOW';
    if(score < 6) return 'MEDIUM';
    if(score <= 9) return 'HIGH';
    //if(score >= 9) return 'CRITICAL';
}

function deleteClass(){
    $(".LS").removeClass("bNote");
    $(".LS").removeClass("bMedium");
    $(".LS").removeClass("bHigh");
    $(".RS").removeClass("bNote");
    $(".RS").removeClass("bMedium");
    $(".RS").removeClass("bHigh");
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

    //alert(LS);
    
    LS = (LS/8).toFixed(3);
    IS = (IS/8).toFixed(3);

    $(".LS").text(LS + " " + getRisk(LS));
    $(".IS").text(IS + " " + getRisk(IS));

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
}

/*
$("#btnCalculate").click(function(){
    calculate(1, false);
});
*/