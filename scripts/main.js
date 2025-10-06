import { loadCategories, loadVideos } from "./api.js";

export function displayCategories(categories){
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

export function displayVideos(videos){
    const videoContainer = document.getElementById("videoContainer");

    videos.forEach(video => {
        // create Element
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="card bg-base-100 w-96 shadow-sm">
                <figure> <img src="${video.thumbnail}"/></figure>   
                <div class="card-body">
                    <h2 class="card-title">${video.title}</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        // Appened 
        videoContainer.append(videoCard);
    });
}


loadCategories();
loadVideos();