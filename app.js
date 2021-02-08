const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetails = document.getElementById("meal-details");

// Search Button Event
searchBtn.addEventListener("click", () => {
  const inputText = document.getElementById("search-input-field").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayMealItems(data.meals);
    })

    .catch((err) => {
      alert("Please Enter a valid Meal Name");
    });
});

// Display Meal Items
const displayMealItems = (mealItems) => {
  const inputText = document.getElementById("search-input-field").value;
  if (inputText === "") {
    alert("Please Enter a Meal Name First");
  } else {
    let mealDiv = "";
    mealItems.forEach((mealItem) => {
      mealDiv += `
                <div>
                    <div class="card card-div" onclick="displayMealDetails(${mealItem.idMeal})">
                        <img class="img-fluid rounded" src="${mealItem.strMealThumb}" />
                        <div class="card-body">
                            <h4 class="card-title">${mealItem.strMeal}</h4>
                        </div>
                    </div>
                </div>
            `;
      mealList.innerHTML = mealDiv;
    });
  }
};

// Display Meal Details
const displayMealDetails = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const mealDiv = `
            <div>
                <div>
                    <img class="img-fluid rounded" src="${data.meals[0].strMealThumb}" />
                    <div class="card-body">
                      <h4 class="card-title">${data.meals[0].strMeal}</h4>
                      <h5 class="card-title">Ingredients: </h5>
                        <ul class="ingredient-items">
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient1} </li>
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient2} </li>
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient3} </li>
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient4} </li>
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient5} </li>  
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient6} </li>  
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient7} </li>  
                        <li><i class="fas fa-check-square"></i> ${data.meals[0].strIngredient8} </li>  
                          
                        </ul>
                    </div>
                </div>
            </div>
        `;
      mealDetails.innerHTML = mealDiv;
    });
};
