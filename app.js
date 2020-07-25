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
        } ,
        budget : 0,
        percentage : -1
    }

    var calculateTotal = function(type){
        var sum = 0 ;
        data.allItems[type].forEach(function(current){
                sum += current.value ;
        });
        data.totals[type] = sum;
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

        deleteBudget : function(type , id){
            var IdArr , index ;
             IdArr = data.allItems[type].map(function(current){
                return current.id;
            });

            index = IdArr.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index , 1) ;
            }



        },

        calculateBudget : function(){
            
             // Calculate total income and expense
             calculateTotal('exp');
             calculateTotal('inc');


            // Calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp

            // Calculate the percentage of income that we spent 
            if(data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc ) * 100);
            }
            else{
                data.percentage = -1;
            }
        },

        getBudget : function(){
            return {
                budget : data.budget,
                percentage : data.percentage ,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp
            }
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
        expensesContainer: '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expenseLabel : '.budget__expenses--value',
        expensePercentage : '.budget__expenses--percentage',
        parentContainer : '.container'
        
    }
   

    
    return {
        // function to get the input vakue
        getInput : function(){
            return{
                getType  : document.querySelector(DomString.type).value,
                getDescription : document.querySelector(DomString.description).value,
                getValue : parseFloat(document.querySelector(DomString.value).value)
            
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
        //Function to delete item 
        deleteListItem : function(selectorId){
            var el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);

        },
        //Function for clearing the input fields

        clearInput : function(){
                var field , fieldArr ;
                field = document.querySelectorAll(DomString.description + ','+DomString.value);

                fieldArr = Array.prototype.slice.call(field); // converting list to array

                //For changing each value to null or " "
                fieldArr.forEach(function(current , index , array){
                    current.value = "";
                    
                });

                fieldArr[0].focus();
        },
        // To update budget fields 
        displayBudget : function(obj){
            
            document.querySelector(DomString.budgetLabel).textContent = obj.budget;
            document.querySelector(DomString.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DomString.expenseLabel).textContent = obj.totalExp;
            if(obj.percentage > 0){
                document.querySelector(DomString.expensePercentage).textContent = obj.percentage;
            }
            else{
                document.querySelector(DomString.expensePercentage).textContent = "";
            }
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
    document.querySelector(Dom.parentContainer).addEventListener('click' ,ctrlDeleteItem);
};
    
    var updateBudget = function(){
        // 1. Calculate the budget 
        bgtCtrl.calculateBudget();

        // 2. Return the budget
        var budget = bgtCtrl.getBudget();

        // 3. Add the budget to the UI
        UiCtrl.displayBudget(budget);
    }

    var ctrlAddItem = function(){
        var input , newItem ;

        // 1 . Get item from the input field 
         input = UiCtrl.getInput();
       
        if(input.getDescription !=="" && !isNaN(input.getValue) && input.getValue > 0 ){

        // 2. Add item to buget contoller
         newItem = bgtCtrl.addItem(input.getType, input.getDescription , input.getValue);

         // 3. Add item to UI 
         UiCtrl.addListItem(newItem , input.getType);
 
         //3.5 Clear the Input fields
         UiCtrl.clearInput();
 
         // 4. Update the budget
         updateBudget();

        }
        else{
            UiCtrl.clearInput();
            alert("Wrong Input");
        }
        
    }
    
    var ctrlDeleteItem = function(e){
        var item , splitItem , itemType , itemId;

        item = e.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(item);

        if(item){
            splitItem = item.split('-');
            itemType = splitItem[0];
            itemId = parseInt(splitItem[1]);
        }
       // console.log(splitItem ,itemType , itemId);

       // 1. Delete item from the DataStructure
        bgtCtrl.deleteBudget(itemType , itemId);
       // bgtCtrl.testing();
       // 2. Delete the item from the UI
        UiCtrl.deleteListItem(item);

        // 3. Update the budget
        updateBudget();

        


    }
   
    //Function initiated at the begining
    return{
        init : function(){
            console.log('Application  has started');
            EventListeners();

            UiCtrl.displayBudget({
                budget : 0,
                percentage : 0 ,
                totalInc : 0,
                totalExp : 0

            });
        }
        
    }
    

})(budgetController , UiController);

controller.init();