// Budget controller
var budgetController = (function(){

    //Function contructors for Expense and Income
    var Expense  = function(id , description , value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id , description , value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Common data structure to store the data
    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        } sadasd
    }
    return {
        addItem : function(){

        }
    }
})();

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
    // Function handling all the event listeners
    var EventListeners = function (){
        var Dom = UiCtrl.PublicDomString();
        document.querySelector(Dom.btn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress' , (event)=>{
        if(event.keyCode === 13){
            ctrlAddItem();
        };
    });
};
    

    var ctrlAddItem = function(){
        

        // 1 . Get item from the input field 
        var input = UiCtrl.getInput();
       

        // 2. Add item to buget contoller

        // 3. Add item to UI 

        // 4. Calculate the budget 

        // 5. Add the budget to the UI
    }
    
    //Function initiated at the begining
    return{
        init : function(){
            console.log('Function has started');
            EventListeners();
        }
    }
    

})(budgetController , UiController);
