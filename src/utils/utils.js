var labels = document.querySelectorAll(".accordion__label");

for(var i = 0; i < labels.length; i++){
    labels[i].addEventListener("click", function(e){

        var label = e.target;
        var checkbox = label.parentElement.children[0];
        
        var accordion = label.parentElement.parentElement;

        if(!checkbox.checked){
            var checkboxes = accordion.querySelectorAll(".accordion__item input");
            for(var j = 0; j < checkboxes.length; j++){
                if(checkboxes[j].id !== checkbox.id && checkboxes[j].checked){
                    checkboxes[j].checked=false;
                }
            }
        }
        else{
            
        }


    });
}