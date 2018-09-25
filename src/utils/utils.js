var labels = document.querySelectorAll(".accordion__label");

for(var i = 0; i < labels.length; i++){
    labels[i].addEventListener("click", function(e){
        //console.log(e);

        var label = e.target;
        var checkbox = label.parentElement.children[0];
        
        var accordion = label.parentElement.parentElement;

        //console.log(accordion);

        if(!checkbox.checked){
            //console.log("Unchecking Box!");
            var checkboxes = accordion.querySelectorAll(".accordion__item input");
            //console.log(checkboxes);
            for(var j = 0; j < checkboxes.length; j++){
                if(checkboxes[j].id !== checkbox.id && checkboxes[j].checked){
                    console.log("Unchecking previous open box");
                    checkboxes[j].checked=false;
                }
            }
        }
        else{
            console.log("Unchecking box!");
        }


    });
}