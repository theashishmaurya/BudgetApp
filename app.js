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
        } 
    }
    return {
        addItem : function(type , des , val){
            var newItem , Id;
            
            //Creating new Id
            if(data.allItems[type].length > 0){
                Id = data.allItems[type][data.allItems[type].length-1].id + 1;
            }
            else{
                Id = 0
            }
            
        
            //Creating new objects from the contructor on the basic of 'exp' or 'inc' type
            if(type === 'exp'){
                newItem = new Expense(Id, des , val);
            }
            else if (type === 'inc'){
                newItem = new Income(Id , des , val) ;
            }

            //Adding new item to the data structure
            data.allItems[type].push(newItem);

            // return newItem
            return newItem ;

        },

        testing : function(){
            console.log(data);
        }
    }
})();

// Ui Controller
var UiController = (function(){
    
    var DomString = {
        type : '.add__type',
        description : '.add__description',
        value : '.add__value',
        btn : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
        
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
        addListItem : function(obj , type){
            var html , newhtml ,element;
            //Create HTML string with placeholder text
            if (type === 'inc'){
                element = DomString.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type === 'exp'){
                element = DomString.expensesContainer;
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'
            }
            //Replace the placeholder text with some actual data
            newhtml = html.replace('%id%' , obj.id);
            newhtml = newhtml.replace('%description%' , obj.description)
            newhtml = newhtml.replace('%value%' , obj.value)

            // Insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend' , newhtml);


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
        var input , newItem ;

        // 1 . Get item from the input field 
         input = UiCtrl.getInput();
       

        // 2. Add item to buget contoller
         newItem = bgtCtrl.addItem(input.getType, input.getDescription , input.getValue);

        // 3. Add item to UI 
        UiCtrl.addListItem(newItem , input.getType);

        // 4. Calculate the budget 

        // 5. Add the budget to the UI
    }
    
    //Function initiated at the begining
    return{
        init : function(){
            console.log('Application  has started');
            EventListeners();
        }
    }
    

})(budgetController , UiController);

controller.init();