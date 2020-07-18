// Budget controller
var budgetController = (function(){
    // Some Code
})
();

// Ui Controller
var UiController = (function(){
    //
})();


// Global App Controller
var controller = (function(bgtCtrl , UiCtrl){

    var ctrlAddItem = function(){
        //console.log("Something happened");

        // 1 . Get item from the input field 

        // 2. Add item to buget contoller

        // 3. Add item to UI 

        // 4. Calculate the budget 
        
        // 5. Add the budget to the UI
    }
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress' , (event)=>{
        if(event.keyCode === 13){
            ctrlAddItem();
        }
        
    })
    

})(budgetController , UiController);
