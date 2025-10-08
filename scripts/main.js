function removeActiveClass(){
    const activeButtons = document.getElementsByClassName('active');
    for (let btn of activeButtons){
        btn.classList.remove('active');
    }
}

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
    .then(data => {
        removeActiveClass();
        document.getElementById('btnAll').classList.add('active');
        displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) =>{
    const url = `
        https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        removeActiveClass();
        const clickedButton = document.getElementById(`${id}`);
        clickedButton.classList.add('active');
        displayVideos(data.category);
    });
}

const loadVideoDetails = (videoId) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        displayVideoDetails(data.video)
    })
}
// =======================

function displayCategories(categories){
    // get the container
    const categoryContainer = document.getElementById('category-container');
    // loop on array of object
    for(let category of categories){
        console.log(category)
        // create Element 
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button id="${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${category.category}</button>
        `;
        // Append the Element
        categoryContainer.append(categoryDiv)

        // const allButtons = categoryContainer.querySelectorAll('button');
        // allButtons.forEach(btn => {
        //     btn.addEventListener('click', () => {
        //         const categoryId = btn.getAttribute('data-id');
        //         loadCategoryVideos(categoryId);
        //     })
        // })
    }
}

function displayVideos(videos){
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = "";
    
    if(videos.length === 0){
        videoContainer.innerHTML = `
            <div class="col-span-full flex flex-col justify-center items-center py-20">
                <img class="w-[120px]" src="assets/Icon.png" alt="">
                <h2 class="text-2xl font-bold mt-10">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
        return;
    }

    videos.forEach(video => {
        // create Element
        const videoCard = document.createElement('div');
        // ${video.others.posted_date}
        videoCard.innerHTML = `
            <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[200px] object-cover" src="${video.thumbnail}"/>
                    <span class="absolute bottom-2 right-2 text-sm rounded bg-black text-white px-2">
                        3hrs 56 min ago 
                    </span>
                </figure>   
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="w-10 rounded-full">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro space-y-1">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1">
                        ${video.authors[0].profile_name}
                        ${video.authors[0].verified == true ? 
                            `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt="">` : ``}
                        </p>
                        
                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
            </div>
        `;
        // Appened 
        videoContainer.append(videoCard);
    });
}

const displayVideoDetails = (video) =>{

    document.getElementById('videoDetails').showModal();
    const detailsContainer = document.getElementById('detailsContainer');
    detailsContainer.innerHTML = `
        <div class="card bg-base-100 image-full w-96 shadow-sm">
            <figure>
                <img
                src="${video.thumbnail}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>${video.description}</p>
                <div class="card-actions justify-end">
                    
                </div>
            </div>
        </div>
    `;
}

loadCategories();
