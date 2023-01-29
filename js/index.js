$(function () {
    const APP_ID = 'ec4b29b4';
    const APP_KEY = 'b9da11433e30787ee73b10e573acbf23';
    let searchResult = $(".search-result");
    let result = "";
    let search = "";
    let baseURL = `https://api.edamam.com/api/recipes/v2?type=public`;

    $("#search-recipe").click(function () {
        search = $('#searchid').val();
        fetchRecipe();
        function fetchRecipe() {
            fetch(`${baseURL}&q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`)
                .then((response) => {
                    if(!response.ok){
                        throw new Error(response.status)
                    }else{
                        return response.json()
                    }
                })
                .then((data) => {
                    console.log(data);
                    result = data.hits;
                    generateHTML(result);
                })
                .catch(error => {
                    $("main").append(searchResult.text("Something went wrong: "+ error));
                });
                
        }
})
$("select#choice").change(function () {
    let mealType = $(this).children("option:selected").val();
    console.log(mealType);
    fetchMealType();
        function fetchMealType(){
            fetch(`${baseURL}&q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${mealType}`)
                .then((response) => {
                    if(!response.ok){
                        throw new Error(response.status)
                    }else{
                        return response.json()
                    }
                })
                .then((data) => {
                    console.log(data);
                    result = data.hits;
                    generateHTML(result);
                })
                .catch(error => {
                    $("main").append(searchResult.text("Something went wrong: "+ error));
                });
        }
})
function generateHTML(result){
    let htmlContent = "";
    for(let item of result){
        console.log(item);
        let calories = `${item.recipe.calories}`;
        htmlContent += 
        `<div class="item">
            <div class="item-img">
                <img class="image" src='${item.recipe.images.REGULAR.url}' alt="Recipe image">
            </div>    
            <div class="data-container">
            <h2 class="title">${item.recipe.label}</h2>
            <a href="${item.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="discription">
            Calories: ${parseFloat(calories).toFixed(2)}
            </p>
        </div>
    `   
    }
    searchResult.html(htmlContent);
}
})




