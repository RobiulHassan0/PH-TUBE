console.log('index is connected')

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(
            (response) => response.json()
        )
    .then(
        (data) => displayCategories(data.categories)
    );
}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then(data => console.log(data));
}


function displayCategories(categories){
    // get the container
    const categoryContainer = document.getElementById('category-container');
    // loop on array of object
    for(let category of categories){
        console.log(category)
        // create Element 
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${category.category}</button>
        `;
        // Append the Element
        categoryContainer.append(categoryDiv)
    }
}



loadCategories();
loadVideos();