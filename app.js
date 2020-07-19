// Budget controller
var budgetController = (function(){
    // Some Code
})
();

// Ui Controller
var UiController = (function(){
    
    var DomString = {
        type : '.add__type',
        description : '.add__description',
        value : '.add__value',
        btn : '.add__btn'
        
    }
   

    
    return {
        // function to get the input vakue
        getInput : function(){
            return{
                getType  : document.querySelector(DomString.type).value,
                getDescription : document.querySelector(DomString.description).value,
                getValue : document.querySelector(DomString.value).value
            
            };
        },
        //Function to make the DomString Global
        PublicDomString : function(){
            return DomString;
        },
        
    }
})();


// Global App Controller
var controller = (function(bgtCtrl , UiCtrl){
    var Dom = UiCtrl.PublicDomString();

    var ctrlAddItem = function(){
        //console.log("Something happened");

        // 1 . Get item from the input field 
        console.log(UiCtrl.getInput());

        // 2. Add item to buget contoller

        // 3. Add item to UI 

        // 4. Calculate the budget 

        // 5. Add the budget to the UI
    }
    
    document.querySelector(Dom.btn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress' , (event)=>{
        if(event.keyCode === 13){
            ctrlAddItem();
        }
        
    })
    

})(budgetController , UiController);
